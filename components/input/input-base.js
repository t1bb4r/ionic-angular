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
var dom_1 = require('../../util/dom');
var util_1 = require('../../util/util');
var native_input_1 = require('./native-input');
var InputBase = (function () {
    function InputBase(config, _form, _item, _app, _platform, _elementRef, _scrollView, nav, ngControl) {
        this._form = _form;
        this._item = _item;
        this._app = _app;
        this._platform = _platform;
        this._elementRef = _elementRef;
        this._scrollView = _scrollView;
        this._disabled = false;
        this._type = 'text';
        this._value = '';
        this.placeholder = '';
        this.blur = new core_1.EventEmitter();
        this.focus = new core_1.EventEmitter();
        this._nav = nav;
        this._useAssist = config.getBoolean('scrollAssist', false);
        this._usePadding = config.getBoolean('scrollPadding', this._useAssist);
        this._keyboardHeight = config.getNumber('keyboardHeight');
        this._autoFocusAssist = config.get('autoFocusAssist', 'delay');
        this._autoComplete = config.get('autocomplete', 'off');
        this._autoCorrect = config.get('autocorrect', 'off');
        if (ngControl) {
            ngControl.valueAccessor = this;
            this.inputControl = ngControl;
        }
        _form.register(this);
    }
    InputBase.prototype.ngOnInit = function () {
        if (this._item) {
            this._item.setCssClass('item-input', true);
            this._item.registerInput(this._type);
        }
        var clearInput = this.clearInput;
        if (typeof clearInput === 'string') {
            this.clearInput = (clearInput === '' || clearInput === 'true');
        }
    };
    InputBase.prototype.ngAfterContentInit = function () {
        var self = this;
        self._scrollMove = function (ev) {
            // scroll move event listener this instance can reuse
            if (!(self._nav && self._nav.isTransitioning())) {
                self.deregScrollMove();
                if (self.hasFocus()) {
                    self._native.hideFocus(true);
                    self._scrollView.onScrollEnd(function () {
                        self._native.hideFocus(false);
                        if (self.hasFocus()) {
                            // if it still has focus then keep listening
                            self.regScrollMove();
                        }
                    });
                }
            }
        };
        this.setItemInputControlCss();
    };
    InputBase.prototype.ngAfterContentChecked = function () {
        this.setItemInputControlCss();
    };
    InputBase.prototype.setItemInputControlCss = function () {
        var item = this._item;
        var nativeInput = this._native;
        var inputControl = this.inputControl;
        // Set the control classes on the item
        if (item && inputControl) {
            this.setControlCss(item, inputControl);
        }
        // Set the control classes on the native input
        if (nativeInput && inputControl) {
            this.setControlCss(nativeInput, inputControl);
        }
    };
    InputBase.prototype.setControlCss = function (element, control) {
        element.setCssClass('ng-untouched', control.untouched);
        element.setCssClass('ng-touched', control.touched);
        element.setCssClass('ng-pristine', control.pristine);
        element.setCssClass('ng-dirty', control.dirty);
        element.setCssClass('ng-valid', control.valid);
        element.setCssClass('ng-invalid', !control.valid);
    };
    InputBase.prototype.ngOnDestroy = function () {
        this._form.deregister(this);
    };
    Object.defineProperty(InputBase.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            this._value = val;
            this.checkHasValue(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputBase.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (val) {
            this._type = 'text';
            if (val) {
                val = val.toLowerCase();
                if (/password|email|number|search|tel|url|date|month|time|week/.test(val)) {
                    this._type = val;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputBase.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (val) {
            this._disabled = util_1.isTrueProperty(val);
            this._item && this._item.setCssClass('item-input-disabled', this._disabled);
            this._native && this._native.isDisabled(this._disabled);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputBase.prototype, "_nativeInput", {
        /**
         * @private
         */
        set: function (nativeInput) {
            var _this = this;
            this._native = nativeInput;
            if (this._item && this._item.labelId !== null) {
                nativeInput.labelledBy(this._item.labelId);
            }
            nativeInput.valueChange.subscribe(function (inputValue) {
                _this.onChange(inputValue);
            });
            this.focusChange(this.hasFocus());
            nativeInput.focusChange.subscribe(function (textInputHasFocus) {
                _this.focusChange(textInputHasFocus);
                _this.checkHasValue(nativeInput.getValue());
                if (!textInputHasFocus) {
                    _this.onTouched(textInputHasFocus);
                }
            });
            this.checkHasValue(nativeInput.getValue());
            this.disabled = this._disabled;
            var ionInputEle = this._elementRef.nativeElement;
            var nativeInputEle = nativeInput.element();
            // copy ion-input attributes to the native input element
            dom_1.copyInputAttributes(ionInputEle, nativeInputEle);
            if (ionInputEle.hasAttribute('autofocus')) {
                // the ion-input element has the autofocus attributes
                ionInputEle.removeAttribute('autofocus');
                if (this._autoFocusAssist === 'immediate') {
                    // config says to immediate focus on the input
                    // works best on android devices
                    nativeInputEle.focus();
                }
                else if (this._autoFocusAssist === 'delay') {
                    // config says to chill out a bit and focus on the input after transitions
                    // works best on desktop
                    setTimeout(function () {
                        nativeInputEle.focus();
                    }, 650);
                }
            }
            // by default set autocomplete="off" unless specified by the input
            if (ionInputEle.hasAttribute('autocomplete')) {
                this._autoComplete = ionInputEle.getAttribute('autocomplete');
            }
            nativeInputEle.setAttribute('autocomplete', this._autoComplete);
            // by default set autocorrect="off" unless specified by the input
            if (ionInputEle.hasAttribute('autocorrect')) {
                this._autoCorrect = ionInputEle.getAttribute('autocorrect');
            }
            nativeInputEle.setAttribute('autocorrect', this._autoCorrect);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputBase.prototype, "_nextInput", {
        /**
         * @private
         */
        set: function (nextInput) {
            var _this = this;
            if (nextInput) {
                nextInput.focused.subscribe(function () {
                    _this._form.tabFocus(_this);
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * Angular2 Forms API method called by the model (Control) on change to update
     * the checked value.
     * https://github.com/angular/angular/blob/master/modules/angular2/src/forms/directives/shared.ts#L34
     */
    InputBase.prototype.writeValue = function (val) {
        this._value = val;
        this.checkHasValue(val);
    };
    /**
     * @private
     */
    InputBase.prototype.onChange = function (val) {
        this.checkHasValue(val);
    };
    /**
     * @private
     */
    InputBase.prototype.onTouched = function (val) { };
    /**
     * @private
     */
    InputBase.prototype.hasFocus = function () {
        // check if an input has focus or not
        return this._native.hasFocus();
    };
    /**
     * @private
     */
    InputBase.prototype.checkHasValue = function (inputValue) {
        if (this._item) {
            this._item.setCssClass('input-has-value', !!(inputValue && inputValue !== ''));
        }
    };
    /**
     * @private
     */
    InputBase.prototype.focusChange = function (inputHasFocus) {
        if (this._item) {
            this._item.setCssClass('input-has-focus', inputHasFocus);
        }
        if (!inputHasFocus) {
            this.deregScrollMove();
        }
    };
    InputBase.prototype.pointerStart = function (ev) {
        // input cover touchstart
        void 0;
        if (ev.type === 'touchstart') {
            this._isTouch = true;
        }
        if ((this._isTouch || (!this._isTouch && ev.type === 'mousedown')) && this._app.isEnabled()) {
            // remember where the touchstart/mousedown started
            this._coord = dom_1.pointerCoord(ev);
        }
    };
    InputBase.prototype.pointerEnd = function (ev) {
        // input cover touchend/mouseup
        void 0;
        if ((this._isTouch && ev.type === 'mouseup') || !this._app.isEnabled()) {
            // the app is actively doing something right now
            // don't try to scroll in the input
            ev.preventDefault();
            ev.stopPropagation();
        }
        else if (this._coord) {
            // get where the touchend/mouseup ended
            var endCoord = dom_1.pointerCoord(ev);
            // focus this input if the pointer hasn't moved XX pixels
            // and the input doesn't already have focus
            if (!dom_1.hasPointerMoved(8, this._coord, endCoord) && !this.hasFocus()) {
                ev.preventDefault();
                ev.stopPropagation();
                // begin the input focus process
                void 0;
                this.initFocus();
            }
        }
        this._coord = null;
    };
    /**
     * @private
     */
    InputBase.prototype.initFocus = function () {
        var _this = this;
        // begin the process of setting focus to the inner input element
        var scrollView = this._scrollView;
        if (scrollView) {
            // this input is inside of a scroll view
            // find out if text input should be manually scrolled into view
            // get container of this input, probably an ion-item a few nodes up
            var ele = this._elementRef.nativeElement;
            ele = dom_1.closest(ele, 'ion-item,[ion-item]') || ele;
            var scrollData = InputBase.getScrollData(ele.offsetTop, ele.offsetHeight, scrollView.getContentDimensions(), this._keyboardHeight, this._platform.height());
            if (scrollData.scrollAmount > -3 && scrollData.scrollAmount < 3) {
                // the text input is in a safe position that doesn't
                // require it to be scrolled into view, just set focus now
                this.setFocus();
                this.regScrollMove();
                return;
            }
            if (this._usePadding) {
                // add padding to the bottom of the scroll view (if needed)
                scrollView.addScrollPadding(scrollData.scrollPadding);
            }
            // manually scroll the text input to the top
            // do not allow any clicks while it's scrolling
            var scrollDuration = getScrollAssistDuration(scrollData.scrollAmount);
            this._app.setEnabled(false, scrollDuration);
            this._nav && this._nav.setTransitioning(true, scrollDuration);
            // temporarily move the focus to the focus holder so the browser
            // doesn't freak out while it's trying to get the input in place
            // at this point the native text input still does not have focus
            this._native.beginFocus(true, scrollData.inputSafeY);
            // scroll the input into place
            scrollView.scrollTo(0, scrollData.scrollTo, scrollDuration).then(function () {
                // the scroll view is in the correct position now
                // give the native text input focus
                _this._native.beginFocus(false, 0);
                // ensure this is the focused input
                _this.setFocus();
                // all good, allow clicks again
                _this._app.setEnabled(true);
                _this._nav && _this._nav.setTransitioning(false);
                _this.regScrollMove();
                if (_this._usePadding) {
                    _this._scrollView.clearScrollPaddingFocusOut();
                }
            });
        }
        else {
            // not inside of a scroll view, just focus it
            this.setFocus();
            this.regScrollMove();
        }
    };
    /**
     * @private
     */
    InputBase.prototype.setFocus = function () {
        // immediately set focus
        this._form.setAsFocused(this);
        // set focus on the actual input element
        void 0;
        this._native.setFocus();
        // ensure the body hasn't scrolled down
        document.body.scrollTop = 0;
    };
    /**
     * @private
     * Angular2 Forms API method called by the view (formControlName) to register the
     * onChange event handler that updates the model (Control).
     * @param {Function} fn  the onChange event handler.
     */
    InputBase.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    /**
     * @private
     * Angular2 Forms API method called by the view (formControlName) to register
     * the onTouched event handler that marks model (Control) as touched.
     * @param {Function} fn  onTouched event handler.
     */
    InputBase.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    /**
     * @private
     */
    InputBase.prototype.regScrollMove = function () {
        var _this = this;
        // register scroll move listener
        if (this._useAssist && this._scrollView) {
            setTimeout(function () {
                _this.deregScrollMove();
                _this._deregScroll = _this._scrollView.addScrollListener(_this._scrollMove);
            }, 80);
        }
    };
    /**
     * @private
     */
    InputBase.prototype.deregScrollMove = function () {
        // deregister the scroll move listener
        this._deregScroll && this._deregScroll();
    };
    InputBase.prototype.focusNext = function () {
        this._form.tabFocus(this);
    };
    /**
     * @private
     */
    InputBase.getScrollData = function (inputOffsetTop, inputOffsetHeight, scrollViewDimensions, keyboardHeight, plaformHeight) {
        // compute input's Y values relative to the body
        var inputTop = (inputOffsetTop + scrollViewDimensions.contentTop - scrollViewDimensions.scrollTop);
        var inputBottom = (inputTop + inputOffsetHeight);
        // compute the safe area which is the viewable content area when the soft keyboard is up
        var safeAreaTop = scrollViewDimensions.contentTop;
        var safeAreaHeight = plaformHeight - keyboardHeight - safeAreaTop;
        safeAreaHeight /= 2;
        var safeAreaBottom = safeAreaTop + safeAreaHeight;
        var inputTopWithinSafeArea = (inputTop >= safeAreaTop && inputTop <= safeAreaBottom);
        var inputTopAboveSafeArea = (inputTop < safeAreaTop);
        var inputTopBelowSafeArea = (inputTop > safeAreaBottom);
        var inputBottomWithinSafeArea = (inputBottom >= safeAreaTop && inputBottom <= safeAreaBottom);
        var inputBottomBelowSafeArea = (inputBottom > safeAreaBottom);
        /*
        Text Input Scroll To Scenarios
        ---------------------------------------
        1) Input top within safe area, bottom within safe area
        2) Input top within safe area, bottom below safe area, room to scroll
        3) Input top above safe area, bottom within safe area, room to scroll
        4) Input top below safe area, no room to scroll, input smaller than safe area
        5) Input top within safe area, bottom below safe area, no room to scroll, input smaller than safe area
        6) Input top within safe area, bottom below safe area, no room to scroll, input larger than safe area
        7) Input top below safe area, no room to scroll, input larger than safe area
        */
        var scrollData = {
            scrollAmount: 0,
            scrollTo: 0,
            scrollPadding: 0,
            inputSafeY: 0
        };
        if (inputTopWithinSafeArea && inputBottomWithinSafeArea) {
            // Input top within safe area, bottom within safe area
            // no need to scroll to a position, it's good as-is
            return scrollData;
        }
        // looks like we'll have to do some auto-scrolling
        if (inputTopBelowSafeArea || inputBottomBelowSafeArea) {
            // Input top and bottom below safe area
            // auto scroll the input up so at least the top of it shows
            if (safeAreaHeight > inputOffsetHeight) {
                // safe area height is taller than the input height, so we
                // can bring it up the input just enough to show the input bottom
                scrollData.scrollAmount = Math.round(safeAreaBottom - inputBottom);
            }
            else {
                // safe area height is smaller than the input height, so we can
                // only scroll it up so the input top is at the top of the safe area
                // however the input bottom will be below the safe area
                scrollData.scrollAmount = Math.round(safeAreaTop - inputTop);
            }
            scrollData.inputSafeY = -(inputTop - safeAreaTop) + 4;
        }
        else if (inputTopAboveSafeArea) {
            // Input top above safe area
            // auto scroll the input down so at least the top of it shows
            scrollData.scrollAmount = Math.round(safeAreaTop - inputTop);
            scrollData.inputSafeY = (safeAreaTop - inputTop) + 4;
        }
        // figure out where it should scroll to for the best position to the input
        scrollData.scrollTo = (scrollViewDimensions.scrollTop - scrollData.scrollAmount);
        if (scrollData.scrollAmount < 0) {
            // when auto-scrolling up, there also needs to be enough
            // content padding at the bottom of the scroll view
            // manually add it if there isn't enough scrollable area
            // figure out how many scrollable area is left to scroll up
            var availablePadding = (scrollViewDimensions.scrollHeight - scrollViewDimensions.scrollTop) - scrollViewDimensions.contentHeight;
            var paddingSpace = availablePadding + scrollData.scrollAmount;
            if (paddingSpace < 0) {
                // there's not enough scrollable area at the bottom, so manually add more
                scrollData.scrollPadding = (scrollViewDimensions.contentHeight - safeAreaHeight);
            }
        }
        // if (!window.safeAreaEle) {
        //   window.safeAreaEle = document.createElement('div');
        //   window.safeAreaEle.style.position = 'absolute';
        //   window.safeAreaEle.style.background = 'rgba(0, 128, 0, 0.7)';
        //   window.safeAreaEle.style.padding = '2px 5px';
        //   window.safeAreaEle.style.textShadow = '1px 1px white';
        //   window.safeAreaEle.style.left = '0px';
        //   window.safeAreaEle.style.right = '0px';
        //   window.safeAreaEle.style.fontWeight = 'bold';
        //   window.safeAreaEle.style.pointerEvents = 'none';
        //   document.body.appendChild(window.safeAreaEle);
        // }
        // window.safeAreaEle.style.top = safeAreaTop + 'px';
        // window.safeAreaEle.style.height = safeAreaHeight + 'px';
        // window.safeAreaEle.innerHTML = `
        //   <div>scrollTo: ${scrollData.scrollTo}</div>
        //   <div>scrollAmount: ${scrollData.scrollAmount}</div>
        //   <div>scrollPadding: ${scrollData.scrollPadding}</div>
        //   <div>inputSafeY: ${scrollData.inputSafeY}</div>
        //   <div>scrollHeight: ${scrollViewDimensions.scrollHeight}</div>
        //   <div>scrollTop: ${scrollViewDimensions.scrollTop}</div>
        //   <div>contentHeight: ${scrollViewDimensions.contentHeight}</div>
        // `;
        return scrollData;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], InputBase.prototype, "clearInput", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], InputBase.prototype, "placeholder", void 0);
    __decorate([
        core_1.ViewChild(native_input_1.NativeInput), 
        __metadata('design:type', native_input_1.NativeInput)
    ], InputBase.prototype, "_native", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], InputBase.prototype, "blur", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], InputBase.prototype, "focus", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], InputBase.prototype, "value", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], InputBase.prototype, "type", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], InputBase.prototype, "disabled", null);
    __decorate([
        core_1.ViewChild(native_input_1.NativeInput), 
        __metadata('design:type', native_input_1.NativeInput), 
        __metadata('design:paramtypes', [native_input_1.NativeInput])
    ], InputBase.prototype, "_nativeInput", null);
    __decorate([
        core_1.ViewChild(native_input_1.NextInput), 
        __metadata('design:type', native_input_1.NextInput), 
        __metadata('design:paramtypes', [native_input_1.NextInput])
    ], InputBase.prototype, "_nextInput", null);
    return InputBase;
}());
exports.InputBase = InputBase;
var SCROLL_ASSIST_SPEED = 0.3;
function getScrollAssistDuration(distanceToScroll) {
    distanceToScroll = Math.abs(distanceToScroll);
    var duration = distanceToScroll / SCROLL_ASSIST_SPEED;
    return Math.min(400, Math.max(150, duration));
}
