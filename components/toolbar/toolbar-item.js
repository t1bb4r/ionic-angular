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
var button_1 = require('../button/button');
var navbar_1 = require('../navbar/navbar');
var toolbar_1 = require('./toolbar');
/**
 * @private
 */
var ToolbarItem = (function () {
    function ToolbarItem(elementRef, toolbar, navbar) {
        toolbar && toolbar.addItemRef(elementRef);
        navbar && navbar.addItemRef(elementRef);
        this.inToolbar = !!(toolbar || navbar);
    }
    Object.defineProperty(ToolbarItem.prototype, "_buttons", {
        set: function (buttons) {
            if (this.inToolbar) {
                buttons.forEach(function (button) {
                    button.setRole('bar-button');
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ContentChildren(button_1.Button), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], ToolbarItem.prototype, "_buttons", null);
    ToolbarItem = __decorate([
        core_1.Directive({
            selector: 'ion-buttons,[menuToggle]'
        }),
        __param(1, core_1.Optional()),
        __param(2, core_1.Optional()),
        __param(2, core_1.Inject(core_1.forwardRef(function () { return navbar_1.Navbar; }))), 
        __metadata('design:paramtypes', [core_1.ElementRef, toolbar_1.Toolbar, navbar_1.Navbar])
    ], ToolbarItem);
    return ToolbarItem;
}());
exports.ToolbarItem = ToolbarItem;
