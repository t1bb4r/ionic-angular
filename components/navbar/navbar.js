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
var app_1 = require('../app/app');
var config_1 = require('../../config/config');
var icon_1 = require('../icon/icon');
var ion_1 = require('../ion');
var util_1 = require('../../util/util');
var nav_controller_1 = require('../nav/nav-controller');
var toolbar_1 = require('../toolbar/toolbar');
var view_controller_1 = require('../nav/view-controller');
var BackButton = (function (_super) {
    __extends(BackButton, _super);
    function BackButton(_nav, elementRef, navbar) {
        _super.call(this, elementRef);
        this._nav = _nav;
        navbar && navbar.setBackButtonRef(elementRef);
    }
    BackButton.prototype.goBack = function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this._nav && this._nav.pop();
    };
    BackButton = __decorate([
        core_1.Directive({
            selector: '.back-button',
            host: {
                '(click)': 'goBack($event)'
            }
        }),
        __param(0, core_1.Optional()),
        __param(2, core_1.Optional()),
        __param(2, core_1.Inject(core_1.forwardRef(function () { return Navbar; }))), 
        __metadata('design:paramtypes', [nav_controller_1.NavController, core_1.ElementRef, Navbar])
    ], BackButton);
    return BackButton;
}(ion_1.Ion));
var BackButtonText = (function () {
    function BackButtonText(elementRef, navbar) {
        navbar.setBackButtonTextRef(elementRef);
    }
    BackButtonText = __decorate([
        core_1.Directive({
            selector: '.back-button-text'
        }),
        __param(1, core_1.Inject(core_1.forwardRef(function () { return Navbar; }))), 
        __metadata('design:paramtypes', [core_1.ElementRef, Navbar])
    ], BackButtonText);
    return BackButtonText;
}());
var ToolbarBackground = (function () {
    function ToolbarBackground(elementRef, navbar) {
        navbar.setBackgroundRef(elementRef);
    }
    ToolbarBackground = __decorate([
        core_1.Directive({
            selector: '.toolbar-background'
        }),
        __param(1, core_1.Inject(core_1.forwardRef(function () { return Navbar; }))), 
        __metadata('design:paramtypes', [core_1.ElementRef, Navbar])
    ], ToolbarBackground);
    return ToolbarBackground;
}());
/**
 * @name Navbar
 * @description
 * Navbar acts as the navigational toolbar, which also comes with a back
 * button. A navbar can contain a `ion-title`, any number of buttons,
 * a segment, or a searchbar. Navbars must be placed within an
 * `<ion-header>` in order for them to be placed above the content.
 * It's important to note that navbar's are part of the dynamica navigation
 * stack. If you need a static toolbar, use ion-toolbar.
 *
 * @usage
 * ```html
 * <ion-header>
 *
 *   <ion-navbar>
 *     <button menuToggle>
 *       <ion-icon name="menu"></ion-icon>
 *     </button>
 *
 *     <ion-title>
 *       Page Title
 *     </ion-title>
 *
 *     <ion-buttons end>
 *       <button (click)="openModal()">
 *         <ion-icon name="options"></ion-icon>
 *       </button>
 *     </ion-buttons>
 *   </ion-navbar>
 *
 * </ion-header>
 * ```
 *
 * @demo /docs/v2/demos/navbar/
 * @see {@link ../../toolbar/Toolbar/ Toolbar API Docs}
 */
var Navbar = (function (_super) {
    __extends(Navbar, _super);
    function Navbar(_app, viewCtrl, elementRef, config) {
        _super.call(this, elementRef);
        this._app = _app;
        this._hidden = false;
        this._hideBb = false;
        viewCtrl && viewCtrl.setNavbar(this);
        this._bbIcon = config.get('backButtonIcon');
        this._bbText = config.get('backButtonText');
        this._sbPadding = config.getBoolean('statusbarPadding', false);
    }
    Object.defineProperty(Navbar.prototype, "hideBackButton", {
        /**
         * @input {boolean} whether the back button should be shown or not
         */
        get: function () {
            return this._hideBb;
        },
        set: function (val) {
            this._hideBb = util_1.isTrueProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    Navbar.prototype.setBackButtonText = function (text) {
        this._bbText = text;
    };
    /**
     * @private
     */
    Navbar.prototype.getBackButtonRef = function () {
        return this._bbRef;
    };
    /**
     * @private
     */
    Navbar.prototype.setBackButtonRef = function (backButtonElementRef) {
        this._bbRef = backButtonElementRef;
    };
    /**
     * @private
     */
    Navbar.prototype.getBackButtonTextRef = function () {
        return this._bbtRef;
    };
    /**
     * @private
     */
    Navbar.prototype.setBackButtonTextRef = function (backButtonTextElementRef) {
        this._bbtRef = backButtonTextElementRef;
    };
    /**
     * @private
     */
    Navbar.prototype.setBackgroundRef = function (backgrouneElementRef) {
        this._bgRef = backgrouneElementRef;
    };
    /**
     * @private
     */
    Navbar.prototype.getBackgroundRef = function () {
        return this._bgRef;
    };
    /**
     * @private
     */
    Navbar.prototype.didEnter = function () {
        try {
            this._app.setTitle(this.getTitleText());
        }
        catch (e) {
            void 0;
        }
    };
    /**
     * @private
     */
    Navbar.prototype.setHidden = function (isHidden) {
        // used to display none/block the navbar
        this._hidden = isHidden;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Navbar.prototype, "hideBackButton", null);
    Navbar = __decorate([
        core_1.Component({
            selector: 'ion-navbar',
            template: "\n    <div class=\"toolbar-background\"></div>\n    <button category=\"bar-button\" class=\"back-button\" [hidden]=\"_hideBb\">\n      <span class=\"button-inner\">\n        <ion-icon class=\"back-button-icon\" [name]=\"_bbIcon\"></ion-icon>\n        <span class=\"back-button-text\">\n          <span class=\"back-default\">{{_bbText}}</span>\n        </span>\n      </span>\n    </button>\n    <ng-content select=\"[menuToggle],ion-buttons[left]\"></ng-content>\n    <ng-content select=\"ion-buttons[start]\"></ng-content>\n    <ng-content select=\"ion-buttons[end],ion-buttons[right]\"></ng-content>\n    <div class=\"toolbar-content\">\n      <ng-content></ng-content>\n    </div>\n  ",
            directives: [BackButton, BackButtonText, icon_1.Icon, ToolbarBackground],
            host: {
                '[hidden]': '_hidden',
                'class': 'toolbar',
                '[class.statusbar-padding]': '_sbPadding'
            }
        }),
        __param(1, core_1.Optional()), 
        __metadata('design:paramtypes', [app_1.App, view_controller_1.ViewController, core_1.ElementRef, config_1.Config])
    ], Navbar);
    return Navbar;
}(toolbar_1.ToolbarBase));
exports.Navbar = Navbar;
/**
 * @private
*/
var NavbarTemplate = (function () {
    function NavbarTemplate() {
        // deprecated warning: added 2016-06-14, beta.10
        void 0;
    }
    NavbarTemplate = __decorate([
        core_1.Directive({
            selector: 'template[navbar]'
        }), 
        __metadata('design:paramtypes', [])
    ], NavbarTemplate);
    return NavbarTemplate;
}());
exports.NavbarTemplate = NavbarTemplate;
