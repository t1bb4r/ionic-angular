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
import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { isPresent, isTrueProperty } from '../../util/util';
/**
 * @name Option
 * @description
 * `ion-option` is a child component of `ion-select`. Similar to the native option element, `ion-option` can take a value and a selected property.
 *
 * @demo /docs/v2/demos/select/
 */
export var Option = function () {
    function Option(_elementRef) {
        _classCallCheck(this, Option);

        this._elementRef = _elementRef;
        this._selected = false;
        this._disabled = false;
        /**
         * @input {any} Event to evaluate when option is selected
         */
        this.ionSelect = new EventEmitter();
    }
    /**
     * @input {boolean} Whether or not the option is already selected
     */


    _createClass(Option, [{
        key: "selected",
        get: function get() {
            return this._selected;
        },
        set: function set(val) {
            this._selected = isTrueProperty(val);
        }
        /**
         * @input {any} The value of the option
         */

    }, {
        key: "value",
        get: function get() {
            if (isPresent(this._value)) {
                return this._value;
            }
            return this.text;
        },
        set: function set(val) {
            this._value = val;
        }
        /**
         * @input {boolean} Whether or not the option is disabled
         */

    }, {
        key: "disabled",
        get: function get() {
            return this._disabled;
        },
        set: function set(val) {
            this._disabled = isTrueProperty(val);
        }
        /**
         * @private
         */

    }, {
        key: "text",
        get: function get() {
            return this._elementRef.nativeElement.textContent;
        }
    }]);

    return Option;
}();
__decorate([Output(), __metadata('design:type', typeof (_a = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _a || Object)], Option.prototype, "ionSelect", void 0);
__decorate([Input(), __metadata('design:type', Object)], Option.prototype, "selected", null);
__decorate([Input(), __metadata('design:type', Object)], Option.prototype, "value", null);
__decorate([Input(), __metadata('design:type', Object)], Option.prototype, "disabled", null);
Option = __decorate([Directive({
    selector: 'ion-option'
}), __metadata('design:paramtypes', [typeof (_b = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _b || Object])], Option);
var _a, _b;