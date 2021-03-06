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
var util_1 = require('../../util/util');
var item_1 = require('../item/item');
var dom_1 = require('../../util/dom');
var ui_event_manager_1 = require('../../util/ui-event-manager');
exports.TOGGLE_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, { useExisting: core_1.forwardRef(function () { return Toggle; }), multi: true });
/**
 * @name Toggle
 * @description
 * A toggle technically is the same thing as an HTML checkbox input,
 * except it looks different and is easier to use on a touch device.
 * Toggles can also have colors assigned to them, by adding any color
 * attribute.
 *
 * See the [Angular 2 Docs](https://angular.io/docs/ts/latest/guide/forms.html)
 * for more info on forms and inputs.
 *
 * @usage
 * ```html
 *
 *  <ion-list>
 *
 *    <ion-item>
 *      <ion-label>Pepperoni</ion-label>
 *      <ion-toggle [(ngModel)]="pepperoni"></ion-toggle>
 *    </ion-item>
 *
 *    <ion-item>
 *      <ion-label>Sausage</ion-label>
 *      <ion-toggle [(ngModel)]="sausage" disabled="true"></ion-toggle>
 *    </ion-item>
 *
 *    <ion-item>
 *      <ion-label>Mushrooms</ion-label>
 *      <ion-toggle [(ngModel)]="mushrooms"></ion-toggle>
 *    </ion-item>
 *
 *  </ion-list>
 * ```
 *
 * @demo /docs/v2/demos/toggle/
 * @see {@link /docs/v2/components#toggle Toggle Component Docs}
 */
var Toggle = (function () {
    function Toggle(_form, _elementRef, _renderer, _item) {
        this._form = _form;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._item = _item;
        this._checked = false;
        this._disabled = false;
        this._activated = false;
        this._msPrv = 0;
        this._events = new ui_event_manager_1.UIEventManager();
        /**
         * @output {Toggle} expression to evaluate when the toggle value changes
         */
        this.ionChange = new core_1.EventEmitter();
        this._form.register(this);
        if (_item) {
            this.id = 'tgl-' + _item.registerInput('toggle');
            this._labelId = 'lbl-' + _item.id;
            this._item.setCssClass('item-toggle', true);
        }
    }
    /**
     * @private
     */
    Toggle.prototype.pointerDown = function (ev) {
        this._startX = dom_1.pointerCoord(ev).x;
        this._activated = true;
        return true;
    };
    /**
     * @private
     */
    Toggle.prototype.pointerMove = function (ev) {
        if (this._startX) {
            var currentX = dom_1.pointerCoord(ev).x;
            void 0;
            if (this._checked) {
                if (currentX + 15 < this._startX) {
                    this.onChange(false);
                    this._startX = currentX;
                    this._activated = true;
                }
            }
            else if (currentX - 15 > this._startX) {
                this.onChange(true);
                this._startX = currentX;
                this._activated = (currentX < this._startX + 5);
            }
        }
    };
    /**
     * @private
     */
    Toggle.prototype.pointerUp = function (ev) {
        if (this._startX) {
            var endX = dom_1.pointerCoord(ev).x;
            if (this.checked) {
                if (this._startX + 4 > endX) {
                    this.onChange(false);
                }
            }
            else if (this._startX - 4 < endX) {
                this.onChange(true);
            }
            this._activated = false;
            this._startX = null;
        }
    };
    Object.defineProperty(Toggle.prototype, "checked", {
        /**
         * @input {boolean} whether the toggle it toggled or not
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
    Toggle.prototype._setChecked = function (isChecked) {
        if (isChecked !== this._checked) {
            this._checked = isChecked;
            if (this._init) {
                this.ionChange.emit(this);
            }
            this._item && this._item.setCssClass('item-toggle-checked', isChecked);
        }
    };
    /**
     * @private
     */
    Toggle.prototype.writeValue = function (val) {
        this._setChecked(util_1.isTrueProperty(val));
    };
    /**
     * @private
     */
    Toggle.prototype.registerOnChange = function (fn) {
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
    Toggle.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    Object.defineProperty(Toggle.prototype, "disabled", {
        /**
         * @input {boolean} whether the toggle is disabled or not
         */
        get: function () {
            return this._disabled;
        },
        set: function (val) {
            this._disabled = util_1.isTrueProperty(val);
            this._item && this._item.setCssClass('item-toggle-disabled', this._disabled);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    Toggle.prototype.onChange = function (isChecked) {
        // used when this input does not have an ngModel or formControlName
        void 0;
        this._setChecked(isChecked);
        this.onTouched();
    };
    /**
     * @private
     */
    Toggle.prototype.onTouched = function () { };
    /**
     * @private
     */
    Toggle.prototype.ngAfterContentInit = function () {
        this._init = true;
        this._events.pointerEvents({
            elementRef: this._elementRef,
            pointerDown: this.pointerDown.bind(this),
            pointerMove: this.pointerMove.bind(this),
            pointerUp: this.pointerUp.bind(this)
        });
    };
    /**
     * @private
     */
    Toggle.prototype.ngOnDestroy = function () {
        this._form.deregister(this);
        this._events.unlistenAll();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Toggle.prototype, "ionChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Toggle.prototype, "checked", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Toggle.prototype, "disabled", null);
    Toggle = __decorate([
        core_1.Component({
            selector: 'ion-toggle',
            template: "\n    <div class=\"toggle-icon\" [class.toggle-checked]=\"_checked\" [class.toggle-activated]=\"_activated\">\n      <div class=\"toggle-inner\"></div>\n    </div>\n    <button role=\"checkbox\"\n            type=\"button\"\n            category=\"item-cover\"\n            [id]=\"id\"\n            [attr.aria-checked]=\"_checked\"\n            [attr.aria-labelledby]=\"_labelId\"\n            [attr.aria-disabled]=\"_disabled\"\n            class=\"item-cover\">\n    </button>\n  ",
            host: {
                '[class.toggle-disabled]': '_disabled'
            },
            providers: [exports.TOGGLE_VALUE_ACCESSOR],
            encapsulation: core_1.ViewEncapsulation.None,
        }),
        __param(3, core_1.Optional()), 
        __metadata('design:paramtypes', [form_1.Form, core_1.ElementRef, core_1.Renderer, item_1.Item])
    ], Toggle);
    return Toggle;
}());
exports.Toggle = Toggle;
