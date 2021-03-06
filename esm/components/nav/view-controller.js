var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
import { EventEmitter, Output } from '@angular/core';
import { isPresent, merge } from '../../util/util';
import { NavParams } from './nav-params';
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
export var ViewController = function () {
    function ViewController(componentType, data) {
        _classCallCheck(this, ViewController);

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
        this._emitter = new EventEmitter();
        // passed in data could be NavParams, but all we care about is its data object
        this.data = data instanceof NavParams ? data.data : isPresent(data) ? data : {};
        this.willEnter = new EventEmitter();
        this.didEnter = new EventEmitter();
        this.willLeave = new EventEmitter();
        this.didLeave = new EventEmitter();
        this.willUnload = new EventEmitter();
        this.didUnload = new EventEmitter();
    }
    /**
     * @private
     */


    _createClass(ViewController, [{
        key: "subscribe",
        value: function subscribe(generatorOrNext) {
            return this._emitter.subscribe(generatorOrNext);
        }
        /**
         * @private
         */

    }, {
        key: "emit",
        value: function emit(data) {
            this._emitter.emit(data);
        }
        /**
         * @private
         * onDismiss(..) has been deprecated. Please use onDidDismiss(..) instead
         */

    }, {
        key: "onDismiss",
        value: function onDismiss(callback) {
            // deprecated warning: added beta.11 2016-06-30
            console.warn('onDismiss(..) has been deprecated. Please use onDidDismiss(..) instead');
            this.onDidDismiss(callback);
        }
        /**
         * @private
         */

    }, {
        key: "onDidDismiss",
        value: function onDidDismiss(callback) {
            this._onDidDismiss = callback;
        }
        /**
         * @private
         */

    }, {
        key: "onWillDismiss",
        value: function onWillDismiss(callback) {
            this._onWillDismiss = callback;
        }
        /**
         * @private
         */

    }, {
        key: "dismiss",
        value: function dismiss(data, role) {
            var _this = this;

            var navOptions = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            var options = merge({}, this._leavingOpts, navOptions);
            this._onWillDismiss && this._onWillDismiss(data, role);
            return this._nav.remove(this._nav.indexOf(this), 1, options).then(function () {
                _this._onDidDismiss && _this._onDidDismiss(data, role);
                return data;
            });
        }
        /**
         * @private
         */

    }, {
        key: "setNav",
        value: function setNav(navCtrl) {
            this._nav = navCtrl;
        }
        /**
         * @private
         */

    }, {
        key: "getNav",
        value: function getNav() {
            return this._nav;
        }
        /**
         * @private
         */

    }, {
        key: "getTransitionName",
        value: function getTransitionName(direction) {
            return this._nav && this._nav.config.get('pageTransition');
        }
        /**
         * @private
         */

    }, {
        key: "getNavParams",
        value: function getNavParams() {
            return new NavParams(this.data);
        }
        /**
         * @private
         */

    }, {
        key: "setLeavingOpts",
        value: function setLeavingOpts(opts) {
            this._leavingOpts = opts;
        }
        /**
         * Check to see if you can go back in the navigation stack.
         * @param {boolean} Check whether or not you can go back from this page
         * @returns {boolean} Returns if it's possible to go back from this Page.
         */

    }, {
        key: "enableBack",
        value: function enableBack() {
            // update if it's possible to go back from this nav item
            if (this._nav) {
                var previousItem = this._nav.getPrevious(this);
                // the previous view may exist, but if it's about to be destroyed
                // it shouldn't be able to go back to
                return !!previousItem;
            }
            return false;
        }
        /**
         * @private
         */

    }, {
        key: "setChangeDetector",
        value: function setChangeDetector(cd) {
            this._cd = cd;
        }
        /**
         * @private
         */

    }, {
        key: "setInstance",
        value: function setInstance(instance) {
            this.instance = instance;
        }
        /**
         * @private
         */

    }, {
        key: "isFirst",

        /**
         * @returns {boolean} Returns if this Page is the first in the stack of pages within its NavController.
         */
        value: function isFirst() {
            return this._nav ? this._nav.first() === this : false;
        }
        /**
         * @returns {boolean} Returns if this Page is the last in the stack of pages within its NavController.
         */

    }, {
        key: "isLast",
        value: function isLast() {
            return this._nav ? this._nav.last() === this : false;
        }
        /**
         * @private
         */

    }, {
        key: "domShow",
        value: function domShow(shouldShow, renderer) {
            // using hidden element attribute to display:none and not render views
            // renderAttr of '' means the hidden attribute will be added
            // renderAttr of null means the hidden attribute will be removed
            // doing checks to make sure we only make an update to the element when needed
            if (this._pgRef && (shouldShow && this._hdAttr === '' || !shouldShow && this._hdAttr !== '')) {
                this._hdAttr = shouldShow ? null : '';
                renderer.setElementAttribute(this._pgRef.nativeElement, 'hidden', this._hdAttr);
            }
        }
        /**
         * @private
         */

    }, {
        key: "setZIndex",
        value: function setZIndex(zIndex, renderer) {
            if (this._pgRef && zIndex !== this.zIndex) {
                this.zIndex = zIndex;
                renderer.setElementStyle(this._pgRef.nativeElement, 'z-index', zIndex.toString());
            }
        }
        /**
         * @private
         */

    }, {
        key: "setPageRef",
        value: function setPageRef(elementRef) {
            this._pgRef = elementRef;
        }
        /**
         * @private
         * @returns {elementRef} Returns the Page's ElementRef
         */

    }, {
        key: "pageRef",
        value: function pageRef() {
            return this._pgRef;
        }
        /**
         * @private
         */

    }, {
        key: "setContentRef",
        value: function setContentRef(elementRef) {
            this._cntRef = elementRef;
        }
        /**
         * @private
         * @returns {elementRef} Returns the Page's Content ElementRef
         */

    }, {
        key: "contentRef",
        value: function contentRef() {
            return this._cntRef;
        }
        /**
         * @private
         */

    }, {
        key: "setContent",
        value: function setContent(directive) {
            this._cntDir = directive;
        }
        /**
         * @private
         */

    }, {
        key: "setToolbarRef",
        value: function setToolbarRef(elementRef) {
            this._tbRefs.push(elementRef);
        }
        /**
         * @private
         */

    }, {
        key: "toolbarRefs",
        value: function toolbarRefs() {
            return this._tbRefs;
        }
        /**
         * @private
         */

    }, {
        key: "setHeader",
        value: function setHeader(directive) {
            this._hdrDir = directive;
        }
        /**
         * @private
         */

    }, {
        key: "getHeader",
        value: function getHeader() {
            return this._hdrDir;
        }
        /**
         * @private
         */

    }, {
        key: "setFooter",
        value: function setFooter(directive) {
            this._ftrDir = directive;
        }
        /**
         * @private
         */

    }, {
        key: "getFooter",
        value: function getFooter() {
            return this._ftrDir;
        }
        /**
         * @private
         * @returns {component} Returns the Page's Content component reference.
         */

    }, {
        key: "getContent",
        value: function getContent() {
            return this._cntDir;
        }
        /**
         * @private
         */

    }, {
        key: "setNavbar",
        value: function setNavbar(directive) {
            this._nbDir = directive;
        }
        /**
         * @private
         */

    }, {
        key: "getNavbar",
        value: function getNavbar() {
            return this._nbDir;
        }
        /**
         *
         * Find out if the current component has a NavBar or not. Be sure
         * to wrap this in an `ionViewWillEnter` method in order to make sure
         * the view has rendered fully.
         * @returns {boolean} Returns a boolean if this Page has a navbar or not.
         */

    }, {
        key: "hasNavbar",
        value: function hasNavbar() {
            return !!this.getNavbar();
        }
        /**
         * @private
         */

    }, {
        key: "navbarRef",
        value: function navbarRef() {
            var navbar = this.getNavbar();
            return navbar && navbar.getElementRef();
        }
        /**
         * @private
         */

    }, {
        key: "titleRef",
        value: function titleRef() {
            var navbar = this.getNavbar();
            return navbar && navbar.getTitleRef();
        }
        /**
         * @private
         */

    }, {
        key: "navbarItemRefs",
        value: function navbarItemRefs() {
            var navbar = this.getNavbar();
            return navbar && navbar.getItemRefs();
        }
        /**
         * @private
         */

    }, {
        key: "backBtnRef",
        value: function backBtnRef() {
            var navbar = this.getNavbar();
            return navbar && navbar.getBackButtonRef();
        }
        /**
         * @private
         */

    }, {
        key: "backBtnTextRef",
        value: function backBtnTextRef() {
            var navbar = this.getNavbar();
            return navbar && navbar.getBackButtonTextRef();
        }
        /**
         * @private
         */

    }, {
        key: "navbarBgRef",
        value: function navbarBgRef() {
            var navbar = this.getNavbar();
            return navbar && navbar.getBackgroundRef();
        }
        /**
         * Change the title of the back-button. Be sure to call this
         * after `ionViewWillEnter` to make sure the  DOM has been rendered.
         * @param {string} backButtonText Set the back button text.
         */

    }, {
        key: "setBackButtonText",
        value: function setBackButtonText(val) {
            var navbar = this.getNavbar();
            if (navbar) {
                navbar.setBackButtonText(val);
            }
        }
        /**
         * Set if the back button for the current view is visible or not. Be sure to call this
         * after `ionViewWillEnter` to make sure the  DOM has been rendered.
         * @param {boolean} Set if this Page's back button should show or not.
         */

    }, {
        key: "showBackButton",
        value: function showBackButton(shouldShow) {
            var navbar = this.getNavbar();
            if (navbar) {
                navbar.hideBackButton = !shouldShow;
            }
        }
        /**
         * @private
         */

    }, {
        key: "isLoaded",
        value: function isLoaded() {
            return this._loaded;
        }
        /**
         * The loaded method is used to load any dynamic content/components
         * into the dom before proceeding with the transition.  If a component
         * needs dynamic component loading, extending ViewController and
         * overriding this method is a good option
         * @param {function} done is a callback that must be called when async
         * loading/actions are completed
         */

    }, {
        key: "loaded",
        value: function loaded(done) {
            done();
        }
        /**
         * @private
         * The view has loaded. This event only happens once per view being
         * created. If a view leaves but is cached, then this will not
         * fire again on a subsequent viewing. This method is a good place
         * to put your setup code for the view; however, it is not the
         * recommended method to use when a view becomes active.
         */

    }, {
        key: "fireLoaded",
        value: function fireLoaded() {
            this._loaded = true;
            ctrlFn(this, 'Loaded');
        }
        /**
         * @private
         * The view is about to enter and become the active view.
         */

    }, {
        key: "fireWillEnter",
        value: function fireWillEnter() {
            if (this._cd) {
                // ensure this has been re-attached to the change detector
                this._cd.reattach();
                // detect changes before we run any user code
                this._cd.detectChanges();
            }
            this.willEnter.emit(null);
            ctrlFn(this, 'WillEnter');
        }
        /**
         * @private
         * The view has fully entered and is now the active view. This
         * will fire, whether it was the first load or loaded from the cache.
         */

    }, {
        key: "fireDidEnter",
        value: function fireDidEnter() {
            var navbar = this.getNavbar();
            navbar && navbar.didEnter();
            this.didEnter.emit(null);
            ctrlFn(this, 'DidEnter');
        }
        /**
         * @private
         * The view has is about to leave and no longer be the active view.
         */

    }, {
        key: "fireWillLeave",
        value: function fireWillLeave() {
            this.willLeave.emit(null);
            ctrlFn(this, 'WillLeave');
        }
        /**
         * @private
         * The view has finished leaving and is no longer the active view. This
         * will fire, whether it is cached or unloaded.
         */

    }, {
        key: "fireDidLeave",
        value: function fireDidLeave() {
            this.didLeave.emit(null);
            ctrlFn(this, 'DidLeave');
            // when this is not the active page
            // we no longer need to detect changes
            this._cd && this._cd.detach();
        }
        /**
         * @private
         * The view is about to be destroyed and have its elements removed.
         */

    }, {
        key: "fireWillUnload",
        value: function fireWillUnload() {
            this.willUnload.emit(null);
            ctrlFn(this, 'WillUnload');
        }
        /**
         * @private
         */

    }, {
        key: "onDestroy",
        value: function onDestroy(destroyFn) {
            this._destroyFn = destroyFn;
        }
        /**
         * @private
         */

    }, {
        key: "destroy",
        value: function destroy() {
            this.didUnload.emit(null);
            ctrlFn(this, 'DidUnload');
            this._destroyFn && this._destroyFn();
            this._destroyFn = null;
        }
    }, {
        key: "name",
        get: function get() {
            return this.componentType ? this.componentType['name'] : '';
        }
        /**
         * Get the index of the current component in the current navigation stack.
         * @returns {number} Returns the index of this page within its `NavController`.
         */

    }, {
        key: "index",
        get: function get() {
            return this._nav ? this._nav.indexOf(this) : -1;
        }
    }]);

    return ViewController;
}();
__decorate([Output(), __metadata('design:type', typeof (_a = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _a || Object)], ViewController.prototype, "_emitter", void 0);
function ctrlFn(viewCtrl, fnName) {
    if (viewCtrl.instance) {
        // deprecated warning: added 2016-06-01, beta.8
        if (viewCtrl.instance['onPage' + fnName]) {
            try {
                console.warn('onPage' + fnName + '() has been deprecated. Please rename to ionView' + fnName + '()');
                viewCtrl.instance['onPage' + fnName]();
            } catch (e) {
                console.error(viewCtrl.name + ' onPage' + fnName + ': ' + e.message);
            }
        }
        // fire off ionView lifecycle instance method
        if (viewCtrl.instance['ionView' + fnName]) {
            try {
                viewCtrl.instance['ionView' + fnName]();
            } catch (e) {
                console.error(viewCtrl.name + ' ionView' + fnName + ': ' + e.message);
            }
        }
    }
}
var _a;