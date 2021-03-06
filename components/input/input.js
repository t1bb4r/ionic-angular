"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var app_1 = require('../app/app');
var config_1 = require('../../config/config');
var content_1 = require('../content/content');
var form_1 = require('../../util/form');
var input_base_1 = require('./input-base');
var item_1 = require('../item/item');
var native_input_1 = require('./native-input');
var nav_controller_1 = require('../nav/nav-controller');
var platform_1 = require('../../platform/platform');
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
var TextInput = (function (_super) {
    __extends(TextInput, _super);
    function TextInput(config, form, item, app, platform, elementRef, scrollView, nav, ngControl) {
        _super.call(this, config, form, item, app, platform, elementRef, scrollView, nav, ngControl);
    }
    /**
     * @private
     */
    TextInput.prototype.inputBlurred = function (ev) {
        this.blur.emit(ev);
    };
    /**
     * @private
     */
    TextInput.prototype.inputFocused = function (ev) {
        this.focus.emit(ev);
    };
    /**
     * @private
     */
    TextInput.prototype.clearTextInput = function () {
        void 0;
        this._value = '';
        this.onChange(this._value);
        this.writeValue(this._value);
    };
    TextInput = __decorate([
        core_1.Component({
            selector: 'ion-input',
            template: "\n    <input [type]=\"type\" [(ngModel)]=\"_value\" (blur)=\"inputBlurred($event)\" (focus)=\"inputFocused($event)\" [placeholder]=\"placeholder\" class=\"text-input\">\n    <input [type]=\"type\" aria-hidden=\"true\" next-input *ngIf=\"_useAssist\">\n    <button clear [hidden]=\"!clearInput\" type=\"button\" class=\"text-input-clear-icon\" (click)=\"clearTextInput()\" (mousedown)=\"clearTextInput()\"></button>\n    <div (touchstart)=\"pointerStart($event)\" (touchend)=\"pointerEnd($event)\" (mousedown)=\"pointerStart($event)\" (mouseup)=\"pointerEnd($event)\" class=\"input-cover\" tappable *ngIf=\"_useAssist\"></div>\n  ",
            directives: [native_input_1.NativeInput, native_input_1.NextInput, common_1.NgIf, forms_1.NgModel],
            encapsulation: core_1.ViewEncapsulation.None,
        }),
        __param(2, core_1.Optional()),
        __param(6, core_1.Optional()),
        __param(7, core_1.Optional()),
        __param(8, core_1.Optional()), 
        __metadata('design:paramtypes', [config_1.Config, form_1.Form, item_1.Item, app_1.App, platform_1.Platform, core_1.ElementRef, content_1.Content, nav_controller_1.NavController, forms_1.NgControl])
    ], TextInput);
    return TextInput;
}(input_base_1.InputBase));
exports.TextInput = TextInput;
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
var TextArea = (function (_super) {
    __extends(TextArea, _super);
    function TextArea(config, form, item, app, platform, elementRef, scrollView, nav, ngControl) {
        _super.call(this, config, form, item, app, platform, elementRef, scrollView, nav, ngControl);
    }
    /**
     * @private
     */
    TextArea.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        if (this._item) {
            this._item.setCssClass('item-textarea', true);
        }
    };
    /**
     * @private
     */
    TextArea.prototype.inputBlurred = function (ev) {
        this.blur.emit(ev);
    };
    /**
     * @private
     */
    TextArea.prototype.inputFocused = function (ev) {
        this.focus.emit(ev);
    };
    TextArea = __decorate([
        core_1.Component({
            selector: 'ion-textarea',
            template: '<textarea [(ngModel)]="_value" (blur)="inputBlurred($event)" (focus)="inputFocused($event)" [placeholder]="placeholder" class="text-input"></textarea>' +
                '<input type="text" aria-hidden="true" next-input *ngIf="_useAssist">' +
                '<div (touchstart)="pointerStart($event)" (touchend)="pointerEnd($event)" (mousedown)="pointerStart($event)" (mouseup)="pointerEnd($event)" class="input-cover" tappable *ngIf="_useAssist"></div>',
            directives: [native_input_1.NativeInput, native_input_1.NextInput, common_1.NgIf],
            encapsulation: core_1.ViewEncapsulation.None,
        }),
        __param(2, core_1.Optional()),
        __param(6, core_1.Optional()),
        __param(7, core_1.Optional()),
        __param(8, core_1.Optional()), 
        __metadata('design:paramtypes', [config_1.Config, form_1.Form, item_1.Item, app_1.App, platform_1.Platform, core_1.ElementRef, content_1.Content, nav_controller_1.NavController, forms_1.NgControl])
    ], TextArea);
    return TextArea;
}(input_base_1.InputBase));
exports.TextArea = TextArea;
