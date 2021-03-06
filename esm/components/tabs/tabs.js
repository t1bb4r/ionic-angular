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
import { Component, ElementRef, EventEmitter, Input, Output, Optional, Renderer, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { App } from '../app/app';
import { Badge } from '../badge/badge';
import { Config } from '../../config/config';
import { Content } from '../content/content';
import { Icon } from '../icon/icon';
import { Ion } from '../ion';
import { isBlank, isTrueProperty } from '../../util/util';
import { nativeRaf } from '../../util/dom';
import { NavController } from '../nav/nav-controller';
import { Platform } from '../../platform/platform';
import { TabButton } from './tab-button';
import { TabHighlight } from './tab-highlight';
import { ViewController } from '../nav/view-controller';
/**
 * @name Tabs
 * @description
 * Tabs make it easy to navigate between different pages or functional
 * aspects of an app. The Tabs component, written as `<ion-tabs>`, is
 * a container of individual [Tab](../Tab/) components. Each individual `ion-tab`
 * is a declarative component for a [NavController](../NavController/)

 * For more information on using nav controllers like Tab or [Nav](../../nav/Nav/),
 * take a look at the [NavController API Docs](../NavController/).
 *
 * ### Placement
 *
 * The position of the tabs relative to the content varies based on
 * the mode. The tabs are placed at the bottom of the screen
 * for iOS and Android, and at the top for Windows by default. The position can be configured using the `tabsPlacement` attribute
 * on the `<ion-tabs>` component, or in an app's [config](../../config/Config/).
 * See the [Input Properties](#input-properties) below for the available
 * values of `tabsPlacement`.

 * ### Layout
 *
 * The layout for all of the tabs can be defined using the `tabsLayout`
 * property. If the individual tab has a title and icon, the icons will
 * show on top of the title by default. All tabs can be changed by setting
 * the value of `tabsLayout` on the `<ion-tabs>` element, or in your
 * app's [config](../../config/Config/). For example, this is useful if
 * you want to show tabs with a title only on Android, but show icons
 * and a title for iOS. See the [Input Properties](#input-properties)
 * below for the available values of `tabsLayout`.
 *
 * ### Selecting a Tab
 *
 * There are different ways you can select a specific tab from the tabs
 * component. You can use the `selectedIndex` property to set the index
 * on the `<ion-tabs>` element, or you can call `select()` from the `Tabs`
 * instance after creation. See [usage](#usage) below for more information.
 *
 * @usage
 *
 * You can add a basic tabs template to a `@Component` using the following
 * template:
 *
 * ```html
 * <ion-tabs>
 *   <ion-tab [root]="tab1Root"></ion-tab>
 *   <ion-tab [root]="tab2Root"></ion-tab>
 *   <ion-tab [root]="tab3Root"></ion-tab>
 * </ion-tabs>
 * ```
 *
 * Where `tab1Root`, `tab2Root`, and `tab3Root` are each a page:
 *
 *```ts
 * @Component({
 *   templateUrl: 'build/pages/tabs/tabs.html'
 * })
 * export class TabsPage {
 *   // this tells the tabs component which Pages
 *   // should be each tab's root Page
 *   tab1Root = Page1;
 *   tab2Root = Page2;
 *   tab3Root = Page3;
 *
 *   constructor() {
 *
 *   }
 * }
 *```
 *
 * By default, the first tab will be selected upon navigation to the
 * Tabs page. We can change the selected tab by using `selectedIndex`
 * on the `<ion-tabs>` element:
 *
 * ```html
 * <ion-tabs selectedIndex="2">
 *   <ion-tab [root]="tab1Root"></ion-tab>
 *   <ion-tab [root]="tab2Root"></ion-tab>
 *   <ion-tab [root]="tab3Root"></ion-tab>
 * </ion-tabs>
 * ```
 *
 * Since the index starts at `0`, this will select the 3rd tab which has
 * root set to `tab3Root`. If you wanted to change it dynamically from
 * your class, you could use [property binding](https://angular.io/docs/ts/latest/guide/template-syntax.html#!#property-binding).
 *
 * Alternatively, you can grab the `Tabs` instance and call the `select()`
 * method. This requires the `<ion-tabs>` element to have an `id`. For
 * example, set the value of `id` to `myTabs`:
 *
 * ```html
 * <ion-tabs #myTabs>
 *   <ion-tab [root]="tab1Root"></ion-tab>
 *   <ion-tab [root]="tab2Root"></ion-tab>
 *   <ion-tab [root]="tab3Root"></ion-tab>
 * </ion-tabs>
 * ```
 *
 * Then in your class you can grab the `Tabs` instance and call `select()`,
 * passing the index of the tab as the argument. Here we're grabbing the tabs
 * by using ViewChild.
 *
 *```ts
 * export class TabsPage {
 *
 * @ViewChild('myTabs') tabRef: Tabs;
 *
 * ionViewDidEnter() {
 *   this.tabRef.select(2);
 *  }
 *
 * }
 *```
 *
 * @demo /docs/v2/demos/tabs/
 *
 * @see {@link /docs/v2/components#tabs Tabs Component Docs}
 * @see {@link ../Tab Tab API Docs}
 * @see {@link ../../config/Config Config API Docs}
 *
 */
export var Tabs = function (_Ion) {
    _inherits(Tabs, _Ion);

    function Tabs(parent, viewCtrl, _app, _config, _elementRef, _platform, _renderer) {
        _classCallCheck(this, Tabs);

        var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, _elementRef));

        _this.viewCtrl = viewCtrl;
        _this._app = _app;
        _this._config = _config;
        _this._elementRef = _elementRef;
        _this._platform = _platform;
        _this._renderer = _renderer;
        _this._ids = -1;
        _this._tabs = [];
        _this._onReady = null;
        /**
         * @private
         */
        _this.selectHistory = [];
        /**
         * @input {any} Expression to evaluate when the tab changes.
         */
        _this.ionChange = new EventEmitter();
        _this.parent = parent;
        _this.id = 't' + ++tabIds;
        _this._sbPadding = _config.getBoolean('statusbarPadding');
        _this.subPages = _config.getBoolean('tabsHideOnSubPages');
        _this.tabsHighlight = _config.getBoolean('tabsHighlight');
        // TODO deprecated 07-07-2016 beta.11
        if (_config.get('tabSubPages') !== null) {
            console.warn('Config option "tabSubPages" has been deprecated. Please use "tabsHideOnSubPages" instead.');
            _this.subPages = _config.getBoolean('tabSubPages');
        }
        // TODO deprecated 07-07-2016 beta.11
        if (_config.get('tabbarHighlight') !== null) {
            console.warn('Config option "tabbarHighlight" has been deprecated. Please use "tabsHighlight" instead.');
            _this.tabsHighlight = _config.getBoolean('tabbarHighlight');
        }
        if (_this.parent) {
            // this Tabs has a parent Nav
            _this.parent.registerChildNav(_this);
        } else if (viewCtrl && viewCtrl.getNav()) {
            // this Nav was opened from a modal
            _this.parent = viewCtrl.getNav();
            _this.parent.registerChildNav(_this);
        } else if (_this._app) {
            // this is the root navcontroller for the entire app
            _this._app.setRootNav(_this);
        }
        // Tabs may also be an actual ViewController which was navigated to
        // if Tabs is static and not navigated to within a NavController
        // then skip this and don't treat it as it's own ViewController
        if (viewCtrl) {
            viewCtrl.setContent(_this);
            viewCtrl.setContentRef(_elementRef);
            viewCtrl.loaded = function (done) {
                _this._onReady = done;
            };
        }
        return _this;
    }
    /**
     * @private
     */


    _createClass(Tabs, [{
        key: "ngAfterViewInit",
        value: function ngAfterViewInit() {
            var _this2 = this;

            this._setConfig('tabsPlacement', 'bottom');
            this._setConfig('tabsLayout', 'icon-top');
            this._setConfig('tabsHighlight', this.tabsHighlight);
            // TODO deprecated 07-07-2016 beta.11
            this._setConfig('tabbarPlacement', 'bottom');
            this._setConfig('tabbarLayout', 'icon-top');
            // TODO deprecated 07-07-2016 beta.11
            if (this.tabbarPlacement !== undefined) {
                console.warn('Input "tabbarPlacement" has been deprecated. Please use "tabsPlacement" instead.');
                this._renderer.setElementAttribute(this._elementRef.nativeElement, 'tabsPlacement', this.tabbarPlacement);
                this.tabsPlacement = this.tabbarPlacement;
            }
            // TODO deprecated 07-07-2016 beta.11
            if (this._config.get('tabbarPlacement') !== null) {
                console.warn('Config option "tabbarPlacement" has been deprecated. Please use "tabsPlacement" instead.');
                this._renderer.setElementAttribute(this._elementRef.nativeElement, 'tabsPlacement', this._config.get('tabbarPlacement'));
            }
            // TODO deprecated 07-07-2016 beta.11
            if (this.tabbarLayout !== undefined) {
                console.warn('Input "tabbarLayout" has been deprecated. Please use "tabsLayout" instead.');
                this._renderer.setElementAttribute(this._elementRef.nativeElement, 'tabsLayout', this.tabbarLayout);
                this.tabsLayout = this.tabbarLayout;
            }
            // TODO deprecated 07-07-2016 beta.11
            if (this._config.get('tabbarLayout') !== null) {
                console.warn('Config option "tabbarLayout" has been deprecated. Please use "tabsLayout" instead.');
                this._renderer.setElementAttribute(this._elementRef.nativeElement, 'tabsLayout', this._config.get('tabsLayout'));
            }
            if (this.tabsHighlight) {
                this._platform.onResize(function () {
                    _this2._highlight.select(_this2.getSelected());
                });
            }
            this.initTabs();
        }
        /**
         * @private
         */

    }, {
        key: "initTabs",
        value: function initTabs() {
            var _this3 = this;

            // get the selected index from the input
            // otherwise default it to use the first index
            var selectedIndex = isBlank(this.selectedIndex) ? 0 : parseInt(this.selectedIndex, 10);
            // get the selectedIndex and ensure it isn't hidden or disabled
            var selectedTab = this._tabs.find(function (t, i) {
                return i === selectedIndex && t.enabled && t.show;
            });
            if (!selectedTab) {
                // wasn't able to select the tab they wanted
                // try to find the first tab that's available
                selectedTab = this._tabs.find(function (t) {
                    return t.enabled && t.show;
                });
            }
            if (selectedTab) {
                // we found a tab to select
                this.select(selectedTab);
            }
            // check if preloadTab is set as an input @Input
            // otherwise check the preloadTabs config
            var shouldPreloadTabs = isBlank(this.preloadTabs) ? this._config.getBoolean('preloadTabs') : isTrueProperty(this.preloadTabs);
            if (shouldPreloadTabs) {
                // preload all the tabs which isn't the selected tab
                this._tabs.filter(function (t) {
                    return t !== selectedTab;
                }).forEach(function (tab, index) {
                    tab.preload(_this3._config.getNumber('tabsPreloadDelay', 1000) * index);
                });
            }
        }
        /**
         * @private
         */

    }, {
        key: "_setConfig",
        value: function _setConfig(attrKey, fallback) {
            var val = this[attrKey];
            if (isBlank(val)) {
                val = this._config.get(attrKey, fallback);
            }
            this._renderer.setElementAttribute(this._elementRef.nativeElement, attrKey, val);
        }
        /**
         * @private
         */

    }, {
        key: "add",
        value: function add(tab) {
            tab.id = this.id + '-' + ++this._ids;
            this._tabs.push(tab);
        }
        /**
         * @param {number|Tab} tabOrIndex Index, or the Tab instance, of the tab to select.
         */

    }, {
        key: "select",
        value: function select(tabOrIndex) {
            var _this4 = this;

            var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            var done = arguments[2];

            var promise = void 0;
            if (!done) {
                promise = new Promise(function (res) {
                    done = res;
                });
            }
            var selectedTab = typeof tabOrIndex === 'number' ? this.getByIndex(tabOrIndex) : tabOrIndex;
            if (isBlank(selectedTab)) {
                return Promise.resolve();
            }
            var deselectedTab = this.getSelected();
            if (selectedTab === deselectedTab) {
                // no change
                this._touchActive(selectedTab);
                return Promise.resolve();
            }
            console.debug("Tabs, select: " + selectedTab.id);
            var deselectedPage = void 0;
            if (deselectedTab) {
                deselectedPage = deselectedTab.getActive();
                deselectedPage && deselectedPage.fireWillLeave();
            }
            opts.animate = false;
            var selectedPage = selectedTab.getActive();
            selectedPage && selectedPage.fireWillEnter();
            selectedTab.load(opts, function (initialLoad) {
                selectedTab.ionSelect.emit(selectedTab);
                _this4.ionChange.emit(selectedTab);
                if (selectedTab.root) {
                    // only show the selectedTab if it has a root
                    // it's possible the tab is only for opening modal's or signing out
                    // and doesn't actually have content. In the case there's no content
                    // for a tab then do nothing and leave the current view as is
                    _this4._tabs.forEach(function (tab) {
                        tab.setSelected(tab === selectedTab);
                    });
                    if (_this4.tabsHighlight) {
                        _this4._highlight.select(selectedTab);
                    }
                }
                selectedPage && selectedPage.fireDidEnter();
                deselectedPage && deselectedPage.fireDidLeave();
                if (_this4._onReady) {
                    _this4._onReady();
                    _this4._onReady = null;
                }
                // track the order of which tabs have been selected, by their index
                // do not track if the tab index is the same as the previous
                if (_this4.selectHistory[_this4.selectHistory.length - 1] !== selectedTab.id) {
                    _this4.selectHistory.push(selectedTab.id);
                }
                // if this is not the Tab's initial load then we need
                // to refresh the tabbar and content dimensions to be sure
                // they're lined up correctly
                if (!initialLoad && selectedPage) {
                    var content = selectedPage.getContent();
                    if (content && content instanceof Content) {
                        nativeRaf(function () {
                            content.readDimensions();
                            content.writeDimensions();
                        });
                    }
                }
                done();
            });
            return promise;
        }
        /**
         * Get the previously selected Tab which is currently not disabled or hidden.
         * @param {boolean} trimHistory If the selection history should be trimmed up to the previous tab selection or not.
         * @returns {Tab}
         */

    }, {
        key: "previousTab",
        value: function previousTab() {
            var _this5 = this;

            var trimHistory = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

            // walk backwards through the tab selection history
            // and find the first previous tab that is enabled and shown
            console.debug('run previousTab', this.selectHistory);
            for (var i = this.selectHistory.length - 2; i >= 0; i--) {
                var tab = this._tabs.find(function (t) {
                    return t.id === _this5.selectHistory[i];
                });
                if (tab && tab.enabled && tab.show) {
                    if (trimHistory) {
                        this.selectHistory.splice(i + 1);
                    }
                    return tab;
                }
            }
            return null;
        }
        /**
         * @param {number} index Index of the tab you want to get
         * @returns {Tab} Returns the tab who's index matches the one passed
         */

    }, {
        key: "getByIndex",
        value: function getByIndex(index) {
            if (index < this._tabs.length && index > -1) {
                return this._tabs[index];
            }
            return null;
        }
        /**
         * @return {Tab} Returns the currently selected tab
         */

    }, {
        key: "getSelected",
        value: function getSelected() {
            for (var i = 0; i < this._tabs.length; i++) {
                if (this._tabs[i].isSelected) {
                    return this._tabs[i];
                }
            }
            return null;
        }
        /**
         * @private
         */

    }, {
        key: "getActiveChildNav",
        value: function getActiveChildNav() {
            return this.getSelected();
        }
        /**
         * @private
         */

    }, {
        key: "getIndex",
        value: function getIndex(tab) {
            return this._tabs.indexOf(tab);
        }
        /**
         * @private
         */

    }, {
        key: "length",
        value: function length() {
            return this._tabs.length;
        }
        /**
         * @private
         * "Touch" the active tab, going back to the root view of the tab
         * or optionally letting the tab handle the event
         */

    }, {
        key: "_touchActive",
        value: function _touchActive(tab) {
            var active = tab.getActive();
            if (!active) {
                return Promise.resolve();
            }
            var instance = active.instance;
            // If they have a custom tab selected handler, call it
            if (instance.ionSelected) {
                return instance.ionSelected();
            }
            // If we're a few pages deep, pop to root
            if (tab.length() > 1) {
                // Pop to the root view
                return tab.popToRoot();
            }
            // Otherwise, if the page we're on is not our real root, reset it to our
            // default root type
            if (tab.root !== active.componentType) {
                return tab.setRoot(tab.root);
            }
            // And failing all of that, we do something safe and secure
            return Promise.resolve();
        }
        /**
         * @private
         * DOM WRITE
         */

    }, {
        key: "setTabbarPosition",
        value: function setTabbarPosition(top, bottom) {
            if (this._top !== top || this._bottom !== bottom) {
                var tabbarEle = this._tabbar.nativeElement;
                tabbarEle.style.top = top > -1 ? top + 'px' : '';
                tabbarEle.style.bottom = bottom > -1 ? bottom + 'px' : '';
                tabbarEle.classList.add('show-tabbar');
                this._top = top;
                this._bottom = bottom;
            }
        }
    }]);

    return Tabs;
}(Ion);
__decorate([Input(), __metadata('design:type', Object)], Tabs.prototype, "selectedIndex", void 0);
__decorate([Input(), __metadata('design:type', Object)], Tabs.prototype, "preloadTabs", void 0);
__decorate([Input(), __metadata('design:type', String)], Tabs.prototype, "tabbarLayout", void 0);
__decorate([Input(), __metadata('design:type', String)], Tabs.prototype, "tabsLayout", void 0);
__decorate([Input(), __metadata('design:type', String)], Tabs.prototype, "tabbarPlacement", void 0);
__decorate([Input(), __metadata('design:type', String)], Tabs.prototype, "tabsPlacement", void 0);
__decorate([Input(), __metadata('design:type', Boolean)], Tabs.prototype, "tabsHighlight", void 0);
__decorate([Output(), __metadata('design:type', typeof (_a = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _a || Object)], Tabs.prototype, "ionChange", void 0);
__decorate([ViewChild(TabHighlight), __metadata('design:type', typeof (_b = typeof TabHighlight !== 'undefined' && TabHighlight) === 'function' && _b || Object)], Tabs.prototype, "_highlight", void 0);
__decorate([ViewChild('tabbar'), __metadata('design:type', typeof (_c = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _c || Object)], Tabs.prototype, "_tabbar", void 0);
__decorate([ViewChild('portal', { read: ViewContainerRef }), __metadata('design:type', typeof (_d = typeof ViewContainerRef !== 'undefined' && ViewContainerRef) === 'function' && _d || Object)], Tabs.prototype, "portal", void 0);
Tabs = __decorate([Component({
    selector: 'ion-tabs',
    template: "\n    <ion-tabbar role=\"tablist\" #tabbar>\n      <a *ngFor=\"let t of _tabs\" [tab]=\"t\" class=\"tab-button\" [class.tab-disabled]=\"!t.enabled\" [class.tab-hidden]=\"!t.show\" role=\"tab\" href=\"#\" (ionSelect)=\"select($event)\">\n        <ion-icon *ngIf=\"t.tabIcon\" [name]=\"t.tabIcon\" [isActive]=\"t.isSelected\" class=\"tab-button-icon\"></ion-icon>\n        <span *ngIf=\"t.tabTitle\" class=\"tab-button-text\">{{t.tabTitle}}</span>\n        <ion-badge *ngIf=\"t.tabBadge\" class=\"tab-badge\" [ngClass]=\"'badge-' + t.tabBadgeStyle\">{{t.tabBadge}}</ion-badge>\n        <ion-button-effect></ion-button-effect>\n      </a>\n      <tab-highlight></tab-highlight>\n    </ion-tabbar>\n    <ng-content></ng-content>\n    <div #portal tab-portal></div>\n  ",
    directives: [Badge, Icon, NgClass, NgFor, NgIf, TabButton, TabHighlight],
    encapsulation: ViewEncapsulation.None
}), __param(0, Optional()), __param(1, Optional()), __metadata('design:paramtypes', [typeof (_e = typeof NavController !== 'undefined' && NavController) === 'function' && _e || Object, typeof (_f = typeof ViewController !== 'undefined' && ViewController) === 'function' && _f || Object, typeof (_g = typeof App !== 'undefined' && App) === 'function' && _g || Object, typeof (_h = typeof Config !== 'undefined' && Config) === 'function' && _h || Object, typeof (_j = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _j || Object, typeof (_k = typeof Platform !== 'undefined' && Platform) === 'function' && _k || Object, typeof (_l = typeof Renderer !== 'undefined' && Renderer) === 'function' && _l || Object])], Tabs);
var tabIds = -1;
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;