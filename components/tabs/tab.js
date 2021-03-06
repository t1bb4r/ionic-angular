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
var gesture_controller_1 = require('../../gestures/gesture-controller');
var util_1 = require('../../util/util');
var keyboard_1 = require('../../util/keyboard');
var nav_controller_base_1 = require('../nav/nav-controller-base');
var tabs_1 = require('./tabs');
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
var Tab = (function (_super) {
    __extends(Tab, _super);
    function Tab(parent, app, config, keyboard, elementRef, zone, renderer, compiler, _cd, gestureCtrl) {
        // A Tab is a NavController for its child pages
        _super.call(this, parent, app, config, keyboard, elementRef, zone, renderer, compiler, gestureCtrl);
        this.parent = parent;
        this._cd = _cd;
        this._isEnabled = true;
        this._isShown = true;
        /**
         * @output {Tab} Method to call when the current tab is selected
         */
        this.ionSelect = new core_1.EventEmitter();
        parent.add(this);
        this._tabId = 'tabpanel-' + this.id;
        this._btnId = 'tab-' + this.id;
    }
    Object.defineProperty(Tab.prototype, "enabled", {
        /**
         * @input {boolean} If the tab is enabled or not. If the tab
         * is not enabled then the tab button will still show, however,
         * the button will appear grayed out and will not be clickable.
         * Defaults to `true`.
         */
        get: function () {
            return this._isEnabled;
        },
        set: function (val) {
            this._isEnabled = util_1.isTrueProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab.prototype, "show", {
        /**
         * @input {boolean} If the tab button is visible within the
         * tabbar or not. Defaults to `true`.
         */
        get: function () {
            return this._isShown;
        },
        set: function (val) {
            this._isShown = util_1.isTrueProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab.prototype, "swipeBackEnabled", {
        /**
         * @input {boolean} Whether it's possible to swipe-to-go-back on this tab or not.
         */
        get: function () {
            return this._sbEnabled;
        },
        set: function (val) {
            this._sbEnabled = util_1.isTrueProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab.prototype, "_vp", {
        /**
         * @private
         */
        set: function (val) {
            this.setViewport(val);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    Tab.prototype.ngOnInit = function () {
        this.tabBadgeStyle = this.tabBadgeStyle ? this.tabBadgeStyle : 'default';
    };
    /**
     * @private
     */
    Tab.prototype.load = function (opts, done) {
        if (!this._loaded && this.root) {
            this.push(this.root, this.rootParams, opts, function () {
                done(true);
            });
            this._loaded = true;
        }
        else {
            done(false);
        }
    };
    /**
     * @private
     */
    Tab.prototype.preload = function (wait) {
        var _this = this;
        this._loadTmr = setTimeout(function () {
            if (!_this._loaded) {
                void 0;
                _this.load({
                    animate: false,
                    preload: true
                }, function () { });
            }
        }, wait);
    };
    /**
     * @private
     */
    Tab.prototype.loadPage = function (viewCtrl, viewport, opts, done) {
        var _this = this;
        var isTabSubPage = (this.parent.subPages && viewCtrl.index > 0);
        if (isTabSubPage) {
            viewport = this.parent.portal;
        }
        _super.prototype.loadPage.call(this, viewCtrl, viewport, opts, function () {
            if (isTabSubPage) {
                // add the .tab-subpage css class to tabs pages that should act like subpages
                var pageEleRef = viewCtrl.pageRef();
                if (pageEleRef) {
                    _this._renderer.setElementClass(pageEleRef.nativeElement, 'tab-subpage', true);
                }
            }
            done();
        });
    };
    /**
     * @private
     */
    Tab.prototype.setSelected = function (isSelected) {
        this.isSelected = isSelected;
        if (isSelected) {
            // this is the selected tab, detect changes
            this._cd.reattach();
        }
        else {
            // this tab is not selected, do not detect changes
            this._cd.detach();
        }
    };
    Object.defineProperty(Tab.prototype, "index", {
        /**
         * @private
         */
        get: function () {
            return this.parent.getIndex(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    Tab.prototype.ngOnDestroy = function () {
        clearTimeout(this._loadTmr);
        _super.prototype.ngOnDestroy.call(this);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Tab.prototype, "root", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Tab.prototype, "rootParams", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Tab.prototype, "tabTitle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Tab.prototype, "tabIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Tab.prototype, "tabBadge", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Tab.prototype, "tabBadgeStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Tab.prototype, "enabled", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Tab.prototype, "show", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Tab.prototype, "swipeBackEnabled", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Tab.prototype, "ionSelect", void 0);
    __decorate([
        core_1.ViewChild('viewport', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.ViewContainerRef), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef])
    ], Tab.prototype, "_vp", null);
    Tab = __decorate([
        core_1.Component({
            selector: 'ion-tab',
            host: {
                '[class.show-tab]': 'isSelected',
                '[attr.id]': '_tabId',
                '[attr.aria-labelledby]': '_btnId',
                'role': 'tabpanel'
            },
            template: '<div #viewport></div><div class="nav-decor"></div>',
            encapsulation: core_1.ViewEncapsulation.None,
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return tabs_1.Tabs; }))), 
        __metadata('design:paramtypes', [tabs_1.Tabs, app_1.App, config_1.Config, keyboard_1.Keyboard, core_1.ElementRef, core_1.NgZone, core_1.Renderer, core_1.ComponentResolver, core_1.ChangeDetectorRef, gesture_controller_1.GestureController])
    ], Tab);
    return Tab;
}(nav_controller_base_1.NavControllerBase));
exports.Tab = Tab;
