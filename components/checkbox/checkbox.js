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
var form_1 = require('../../util/form');
var item_1 = require('../item/item');
var util_1 = require('../../util/util');
exports.CHECKBOX_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, { useExisting: core_1.forwardRef(function () { return Checkbox; }), multi: true });
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
var Checkbox = (function () {
    function Checkbox(_form, _item) {
        this._form = _form;
        this._item = _item;
        this._checked = false;
        this._disabled = false;
        /**
         * @output {Checkbox} expression to evaluate when the checkbox value changes
         */
        this.ionChange = new core_1.EventEmitter();
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
    Checkbox.prototype._click = function (ev) {
        void 0;
        ev.preventDefault();
        ev.stopPropagation();
        this.onChange(!this._checked);
    };
    Object.defineProperty(Checkbox.prototype, "checked", {
        /**
         * @input {boolean} whether or not the checkbox is checked (defaults to false)
         */
        get: function () {
            return this._checked;
        },
        set: function (val) {
            this._setChecked(util_1.isTrueProperty(val));
            this.onChange(this._checked);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    Checkbox.prototype._setChecked = function (isChecked) {
        if (isChecked !== this._checked) {
            this._checked = isChecked;
            if (this._init) {
                this.ionChange.emit(this);
            }
            this._item && this._item.setCssClass('item-checkbox-checked', isChecked);
        }
    };
    /**
     * @private
     */
    Checkbox.prototype.writeValue = function (val) {
        this._setChecked(util_1.isTrueProperty(val));
    };
    /**
     * @private
     */
    Checkbox.prototype.registerOnChange = function (fn) {
        var _this = this;
        this._fn = fn;
        this.onChange = function (isChecked) {
            void 0;
            fn(isChecked);
            _this._setChecked(isChecked);
            _this.onTouched();
        };
    };
    /**
     * @private
     */
    Checkbox.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    Object.defineProperty(Checkbox.prototype, "disabled", {
        /**
         * @input {boolean} whether or not the checkbox is disabled or not.
         */
        get: function () {
            return this._disabled;
        },
        set: function (val) {
            this._disabled = util_1.isTrueProperty(val);
            this._item && this._item.setCssClass('item-checkbox-disabled', this._disabled);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    Checkbox.prototype.onChange = function (isChecked) {
        // used when this input does not have an ngModel or formControlName
        void 0;
        this._setChecked(isChecked);
        this.onTouched();
    };
    /**
     * @private
     */
    Checkbox.prototype.onTouched = function () { };
    /**
     * @private
     */
    Checkbox.prototype.ngAfterContentInit = function () {
        this._init = true;
    };
    /**
     * @private
     */
    Checkbox.prototype.ngOnDestroy = function () {
        this._form.deregister(this);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Checkbox.prototype, "ionChange", void 0);
    __decorate([
        core_1.HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [UIEvent]), 
        __metadata('design:returntype', void 0)
    ], Checkbox.prototype, "_click", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Checkbox.prototype, "checked", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Checkbox.prototype, "disabled", null);
    Checkbox = __decorate([
        core_1.Component({
            selector: 'ion-checkbox',
            template: "\n    <div class=\"checkbox-icon\" [class.checkbox-checked]=\"_checked\">\n      <div class=\"checkbox-inner\"></div>\n    </div>\n    <button role=\"checkbox\"\n            type=\"button\"\n            category=\"item-cover\"\n            [id]=\"id\"\n            [attr.aria-checked]=\"_checked\"\n            [attr.aria-labelledby]=\"_labelId\"\n            [attr.aria-disabled]=\"_disabled\"\n            class=\"item-cover\">\n    </button>\n  ",
            host: {
                '[class.checkbox-disabled]': '_disabled'
            },
            providers: [exports.CHECKBOX_VALUE_ACCESSOR],
            encapsulation: core_1.ViewEncapsulation.None,
        }),
        __param(1, core_1.Optional()), 
        __metadata('design:paramtypes', [form_1.Form, item_1.Item])
    ], Checkbox);
    return Checkbox;
}());
exports.Checkbox = Checkbox;
