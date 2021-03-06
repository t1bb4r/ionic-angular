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
var nav_controller_1 = require('./nav-controller');
var util_1 = require('../../util/util');
/**
 * @name NavPush
 * @description
 * Directive to declaratively push a new page to the current nav
 * stack.
 *
 * @usage
 * ```html
 * <button [navPush]="pushPage"></button>
 * ```
 *
 * To specify parameters you can use array syntax or the `navParams`
 * property:
 *
 * ```html
 * <button [navPush]="pushPage" [navParams]="params">Go</button>
 * ```
 *
 * Where `pushPage` and `params` are specified in your component,
 * and `pushPage` contains a reference to a
 * [@Page component](../../../config/Page/):
 *
 * ```ts
 * import { LoginPage } from './login';
 *
 * @Component({
 *   template: `<button [navPush]="pushPage" [navParams]="params">Go</button>`
 * })
 * class MyPage {
 *   constructor(){
 *     this.pushPage = LoginPage;
 *     this.params = { id: 42 };
 *   }
 * }
 * ```
 *
 * @demo /docs/v2/demos/navigation/
 * @see {@link /docs/v2/components#navigation Navigation Component Docs}
 * @see {@link ../NavPop NavPop API Docs}
 *
 */
var NavPush = (function () {
    function NavPush(_nav) {
        this._nav = _nav;
        if (!_nav) {
            void 0;
        }
    }
    NavPush.prototype.onClick = function () {
        // If no target, or if target is _self, prevent default browser behavior
        if (this._nav) {
            this._nav.push(this.navPush, this.navParams, util_1.noop);
            return false;
        }
        return true;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NavPush.prototype, "navPush", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NavPush.prototype, "navParams", void 0);
    __decorate([
        core_1.HostListener('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', Boolean)
    ], NavPush.prototype, "onClick", null);
    NavPush = __decorate([
        core_1.Directive({
            selector: '[navPush]'
        }),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [nav_controller_1.NavController])
    ], NavPush);
    return NavPush;
}());
exports.NavPush = NavPush;
