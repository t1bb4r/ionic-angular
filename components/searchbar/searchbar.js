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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var config_1 = require('../../config/config');
var icon_1 = require('../icon/icon');
var util_1 = require('../../util/util');
var debouncer_1 = require('../../util/debouncer');
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
var Searchbar = (function () {
    function Searchbar(_elementRef, _config, ngControl) {
        this._elementRef = _elementRef;
        this._config = _config;
        this._value = '';
        this._shouldBlur = true;
        this._isActive = false;
        this._debouncer = new debouncer_1.Debouncer(250);
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
        this.ionInput = new core_1.EventEmitter();
        /**
         * @output {event} When the Searchbar input has blurred.
         */
        this.ionBlur = new core_1.EventEmitter();
        /**
         * @output {event} When the Searchbar input has focused.
         */
        this.ionFocus = new core_1.EventEmitter();
        /**
         * @output {event} When the cancel button is clicked.
         */
        this.ionCancel = new core_1.EventEmitter();
        /**
         * @output {event} When the clear input button is clicked.
         */
        this.ionClear = new core_1.EventEmitter();
        /**
         * @private
         */
        this.onChange = function (_) { };
        /**
         * @private
         */
        this.onTouched = function () { };
        // If the user passed a ngControl we need to set the valueAccessor
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
    }
    Object.defineProperty(Searchbar.prototype, "debounce", {
        /**
         * @input {number} How long, in milliseconds, to wait to trigger the `input` event after each keystroke. Default `250`.
         */
        get: function () {
            return this._debouncer.wait;
        },
        set: function (val) {
            this._debouncer.wait = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Searchbar.prototype, "searchbarInput", {
        /**
         * @private
         */
        set: function (searchbarInput) {
            this._searchbarInput = searchbarInput;
            var inputEle = searchbarInput.nativeElement;
            // By defalt set autocomplete="off" unless specified by the input
            var autoComplete = (this.autocomplete === '' || this.autocomplete === 'on') ? 'on' : this._config.get('autocomplete', 'off');
            inputEle.setAttribute('autocomplete', autoComplete);
            // by default set autocorrect="off" unless specified by the input
            var autoCorrect = (this.autocorrect === '' || this.autocorrect === 'on') ? 'on' : this._config.get('autocorrect', 'off');
            inputEle.setAttribute('autocorrect', autoCorrect);
            // by default set spellcheck="false" unless specified by the input
            var spellCheck = (this.spellcheck === '' || this.spellcheck === 'true' || this.spellcheck === true) ? true : this._config.getBoolean('spellcheck', false);
            inputEle.setAttribute('spellcheck', spellCheck);
            // by default set type="search" unless specified by the input
            inputEle.setAttribute('type', this.type);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Searchbar.prototype, "value", {
        /**
         * @input {string} Set the input value.
         */
        get: function () {
            return this._value;
        },
        set: function (val) {
            this._value = val;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * On Initialization check for attributes
     */
    Searchbar.prototype.ngOnInit = function () {
        var showCancelButton = this.showCancelButton;
        if (typeof showCancelButton === 'string') {
            this.showCancelButton = (showCancelButton === '' || showCancelButton === 'true');
        }
    };
    /**
     * @private
     * After View Initialization position the elements
     */
    Searchbar.prototype.ngAfterViewInit = function () {
        this.positionElements();
    };
    /**
     * @private
     * Positions the input search icon, placeholder, and the cancel button
     * based on the input value and if it is focused. (ios only)
     */
    Searchbar.prototype.positionElements = function () {
        if (this._config.get('mode') !== 'ios')
            return;
        // Position the input placeholder & search icon
        if (this._searchbarInput && this._searchbarIcon) {
            this.positionInputPlaceholder(this._searchbarInput.nativeElement, this._searchbarIcon.nativeElement);
        }
        // Position the cancel button
        if (this._cancelButton && this._cancelButton.nativeElement) {
            this.positionCancelButton(this._cancelButton.nativeElement);
        }
    };
    /**
     * @private
     * Calculates the amount of padding/margin left for the elements
     * in order to center them based on the placeholder width
     */
    Searchbar.prototype.positionInputPlaceholder = function (inputEle, iconEle) {
        if (this.shouldAlignLeft()) {
            inputEle.removeAttribute('style');
            iconEle.removeAttribute('style');
        }
        else {
            // Create a dummy span to get the placeholder width
            var tempSpan = document.createElement('span');
            tempSpan.innerHTML = this.placeholder;
            document.body.appendChild(tempSpan);
            // Get the width of the span then remove it
            var textWidth = tempSpan.offsetWidth;
            tempSpan.remove();
            // Set the input padding left
            var inputLeft = 'calc(50% - ' + (textWidth / 2) + 'px)';
            inputEle.style.paddingLeft = inputLeft;
            // Set the icon margin left
            var iconLeft = 'calc(50% - ' + ((textWidth / 2) + 30) + 'px)';
            iconEle.style.marginLeft = iconLeft;
        }
    };
    /**
     * @private
     * Show the iOS Cancel button on focus, hide it offscreen otherwise
     */
    Searchbar.prototype.positionCancelButton = function (cancelButtonEle) {
        if (cancelButtonEle.offsetWidth > 0) {
            if (this._sbHasFocus) {
                cancelButtonEle.style.marginRight = '0';
            }
            else {
                cancelButtonEle.style.marginRight = -cancelButtonEle.offsetWidth + 'px';
            }
        }
    };
    /**
     * @private
     * Align the input placeholder left on focus or if a value exists
     */
    Searchbar.prototype.shouldAlignLeft = function () {
        return ((this._value && this._value.toString().trim() !== '') || this._sbHasFocus === true);
    };
    /**
     * @private
     * Update the Searchbar input value when the input changes
     */
    Searchbar.prototype.inputChanged = function (ev) {
        var _this = this;
        var value = ev.target.value;
        this._debouncer.debounce(function () {
            _this._value = value;
            _this.onChange(_this._value);
            _this.ionInput.emit(ev);
        });
    };
    /**
     * @private
     * Sets the Searchbar to focused and active on input focus.
     */
    Searchbar.prototype.inputFocused = function (ev) {
        this.ionFocus.emit(ev);
        this._sbHasFocus = true;
        this._isActive = true;
        this.positionElements();
    };
    /**
     * @private
     * Sets the Searchbar to not focused and checks if it should align left
     * based on whether there is a value in the searchbar or not.
     */
    Searchbar.prototype.inputBlurred = function (ev) {
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
    };
    /**
     * @private
     * Clears the input field and triggers the control change.
     */
    Searchbar.prototype.clearInput = function (ev) {
        this.ionClear.emit(ev);
        if (util_1.isPresent(this._value) && this._value !== '') {
            this._value = '';
            this.onChange(this._value);
            this.ionInput.emit(ev);
        }
        this._shouldBlur = false;
    };
    /**
     * @private
     * Clears the input field and tells the input to blur since
     * the clearInput function doesn't want the input to blur
     * then calls the custom cancel function if the user passed one in.
     */
    Searchbar.prototype.cancelSearchbar = function (ev) {
        this.ionCancel.emit(ev);
        this.clearInput(ev);
        this._shouldBlur = true;
        this._isActive = false;
    };
    /**
     * @private
     * Write a new value to the element.
     */
    Searchbar.prototype.writeValue = function (val) {
        this._value = val;
        this.positionElements();
    };
    /**
     * @private
     * Set the function to be called when the control receives a change event.
     */
    Searchbar.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    /**
     * @private
     * Set the function to be called when the control receives a touch event.
     */
    Searchbar.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Searchbar.prototype, "cancelButtonText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Searchbar.prototype, "showCancelButton", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Searchbar.prototype, "debounce", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Searchbar.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Searchbar.prototype, "autocomplete", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Searchbar.prototype, "autocorrect", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Searchbar.prototype, "spellcheck", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Searchbar.prototype, "type", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Searchbar.prototype, "ionInput", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Searchbar.prototype, "ionBlur", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Searchbar.prototype, "ionFocus", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Searchbar.prototype, "ionCancel", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Searchbar.prototype, "ionClear", void 0);
    __decorate([
        core_1.HostBinding('class.searchbar-has-focus'), 
        __metadata('design:type', Boolean)
    ], Searchbar.prototype, "_sbHasFocus", void 0);
    __decorate([
        core_1.ViewChild('searchbarInput'), 
        __metadata('design:type', core_1.ElementRef), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Searchbar.prototype, "searchbarInput", null);
    __decorate([
        core_1.ViewChild('searchbarIcon'), 
        __metadata('design:type', core_1.ElementRef)
    ], Searchbar.prototype, "_searchbarIcon", void 0);
    __decorate([
        core_1.ViewChild('cancelButton', { read: core_1.ElementRef }), 
        __metadata('design:type', core_1.ElementRef)
    ], Searchbar.prototype, "_cancelButton", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Searchbar.prototype, "value", null);
    Searchbar = __decorate([
        core_1.Component({
            selector: 'ion-searchbar',
            template: '<div class="searchbar-input-container">' +
                '<button (click)="cancelSearchbar($event)" (mousedown)="cancelSearchbar($event)" clear dark class="searchbar-md-cancel">' +
                '<ion-icon name="arrow-back"></ion-icon>' +
                '</button>' +
                '<div #searchbarIcon class="searchbar-search-icon"></div>' +
                '<input #searchbarInput [(ngModel)]="_value" [attr.placeholder]="placeholder" (input)="inputChanged($event)" (blur)="inputBlurred($event)" (focus)="inputFocused($event)" class="searchbar-input">' +
                '<button clear class="searchbar-clear-icon" (click)="clearInput($event)" (mousedown)="clearInput($event)"></button>' +
                '</div>' +
                '<button #cancelButton [tabindex]="_isActive ? 1 : -1" clear (click)="cancelSearchbar($event)" (mousedown)="cancelSearchbar($event)" class="searchbar-ios-cancel">{{cancelButtonText}}</button>',
            directives: [icon_1.Icon, forms_1.NgModel],
            host: {
                '[class.searchbar-has-value]': '_value',
                '[class.searchbar-active]': '_isActive',
                '[class.searchbar-show-cancel]': 'showCancelButton',
                '[class.searchbar-left-aligned]': 'shouldAlignLeft()'
            },
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __param(2, core_1.Optional()), 
        __metadata('design:paramtypes', [core_1.ElementRef, config_1.Config, forms_1.NgControl])
    ], Searchbar);
    return Searchbar;
}());
exports.Searchbar = Searchbar;
