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
var ion_1 = require('../ion');
var config_1 = require('../../config/config');
var keyboard_1 = require('../../util/keyboard');
var dom_1 = require('../../util/dom');
var scroll_view_1 = require('../../util/scroll-view');
var tabs_1 = require('../tabs/tabs');
var view_controller_1 = require('../nav/view-controller');
var util_1 = require('../../util/util');
/**
 * @name Content
 * @description
 * The Content component provides an easy to use content area with
 * some useful methods to control the scrollable area.
 *
 * The content area can also implement pull-to-refresh with the
 * [Refresher](../../refresher/Refresher) component.
 *
 * @usage
 * ```html
 * <ion-content>
 *   Add your content here!
 * </ion-content>
 * ```
 *
 * To get a reference to the content component from a Page's logic,
 * you can use Angular's `@ViewChild` annotation:
 *
 * ```ts
 * import { Component, ViewChild } from '@angular/core';
 * import { Content } from 'ionic-angular';
 *
 * @Component({...})
 * export class MyPage{
 *   @ViewChild(Content) content: Content;
 *
 *   scrollToTop() {
 *     this.content.scrollToTop();
 *   }
 * }
 * ```
 *
 * @advanced
 *
 * Resizing the content
 *
 *
 * ```ts
 * @Component({
 *   template: `
 *     <ion-header>
 *       <ion-navbar>
 *         <ion-title>Main Navbar</ion-title>
 *       </ion-navbar>
 *       <ion-toolbar *ngIf="showToolbar">
 *         <ion-title>Dynamic Toolbar</ion-title>
 *       </ion-toolbar>
 *     </ion-header>
 *     <ion-content>
 *       <button (click)="toggleToolbar()">Toggle Toolbar</button>
 *     </ion-content>
 * `})
 *
 * class E2EPage {
 *   @ViewChild(Content) content: Content;
 *   showToolbar: boolean = false;
 *
 *   toggleToolbar() {
 *     this.showToolbar = !this.showToolbar;
 *     this.content.resize();
 *   }
 * }
 * ```
 *
 *
 * Scroll to a specific position
 *
 * ```ts
 * import { Component, ViewChild } from '@angular/core';
 * import { Content } from 'ionic-angular';
 *
 * @Component({
 *   template: `<ion-content>
 *                <button (click)="scrollTo()">Down 500px</button>
 *              </ion-content>`
 * )}
 * export class MyPage{
 *   @ViewChild(Content) content: Content;
 *
 *   scrollTo() {
 *     // set the scrollLeft to 0px, and scrollTop to 500px
 *     // the scroll duration should take 200ms
 *     this.content.scrollTo(0, 500, 200);
 *   }
 * }
 * ```
 *
 */
