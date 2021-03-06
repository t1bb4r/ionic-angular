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
import { Component, ComponentResolver, ElementRef, Input, Optional, NgZone, Renderer, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { App } from '../app/app';
import { Config } from '../../config/config';
import { Keyboard } from '../../util/keyboard';
import { GestureController } from '../../gestures/gesture-controller';
import { isTrueProperty } from '../../util/util';
import { NavControllerBase } from './nav-controller-base';
import { ViewController } from './view-controller';
/**
 * @name Nav
 * @description
 *
 * `ion-nav` is the declarative component for a [NavController](../NavController/).
 *
 * For more information on using nav controllers like Nav or [Tab](../../Tabs/Tab/),
 * take a look at the [NavController API Docs](../NavController/).
 *
 *
 * @usage
 * You must set a root page to be loaded initially by any Nav you create, using
 * the 'root' property:
 *
 * ```ts
 * import { Component } from '@angular/core';
 * import { ionicBootstrap } from 'ionic-angular';
 * import { GettingStartedPage } from './getting-started';
 *
 * @Component({
 *   template: `<ion-nav [root]="root"></ion-nav>`
 * })
 * class MyApp {
 *   private root: any = GettingStartedPage;
 *
 *   constructor(){
 *   }
 * }
 *
 * ionicBootstrap(MyApp);
 * ```
 *
 *
 * @demo /docs/v2/demos/navigation/
 * @see {@link /docs/v2/components#navigation Navigation Component Docs}
 */
export var Nav = function (_NavControllerBase) {
    _inherits(Nav, _NavControllerBase);

    function Nav(viewCtrl, parent, app, config, keyboard, elementRef, zone, renderer, compiler, gestureCtrl) {
        _classCallCheck(this, Nav);

        var _this = _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).call(this, parent, app, config, keyboard, elementRef, zone, renderer, compiler, gestureCtrl));

        _this._hasInit = false;
        if (viewCtrl) {
            // an ion-nav can also act as an ion-page within a parent ion-nav
            // this would happen when an ion-nav nests a child ion-nav.
            viewCtrl.setContent(_this);
            viewCtrl.setContentRef(elementRef);
        }
        if (parent) {
            // this Nav has a parent Nav
            parent.registerChildNav(_this);
        } else if (viewCtrl && viewCtrl.getNav()) {
            // this Nav was opened from a modal
            _this.parent = viewCtrl.getNav();
            _this.parent.registerChildNav(_this);
        } else if (app && !app.getRootNav()) {
            // a root nav has not been registered yet with the app
            // this is the root navcontroller for the entire app
            app.setRootNav(_this);
        }
        return _this;
    }
    /**
     * @private
     */


    _createClass(Nav, [{
        key: "ngAfterViewInit",

        /**
         * @private
         */
        value: function ngAfterViewInit() {
            this._hasInit = true;
            if (this._root) {
                this.push(this._root);
            }
        }
        /**
         * @input {Page} The Page component to load as the root page within this nav.
         */

    }, {
        key: "_vp",
        set: function set(val) {
            this.setViewport(val);
        }
    }, {
        key: "root",
        get: function get() {
            return this._root;
        },
        set: function set(page) {
            this._root = page;
            if (this._hasInit) {
                this.setRoot(page);
            }
        }
        /**
         * @input {boolean} Whether it's possible to swipe-to-go-back on this nav controller or not.
         */

    }, {
        key: "swipeBackEnabled",
        get: function get() {
            return this._sbEnabled;
        },
        set: function set(val) {
            this._sbEnabled = isTrueProperty(val);
        }
    }]);

    return Nav;
}(NavControllerBase);
__decorate([ViewChild('viewport', { read: ViewContainerRef }), __metadata('design:type', typeof (_a = typeof ViewContainerRef !== 'undefined' && ViewContainerRef) === 'function' && _a || Object), __metadata('design:paramtypes', [typeof (_b = typeof ViewContainerRef !== 'undefined' && ViewContainerRef) === 'function' && _b || Object])], Nav.prototype, "_vp", null);
__decorate([Input(), __metadata('design:type', Object)], Nav.prototype, "root", null);
__decorate([Input(), __metadata('design:type', Boolean)], Nav.prototype, "swipeBackEnabled", null);
Nav = __decorate([Component({
    selector: 'ion-nav',
    template: "\n    <div #viewport nav-viewport></div>\n    <div class=\"nav-decor\"></div>\n  ",
    encapsulation: ViewEncapsulation.None
}), __param(0, Optional()), __param(1, Optional()), __metadata('design:paramtypes', [typeof (_c = typeof ViewController !== 'undefined' && ViewController) === 'function' && _c || Object, typeof (_d = typeof NavControllerBase !== 'undefined' && NavControllerBase) === 'function' && _d || Object, typeof (_e = typeof App !== 'undefined' && App) === 'function' && _e || Object, typeof (_f = typeof Config !== 'undefined' && Config) === 'function' && _f || Object, typeof (_g = typeof Keyboard !== 'undefined' && Keyboard) === 'function' && _g || Object, typeof (_h = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _h || Object, typeof (_j = typeof NgZone !== 'undefined' && NgZone) === 'function' && _j || Object, typeof (_k = typeof Renderer !== 'undefined' && Renderer) === 'function' && _k || Object, typeof (_l = typeof ComponentResolver !== 'undefined' && ComponentResolver) === 'function' && _l || Object, typeof (_m = typeof GestureController !== 'undefined' && GestureController) === 'function' && _m || Object])], Nav);
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;