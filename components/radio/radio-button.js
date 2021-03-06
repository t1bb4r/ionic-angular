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
var form_1 = require('../../util/form');
var util_1 = require('../../util/util');
var item_1 = require('../item/item');
var radio_group_1 = require('./radio-group');
/**
 * @description
 * A radio button is a button that can be either checked or unchecked. A user can tap
 * the button to check or uncheck it. It can also be checked from the template using
 * the `checked` property.
 *
 * Use an element with a `radio-group` attribute to group a set of radio buttons. When
 * radio buttons are inside a [radio group](../RadioGroup), exactly one radio button
 * in the group can be checked at any time. If a radio button is not placed in a group,
 * they will all have the ability to be checked at the same time.
 *
 * See the [Angular Forms Docs](https://angular.io/docs/ts/latest/guide/forms.html) for
 * more information on forms and input.
 *
 * @usage
 * ```html
 * <ion-list radio-group [(ngModel)]="relationship">
 *   <ion-item>
 *     <ion-label>Friends</ion-label>
 *     <ion-radio value="friends" checked></ion-radio>
 *   </ion-item>
 *   <ion-item>
 *     <ion-label>Family</ion-label>
 *     <ion-radio value="family"></ion-radio>
 *   </ion-item>
 *   <ion-item>
 *     <ion-label>Enemies</ion-label>
 *     <ion-radio value="enemies" [disabled]="isDisabled"></ion-radio>
 *   </ion-item>
 * </ion-list>
 * ```
 * @demo /docs/v2/demos/radio/
 * @see {@link /docs/v2/components#radio Radio Component Docs}
 * @see {@link ../RadioGroup RadioGroup API Docs}
 */
var RadioButton = (function () {
    function RadioButton(_form, _item, _group) {
        this._form = _form;
        this._item = _item;
        this._group = _group;
        this._checked = false;
        this._disabled = false;
        this._value = null;
        /**
         * @output {any} expression to be evaluated when selected
         */
        this.ionSelect = new core_1.EventEmitter();
        _form.register(this);
        if (_group) {
            // register with the radiogroup
            this.id = 'rb-' + _group.add(this);
        }
        if (_item) {
            // register the input inside of the item
            // reset to the item's id instead of the radiogroup id
            this.id = 'rb-' + _item.registerInput('radio');
            this._labelId = 'lbl-' + _item.id;
            this._item.setCssClass('item-radio', true);
        }
    }
    Object.defineProperty(RadioButton.prototype, "value", {
        /**
         * @input {any} The value of the radio button. Defaults to the generated id.
         */
        get: function () {
            // if the value is not defined then use it's unique id
            return util_1.isBlank(this._value) ? this.id : this._value;
        },
        set: function (val) {
            this._value = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioButton.prototype, "checked", {
        /**
         * @input {boolean} Whether the radio button should be checked or not. Default false.
         */
        get: function () {
            return this._checked;
        },
        set: function (isChecked) {
            this._checked = util_1.isTrueProperty(isChecked);
            if (this._item) {
                this._item.setCssClass('item-radio-checked', this._checked);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioButton.prototype, "disabled", {
        /**
         * @input {boolean} Whether the radio button should be disabled or not. Default false.
         */
        get: function () {
            return this._disabled;
        },
        set: function (val) {
            this._disabled = util_1.isTrueProperty(val);
            this._item && this._item.setCssClass('item-radio-disabled', this._disabled);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    RadioButton.prototype._click = function (ev) {
        void 0;
        ev.preventDefault();
        ev.stopPropagation();
        this.checked = true;
        this.ionSelect.emit(this.value);
    };
    /**
     * @private
     */
    RadioButton.prototype.ngOnInit = function () {
        if (this._group && util_1.isPresent(this._group.value)) {
            this.checked = util_1.isCheckedProperty(this._group.value, this.value);
        }
    };
    /**
     * @private
     */
    RadioButton.prototype.ngOnDestroy = function () {
        this._form.deregister(this);
        this._group && this._group.remove(this);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], RadioButton.prototype, "ionSelect", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], RadioButton.prototype, "value", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RadioButton.prototype, "checked", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RadioButton.prototype, "disabled", null);
    __decorate([
        core_1.HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [UIEvent]), 
        __metadata('design:returntype', void 0)
    ], RadioButton.prototype, "_click", null);
    RadioButton = __decorate([
        core_1.Component({
            selector: 'ion-radio',
            template: "\n    <div class=\"radio-icon\" [class.radio-checked]=\"_checked\">\n      <div class=\"radio-inner\"></div>\n    </div>\n    <button role=\"radio\"\n            type=\"button\"\n            category=\"item-cover\"\n            [id]=\"id\"\n            [attr.aria-checked]=\"_checked\"\n            [attr.aria-labelledby]=\"_labelId\"\n            [attr.aria-disabled]=\"_disabled\"\n            class=\"item-cover\">\n    </button>\n  ",
            host: {
                '[class.radio-disabled]': '_disabled'
            },
            encapsulation: core_1.ViewEncapsulation.None,
        }),
        __param(1, core_1.Optional()),
        __param(2, core_1.Optional()), 
        __metadata('design:paramtypes', [form_1.Form, item_1.Item, radio_group_1.RadioGroup])
    ], RadioButton);
    return RadioButton;
}());
exports.RadioButton = RadioButton;