var Content = (function (_super) {
    __extends(Content, _super);
    function Content(_elementRef, config, _app, _keyboard, _zone, viewCtrl, _tabs) {
        _super.call(this, _elementRef);
        this._elementRef = _elementRef;
        this._app = _app;
        this._keyboard = _keyboard;
        this._zone = _zone;
        this._tabs = _tabs;
        this._inputPolling = false;
        this._sbPadding = config.getBoolean('statusbarPadding', false);
        if (viewCtrl) {
            viewCtrl.setContent(this);
            viewCtrl.setContentRef(_elementRef);
        }
    }
    /**
     * @private
     */
    Content.prototype.ngOnInit = function () {
        var _this = this;
        this._scrollEle = this._elementRef.nativeElement.children[0];
        this._zone.runOutsideAngular(function () {
            _this._scroll = new scroll_view_1.ScrollView(_this._scrollEle);
            _this._scLsn = _this.addScrollListener(_this._app.setScrolling);
        });
    };
    /**
     * @private
     */
    Content.prototype.ngOnDestroy = function () {
        this._scLsn && this._scLsn();
        this._scroll && this._scroll.destroy();
        this._scrollEle = this._footerEle = this._scLsn = this._scroll = null;
    };
    /**
     * @private
     */
    Content.prototype.addScrollListener = function (handler) {
        return this._addListener('scroll', handler);
    };
    /**
     * @private
     */
    Content.prototype.addTouchStartListener = function (handler) {
        return this._addListener('touchstart', handler);
    };
    /**
     * @private
     */
    Content.prototype.addTouchMoveListener = function (handler) {
        return this._addListener('touchmove', handler);
    };
    /**
     * @private
     */
    Content.prototype.addTouchEndListener = function (handler) {
        return this._addListener('touchend', handler);
    };
    /**
     * @private
     */
    Content.prototype.addMouseDownListener = function (handler) {
        return this._addListener('mousedown', handler);
    };
    /**
     * @private
     */
    Content.prototype.addMouseUpListener = function (handler) {
        return this._addListener('mouseup', handler);
    };
    /**
     * @private
     */
    Content.prototype.addMouseMoveListener = function (handler) {
        return this._addListener('mousemove', handler);
    };
    Content.prototype._addListener = function (type, handler) {
        var _this = this;
        if (!this._scrollEle) {
            return;
        }
        // ensure we're not creating duplicates
        this._scrollEle.removeEventListener(type, handler);
        this._scrollEle.addEventListener(type, handler);
        return function () {
            if (_this._scrollEle) {
                _this._scrollEle.removeEventListener(type, handler);
            }
        };
    };
    /**
     * @private
     */
    Content.prototype.getScrollElement = function () {
        return this._scrollEle;
    };
    /**
     * @private
     * Call a method when scrolling has stopped
     * @param {Function} callback The method you want perform when scrolling has ended
     */
    Content.prototype.onScrollEnd = function (callback) {
        var lastScrollTop = null;
        var framesUnchanged = 0;
        var _scrollEle = this._scrollEle;
        function next() {
            var currentScrollTop = _scrollEle.scrollTop;
            if (lastScrollTop !== null) {
                if (Math.round(lastScrollTop) === Math.round(currentScrollTop)) {
                    framesUnchanged++;
                }
                else {
                    framesUnchanged = 0;
                }
                if (framesUnchanged > 9) {
                    return callback();
                }
            }
            lastScrollTop = currentScrollTop;
            dom_1.nativeRaf(function () {
                dom_1.nativeRaf(next);
            });
        }
        dom_1.nativeTimeout(next, 100);
    };
    /**
     * @private
     */
    Content.prototype.onScrollElementTransitionEnd = function (callback) {
        dom_1.transitionEnd(this._scrollEle, callback);
    };
    /**
     * Scroll to the specified position.
     *
     * @param {number} x  The x-value to scroll to.
     * @param {number} y  The y-value to scroll to.
     * @param {number} [duration]  Duration of the scroll animation in milliseconds. Defaults to `300`.
     * @returns {Promise} Returns a promise which is resolved when the scroll has completed.
     */
    Content.prototype.scrollTo = function (x, y, duration) {
        if (duration === void 0) { duration = 300; }
        return this._scroll.scrollTo(x, y, duration);
    };
    /**
     * Scroll to the top of the content component.
     *
     * @param {number} [duration]  Duration of the scroll animation in milliseconds. Defaults to `300`.
     * @returns {Promise} Returns a promise which is resolved when the scroll has completed.
     */
    Content.prototype.scrollToTop = function (duration) {
        if (duration === void 0) { duration = 300; }
        return this._scroll.scrollToTop(duration);
    };
    /**
     * Get the `scrollTop` property of the content's scrollable element.
     * @returns {number}
     */
    Content.prototype.getScrollTop = function () {
        return this._scroll.getTop();
    };
    /**
     * Set the `scrollTop` property of the content's scrollable element.
     * @param {number} top
     */
    Content.prototype.setScrollTop = function (top) {
        this._scroll.setTop(top);
    };
    /**
     * Scroll to the bottom of the content component.
     * @param {number} [duration]  Duration of the scroll animation in milliseconds. Defaults to `300`.
     * @returns {Promise} Returns a promise which is resolved when the scroll has completed.
     */
    Content.prototype.scrollToBottom = function (duration) {
        if (duration === void 0) { duration = 300; }
        return this._scroll.scrollToBottom(duration);
    };
    /**
     * @private
     */
    Content.prototype.jsScroll = function (onScrollCallback) {
        return this._scroll.jsScroll(onScrollCallback);
    };
    /**
     * @private
     * DOM WRITE
     */
    Content.prototype.addCssClass = function (className) {
        this.getNativeElement().classList.add(className);
    };
    Object.defineProperty(Content.prototype, "fullscreen", {
        /**
         * @input {boolean} By default, content is positioned between the headers
         * and footers. However, using `fullscreen="true"`, the content will be
         * able to scroll "under" the headers and footers. At first glance the
         * fullscreen option may not look any different than the default, however,
         * by adding a transparency effect to a header then the content can be
         * seen under the header as the user scrolls.
         */
        get: function () {
            return !!this._fullscreen;
        },
        set: function (val) {
            this._fullscreen = util_1.isTrueProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * DOM WRITE
     */
    Content.prototype.removeCssClass = function (className) {
        this.getNativeElement().classList.remove(className);
    };
    /**
     * @private
     * DOM WRITE
     */
    Content.prototype.setScrollElementStyle = function (prop, val) {
        this._scrollEle.style[prop] = val;
    };
    /**
     * Returns the content and scroll elements' dimensions.
     * @returns {object} dimensions  The content and scroll elements' dimensions
     * {number} dimensions.contentHeight  content offsetHeight
     * {number} dimensions.contentTop  content offsetTop
     * {number} dimensions.contentBottom  content offsetTop+offsetHeight
     * {number} dimensions.contentWidth  content offsetWidth
     * {number} dimensions.contentLeft  content offsetLeft
     * {number} dimensions.contentRight  content offsetLeft + offsetWidth
     * {number} dimensions.scrollHeight  scroll scrollHeight
     * {number} dimensions.scrollTop  scroll scrollTop
     * {number} dimensions.scrollBottom  scroll scrollTop + scrollHeight
     * {number} dimensions.scrollWidth  scroll scrollWidth
     * {number} dimensions.scrollLeft  scroll scrollLeft
     * {number} dimensions.scrollRight  scroll scrollLeft + scrollWidth
     */
    Content.prototype.getContentDimensions = function () {
        var _scrollEle = this._scrollEle;
        var parentElement = _scrollEle.parentElement;
        return {
            contentHeight: parentElement.offsetHeight,
            contentTop: parentElement.offsetTop,
            contentBottom: parentElement.offsetTop + parentElement.offsetHeight,
            contentWidth: parentElement.offsetWidth,
            contentLeft: parentElement.offsetLeft,
            contentRight: parentElement.offsetLeft + parentElement.offsetWidth,
            scrollHeight: _scrollEle.scrollHeight,
            scrollTop: _scrollEle.scrollTop,
            scrollBottom: _scrollEle.scrollTop + _scrollEle.scrollHeight,
            scrollWidth: _scrollEle.scrollWidth,
            scrollLeft: _scrollEle.scrollLeft,
            scrollRight: _scrollEle.scrollLeft + _scrollEle.scrollWidth,
        };
    };
    /**
     * @private
     * DOM WRITE
     * Adds padding to the bottom of the scroll element when the keyboard is open
     * so content below the keyboard can be scrolled into view.
     */
    Content.prototype.addScrollPadding = function (newPadding) {
        if (newPadding > this._scrollPadding) {
            void 0;
            this._scrollPadding = newPadding;
            this._scrollEle.style.paddingBottom = newPadding + 'px';
        }
    };
    /**
     * @private
     * DOM WRITE
     */
    Content.prototype.clearScrollPaddingFocusOut = function () {
        var _this = this;
        if (!this._inputPolling) {
            this._inputPolling = true;
            this._keyboard.onClose(function () {
                _this._scrollPadding = 0;
                _this._scrollEle.style.paddingBottom = (_this._paddingBottom > 0 ? _this._paddingBottom + 'px' : '');
                _this._inputPolling = false;
                _this.addScrollPadding(0);
            }, 200, Infinity);
        }
    };
    /**
     * Tell the content to recalculate its dimensions. This should be called
     * after dynamically adding headers, footers, or tabs.
     *
     */
    Content.prototype.resize = function () {
        var _this = this;
        dom_1.nativeRaf(function () {
            _this.readDimensions();
            _this.writeDimensions();
        });
    };
    /**
     * @private
     * DOM READ
     */
    Content.prototype.readDimensions = function () {
        this._paddingTop = 0;
        this._paddingRight = 0;
        this._paddingBottom = 0;
        this._paddingLeft = 0;
        this._headerHeight = 0;
        this._footerHeight = 0;
        this._tabsPlacement = null;
        var ele = this._elementRef.nativeElement;
        if (!ele)
            return;
        var parentEle = ele.parentElement;
        var computedStyle;
        for (var i = 0; i < parentEle.children.length; i++) {
            ele = parentEle.children[i];
            if (ele.tagName === 'ION-CONTENT') {
                if (this._fullscreen) {
                    computedStyle = getComputedStyle(ele);
                    this._paddingTop = parsePxUnit(computedStyle.paddingTop);
                    this._paddingBottom = parsePxUnit(computedStyle.paddingBottom);
                    this._paddingRight = parsePxUnit(computedStyle.paddingRight);
                    this._paddingLeft = parsePxUnit(computedStyle.paddingLeft);
                }
            }
            else if (ele.tagName === 'ION-HEADER') {
                this._headerHeight = ele.clientHeight;
            }
            else if (ele.tagName === 'ION-FOOTER') {
                this._footerHeight = ele.clientHeight;
                this._footerEle = ele;
            }
        }
        ele = parentEle;
        var tabbarEle;
        while (ele && ele.tagName !== 'ION-MODAL' && !ele.classList.contains('tab-subpage')) {
            if (ele.tagName === 'ION-TABS') {
                tabbarEle = ele.firstElementChild;
                this._tabbarHeight = tabbarEle.clientHeight;
                if (this._tabsPlacement === null) {
                    // this is the first tabbar found, remember it's position
                    this._tabsPlacement = ele.getAttribute('tabsplacement');
                }
            }
            ele = ele.parentElement;
        }
    };
    /**
     * @private
     * DOM WRITE
     */
    Content.prototype.writeDimensions = function () {
        var newVal;
        var scrollEle = this._scrollEle;
        if (!scrollEle)
            return;
        // only write when it has changed
        if (this._fullscreen) {
            // adjust the content with padding, allowing content to scroll under headers/footers
            // however, on iOS you cannot control the margins of the scrollbar (last tested iOS9.2)
            // only add inline padding styles if the computed padding value, which would
            // have come from the app's css, is different than the new padding value
            newVal = this._headerHeight + this._paddingTop;
            if (this._tabsPlacement === 'top') {
                newVal += this._tabbarHeight;
            }
            if (newVal !== this.contentTop) {
                scrollEle.style.paddingTop = (newVal > 0 ? newVal + 'px' : '');
                this.contentTop = newVal;
            }
            newVal = this._footerHeight + this._paddingBottom;
            if (this._tabsPlacement === 'bottom') {
                newVal += this._tabbarHeight;
                if (newVal > 0 && this._footerEle) {
                    this._footerEle.style.bottom = (newVal - this._footerHeight - this._paddingBottom) + 'px';
                }
            }
            if (newVal !== this.contentBottom) {
                scrollEle.style.paddingBottom = (newVal > 0 ? newVal + 'px' : '');
                this.contentBottom = newVal;
            }
        }
        else {
            // adjust the content with margins
            newVal = this._headerHeight;
            if (this._tabsPlacement === 'top') {
                newVal += this._tabbarHeight;
            }
            if (newVal !== this.contentTop) {
                scrollEle.style.marginTop = (newVal > 0 ? newVal + 'px' : '');
                this.contentTop = newVal;
            }
            newVal = this._footerHeight;
            if (this._tabsPlacement === 'bottom') {
                newVal += this._tabbarHeight;
            }
            if (newVal !== this.contentBottom) {
                scrollEle.style.marginBottom = (newVal > 0 ? newVal + 'px' : '');
                this.contentBottom = newVal;
                if (newVal > 0 && this._footerEle) {
                    this._footerEle.style.bottom = (newVal - this._footerHeight) + 'px';
                }
            }
        }
        if (this._tabsPlacement !== null && this._tabs) {
            // set the position of the tabbar
            if (this._tabsPlacement === 'top') {
                this._tabs.setTabbarPosition(this._headerHeight, -1);
            }
            else {
                this._tabs.setTabbarPosition(-1, 0);
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Content.prototype, "fullscreen", null);
    Content = __decorate([
        core_1.Component({
            selector: 'ion-content',
            template: '<scroll-content>' +
                '<ng-content></ng-content>' +
                '</scroll-content>' +
                '<ng-content select="ion-fixed"></ng-content>' +
                '<ng-content select="ion-refresher"></ng-content>',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            encapsulation: core_1.ViewEncapsulation.None,
            host: {
                '[class.statusbar-padding]': '_sbPadding'
            }
        }),
        __param(5, core_1.Optional()),
        __param(6, core_1.Optional()), 
        __metadata('design:paramtypes', [core_1.ElementRef, config_1.Config, app_1.App, keyboard_1.Keyboard, core_1.NgZone, view_controller_1.ViewController, tabs_1.Tabs])
    ], Content);
    return Content;
}(ion_1.Ion));
exports.Content = Content;
function parsePxUnit(val) {
    return (val.indexOf('px') > 0) ? parseInt(val, 10) : 0;
}
