var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
import { Component, Optional, ElementRef, ViewEncapsulation } from '@angular/core';
import { NgIf } from '@angular/common';
import { NgControl, NgModel } from '@angular/forms';
import { App } from '../app/app';
import { Config } from '../../config/config';
import { Content } from '../content/content';
import { Form } from '../../util/form';
import { InputBase } from './input-base';
import { Item } from '../item/item';
import { NativeInput, NextInput } from './native-input';
import { NavController } from '../nav/nav-controller';
import { Platform } from '../../platform/platform';
/**
 * @name Input
 * @description
 *
 * `ion-input` is meant for text type inputs only, such as `text`,
 * `password`, `email`, `number`, `search`, `tel`, and `url`. Ionic
 * still uses an actual `<input type="text">` HTML element within the
 * component, however, with Ionic wrapping the native HTML input
 * element it's able to better handle the user experience and
 * interactivity.
 *
 * Similarily, `<ion-textarea>` should be used in place of `<textarea>`.
 *
 * An `ion-input` is **not** used for non-text type inputs, such as a
 * `checkbox`, `radio`, `toggle`, `range`, `select`, etc.
 *
 * @property [type] - The HTML input type (text, password, email, number, search, tel, or url)
 * @property [clearInput] - A clear icon will appear in the input when there is a value. Clicking it clears the input.
 *
 * @usage
 * ```html
 * <ion-list>
 *   <ion-item>
 *     <ion-label primary>Inline Label</ion-label>
 *     <ion-input placeholder="Text Input"></ion-input>
 *   </ion-item>
 *
 *   <ion-item>
 *     <ion-label primary fixed>Fixed Label</ion-label>
 *     <ion-input type="tel" placeholder="Tel Input"></ion-input>
 *   </ion-item>
 *
 *   <ion-item>
 *     <ion-input type="number" placeholder="Number Input with no label"></ion-input>
 *   </ion-item>
 *
 *   <ion-item>
 *     <ion-label primary stacked>Stacked Label</ion-label>
 *     <ion-input type="email" placeholder="Email Input"></ion-input>
 *   </ion-item>
 *
 *   <ion-item>
 *     <ion-label primary stacked>Stacked Label</ion-label>
 *     <ion-input type="password" placeholder="Password Input"></ion-input>
 *   </ion-item>
 *
 *   <ion-item>
 *     <ion-label primary floating>Floating Label</ion-label>
 *     <ion-input></ion-input>
 *   </ion-item>
 *
 *   <ion-item>
 *     <ion-input placeholder="Clear Input" clearInput></ion-input>
 *   </ion-item>
 * </ion-list>
 * ```
 *
 * @demo /docs/v2/demos/input/
 */
