var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Config } from '../../config/config';
import { CSS, hasFocus as _hasFocus } from '../../util/dom';
/**
 * @private
 */
export var NativeInput = function () {
    function NativeInput(_elementRef, _renderer, config, ngControl) {
        _classCallCheck(this, NativeInput);

        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.ngControl = ngControl;
        this.focusChange = new EventEmitter();
        this.valueChange = new EventEmitter();
        this._clone = config.getBoolean('inputCloning', false);
        this._blurring = config.getBoolean('inputBlurring', false);
    }

    _createClass(NativeInput, [{
        key: "_change",
        value: function _change(ev) {
            this.valueChange.emit(ev.target.value);
        }
    }, {
        key: "_focus",
        value: function _focus() {
            var self = this;
            self.focusChange.emit(true);
            function docTouchEnd(ev) {
                var tapped = ev.target;
                if (tapped && self.element()) {
                    if (tapped.tagName !== 'INPUT' && tapped.tagName !== 'TEXTAREA' && !tapped.classList.contains('input-cover')) {
                        self.element().blur();
                    }
                }
            }
            if (self._blurring) {
                // automatically blur input if:
                // 1) this input has focus
                // 2) the newly tapped document element is not an input
                console.debug('input blurring enabled');
                document.addEventListener('touchend', docTouchEnd, true);
                self._unrefBlur = function () {
                    console.debug('input blurring disabled');
                    document.removeEventListener('touchend', docTouchEnd, true);
                };
            }
        }
    }, {
        key: "_blur",
        value: function _blur() {
            this.focusChange.emit(false);
            this.hideFocus(false);
            this._unrefBlur && this._unrefBlur();
            this._unrefBlur = null;
        }
    }, {
        key: "labelledBy",
        value: function labelledBy(val) {
            this._renderer.setElementAttribute(this._elementRef.nativeElement, 'aria-labelledby', val);
        }
    }, {
        key: "isDisabled",
        value: function isDisabled(val) {
            this._renderer.setElementAttribute(this._elementRef.nativeElement, 'disabled', val ? '' : null);
        }
    }, {
        key: "setFocus",
        value: function setFocus() {
            // let's set focus to the element
            // but only if it does not already have focus
            if (document.activeElement !== this.element()) {
                this.element().focus();
            }
        }
    }, {
        key: "beginFocus",
        value: function beginFocus(shouldFocus, inputRelativeY) {
            if (this._relocated !== shouldFocus) {
                var focusedInputEle = this.element();
                if (shouldFocus) {
                    // we should focus into this element
                    if (this._clone) {
                        // this platform needs the input to be cloned
                        // this allows for the actual input to receive the focus from
                        // the user's touch event, but before it receives focus, it
                        // moves the actual input to a location that will not screw
                        // up the app's layout, and does not allow the native browser
                        // to attempt to scroll the input into place (messing up headers/footers)
                        // the cloned input fills the area of where native input should be
                        // while the native input fakes out the browser by relocating itself
                        // before it receives the actual focus event
                        var clonedInputEle = cloneInput(focusedInputEle, 'cloned-focus');
                        focusedInputEle.parentNode.insertBefore(clonedInputEle, focusedInputEle);
                        // move the native input to a location safe to receive focus
                        // according to the browser, the native input receives focus in an
                        // area which doesn't require the browser to scroll the input into place
                        focusedInputEle.style[CSS.transform] = "translate3d(-9999px," + inputRelativeY + "px,0)";
                        focusedInputEle.style.opacity = '0';
                    }
                    // let's now set focus to the actual native element
                    // at this point it is safe to assume the browser will not attempt
                    // to scroll the input into view itself (screwing up headers/footers)
                    this.setFocus();
                    if (this._clone) {
                        focusedInputEle.classList.add('cloned-active');
                    }
                } else {
                    // should remove the focus
                    if (this._clone) {
                        // should remove the cloned node
                        focusedInputEle.classList.remove('cloned-active');
                        focusedInputEle.style[CSS.transform] = '';
                        focusedInputEle.style.opacity = '';
                        removeClone(focusedInputEle, 'cloned-focus');
                    }
                }
                this._relocated = shouldFocus;
            }
        }
    }, {
        key: "hideFocus",
        value: function hideFocus(shouldHideFocus) {
            var focusedInputEle = this.element();
            console.debug("native input hideFocus, shouldHideFocus: " + shouldHideFocus + ", input value: " + focusedInputEle.value);
            if (shouldHideFocus) {
                var clonedInputEle = cloneInput(focusedInputEle, 'cloned-move');
                focusedInputEle.classList.add('cloned-active');
                focusedInputEle.parentNode.insertBefore(clonedInputEle, focusedInputEle);
            } else {
                focusedInputEle.classList.remove('cloned-active');
                removeClone(focusedInputEle, 'cloned-move');
            }
        }
    }, {
        key: "hasFocus",
        value: function hasFocus() {
            return _hasFocus(this.element());
        }
    }, {
        key: "getValue",
        value: function getValue() {
            return this.element().value;
        }
    }, {
        key: "setCssClass",
        value: function setCssClass(cssClass, shouldAdd) {
            this._renderer.setElementClass(this._elementRef.nativeElement, cssClass, shouldAdd);
        }
    }, {
        key: "element",
        value: function element() {
            return this._elementRef.nativeElement;
        }
    }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
            this._unrefBlur && this._unrefBlur();
        }
    }]);

    return NativeInput;
}();
__decorate([Output(), __metadata('design:type', typeof (_a = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _a || Object)], NativeInput.prototype, "focusChange", void 0);
__decorate([Output(), __metadata('design:type', typeof (_b = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _b || Object)], NativeInput.prototype, "valueChange", void 0);
__decorate([HostListener('input', ['$event']), __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], NativeInput.prototype, "_change", null);
__decorate([HostListener('focus'), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], NativeInput.prototype, "_focus", null);
__decorate([HostListener('blur'), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], NativeInput.prototype, "_blur", null);
NativeInput = __decorate([Directive({
    selector: '.text-input'
}), __metadata('design:paramtypes', [typeof (_c = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _c || Object, typeof (_d = typeof Renderer !== 'undefined' && Renderer) === 'function' && _d || Object, typeof (_e = typeof Config !== 'undefined' && Config) === 'function' && _e || Object, typeof (_f = typeof NgControl !== 'undefined' && NgControl) === 'function' && _f || Object])], NativeInput);
function cloneInput(focusedInputEle, addCssClass) {
    var clonedInputEle = focusedInputEle.cloneNode(true);
    clonedInputEle.classList.add('cloned-input');
    clonedInputEle.classList.add(addCssClass);
    clonedInputEle.setAttribute('aria-hidden', true);
    clonedInputEle.removeAttribute('aria-labelledby');
    clonedInputEle.tabIndex = -1;
    clonedInputEle.style.width = focusedInputEle.offsetWidth + 10 + 'px';
    clonedInputEle.style.height = focusedInputEle.offsetHeight + 'px';
    clonedInputEle.value = focusedInputEle.value;
    return clonedInputEle;
}
function removeClone(focusedInputEle, queryCssClass) {
    var clonedInputEle = focusedInputEle.parentElement.querySelector('.' + queryCssClass);
    if (clonedInputEle) {
        clonedInputEle.parentNode.removeChild(clonedInputEle);
    }
}
/**
 * @private
 */
export var NextInput = function () {
    function NextInput() {
        _classCallCheck(this, NextInput);

        this.focused = new EventEmitter();
    }

    _createClass(NextInput, [{
        key: "receivedFocus",
        value: function receivedFocus() {
            console.debug('native-input, next-input received focus');
            this.focused.emit(true);
        }
    }]);

    return NextInput;
}();
__decorate([Output(), __metadata('design:type', typeof (_g = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _g || Object)], NextInput.prototype, "focused", void 0);
__decorate([HostListener('focus'), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], NextInput.prototype, "receivedFocus", null);
NextInput = __decorate([Directive({
    selector: '[next-input]'
}), __metadata('design:paramtypes', [])], NextInput);
var _a, _b, _c, _d, _e, _f, _g;