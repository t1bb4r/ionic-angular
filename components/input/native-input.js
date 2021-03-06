"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var config_1 = require('../../config/config');
var dom_1 = require('../../util/dom');
/**
 * @private
 */
var NativeInput = (function () {
    function NativeInput(_elementRef, _renderer, config, ngControl) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.ngControl = ngControl;
        this.focusChange = new core_1.EventEmitter();
        this.valueChange = new core_1.EventEmitter();
        this._clone = config.getBoolean('inputCloning', false);
        this._blurring = config.getBoolean('inputBlurring', false);
    }
    NativeInput.prototype._change = function (ev) {
        this.valueChange.emit(ev.target.value);
    };
    NativeInput.prototype._focus = function () {
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
            void 0;
            document.addEventListener('touchend', docTouchEnd, true);
            self._unrefBlur = function () {
                void 0;
                document.removeEventListener('touchend', docTouchEnd, true);
            };
        }
    };
    NativeInput.prototype._blur = function () {
        this.focusChange.emit(false);
        this.hideFocus(false);
        this._unrefBlur && this._unrefBlur();
        this._unrefBlur = null;
    };
    NativeInput.prototype.labelledBy = function (val) {
        this._renderer.setElementAttribute(this._elementRef.nativeElement, 'aria-labelledby', val);
    };
    NativeInput.prototype.isDisabled = function (val) {
        this._renderer.setElementAttribute(this._elementRef.nativeElement, 'disabled', val ? '' : null);
    };
    NativeInput.prototype.setFocus = function () {
        // let's set focus to the element
        // but only if it does not already have focus
        if (document.activeElement !== this.element()) {
            this.element().focus();
        }
    };
    NativeInput.prototype.beginFocus = function (shouldFocus, inputRelativeY) {
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
                    focusedInputEle.style[dom_1.CSS.transform] = "translate3d(-9999px," + inputRelativeY + "px,0)";
                    focusedInputEle.style.opacity = '0';
                }
                // let's now set focus to the actual native element
                // at this point it is safe to assume the browser will not attempt
                // to scroll the input into view itself (screwing up headers/footers)
                this.setFocus();
                if (this._clone) {
                    focusedInputEle.classList.add('cloned-active');
                }
            }
            else {
                // should remove the focus
                if (this._clone) {
                    // should remove the cloned node
                    focusedInputEle.classList.remove('cloned-active');
                    focusedInputEle.style[dom_1.CSS.transform] = '';
                    focusedInputEle.style.opacity = '';
                    removeClone(focusedInputEle, 'cloned-focus');
                }
            }
            this._relocated = shouldFocus;
        }
    };
    NativeInput.prototype.hideFocus = function (shouldHideFocus) {
        var focusedInputEle = this.element();
        void 0;
        if (shouldHideFocus) {
            var clonedInputEle = cloneInput(focusedInputEle, 'cloned-move');
            focusedInputEle.classList.add('cloned-active');
            focusedInputEle.parentNode.insertBefore(clonedInputEle, focusedInputEle);
        }
        else {
            focusedInputEle.classList.remove('cloned-active');
            removeClone(focusedInputEle, 'cloned-move');
        }
    };
    NativeInput.prototype.hasFocus = function () {
        return dom_1.hasFocus(this.element());
    };
    NativeInput.prototype.getValue = function () {
        return this.element().value;
    };
    NativeInput.prototype.setCssClass = function (cssClass, shouldAdd) {
        this._renderer.setElementClass(this._elementRef.nativeElement, cssClass, shouldAdd);
    };
    NativeInput.prototype.element = function () {
        return this._elementRef.nativeElement;
    };
    NativeInput.prototype.ngOnDestroy = function () {
        this._unrefBlur && this._unrefBlur();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NativeInput.prototype, "focusChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NativeInput.prototype, "valueChange", void 0);
    __decorate([
        core_1.HostListener('input', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], NativeInput.prototype, "_change", null);
    __decorate([
        core_1.HostListener('focus'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], NativeInput.prototype, "_focus", null);
    __decorate([
        core_1.HostListener('blur'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], NativeInput.prototype, "_blur", null);
    NativeInput = __decorate([
        core_1.Directive({
            selector: '.text-input'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer, config_1.Config, forms_1.NgControl])
    ], NativeInput);
    return NativeInput;
}());
exports.NativeInput = NativeInput;
function cloneInput(focusedInputEle, addCssClass) {
    var clonedInputEle = focusedInputEle.cloneNode(true);
    clonedInputEle.classList.add('cloned-input');
    clonedInputEle.classList.add(addCssClass);
    clonedInputEle.setAttribute('aria-hidden', true);
    clonedInputEle.removeAttribute('aria-labelledby');
    clonedInputEle.tabIndex = -1;
    clonedInputEle.style.width = (focusedInputEle.offsetWidth + 10) + 'px';
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
var NextInput = (function () {
    function NextInput() {
        this.focused = new core_1.EventEmitter();
    }
    NextInput.prototype.receivedFocus = function () {
        void 0;
        this.focused.emit(true);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NextInput.prototype, "focused", void 0);
    __decorate([
        core_1.HostListener('focus'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], NextInput.prototype, "receivedFocus", null);
    NextInput = __decorate([
        core_1.Directive({
            selector: '[next-input]'
        }), 
        __metadata('design:paramtypes', [])
    ], NextInput);
    return NextInput;
}());
exports.NextInput = NextInput;
