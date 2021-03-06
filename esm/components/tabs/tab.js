var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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
import { ChangeDetectorRef, Component, ComponentResolver, ElementRef, EventEmitter, forwardRef, Input, Inject, NgZone, Output, Renderer, ViewChild, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { App } from '../app/app';
import { Config } from '../../config/config';
import { GestureController } from '../../gestures/gesture-controller';
import { isTrueProperty } from '../../util/util';
import { Keyboard } from '../../util/keyboard';
import { NavControllerBase } from '../nav/nav-controller-base';
import { Tabs } from './tabs';
/**
 * @name Tab
 * @description
 * The Tab component, written `<ion-tab>`, is styled based on the mode and should
 * be used in conjunction with the [Tabs](../Tabs/) component.
 *
 * Each `ion-tab` is a declarative component for a [NavController](../NavController/).
 * Basically, each tab is a `NavController`. For more information on using
 * navigation controllers take a look at the [NavController API Docs](../../nav/NavController/).
 *
 * See the [Tabs API Docs](../Tabs/) for more details on configuring Tabs.
 *
 * @usage
 *
 * To add a basic tab, you can use the following markup where the `root` property
 * is the page you want to load for that tab, `tabTitle` is the optional text to
 * display on the tab, and `tabIcon` is the optional [icon](../../icon/Icon/).
 *
 * ```html
 * <ion-tabs>
 *  <ion-tab [root]="chatRoot" tabTitle="Chat" tabIcon="chat"><ion-tab>
 * </ion-tabs>
 * ```
 *
 * Then, in your class you can set `chatRoot` to an imported class:
 *
 * ```ts
 * import { ChatPage } from '../chat/chat';
 *
 * export class Tabs {
 *   // here we'll set the property of chatRoot to
 *   // the imported class of ChatPage
 *   chatRoot = ChatPage;
 *
 *   constructor() {
 *
 *   }
 * }
 * ```
 *
 * You can also pass some parameters to the root page of the tab through
 * `rootParams`. Below we pass `chatParams` to the Chat tab:
 *
 * ```html
 * <ion-tabs>
 *  <ion-tab [root]="chatRoot" [rootParams]="chatParams" tabTitle="Chat" tabIcon="chat"><ion-tab>
 * </ion-tabs>
 * ```
 *
 * ```ts
 * export class Tabs {
 *   chatRoot = ChatPage;
 *
 *   // set some user information on chatParams
 *   chatParams = {
 *     user1: "admin",
 *     user2: "ionic"
 *   };
 *
 *   constructor() {
 *
 *   }
 * }
 * ```
 *
 * And in `ChatPage` you can get the data from `NavParams`:
 *
 * ```ts
 * export class ChatPage {
 *   constructor(navParams: NavParams) {
 *     console.log("Passed params", navParams.data);
 *   }
 * }
 * ```
 *
 * Sometimes you may want to call a method instead of navigating to a new
 * page. You can use the `(ionSelect)` event to call a method on your class when
 * the tab is selected. Below is an example of presenting a modal from one of
 * the tabs.
 *
 * ```html
 * <ion-tabs preloadTabs="false">
 *   <ion-tab (ionSelect)="chat()"></ion-tab>
 * </ion-tabs>
 * ```
 *
 * ```ts
 * export class Tabs {
 *   constructor(private modalCtrl: ModalController) {
 *
 *   }
 *
 *   chat() {
 *     let modal = this.modalCtrl.create(ChatPage);
 *     modal.present();
 *   }
 * }
 * ```
 *
 *
 * @demo /docs/v2/demos/tabs/
 * @see {@link /docs/v2/components#tabs Tabs Component Docs}
 * @see {@link ../../tabs/Tabs Tabs API Docs}
 * @see {@link ../../nav/Nav Nav API Docs}
 * @see {@link ../../nav/NavController NavController API Docs}
 */
export var Tab = function (_NavControllerBase) {
    _inherits(Tab, _NavControllerBase);

    function Tab(parent, app, config, keyboard, elementRef, zone, renderer, compiler, _cd, gestureCtrl) {
        _classCallCheck(this, Tab);

        var _this = _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).call(this, parent, app, config, keyboard, elementRef, zone, renderer, compiler, gestureCtrl));
        // A Tab is a NavController for its child pages


        _this.parent = parent;
        _this._cd = _cd;
        _this._isEnabled = true;
        _this._isShown = true;
        /**
         * @output {Tab} Method to call when the current tab is selected
         */
        _this.ionSelect = new EventEmitter();
        parent.add(_this);
        _this._tabId = 'tabpanel-' + _this.id;
        _this._btnId = 'tab-' + _this.id;
        return _this;
    }
    /**
     * @input {boolean} If the tab is enabled or not. If the tab
     * is not enabled then the tab button will still show, however,
     * the button will appear grayed out and will not be clickable.
     * Defaults to `true`.
     */


    _createClass(Tab, [{
        key: "ngOnInit",

        /**
         * @private
         */
        value: function ngOnInit() {
            this.tabBadgeStyle = this.tabBadgeStyle ? this.tabBadgeStyle : 'default';
        }
        /**
         * @private
         */

    }, {
        key: "load",
        value: function load(opts, done) {
            if (!this._loaded && this.root) {
                this.push(this.root, this.rootParams, opts, function () {
                    done(true);
                });
                this._loaded = true;
            } else {
                done(false);
            }
        }
        /**
         * @private
         */

    }, {
        key: "preload",
        value: function preload(wait) {
            var _this2 = this;

            this._loadTmr = setTimeout(function () {
                if (!_this2._loaded) {
                    console.debug('Tabs, preload', _this2.id);
                    _this2.load({
                        animate: false,
                        preload: true
                    }, function () {});
                }
            }, wait);
        }
        /**
         * @private
         */

    }, {
        key: "loadPage",
        value: function loadPage(viewCtrl, viewport, opts, done) {
            var _this3 = this;

            var isTabSubPage = this.parent.subPages && viewCtrl.index > 0;
            if (isTabSubPage) {
                viewport = this.parent.portal;
            }
            _get(Tab.prototype.__proto__ || Object.getPrototypeOf(Tab.prototype), "loadPage", this).call(this, viewCtrl, viewport, opts, function () {
                if (isTabSubPage) {
                    // add the .tab-subpage css class to tabs pages that should act like subpages
                    var pageEleRef = viewCtrl.pageRef();
                    if (pageEleRef) {
                        _this3._renderer.setElementClass(pageEleRef.nativeElement, 'tab-subpage', true);
                    }
                }
                done();
            });
        }
        /**
         * @private
         */

    }, {
        key: "setSelected",
        value: function setSelected(isSelected) {
            this.isSelected = isSelected;
            if (isSelected) {
                // this is the selected tab, detect changes
                this._cd.reattach();
            } else {
                // this tab is not selected, do not detect changes
                this._cd.detach();
            }
        }
        /**
         * @private
         */

    }, {
        key: "ngOnDestroy",

        /**
         * @private
         */
        value: function ngOnDestroy() {
            clearTimeout(this._loadTmr);
            _get(Tab.prototype.__proto__ || Object.getPrototypeOf(Tab.prototype), "ngOnDestroy", this).call(this);
        }
    }, {
        key: "enabled",
        get: function get() {
            return this._isEnabled;
        },
        set: function set(val) {
            this._isEnabled = isTrueProperty(val);
        }
        /**
         * @input {boolean} If the tab button is visible within the
         * tabbar or not. Defaults to `true`.
         */

    }, {
        key: "show",
        get: function get() {
            return this._isShown;
        },
        set: function set(val) {
            this._isShown = isTrueProperty(val);
        }
        /**
         * @input {boolean} Whether it's possible to swipe-to-go-back on this tab or not.
         */

    }, {
        key: "swipeBackEnabled",
        get: function get() {
            return this._sbEnabled;
        },
        set: function set(val) {
            this._sbEnabled = isTrueProperty(val);
        }
        /**
         * @private
         */

    }, {
        key: "_vp",
        set: function set(val) {
            this.setViewport(val);
        }
    }, {
        key: "index",
        get: function get() {
            return this.parent.getIndex(this);
        }
    }]);

    return Tab;
}(NavControllerBase);
__decorate([Input(), __metadata('design:type', Object)], Tab.prototype, "root", void 0);
__decorate([Input(), __metadata('design:type', Object)], Tab.prototype, "rootParams", void 0);
__decorate([Input(), __metadata('design:type', String)], Tab.prototype, "tabTitle", void 0);
__decorate([Input(), __metadata('design:type', String)], Tab.prototype, "tabIcon", void 0);
__decorate([Input(), __metadata('design:type', String)], Tab.prototype, "tabBadge", void 0);
__decorate([Input(), __metadata('design:type', String)], Tab.prototype, "tabBadgeStyle", void 0);
__decorate([Input(), __metadata('design:type', Boolean)], Tab.prototype, "enabled", null);
__decorate([Input(), __metadata('design:type', Boolean)], Tab.prototype, "show", null);
__decorate([Input(), __metadata('design:type', Boolean)], Tab.prototype, "swipeBackEnabled", null);
__decorate([Output(), __metadata('design:type', typeof (_a = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _a || Object)], Tab.prototype, "ionSelect", void 0);
__decorate([ViewChild('viewport', { read: ViewContainerRef }), __metadata('design:type', typeof (_b = typeof ViewContainerRef !== 'undefined' && ViewContainerRef) === 'function' && _b || Object), __metadata('design:paramtypes', [typeof (_c = typeof ViewContainerRef !== 'undefined' && ViewContainerRef) === 'function' && _c || Object])], Tab.prototype, "_vp", null);
Tab = __decorate([Component({
    selector: 'ion-tab',
    host: {
        '[class.show-tab]': 'isSelected',
        '[attr.id]': '_tabId',
        '[attr.aria-labelledby]': '_btnId',
        'role': 'tabpanel'
    },
    template: '<div #viewport></div><div class="nav-decor"></div>',
    encapsulation: ViewEncapsulation.None
}), __param(0, Inject(forwardRef(function () {
    return Tabs;
}))), __metadata('design:paramtypes', [typeof (_d = typeof Tabs !== 'undefined' && Tabs) === 'function' && _d || Object, typeof (_e = typeof App !== 'undefined' && App) === 'function' && _e || Object, typeof (_f = typeof Config !== 'undefined' && Config) === 'function' && _f || Object, typeof (_g = typeof Keyboard !== 'undefined' && Keyboard) === 'function' && _g || Object, typeof (_h = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _h || Object, typeof (_j = typeof NgZone !== 'undefined' && NgZone) === 'function' && _j || Object, typeof (_k = typeof Renderer !== 'undefined' && Renderer) === 'function' && _k || Object, typeof (_l = typeof ComponentResolver !== 'undefined' && ComponentResolver) === 'function' && _l || Object, typeof (_m = typeof ChangeDetectorRef !== 'undefined' && ChangeDetectorRef) === 'function' && _m || Object, typeof (_o = typeof GestureController !== 'undefined' && GestureController) === 'function' && _o || Object])], Tab);
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;