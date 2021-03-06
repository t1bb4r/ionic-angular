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
import { ContentChild, Directive, ElementRef, EventEmitter, forwardRef, Output, Provider, Renderer } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ListHeader } from '../list/list';
import { isCheckedProperty } from '../../util/util';
export var RADIO_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, { useExisting: forwardRef(function () {
        return RadioGroup;
    }), multi: true });
/**
 * @name RadioGroup
 * @description
 * A radio group is a group of [radio buttons](../RadioButton). It allows
 * a user to select at most one radio button from a set. Checking one radio
 * button that belongs to a radio group unchecks any previous checked
 * radio button within the same group.
 *
 * See the [Angular Forms Docs](https://angular.io/docs/ts/latest/guide/forms.html)
 * for more information on forms and inputs.
 *
 * @usage
 * ```html
 * <ion-list radio-group [(ngModel)]="autoManufacturers">
 *
 *   <ion-list-header>
 *     Auto Manufacturers
 *   </ion-list-header>
 *
 *   <ion-item>
 *     <ion-label>Cord</ion-label>
 *     <ion-radio value="cord"></ion-radio>
 *   </ion-item>
 *
 *   <ion-item>
 *     <ion-label>Duesenberg</ion-label>
 *     <ion-radio value="duesenberg"></ion-radio>
 *   </ion-item>
 *
 *   <ion-item>
 *     <ion-label>Hudson</ion-label>
 *     <ion-radio value="hudson"></ion-radio>
 *   </ion-item>
 *
 *   <ion-item>
 *     <ion-label>Packard</ion-label>
 *     <ion-radio value="packard"></ion-radio>
 *   </ion-item>
 *
 *   <ion-item>
 *     <ion-label>Studebaker</ion-label>
 *     <ion-radio value="studebaker"></ion-radio>
 *   </ion-item>
 *
 * </ion-list>
 * ```
 *
 * @demo /docs/v2/demos/radio/
 * @see {@link /docs/v2/components#radio Radio Component Docs}
 * @see {@link ../RadioButton RadioButton API Docs}
*/
export var RadioGroup = function () {
    function RadioGroup(_renderer, _elementRef) {
        _classCallCheck(this, RadioGroup);

        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._btns = [];
        this._ids = -1;
        this._init = false;
        /**
         * @output {any} expression to be evaluated when selection has been changed
         */
        this.ionChange = new EventEmitter();
        this.id = ++radioGroupIds;
    }
    /**
     * @private
     */


    _createClass(RadioGroup, [{
        key: "ngAfterContentInit",
        value: function ngAfterContentInit() {
            var activeButton = this._btns.find(function (b) {
                return b.checked;
            });
            if (activeButton) {
                this._setActive(activeButton);
            }
        }
        /**
         * @private
         */

    }, {
        key: "writeValue",
        value: function writeValue(val) {
            console.debug('radio group, writeValue', val);
            this.value = val;
            if (this._init) {
                this._update();
                this.onTouched();
                this.ionChange.emit(val);
            }
            this._init = true;
        }
        /**
         * @private
         */

    }, {
        key: "registerOnChange",
        value: function registerOnChange(fn) {
            var _this = this;

            this._fn = fn;
            this.onChange = function (val) {
                // onChange used when there's an formControlName
                console.debug('radio group, onChange', val);
                fn(val);
                _this.value = val;
                _this._update();
                _this.onTouched();
                _this.ionChange.emit(val);
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
         * @private
         */

    }, {
        key: "_update",
        value: function _update() {
            var _this2 = this;

            // loop through each of the radiobuttons
            var hasChecked = false;
            this._btns.forEach(function (radioButton) {
                // check this radiobutton if its value is
                // the same as the radiogroups value
                radioButton.checked = isCheckedProperty(_this2.value, radioButton.value) && !hasChecked;
                if (radioButton.checked) {
                    // if this button is checked, then set it as
                    // the radiogroup's active descendant
                    _this2._setActive(radioButton);
                    hasChecked = true;
                }
            });
        }
    }, {
        key: "_setActive",
        value: function _setActive(radioButton) {
            this._renderer.setElementAttribute(this._elementRef.nativeElement, 'aria-activedescendant', radioButton.id);
        }
        /**
         * @private
         */

    }, {
        key: "add",
        value: function add(button) {
            var _this3 = this;

            this._btns.push(button);
            // listen for radiobutton select events
            button.ionSelect.subscribe(function (val) {
                // this radiobutton has been selected
                _this3.onChange(val);
            });
            return this.id + '-' + ++this._ids;
        }
        /**
         * @private
         */

    }, {
        key: "remove",
        value: function remove(button) {
            var index = this._btns.indexOf(button);
            if (index > -1) {
                if (button.value === this.value) {
                    this.value = null;
                }
                this._btns.splice(index, 1);
            }
        }
        /**
         * @private
         */

    }, {
        key: "onChange",

        /**
         * @private
         */
        value: function onChange(val) {
            // onChange used when there is not an formControlName
            console.debug('radio group, onChange w/out formControlName', val);
            this.value = val;
            this._update();
            this.onTouched();
            this.ionChange.emit(val);
        }
        /**
         * @private
         */

    }, {
        key: "onTouched",
        value: function onTouched() {}
    }, {
        key: "_header",
        set: function set(header) {
            if (header) {
                if (!header.id) {
                    header.id = 'rg-hdr-' + this.id;
                }
                this._renderer.setElementAttribute(this._elementRef.nativeElement, 'aria-describedby', header.id);
            }
        }
    }]);

    return RadioGroup;
}();
__decorate([Output(), __metadata('design:type', typeof (_a = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _a || Object)], RadioGroup.prototype, "ionChange", void 0);
__decorate([ContentChild(ListHeader), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], RadioGroup.prototype, "_header", null);
RadioGroup = __decorate([Directive({
    selector: '[radio-group]',
    host: {
        '[attr.aria-activedescendant]': 'activeId',
        'role': 'radiogroup'
    },
    providers: [RADIO_VALUE_ACCESSOR]
}), __metadata('design:paramtypes', [typeof (_b = typeof Renderer !== 'undefined' && Renderer) === 'function' && _b || Object, typeof (_c = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _c || Object])], RadioGroup);
var radioGroupIds = -1;
var _a, _b, _c;