export var TextInput = function (_InputBase) {
    _inherits(TextInput, _InputBase);

    function TextInput(config, form, item, app, platform, elementRef, scrollView, nav, ngControl) {
        _classCallCheck(this, TextInput);

        return _possibleConstructorReturn(this, (TextInput.__proto__ || Object.getPrototypeOf(TextInput)).call(this, config, form, item, app, platform, elementRef, scrollView, nav, ngControl));
    }
    /**
     * @private
     */


    _createClass(TextInput, [{
        key: "inputBlurred",
        value: function inputBlurred(ev) {
            this.blur.emit(ev);
        }
        /**
         * @private
         */

    }, {
        key: "inputFocused",
        value: function inputFocused(ev) {
            this.focus.emit(ev);
        }
        /**
         * @private
         */

    }, {
        key: "clearTextInput",
        value: function clearTextInput() {
            console.debug('Should clear input');
            this._value = '';
            this.onChange(this._value);
            this.writeValue(this._value);
        }
    }]);

    return TextInput;
}(InputBase);
TextInput = __decorate([Component({
    selector: 'ion-input',
    template: "\n    <input [type]=\"type\" [(ngModel)]=\"_value\" (blur)=\"inputBlurred($event)\" (focus)=\"inputFocused($event)\" [placeholder]=\"placeholder\" class=\"text-input\">\n    <input [type]=\"type\" aria-hidden=\"true\" next-input *ngIf=\"_useAssist\">\n    <button clear [hidden]=\"!clearInput\" type=\"button\" class=\"text-input-clear-icon\" (click)=\"clearTextInput()\" (mousedown)=\"clearTextInput()\"></button>\n    <div (touchstart)=\"pointerStart($event)\" (touchend)=\"pointerEnd($event)\" (mousedown)=\"pointerStart($event)\" (mouseup)=\"pointerEnd($event)\" class=\"input-cover\" tappable *ngIf=\"_useAssist\"></div>\n  ",
    directives: [NativeInput, NextInput, NgIf, NgModel],
    encapsulation: ViewEncapsulation.None
}), __param(2, Optional()), __param(6, Optional()), __param(7, Optional()), __param(8, Optional()), __metadata('design:paramtypes', [typeof (_a = typeof Config !== 'undefined' && Config) === 'function' && _a || Object, typeof (_b = typeof Form !== 'undefined' && Form) === 'function' && _b || Object, typeof (_c = typeof Item !== 'undefined' && Item) === 'function' && _c || Object, typeof (_d = typeof App !== 'undefined' && App) === 'function' && _d || Object, typeof (_e = typeof Platform !== 'undefined' && Platform) === 'function' && _e || Object, typeof (_f = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _f || Object, typeof (_g = typeof Content !== 'undefined' && Content) === 'function' && _g || Object, typeof (_h = typeof NavController !== 'undefined' && NavController) === 'function' && _h || Object, typeof (_j = typeof NgControl !== 'undefined' && NgControl) === 'function' && _j || Object])], TextInput);
/**
 * @name TextArea
 * @description
 *
 * `ion-textarea` is is used for multi-line text inputs. Ionic still
 * uses an actual `<textarea>` HTML element within the component;
 * however, with Ionic wrapping the native HTML text area element, Ionic
 * is able to better handle the user experience and interactivity.
 *
 * Not that `<ion-textarea>` must load its value from the `value` or
 * `[(ngModel)]` attribute. Unlike the native `<textarea>` element,
 * `<ion-textarea>` does not support loading its value from the
 * textarea's inner content.
 *
 * When requiring only a single-line text input, we recommend using
 * `<ion-input>` instead.
 *
 * @usage
 * ```html
 *  <ion-item>
 *    <ion-label>Comments</ion-label>
 *    <ion-textarea></ion-textarea>
 *  </ion-item>
 *
 *  <ion-item>
 *    <ion-label stacked>Message</ion-label>
 *    <ion-textarea [(ngModel)]="msg"></ion-textarea>
 *  </ion-item>
 *
 *  <ion-item>
 *    <ion-label floating>Description</ion-label>
 *    <ion-textarea></ion-textarea>
 *  </ion-item>
 *
 * <ion-item>
 *    <ion-label>Long Description</ion-label>
 *    <ion-textarea rows="6" placeholder="enter long description here..."></ion-textarea>
 *  </ion-item>
 * ```
 *
 * @demo /docs/v2/demos/textarea/
 */
export var TextArea = function (_InputBase2) {
    _inherits(TextArea, _InputBase2);

    function TextArea(config, form, item, app, platform, elementRef, scrollView, nav, ngControl) {
        _classCallCheck(this, TextArea);

        return _possibleConstructorReturn(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).call(this, config, form, item, app, platform, elementRef, scrollView, nav, ngControl));
    }
    /**
     * @private
     */


    _createClass(TextArea, [{
        key: "ngOnInit",
        value: function ngOnInit() {
            _get(TextArea.prototype.__proto__ || Object.getPrototypeOf(TextArea.prototype), "ngOnInit", this).call(this);
            if (this._item) {
                this._item.setCssClass('item-textarea', true);
            }
        }
        /**
         * @private
         */

    }, {
        key: "inputBlurred",
        value: function inputBlurred(ev) {
            this.blur.emit(ev);
        }
        /**
         * @private
         */

    }, {
        key: "inputFocused",
        value: function inputFocused(ev) {
            this.focus.emit(ev);
        }
    }]);

    return TextArea;
}(InputBase);
TextArea = __decorate([Component({
    selector: 'ion-textarea',
    template: '<textarea [(ngModel)]="_value" (blur)="inputBlurred($event)" (focus)="inputFocused($event)" [placeholder]="placeholder" class="text-input"></textarea>' + '<input type="text" aria-hidden="true" next-input *ngIf="_useAssist">' + '<div (touchstart)="pointerStart($event)" (touchend)="pointerEnd($event)" (mousedown)="pointerStart($event)" (mouseup)="pointerEnd($event)" class="input-cover" tappable *ngIf="_useAssist"></div>',
    directives: [NativeInput, NextInput, NgIf],
    encapsulation: ViewEncapsulation.None
}), __param(2, Optional()), __param(6, Optional()), __param(7, Optional()), __param(8, Optional()), __metadata('design:paramtypes', [typeof (_k = typeof Config !== 'undefined' && Config) === 'function' && _k || Object, typeof (_l = typeof Form !== 'undefined' && Form) === 'function' && _l || Object, typeof (_m = typeof Item !== 'undefined' && Item) === 'function' && _m || Object, typeof (_o = typeof App !== 'undefined' && App) === 'function' && _o || Object, typeof (_p = typeof Platform !== 'undefined' && Platform) === 'function' && _p || Object, typeof (_q = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _q || Object, typeof (_r = typeof Content !== 'undefined' && Content) === 'function' && _r || Object, typeof (_s = typeof NavController !== 'undefined' && NavController) === 'function' && _s || Object, typeof (_t = typeof NgControl !== 'undefined' && NgControl) === 'function' && _t || Object])], TextArea);
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;