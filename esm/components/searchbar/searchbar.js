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
var __param = this && this.__param || function (paramIndex, decorator) {
    return function (target, key) {
        decorator(target, key, paramIndex);
    };
};
import { Component, ElementRef, EventEmitter, HostBinding, Input, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';
import { Config } from '../../config/config';
import { Icon } from '../icon/icon';
import { isPresent } from '../../util/util';
import { Debouncer } from '../../util/debouncer';
/**
 * @name Searchbar
 * @module ionic
 * @description
 * Manages the display of a Searchbar which can be used to search or filter items.
 *
 * @usage
 * ```html
 * <ion-searchbar
 *   [(ngModel)]="myInput"
 *   [showCancelButton]="shouldShowCancel"
 *   (ionInput)="onInput($event)"
 *   (ionCancel)="onCancel($event)">
 * </ion-searchbar>
 * ```
 *
 * @demo /docs/v2/demos/searchbar/
 * @see {@link /docs/v2/components#searchbar Searchbar Component Docs}
 */
export var Searchbar = function () {
    function Searchbar(_elementRef, _config, ngControl) {
        _classCallCheck(this, Searchbar);

        this._elementRef = _elementRef;
        this._config = _config;
        this._value = '';
        this._shouldBlur = true;
        this._isActive = false;
        this._debouncer = new Debouncer(250);
        /**
         * @input {string} Set the the cancel button text. Default: `"Cancel"`.
         */
        this.cancelButtonText = 'Cancel';
        /**
         * @input {boolean} Whether to show the cancel button or not. Default: `"false"`.
         */
        this.showCancelButton = false;
        /**
         * @input {string} Set the input's placeholder. Default `"Search"`.
         */
        this.placeholder = 'Search';
        /**
         * @input {string} Set the type of the input. Values: `"text"`, `"password"`, `"email"`, `"number"`, `"search"`, `"tel"`, `"url"`. Default `"search"`.
         */
        this.type = 'search';
        /**
         * @output {event} When the Searchbar input has changed including cleared.
         */
        this.ionInput = new EventEmitter();
        /**
         * @output {event} When the Searchbar input has blurred.
         */
        this.ionBlur = new EventEmitter();
        /**
         * @output {event} When the Searchbar input has focused.
         */
        this.ionFocus = new EventEmitter();
        /**
         * @output {event} When the cancel button is clicked.
         */
        this.ionCancel = new EventEmitter();
        /**
         * @output {event} When the clear input button is clicked.
         */
        this.ionClear = new EventEmitter();
        /**
         * @private
         */
        this.onChange = function (_) {};
        /**
         * @private
         */
        this.onTouched = function () {};
        // If the user passed a ngControl we need to set the valueAccessor
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
    }
    /**
     * @input {number} How long, in milliseconds, to wait to trigger the `input` event after each keystroke. Default `250`.
     */


    _createClass(Searchbar, [{
        key: "ngOnInit",

        /**
         * @private
         * On Initialization check for attributes
         */
        value: function ngOnInit() {
            var showCancelButton = this.showCancelButton;
            if (typeof showCancelButton === 'string') {
                this.showCancelButton = showCancelButton === '' || showCancelButton === 'true';
            }
        }
        /**
         * @private
         * After View Initialization position the elements
         */

    }, {
        key: "ngAfterViewInit",
        value: function ngAfterViewInit() {
            this.positionElements();
        }
        /**
         * @private
         * Positions the input search icon, placeholder, and the cancel button
         * based on the input value and if it is focused. (ios only)
         */

    }, {
        key: "positionElements",
        value: function positionElements() {
            if (this._config.get('mode') !== 'ios') return;
            // Position the input placeholder & search icon
            if (this._searchbarInput && this._searchbarIcon) {
                this.positionInputPlaceholder(this._searchbarInput.nativeElement, this._searchbarIcon.nativeElement);
            }
            // Position the cancel button
            if (this._cancelButton && this._cancelButton.nativeElement) {
                this.positionCancelButton(this._cancelButton.nativeElement);
            }
        }
        /**
         * @private
         * Calculates the amount of padding/margin left for the elements
         * in order to center them based on the placeholder width
         */

    }, {
        key: "positionInputPlaceholder",
        value: function positionInputPlaceholder(inputEle, iconEle) {
            if (this.shouldAlignLeft()) {
                inputEle.removeAttribute('style');
                iconEle.removeAttribute('style');
            } else {
                // Create a dummy span to get the placeholder width
                var tempSpan = document.createElement('span');
                tempSpan.innerHTML = this.placeholder;
                document.body.appendChild(tempSpan);
                // Get the width of the span then remove it
                var textWidth = tempSpan.offsetWidth;
                tempSpan.remove();
                // Set the input padding left
                var inputLeft = 'calc(50% - ' + textWidth / 2 + 'px)';
                inputEle.style.paddingLeft = inputLeft;
                // Set the icon margin left
                var iconLeft = 'calc(50% - ' + (textWidth / 2 + 30) + 'px)';
                iconEle.style.marginLeft = iconLeft;
            }
        }
        /**
         * @private
         * Show the iOS Cancel button on focus, hide it offscreen otherwise
         */

    }, {
        key: "positionCancelButton",
        value: function positionCancelButton(cancelButtonEle) {
            if (cancelButtonEle.offsetWidth > 0) {
                if (this._sbHasFocus) {
                    cancelButtonEle.style.marginRight = '0';
                } else {
                    cancelButtonEle.style.marginRight = -cancelButtonEle.offsetWidth + 'px';
                }
            }
        }
        /**
         * @private
         * Align the input placeholder left on focus or if a value exists
         */

    }, {
        key: "shouldAlignLeft",
        value: function shouldAlignLeft() {
            return this._value && this._value.toString().trim() !== '' || this._sbHasFocus === true;
        }
        /**
         * @private
         * Update the Searchbar input value when the input changes
         */

    }, {
        key: "inputChanged",
        value: function inputChanged(ev) {
            var _this = this;

            var value = ev.target.value;
            this._debouncer.debounce(function () {
                _this._value = value;
                _this.onChange(_this._value);
                _this.ionInput.emit(ev);
            });
        }
        /**
         * @private
         * Sets the Searchbar to focused and active on input focus.
         */

    }, {
        key: "inputFocused",
        value: function inputFocused(ev) {
            this.ionFocus.emit(ev);
            this._sbHasFocus = true;
            this._isActive = true;
            this.positionElements();
        }
        /**
         * @private
         * Sets the Searchbar to not focused and checks if it should align left
         * based on whether there is a value in the searchbar or not.
         */

    }, {
        key: "inputBlurred",
        value: function inputBlurred(ev) {
            // _shouldBlur determines if it should blur
            // if we are clearing the input we still want to stay focused in the input
            if (this._shouldBlur === false) {
                this._searchbarInput.nativeElement.focus();
                this._shouldBlur = true;
                return;
            }
            this.ionBlur.emit(ev);
            this._sbHasFocus = false;
            this.positionElements();
        }
        /**
         * @private
         * Clears the input field and triggers the control change.
         */

    }, {
        key: "clearInput",
        value: function clearInput(ev) {
            this.ionClear.emit(ev);
            if (isPresent(this._value) && this._value !== '') {
                this._value = '';
                this.onChange(this._value);
                this.ionInput.emit(ev);
            }
            this._shouldBlur = false;
        }
        /**
         * @private
         * Clears the input field and tells the input to blur since
         * the clearInput function doesn't want the input to blur
         * then calls the custom cancel function if the user passed one in.
         */

    }, {
        key: "cancelSearchbar",
        value: function cancelSearchbar(ev) {
            this.ionCancel.emit(ev);
            this.clearInput(ev);
            this._shouldBlur = true;
            this._isActive = false;
        }
        /**
         * @private
         * Write a new value to the element.
         */

    }, {
        key: "writeValue",
        value: function writeValue(val) {
            this._value = val;
            this.positionElements();
        }
        /**
         * @private
         * Set the function to be called when the control receives a change event.
         */

    }, {
        key: "registerOnChange",
        value: function registerOnChange(fn) {
            this.onChange = fn;
        }
        /**
         * @private
         * Set the function to be called when the control receives a touch event.
         */

    }, {
        key: "registerOnTouched",
        value: function registerOnTouched(fn) {
            this.onTouched = fn;
        }
    }, {
        key: "debounce",
        get: function get() {
            return this._debouncer.wait;
        },
        set: function set(val) {
            this._debouncer.wait = val;
        }
        /**
         * @private
         */

    }, {
        key: "searchbarInput",
        set: function set(searchbarInput) {
            this._searchbarInput = searchbarInput;
            var inputEle = searchbarInput.nativeElement;
            // By defalt set autocomplete="off" unless specified by the input
            var autoComplete = this.autocomplete === '' || this.autocomplete === 'on' ? 'on' : this._config.get('autocomplete', 'off');
            inputEle.setAttribute('autocomplete', autoComplete);
            // by default set autocorrect="off" unless specified by the input
            var autoCorrect = this.autocorrect === '' || this.autocorrect === 'on' ? 'on' : this._config.get('autocorrect', 'off');
            inputEle.setAttribute('autocorrect', autoCorrect);
            // by default set spellcheck="false" unless specified by the input
            var spellCheck = this.spellcheck === '' || this.spellcheck === 'true' || this.spellcheck === true ? true : this._config.getBoolean('spellcheck', false);
            inputEle.setAttribute('spellcheck', spellCheck);
            // by default set type="search" unless specified by the input
            inputEle.setAttribute('type', this.type);
        }
        /**
         * @input {string} Set the input value.
         */

    }, {
        key: "value",
        get: function get() {
            return this._value;
        },
        set: function set(val) {
            this._value = val;
        }
    }]);

    return Searchbar;
}();
__decorate([Input(), __metadata('design:type', String)], Searchbar.prototype, "cancelButtonText", void 0);
__decorate([Input(), __metadata('design:type', Object)], Searchbar.prototype, "showCancelButton", void 0);
__decorate([Input(), __metadata('design:type', Number)], Searchbar.prototype, "debounce", null);
__decorate([Input(), __metadata('design:type', String)], Searchbar.prototype, "placeholder", void 0);
__decorate([Input(), __metadata('design:type', String)], Searchbar.prototype, "autocomplete", void 0);
__decorate([Input(), __metadata('design:type', String)], Searchbar.prototype, "autocorrect", void 0);
__decorate([Input(), __metadata('design:type', Object)], Searchbar.prototype, "spellcheck", void 0);
__decorate([Input(), __metadata('design:type', String)], Searchbar.prototype, "type", void 0);
__decorate([Output(), __metadata('design:type', typeof (_a = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _a || Object)], Searchbar.prototype, "ionInput", void 0);
__decorate([Output(), __metadata('design:type', typeof (_b = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _b || Object)], Searchbar.prototype, "ionBlur", void 0);
__decorate([Output(), __metadata('design:type', typeof (_c = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _c || Object)], Searchbar.prototype, "ionFocus", void 0);
__decorate([Output(), __metadata('design:type', typeof (_d = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _d || Object)], Searchbar.prototype, "ionCancel", void 0);
__decorate([Output(), __metadata('design:type', typeof (_e = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _e || Object)], Searchbar.prototype, "ionClear", void 0);
__decorate([HostBinding('class.searchbar-has-focus'), __metadata('design:type', Boolean)], Searchbar.prototype, "_sbHasFocus", void 0);
__decorate([ViewChild('searchbarInput'), __metadata('design:type', typeof (_f = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _f || Object), __metadata('design:paramtypes', [typeof (_g = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _g || Object])], Searchbar.prototype, "searchbarInput", null);
__decorate([ViewChild('searchbarIcon'), __metadata('design:type', typeof (_h = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _h || Object)], Searchbar.prototype, "_searchbarIcon", void 0);
__decorate([ViewChild('cancelButton', { read: ElementRef }), __metadata('design:type', typeof (_j = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _j || Object)], Searchbar.prototype, "_cancelButton", void 0);
__decorate([Input(), __metadata('design:type', Object)], Searchbar.prototype, "value", null);
Searchbar = __decorate([Component({
    selector: 'ion-searchbar',
    template: '<div class="searchbar-input-container">' + '<button (click)="cancelSearchbar($event)" (mousedown)="cancelSearchbar($event)" clear dark class="searchbar-md-cancel">' + '<ion-icon name="arrow-back"></ion-icon>' + '</button>' + '<div #searchbarIcon class="searchbar-search-icon"></div>' + '<input #searchbarInput [(ngModel)]="_value" [attr.placeholder]="placeholder" (input)="inputChanged($event)" (blur)="inputBlurred($event)" (focus)="inputFocused($event)" class="searchbar-input">' + '<button clear class="searchbar-clear-icon" (click)="clearInput($event)" (mousedown)="clearInput($event)"></button>' + '</div>' + '<button #cancelButton [tabindex]="_isActive ? 1 : -1" clear (click)="cancelSearchbar($event)" (mousedown)="cancelSearchbar($event)" class="searchbar-ios-cancel">{{cancelButtonText}}</button>',
    directives: [Icon, NgModel],
    host: {
        '[class.searchbar-has-value]': '_value',
        '[class.searchbar-active]': '_isActive',
        '[class.searchbar-show-cancel]': 'showCancelButton',
        '[class.searchbar-left-aligned]': 'shouldAlignLeft()'
    },
    encapsulation: ViewEncapsulation.None
}), __param(2, Optional()), __metadata('design:paramtypes', [typeof (_k = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _k || Object, typeof (_l = typeof Config !== 'undefined' && Config) === 'function' && _l || Object, typeof (_m = typeof NgControl !== 'undefined' && NgControl) === 'function' && _m || Object])], Searchbar);
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;