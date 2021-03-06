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
import { Component, Directive, ElementRef, forwardRef, Inject, Input, Optional } from '@angular/core';
import { App } from '../app/app';
import { Config } from '../../config/config';
import { Icon } from '../icon/icon';
import { Ion } from '../ion';
import { isTrueProperty } from '../../util/util';
import { NavController } from '../nav/nav-controller';
import { ToolbarBase } from '../toolbar/toolbar';
import { ViewController } from '../nav/view-controller';
var BackButton = function (_Ion) {
    _inherits(BackButton, _Ion);

    function BackButton(_nav, elementRef, navbar) {
        _classCallCheck(this, BackButton);

        var _this = _possibleConstructorReturn(this, (BackButton.__proto__ || Object.getPrototypeOf(BackButton)).call(this, elementRef));

        _this._nav = _nav;
        navbar && navbar.setBackButtonRef(elementRef);
        return _this;
    }

    _createClass(BackButton, [{
        key: "goBack",
        value: function goBack(ev) {
            ev.stopPropagation();
            ev.preventDefault();
            this._nav && this._nav.pop();
        }
    }]);

    return BackButton;
}(Ion);
BackButton = __decorate([Directive({
    selector: '.back-button',
    host: {
        '(click)': 'goBack($event)'
    }
}), __param(0, Optional()), __param(2, Optional()), __param(2, Inject(forwardRef(function () {
    return Navbar;
}))), __metadata('design:paramtypes', [typeof (_a = typeof NavController !== 'undefined' && NavController) === 'function' && _a || Object, typeof (_b = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _b || Object, Navbar])], BackButton);
var BackButtonText = function BackButtonText(elementRef, navbar) {
    _classCallCheck(this, BackButtonText);

    navbar.setBackButtonTextRef(elementRef);
};
BackButtonText = __decorate([Directive({
    selector: '.back-button-text'
}), __param(1, Inject(forwardRef(function () {
    return Navbar;
}))), __metadata('design:paramtypes', [typeof (_c = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _c || Object, Navbar])], BackButtonText);
var ToolbarBackground = function ToolbarBackground(elementRef, navbar) {
    _classCallCheck(this, ToolbarBackground);

    navbar.setBackgroundRef(elementRef);
};
ToolbarBackground = __decorate([Directive({
    selector: '.toolbar-background'
}), __param(1, Inject(forwardRef(function () {
    return Navbar;
}))), __metadata('design:paramtypes', [typeof (_d = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _d || Object, Navbar])], ToolbarBackground);
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
export var Navbar = function (_ToolbarBase) {
    _inherits(Navbar, _ToolbarBase);

    function Navbar(_app, viewCtrl, elementRef, config) {
        _classCallCheck(this, Navbar);

        var _this2 = _possibleConstructorReturn(this, (Navbar.__proto__ || Object.getPrototypeOf(Navbar)).call(this, elementRef));

        _this2._app = _app;
        _this2._hidden = false;
        _this2._hideBb = false;
        viewCtrl && viewCtrl.setNavbar(_this2);
        _this2._bbIcon = config.get('backButtonIcon');
        _this2._bbText = config.get('backButtonText');
        _this2._sbPadding = config.getBoolean('statusbarPadding', false);
        return _this2;
    }
    /**
     * @input {boolean} whether the back button should be shown or not
     */


    _createClass(Navbar, [{
        key: "setBackButtonText",

        /**
         * @private
         */
        value: function setBackButtonText(text) {
            this._bbText = text;
        }
        /**
         * @private
         */

    }, {
        key: "getBackButtonRef",
        value: function getBackButtonRef() {
            return this._bbRef;
        }
        /**
         * @private
         */

    }, {
        key: "setBackButtonRef",
        value: function setBackButtonRef(backButtonElementRef) {
            this._bbRef = backButtonElementRef;
        }
        /**
         * @private
         */

    }, {
        key: "getBackButtonTextRef",
        value: function getBackButtonTextRef() {
            return this._bbtRef;
        }
        /**
         * @private
         */

    }, {
        key: "setBackButtonTextRef",
        value: function setBackButtonTextRef(backButtonTextElementRef) {
            this._bbtRef = backButtonTextElementRef;
        }
        /**
         * @private
         */

    }, {
        key: "setBackgroundRef",
        value: function setBackgroundRef(backgrouneElementRef) {
            this._bgRef = backgrouneElementRef;
        }
        /**
         * @private
         */

    }, {
        key: "getBackgroundRef",
        value: function getBackgroundRef() {
            return this._bgRef;
        }
        /**
         * @private
         */

    }, {
        key: "didEnter",
        value: function didEnter() {
            try {
                this._app.setTitle(this.getTitleText());
            } catch (e) {
                console.error(e);
            }
        }
        /**
         * @private
         */

    }, {
        key: "setHidden",
        value: function setHidden(isHidden) {
            // used to display none/block the navbar
            this._hidden = isHidden;
        }
    }, {
        key: "hideBackButton",
        get: function get() {
            return this._hideBb;
        },
        set: function set(val) {
            this._hideBb = isTrueProperty(val);
        }
    }]);

    return Navbar;
}(ToolbarBase);
__decorate([Input(), __metadata('design:type', Boolean)], Navbar.prototype, "hideBackButton", null);
Navbar = __decorate([Component({
    selector: 'ion-navbar',
    template: "\n    <div class=\"toolbar-background\"></div>\n    <button category=\"bar-button\" class=\"back-button\" [hidden]=\"_hideBb\">\n      <span class=\"button-inner\">\n        <ion-icon class=\"back-button-icon\" [name]=\"_bbIcon\"></ion-icon>\n        <span class=\"back-button-text\">\n          <span class=\"back-default\">{{_bbText}}</span>\n        </span>\n      </span>\n    </button>\n    <ng-content select=\"[menuToggle],ion-buttons[left]\"></ng-content>\n    <ng-content select=\"ion-buttons[start]\"></ng-content>\n    <ng-content select=\"ion-buttons[end],ion-buttons[right]\"></ng-content>\n    <div class=\"toolbar-content\">\n      <ng-content></ng-content>\n    </div>\n  ",
    directives: [BackButton, BackButtonText, Icon, ToolbarBackground],
    host: {
        '[hidden]': '_hidden',
        'class': 'toolbar',
        '[class.statusbar-padding]': '_sbPadding'
    }
}), __param(1, Optional()), __metadata('design:paramtypes', [typeof (_e = typeof App !== 'undefined' && App) === 'function' && _e || Object, typeof (_f = typeof ViewController !== 'undefined' && ViewController) === 'function' && _f || Object, typeof (_g = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _g || Object, typeof (_h = typeof Config !== 'undefined' && Config) === 'function' && _h || Object])], Navbar);
/**
 * @private
*/
export var NavbarTemplate = function NavbarTemplate() {
    _classCallCheck(this, NavbarTemplate);

    // deprecated warning: added 2016-06-14, beta.10
    console.warn('ion-navbar no longer requires *navbar attribute. Please restructure header to:\n' + '<ion-header>\n' + '  <ion-navbar>\n' + '    ...\n' + '  </ion-navbar>\n' + '</ion-header>');
};
NavbarTemplate = __decorate([Directive({
    selector: 'template[navbar]'
}), __metadata('design:paramtypes', [])], NavbarTemplate);
var _a, _b, _c, _d, _e, _f, _g, _h;