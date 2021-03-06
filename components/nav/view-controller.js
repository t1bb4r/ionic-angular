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
var core_1 = require('@angular/core');
var util_1 = require('../../util/util');
var nav_params_1 = require('./nav-params');
/**
 * @name ViewController
 * @description
 * Access various features and information about the current view.
 * @usage
 *  ```ts
 * import { Component } from '@angular/core';
 * import { ViewController } from 'ionic-angular';
 *
 * @Component({...})
 * export class MyPage{
 *
 *   constructor(public viewCtrl: ViewController) {}
 *
 * }
 * ```
 */
var ViewController = (function () {
    function ViewController(componentType, data) {
        this.componentType = componentType;
        this._tbRefs = [];
        this._hdAttr = null;
        this._leavingOpts = null;
        this._loaded = false;
        this._onDidDismiss = null;
        this._onWillDismiss = null;
        /**
         * @private
         */
        this.instance = {};
        /**
         * @private
         */
        this.state = 0;
        /**
         * @private
         * If this is currently the active view, then set to false
         * if it does not want the other views to fire their own lifecycles.
         */
        this.fireOtherLifecycles = true;
        /**
         * @private
         */
        this.isOverlay = false;
        /**
         * @private
         */
        this._emitter = new core_1.EventEmitter();
        // passed in data could be NavParams, but all we care about is its data object
        this.data = (data instanceof nav_params_1.NavParams ? data.data : (util_1.isPresent(data) ? data : {}));
        this.willEnter = new core_1.EventEmitter();
        this.didEnter = new core_1.EventEmitter();
        this.willLeave = new core_1.EventEmitter();
        this.didLeave = new core_1.EventEmitter();
        this.willUnload = new core_1.EventEmitter();
        this.didUnload = new core_1.EventEmitter();
    }
    /**
     * @private
     */
    ViewController.prototype.subscribe = function (generatorOrNext) {
        return this._emitter.subscribe(generatorOrNext);
    };
    /**
     * @private
     */
    ViewController.prototype.emit = function (data) {
        this._emitter.emit(data);
    };
    /**
     * @private
     * onDismiss(..) has been deprecated. Please use onDidDismiss(..) instead
     */
    ViewController.prototype.onDismiss = function (callback) {
        // deprecated warning: added beta.11 2016-06-30
        void 0;
        this.onDidDismiss(callback);
    };
    /**
     * @private
     */
    ViewController.prototype.onDidDismiss = function (callback) {
        this._onDidDismiss = callback;
    };
    /**
     * @private
     */
    ViewController.prototype.onWillDismiss = function (callback) {
        this._onWillDismiss = callback;
    };
    /**
     * @private
     */
    ViewController.prototype.dismiss = function (data, role, navOptions) {
        var _this = this;
        if (navOptions === void 0) { navOptions = {}; }
        var options = util_1.merge({}, this._leavingOpts, navOptions);
        this._onWillDismiss && this._onWillDismiss(data, role);
        return this._nav.remove(this._nav.indexOf(this), 1, options).then(function () {
            _this._onDidDismiss && _this._onDidDismiss(data, role);
            return data;
        });
    };
    /**
     * @private
     */
    ViewController.prototype.setNav = function (navCtrl) {
        this._nav = navCtrl;
    };
    /**
     * @private
     */
    ViewController.prototype.getNav = function () {
        return this._nav;
    };
    /**
     * @private
     */
    ViewController.prototype.getTransitionName = function (direction) {
        return this._nav && this._nav.config.get('pageTransition');
    };
    /**
     * @private
     */
    ViewController.prototype.getNavParams = function () {
        return new nav_params_1.NavParams(this.data);
    };
    /**
     * @private
     */
    ViewController.prototype.setLeavingOpts = function (opts) {
        this._leavingOpts = opts;
    };
    /**
     * Check to see if you can go back in the navigation stack.
     * @param {boolean} Check whether or not you can go back from this page
     * @returns {boolean} Returns if it's possible to go back from this Page.
     */
    ViewController.prototype.enableBack = function () {
        // update if it's possible to go back from this nav item
        if (this._nav) {
            var previousItem = this._nav.getPrevious(this);
            // the previous view may exist, but if it's about to be destroyed
            // it shouldn't be able to go back to
            return !!(previousItem);
        }
        return false;
    };
    /**
     * @private
     */
    ViewController.prototype.setChangeDetector = function (cd) {
        this._cd = cd;
    };
    /**
     * @private
     */
    ViewController.prototype.setInstance = function (instance) {
        this.instance = instance;
    };
    Object.defineProperty(ViewController.prototype, "name", {
        /**
         * @private
         */
        get: function () {
            return this.componentType ? this.componentType['name'] : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewController.prototype, "index", {
        /**
         * Get the index of the current component in the current navigation stack.
         * @returns {number} Returns the index of this page within its `NavController`.
         */
        get: function () {
            return (this._nav ? this._nav.indexOf(this) : -1);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @returns {boolean} Returns if this Page is the first in the stack of pages within its NavController.
     */
    ViewController.prototype.isFirst = function () {
        return (this._nav ? this._nav.first() === this : false);
    };
    /**
     * @returns {boolean} Returns if this Page is the last in the stack of pages within its NavController.
     */
    ViewController.prototype.isLast = function () {
        return (this._nav ? this._nav.last() === this : false);
    };
    /**
     * @private
     */
    ViewController.prototype.domShow = function (shouldShow, renderer) {
        // using hidden element attribute to display:none and not render views
        // renderAttr of '' means the hidden attribute will be added
        // renderAttr of null means the hidden attribute will be removed
        // doing checks to make sure we only make an update to the element when needed
        if (this._pgRef &&
            (shouldShow && this._hdAttr === '' ||
                !shouldShow && this._hdAttr !== '')) {
            this._hdAttr = (shouldShow ? null : '');
            renderer.setElementAttribute(this._pgRef.nativeElement, 'hidden', this._hdAttr);
        }
    };
    /**
     * @private
     */
    ViewController.prototype.setZIndex = function (zIndex, renderer) {
        if (this._pgRef && zIndex !== this.zIndex) {
            this.zIndex = zIndex;
            renderer.setElementStyle(this._pgRef.nativeElement, 'z-index', zIndex.toString());
        }
    };
    /**
     * @private
     */
    ViewController.prototype.setPageRef = function (elementRef) {
        this._pgRef = elementRef;
    };
    /**
     * @private
     * @returns {elementRef} Returns the Page's ElementRef
     */
    ViewController.prototype.pageRef = function () {
        return this._pgRef;
    };
    /**
     * @private
     */
    ViewController.prototype.setContentRef = function (elementRef) {
        this._cntRef = elementRef;
    };
    /**
     * @private
     * @returns {elementRef} Returns the Page's Content ElementRef
     */
    ViewController.prototype.contentRef = function () {
        return this._cntRef;
    };
    /**
     * @private
     */
    ViewController.prototype.setContent = function (directive) {
        this._cntDir = directive;
    };
    /**
     * @private
     */
    ViewController.prototype.setToolbarRef = function (elementRef) {
        this._tbRefs.push(elementRef);
    };
    /**
     * @private
     */
    ViewController.prototype.toolbarRefs = function () {
        return this._tbRefs;
    };
    /**
     * @private
     */
    ViewController.prototype.setHeader = function (directive) {
        this._hdrDir = directive;
    };
    /**
     * @private
     */
    ViewController.prototype.getHeader = function () {
        return this._hdrDir;
    };
    /**
     * @private
     */
    ViewController.prototype.setFooter = function (directive) {
        this._ftrDir = directive;
    };
    /**
     * @private
     */
    ViewController.prototype.getFooter = function () {
        return this._ftrDir;
    };
    /**
     * @private
     * @returns {component} Returns the Page's Content component reference.
     */
    ViewController.prototype.getContent = function () {
        return this._cntDir;
    };
    /**
     * @private
     */
    ViewController.prototype.setNavbar = function (directive) {
        this._nbDir = directive;
    };
    /**
     * @private
     */
    ViewController.prototype.getNavbar = function () {
        return this._nbDir;
    };
    /**
     *
     * Find out if the current component has a NavBar or not. Be sure
     * to wrap this in an `ionViewWillEnter` method in order to make sure
     * the view has rendered fully.
     * @returns {boolean} Returns a boolean if this Page has a navbar or not.
     */
    ViewController.prototype.hasNavbar = function () {
        return !!this.getNavbar();
    };
    /**
     * @private
     */
    ViewController.prototype.navbarRef = function () {
        var navbar = this.getNavbar();
        return navbar && navbar.getElementRef();
    };
    /**
     * @private
     */
    ViewController.prototype.titleRef = function () {
        var navbar = this.getNavbar();
        return navbar && navbar.getTitleRef();
    };
    /**
     * @private
     */
    ViewController.prototype.navbarItemRefs = function () {
        var navbar = this.getNavbar();
        return navbar && navbar.getItemRefs();
    };
    /**
     * @private
     */
    ViewController.prototype.backBtnRef = function () {
        var navbar = this.getNavbar();
        return navbar && navbar.getBackButtonRef();
    };
    /**
     * @private
     */
    ViewController.prototype.backBtnTextRef = function () {
        var navbar = this.getNavbar();
        return navbar && navbar.getBackButtonTextRef();
    };
    /**
     * @private
     */
    ViewController.prototype.navbarBgRef = function () {
        var navbar = this.getNavbar();
        return navbar && navbar.getBackgroundRef();
    };
    /**
     * Change the title of the back-button. Be sure to call this
     * after `ionViewWillEnter` to make sure the  DOM has been rendered.
     * @param {string} backButtonText Set the back button text.
     */
    ViewController.prototype.setBackButtonText = function (val) {
        var navbar = this.getNavbar();
        if (navbar) {
            navbar.setBackButtonText(val);
        }
    };
    /**
     * Set if the back button for the current view is visible or not. Be sure to call this
     * after `ionViewWillEnter` to make sure the  DOM has been rendered.
     * @param {boolean} Set if this Page's back button should show or not.
     */
    ViewController.prototype.showBackButton = function (shouldShow) {
        var navbar = this.getNavbar();
        if (navbar) {
            navbar.hideBackButton = !shouldShow;
        }
    };
    /**
     * @private
     */
    ViewController.prototype.isLoaded = function () {
        return this._loaded;
    };
    /**
     * The loaded method is used to load any dynamic content/components
     * into the dom before proceeding with the transition.  If a component
     * needs dynamic component loading, extending ViewController and
     * overriding this method is a good option
     * @param {function} done is a callback that must be called when async
     * loading/actions are completed
     */
    ViewController.prototype.loaded = function (done) {
        done();
    };
    /**
     * @private
     * The view has loaded. This event only happens once per view being
     * created. If a view leaves but is cached, then this will not
     * fire again on a subsequent viewing. This method is a good place
     * to put your setup code for the view; however, it is not the
     * recommended method to use when a view becomes active.
     */
    ViewController.prototype.fireLoaded = function () {
        this._loaded = true;
        ctrlFn(this, 'Loaded');
    };
    /**
     * @private
     * The view is about to enter and become the active view.
     */
    ViewController.prototype.fireWillEnter = function () {
        if (this._cd) {
            // ensure this has been re-attached to the change detector
            this._cd.reattach();
            // detect changes before we run any user code
            this._cd.detectChanges();
        }
        this.willEnter.emit(null);
        ctrlFn(this, 'WillEnter');
    };
    /**
     * @private
     * The view has fully entered and is now the active view. This
     * will fire, whether it was the first load or loaded from the cache.
     */
    ViewController.prototype.fireDidEnter = function () {
        var navbar = this.getNavbar();
        navbar && navbar.didEnter();
        this.didEnter.emit(null);
        ctrlFn(this, 'DidEnter');
    };
    /**
     * @private
     * The view has is about to leave and no longer be the active view.
     */
    ViewController.prototype.fireWillLeave = function () {
        this.willLeave.emit(null);
        ctrlFn(this, 'WillLeave');
    };
    /**
     * @private
     * The view has finished leaving and is no longer the active view. This
     * will fire, whether it is cached or unloaded.
     */
    ViewController.prototype.fireDidLeave = function () {
        this.didLeave.emit(null);
        ctrlFn(this, 'DidLeave');
        // when this is not the active page
        // we no longer need to detect changes
        this._cd && this._cd.detach();
    };
    /**
     * @private
     * The view is about to be destroyed and have its elements removed.
     */
    ViewController.prototype.fireWillUnload = function () {
        this.willUnload.emit(null);
        ctrlFn(this, 'WillUnload');
    };
    /**
     * @private
     */
    ViewController.prototype.onDestroy = function (destroyFn) {
        this._destroyFn = destroyFn;
    };
    /**
     * @private
     */
    ViewController.prototype.destroy = function () {
        this.didUnload.emit(null);
        ctrlFn(this, 'DidUnload');
        this._destroyFn && this._destroyFn();
        this._destroyFn = null;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ViewController.prototype, "_emitter", void 0);
    return ViewController;
}());
exports.ViewController = ViewController;
function ctrlFn(viewCtrl, fnName) {
    if (viewCtrl.instance) {
        // deprecated warning: added 2016-06-01, beta.8
        if (viewCtrl.instance['onPage' + fnName]) {
            try {
                void 0;
                viewCtrl.instance['onPage' + fnName]();
            }
            catch (e) {
                void 0;
            }
        }
        // fire off ionView lifecycle instance method
        if (viewCtrl.instance['ionView' + fnName]) {
            try {
                viewCtrl.instance['ionView' + fnName]();
            }
            catch (e) {
                void 0;
            }
        }
    }
}
