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
import { Attribute, Directive, ElementRef, Renderer, Input } from '@angular/core';
/**
 * @name Label
 * @description
 * Labels are placed inside of an `ion-item` element and can be used
 * to describe an `ion-input`, `ion-toggle`, `ion-checkbox`, and more.
 *
 * @property [fixed] - A persistent label that sits next the input.
 * @property [floating] - A label that will float above the input if the input is empty or loses focus.
 * @property [stacked] - A stacked label will always appear on top of the input.

 *
 * @usage
 * ```html
 *  <ion-item>
 *    <ion-label>Username</ion-label>
 *    <ion-input></ion-input>
 *  </ion-item>
 *
 *  <ion-item>
 *    <ion-label fixed>Website</ion-label>
 *    <ion-input type="url"></ion-input>
 *  </ion-item>
 *
 *  <ion-item>
 *    <ion-label floating>Email</ion-label>
 *    <ion-input type="email"></ion-input>
 *  </ion-item>
 *
 *  <ion-item>
 *    <ion-label stacked>Phone</ion-label>
 *    <ion-input type="tel"></ion-input>
 *  </ion-item>
 *
 *  <ion-item>
 *    <ion-label>Toggle</ion-label>
 *    <ion-toggle></ion-toggle>
 *  </ion-item>
 *
 *  <ion-item>
 *    <ion-label>Checkbox</ion-label>
 *    <ion-checkbox></ion-checkbox>
 *  </ion-item>
 * ```
 *
 * @demo /docs/v2/demos/label/
 * @see {@link ../../../../components#inputs Input Component Docs}
 * @see {@link ../../input/Input Input API Docs}
 *
 */
export var Label = function () {
    function Label(_elementRef, _renderer, isFloating, isStacked, isFixed, isInset) {
        _classCallCheck(this, Label);

        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.type = isFloating === '' ? 'floating' : isStacked === '' ? 'stacked' : isFixed === '' ? 'fixed' : isInset === '' ? 'inset' : null;
    }
    /**
     * @private
     */


    _createClass(Label, [{
        key: "addClass",

        /**
         * @private
         * @param {string} add class name
         */
        value: function addClass(className) {
            this._renderer.setElementClass(this._elementRef.nativeElement, className, true);
        }
    }, {
        key: "id",
        get: function get() {
            return this._id;
        },
        set: function set(val) {
            this._id = val;
            if (val) {
                this._renderer.setElementAttribute(this._elementRef.nativeElement, 'id', val);
            }
        }
        /**
         * @private
         */

    }, {
        key: "text",
        get: function get() {
            return this._elementRef.nativeElement.textContent || '';
        }
    }]);

    return Label;
}();
__decorate([Input(), __metadata('design:type', String)], Label.prototype, "id", null);
Label = __decorate([Directive({
    selector: 'ion-label'
}), __param(2, Attribute('floating')), __param(3, Attribute('stacked')), __param(4, Attribute('fixed')), __param(5, Attribute('inset')), __metadata('design:paramtypes', [typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a || Object, typeof (_b = typeof Renderer !== 'undefined' && Renderer) === 'function' && _b || Object, String, String, String, String])], Label);
var _a, _b;