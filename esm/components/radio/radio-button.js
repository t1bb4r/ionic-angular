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
import { Component, EventEmitter, HostListener, Input, Optional, Output, ViewEncapsulation } from '@angular/core';
import { Form } from '../../util/form';
import { isBlank, isCheckedProperty, isPresent, isTrueProperty } from '../../util/util';
import { Item } from '../item/item';
import { RadioGroup } from './radio-group';
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
export var RadioButton = function () {
    function RadioButton(_form, _item, _group) {
        _classCallCheck(this, RadioButton);

        this._form = _form;
        this._item = _item;
        this._group = _group;
        this._checked = false;
        this._disabled = false;
        this._value = null;
        /**
         * @output {any} expression to be evaluated when selected
         */
        this.ionSelect = new EventEmitter();
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
    /**
     * @input {any} The value of the radio button. Defaults to the generated id.
     */


    _createClass(RadioButton, [{
        key: "_click",

        /**
         * @private
         */
        value: function _click(ev) {
            console.debug('radio, select', this.id);
            ev.preventDefault();
            ev.stopPropagation();
            this.checked = true;
            this.ionSelect.emit(this.value);
        }
        /**
         * @private
         */

    }, {
        key: "ngOnInit",
        value: function ngOnInit() {
            if (this._group && isPresent(this._group.value)) {
                this.checked = isCheckedProperty(this._group.value, this.value);
            }
        }
        /**
         * @private
         */

    }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
            this._form.deregister(this);
            this._group && this._group.remove(this);
        }
    }, {
        key: "value",
        get: function get() {
            // if the value is not defined then use it's unique id
            return isBlank(this._value) ? this.id : this._value;
        },
        set: function set(val) {
            this._value = val;
        }
        /**
         * @input {boolean} Whether the radio button should be checked or not. Default false.
         */

    }, {
        key: "checked",
        get: function get() {
            return this._checked;
        },
        set: function set(isChecked) {
            this._checked = isTrueProperty(isChecked);
            if (this._item) {
                this._item.setCssClass('item-radio-checked', this._checked);
            }
        }
        /**
         * @input {boolean} Whether the radio button should be disabled or not. Default false.
         */

    }, {
        key: "disabled",
        get: function get() {
            return this._disabled;
        },
        set: function set(val) {
            this._disabled = isTrueProperty(val);
            this._item && this._item.setCssClass('item-radio-disabled', this._disabled);
        }
    }]);

    return RadioButton;
}();
__decorate([Output(), __metadata('design:type', typeof (_a = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _a || Object)], RadioButton.prototype, "ionSelect", void 0);
__decorate([Input(), __metadata('design:type', Object)], RadioButton.prototype, "value", null);
__decorate([Input(), __metadata('design:type', Boolean)], RadioButton.prototype, "checked", null);
__decorate([Input(), __metadata('design:type', Boolean)], RadioButton.prototype, "disabled", null);
__decorate([HostListener('click', ['$event']), __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], RadioButton.prototype, "_click", null);
RadioButton = __decorate([Component({
    selector: 'ion-radio',
    template: "\n    <div class=\"radio-icon\" [class.radio-checked]=\"_checked\">\n      <div class=\"radio-inner\"></div>\n    </div>\n    <button role=\"radio\"\n            type=\"button\"\n            category=\"item-cover\"\n            [id]=\"id\"\n            [attr.aria-checked]=\"_checked\"\n            [attr.aria-labelledby]=\"_labelId\"\n            [attr.aria-disabled]=\"_disabled\"\n            class=\"item-cover\">\n    </button>\n  ",
    host: {
        '[class.radio-disabled]': '_disabled'
    },
    encapsulation: ViewEncapsulation.None
}), __param(1, Optional()), __param(2, Optional()), __metadata('design:paramtypes', [typeof (_b = typeof Form !== 'undefined' && Form) === 'function' && _b || Object, typeof (_c = typeof Item !== 'undefined' && Item) === 'function' && _c || Object, typeof (_d = typeof RadioGroup !== 'undefined' && RadioGroup) === 'function' && _d || Object])], RadioButton);
var _a, _b, _c, _d;