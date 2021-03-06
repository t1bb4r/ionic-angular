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
import { Component, ElementRef, EventEmitter, forwardRef, Input, Optional, Output, Provider, Renderer, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Form } from '../../util/form';
import { isTrueProperty } from '../../util/util';
import { Item } from '../item/item';
import { pointerCoord } from '../../util/dom';
import { UIEventManager } from '../../util/ui-event-manager';
export var TOGGLE_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, { useExisting: forwardRef(function () {
        return Toggle;
    }), multi: true });
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
export var Toggle = function () {
    function Toggle(_form, _elementRef, _renderer, _item) {
        _classCallCheck(this, Toggle);

        this._form = _form;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._item = _item;
        this._checked = false;
        this._disabled = false;
        this._activated = false;
        this._msPrv = 0;
        this._events = new UIEventManager();
        /**
         * @output {Toggle} expression to evaluate when the toggle value changes
         */
        this.ionChange = new EventEmitter();
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


    _createClass(Toggle, [{
        key: "pointerDown",
        value: function pointerDown(ev) {
            this._startX = pointerCoord(ev).x;
            this._activated = true;
            return true;
        }
        /**
         * @private
         */

    }, {
        key: "pointerMove",
        value: function pointerMove(ev) {
            if (this._startX) {
                var currentX = pointerCoord(ev).x;
                console.debug('toggle, pointerMove', ev.type, currentX);
                if (this._checked) {
                    if (currentX + 15 < this._startX) {
                        this.onChange(false);
                        this._startX = currentX;
                        this._activated = true;
                    }
                } else if (currentX - 15 > this._startX) {
                    this.onChange(true);
                    this._startX = currentX;
                    this._activated = currentX < this._startX + 5;
                }
            }
        }
        /**
         * @private
         */

    }, {
        key: "pointerUp",
        value: function pointerUp(ev) {
            if (this._startX) {
                var endX = pointerCoord(ev).x;
                if (this.checked) {
                    if (this._startX + 4 > endX) {
                        this.onChange(false);
                    }
                } else if (this._startX - 4 < endX) {
                    this.onChange(true);
                }
                this._activated = false;
                this._startX = null;
            }
        }
        /**
         * @input {boolean} whether the toggle it toggled or not
         */

    }, {
        key: "_setChecked",
        value: function _setChecked(isChecked) {
            if (isChecked !== this._checked) {
                this._checked = isChecked;
                if (this._init) {
                    this.ionChange.emit(this);
                }
                this._item && this._item.setCssClass('item-toggle-checked', isChecked);
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
                console.debug('toggle, onChange', isChecked);
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
         * @input {boolean} whether the toggle is disabled or not
         */

    }, {
        key: "onChange",

        /**
         * @private
         */
        value: function onChange(isChecked) {
            // used when this input does not have an ngModel or formControlName
            console.debug('toggle, onChange (no ngModel)', isChecked);
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
            this._events.pointerEvents({
                elementRef: this._elementRef,
                pointerDown: this.pointerDown.bind(this),
                pointerMove: this.pointerMove.bind(this),
                pointerUp: this.pointerUp.bind(this)
            });
        }
        /**
         * @private
         */

    }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
            this._form.deregister(this);
            this._events.unlistenAll();
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
            this._item && this._item.setCssClass('item-toggle-disabled', this._disabled);
        }
    }]);

    return Toggle;
}();
__decorate([Output(), __metadata('design:type', typeof (_a = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _a || Object)], Toggle.prototype, "ionChange", void 0);
__decorate([Input(), __metadata('design:type', Boolean)], Toggle.prototype, "checked", null);
__decorate([Input(), __metadata('design:type', Boolean)], Toggle.prototype, "disabled", null);
Toggle = __decorate([Component({
    selector: 'ion-toggle',
    template: "\n    <div class=\"toggle-icon\" [class.toggle-checked]=\"_checked\" [class.toggle-activated]=\"_activated\">\n      <div class=\"toggle-inner\"></div>\n    </div>\n    <button role=\"checkbox\"\n            type=\"button\"\n            category=\"item-cover\"\n            [id]=\"id\"\n            [attr.aria-checked]=\"_checked\"\n            [attr.aria-labelledby]=\"_labelId\"\n            [attr.aria-disabled]=\"_disabled\"\n            class=\"item-cover\">\n    </button>\n  ",
    host: {
        '[class.toggle-disabled]': '_disabled'
    },
    providers: [TOGGLE_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None
}), __param(3, Optional()), __metadata('design:paramtypes', [typeof (_b = typeof Form !== 'undefined' && Form) === 'function' && _b || Object, typeof (_c = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _c || Object, typeof (_d = typeof Renderer !== 'undefined' && Renderer) === 'function' && _d || Object, typeof (_e = typeof Item !== 'undefined' && Item) === 'function' && _e || Object])], Toggle);
var _a, _b, _c, _d, _e;