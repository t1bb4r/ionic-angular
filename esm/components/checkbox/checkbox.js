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
import { Component, EventEmitter, forwardRef, HostListener, Input, Optional, Output, Provider, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Form } from '../../util/form';
import { Item } from '../item/item';
import { isTrueProperty } from '../../util/util';
export var CHECKBOX_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, { useExisting: forwardRef(function () {
        return Checkbox;
    }), multi: true });
/**
 * @name Checkbox
 * @module ionic
 *
 * @description
 * The Checkbox is a simple component styled based on the mode. It can be
 * placed in an `ion-item` or used as a stand-alone checkbox.
 *
 * See the [Angular 2 Docs](https://angular.io/docs/ts/latest/guide/forms.html)
 * for more info on forms and inputs.
 *
 *
 * @usage
 * ```html
 *
 *  <ion-list>
 *
 *    <ion-item>
 *      <ion-label>Pepperoni</ion-label>
 *      <ion-checkbox [(ngModel)]="pepperoni"></ion-checkbox>
 *    </ion-item>
 *
 *    <ion-item>
 *      <ion-label>Sausage</ion-label>
 *      <ion-checkbox [(ngModel)]="sausage" disabled="true"></ion-checkbox>
 *    </ion-item>
 *
 *    <ion-item>
 *      <ion-label>Mushrooms</ion-label>
 *      <ion-checkbox [(ngModel)]="mushrooms"></ion-checkbox>
 *    </ion-item>
 *
 *  </ion-list>
 * ```
 *
 * @demo /docs/v2/demos/checkbox/
 * @see {@link /docs/v2/components#checkbox Checkbox Component Docs}
 */
export var Checkbox = function () {
    function Checkbox(_form, _item) {
        _classCallCheck(this, Checkbox);

        this._form = _form;
        this._item = _item;
        this._checked = false;
        this._disabled = false;
        /**
         * @output {Checkbox} expression to evaluate when the checkbox value changes
         */
        this.ionChange = new EventEmitter();
        _form.register(this);
        if (_item) {
            this.id = 'chk-' + _item.registerInput('checkbox');
            this._labelId = 'lbl-' + _item.id;
            this._item.setCssClass('item-checkbox', true);
        }
    }
    /**
     * @private
     */


    _createClass(Checkbox, [{
        key: "_click",
        value: function _click(ev) {
            console.debug('checkbox, checked');
            ev.preventDefault();
            ev.stopPropagation();
            this.onChange(!this._checked);
        }
        /**
         * @input {boolean} whether or not the checkbox is checked (defaults to false)
         */

    }, {
        key: "_setChecked",

        /**
         * @private
         */
        value: function _setChecked(isChecked) {
            if (isChecked !== this._checked) {
                this._checked = isChecked;
                if (this._init) {
                    this.ionChange.emit(this);
                }
                this._item && this._item.setCssClass('item-checkbox-checked', isChecked);
            }
        }
        /**
         * @private
         */

    }, {
        key: "writeValue",
        value: function writeValue(val) {
            this._setChecked(isTrueProperty(val));
        }
        /**
         * @private
         */

    }, {
        key: "registerOnChange",
        value: function registerOnChange(fn) {
            var _this = this;

            this._fn = fn;
            this.onChange = function (isChecked) {
                console.debug('checkbox, onChange', isChecked);
                fn(isChecked);
                _this._setChecked(isChecked);
                _this.onTouched();
            };
        }
        /**
         * @private
         */

    }, {
        key: "registerOnTouched",
        value: function registerOnTouched(fn) {
            this.onTouched = fn;
        }
        /**
         * @input {boolean} whether or not the checkbox is disabled or not.
         */

    }, {
        key: "onChange",

        /**
         * @private
         */
        value: function onChange(isChecked) {
            // used when this input does not have an ngModel or formControlName
            console.debug('checkbox, onChange (no ngModel)', isChecked);
            this._setChecked(isChecked);
            this.onTouched();
        }
        /**
         * @private
         */

    }, {
        key: "onTouched",
        value: function onTouched() {}
        /**
         * @private
         */

    }, {
        key: "ngAfterContentInit",
        value: function ngAfterContentInit() {
            this._init = true;
        }
        /**
         * @private
         */

    }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
            this._form.deregister(this);
        }
    }, {
        key: "checked",
        get: function get() {
            return this._checked;
        },
        set: function set(val) {
            this._setChecked(isTrueProperty(val));
            this.onChange(this._checked);
        }
    }, {
        key: "disabled",
        get: function get() {
            return this._disabled;
        },
        set: function set(val) {
            this._disabled = isTrueProperty(val);
            this._item && this._item.setCssClass('item-checkbox-disabled', this._disabled);
        }
    }]);

    return Checkbox;
}();
__decorate([Output(), __metadata('design:type', typeof (_a = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _a || Object)], Checkbox.prototype, "ionChange", void 0);
__decorate([HostListener('click', ['$event']), __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], Checkbox.prototype, "_click", null);
__decorate([Input(), __metadata('design:type', Boolean)], Checkbox.prototype, "checked", null);
__decorate([Input(), __metadata('design:type', Boolean)], Checkbox.prototype, "disabled", null);
Checkbox = __decorate([Component({
    selector: 'ion-checkbox',
    template: "\n    <div class=\"checkbox-icon\" [class.checkbox-checked]=\"_checked\">\n      <div class=\"checkbox-inner\"></div>\n    </div>\n    <button role=\"checkbox\"\n            type=\"button\"\n            category=\"item-cover\"\n            [id]=\"id\"\n            [attr.aria-checked]=\"_checked\"\n            [attr.aria-labelledby]=\"_labelId\"\n            [attr.aria-disabled]=\"_disabled\"\n            class=\"item-cover\">\n    </button>\n  ",
    host: {
        '[class.checkbox-disabled]': '_disabled'
    },
    providers: [CHECKBOX_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None
}), __param(1, Optional()), __metadata('design:paramtypes', [typeof (_b = typeof Form !== 'undefined' && Form) === 'function' && _b || Object, typeof (_c = typeof Item !== 'undefined' && Item) === 'function' && _c || Object])], Checkbox);
var _a, _b, _c;