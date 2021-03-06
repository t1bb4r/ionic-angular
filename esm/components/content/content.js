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
import { ChangeDetectionStrategy, Component, ElementRef, Input, NgZone, Optional, ViewEncapsulation } from '@angular/core';
import { App } from '../app/app';
import { Ion } from '../ion';
import { Config } from '../../config/config';
import { Keyboard } from '../../util/keyboard';
import { nativeRaf, nativeTimeout, transitionEnd } from '../../util/dom';
import { ScrollView } from '../../util/scroll-view';
import { Tabs } from '../tabs/tabs';
import { ViewController } from '../nav/view-controller';
import { isTrueProperty } from '../../util/util';
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
export var Content = function (_Ion) {
    _inherits(Content, _Ion);

    function Content(_elementRef, config, _app, _keyboard, _zone, viewCtrl, _tabs) {
        _classCallCheck(this, Content);

        var _this = _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this, _elementRef));

        _this._elementRef = _elementRef;
        _this._app = _app;
        _this._keyboard = _keyboard;
        _this._zone = _zone;
        _this._tabs = _tabs;
        _this._inputPolling = false;
        _this._sbPadding = config.getBoolean('statusbarPadding', false);
        if (viewCtrl) {
            viewCtrl.setContent(_this);
            viewCtrl.setContentRef(_elementRef);
        }
        return _this;
    }
    /**
     * @private
     */


    _createClass(Content, [{
        key: "ngOnInit",
        value: function ngOnInit() {
            var _this2 = this;

            this._scrollEle = this._elementRef.nativeElement.children[0];
            this._zone.runOutsideAngular(function () {
                _this2._scroll = new ScrollView(_this2._scrollEle);
                _this2._scLsn = _this2.addScrollListener(_this2._app.setScrolling);
            });
        }
        /**
         * @private
         */

    }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
            this._scLsn && this._scLsn();
            this._scroll && this._scroll.destroy();
            this._scrollEle = this._footerEle = this._scLsn = this._scroll = null;
        }
        /**
         * @private
         */

    }, {
        key: "addScrollListener",
        value: function addScrollListener(handler) {
            return this._addListener('scroll', handler);
        }
        /**
         * @private
         */

    }, {
        key: "addTouchStartListener",
        value: function addTouchStartListener(handler) {
            return this._addListener('touchstart', handler);
        }
        /**
         * @private
         */

    }, {
        key: "addTouchMoveListener",
        value: function addTouchMoveListener(handler) {
            return this._addListener('touchmove', handler);
        }
        /**
         * @private
         */

    }, {
        key: "addTouchEndListener",
        value: function addTouchEndListener(handler) {
            return this._addListener('touchend', handler);
        }
        /**
         * @private
         */

    }, {
        key: "addMouseDownListener",
        value: function addMouseDownListener(handler) {
            return this._addListener('mousedown', handler);
        }
        /**
         * @private
         */

    }, {
        key: "addMouseUpListener",
        value: function addMouseUpListener(handler) {
            return this._addListener('mouseup', handler);
        }
        /**
         * @private
         */

    }, {
        key: "addMouseMoveListener",
        value: function addMouseMoveListener(handler) {
            return this._addListener('mousemove', handler);
        }
    }, {
        key: "_addListener",
        value: function _addListener(type, handler) {
            var _this3 = this;

            if (!this._scrollEle) {
                return;
            }
            // ensure we're not creating duplicates
            this._scrollEle.removeEventListener(type, handler);
            this._scrollEle.addEventListener(type, handler);
            return function () {
                if (_this3._scrollEle) {
                    _this3._scrollEle.removeEventListener(type, handler);
                }
            };
        }
        /**
         * @private
         */

    }, {
        key: "getScrollElement",
        value: function getScrollElement() {
            return this._scrollEle;
        }
        /**
         * @private
         * Call a method when scrolling has stopped
         * @param {Function} callback The method you want perform when scrolling has ended
         */

    }, {
        key: "onScrollEnd",
        value: function onScrollEnd(callback) {
            var lastScrollTop = null;
            var framesUnchanged = 0;
            var _scrollEle = this._scrollEle;
            function next() {
                var currentScrollTop = _scrollEle.scrollTop;
                if (lastScrollTop !== null) {
                    if (Math.round(lastScrollTop) === Math.round(currentScrollTop)) {
                        framesUnchanged++;
                    } else {
                        framesUnchanged = 0;
                    }
                    if (framesUnchanged > 9) {
                        return callback();
                    }
                }
                lastScrollTop = currentScrollTop;
                nativeRaf(function () {
                    nativeRaf(next);
                });
            }
            nativeTimeout(next, 100);
        }
        /**
         * @private
         */

    }, {
        key: "onScrollElementTransitionEnd",
        value: function onScrollElementTransitionEnd(callback) {
            transitionEnd(this._scrollEle, callback);
        }
        /**
         * Scroll to the specified position.
         *
         * @param {number} x  The x-value to scroll to.
         * @param {number} y  The y-value to scroll to.
         * @param {number} [duration]  Duration of the scroll animation in milliseconds. Defaults to `300`.
         * @returns {Promise} Returns a promise which is resolved when the scroll has completed.
         */

    }, {
        key: "scrollTo",
        value: function scrollTo(x, y) {
            var duration = arguments.length <= 2 || arguments[2] === undefined ? 300 : arguments[2];

            return this._scroll.scrollTo(x, y, duration);
        }
        /**
         * Scroll to the top of the content component.
         *
         * @param {number} [duration]  Duration of the scroll animation in milliseconds. Defaults to `300`.
         * @returns {Promise} Returns a promise which is resolved when the scroll has completed.
         */

    }, {
        key: "scrollToTop",
        value: function scrollToTop() {
            var duration = arguments.length <= 0 || arguments[0] === undefined ? 300 : arguments[0];

            return this._scroll.scrollToTop(duration);
        }
        /**
         * Get the `scrollTop` property of the content's scrollable element.
         * @returns {number}
         */

    }, {
        key: "getScrollTop",
        value: function getScrollTop() {
            return this._scroll.getTop();
        }
        /**
         * Set the `scrollTop` property of the content's scrollable element.
         * @param {number} top
         */

    }, {
        key: "setScrollTop",
        value: function setScrollTop(top) {
            this._scroll.setTop(top);
        }
        /**
         * Scroll to the bottom of the content component.
         * @param {number} [duration]  Duration of the scroll animation in milliseconds. Defaults to `300`.
         * @returns {Promise} Returns a promise which is resolved when the scroll has completed.
         */

    }, {
        key: "scrollToBottom",
        value: function scrollToBottom() {
            var duration = arguments.length <= 0 || arguments[0] === undefined ? 300 : arguments[0];

            return this._scroll.scrollToBottom(duration);
        }
        /**
         * @private
         */

    }, {
        key: "jsScroll",
        value: function jsScroll(onScrollCallback) {
            return this._scroll.jsScroll(onScrollCallback);
        }
        /**
         * @private
         * DOM WRITE
         */

    }, {
        key: "addCssClass",
        value: function addCssClass(className) {
            this.getNativeElement().classList.add(className);
        }
        /**
         * @input {boolean} By default, content is positioned between the headers
         * and footers. However, using `fullscreen="true"`, the content will be
         * able to scroll "under" the headers and footers. At first glance the
         * fullscreen option may not look any different than the default, however,
         * by adding a transparency effect to a header then the content can be
         * seen under the header as the user scrolls.
         */

    }, {
        key: "removeCssClass",

        /**
         * @private
         * DOM WRITE
         */
        value: function removeCssClass(className) {
            this.getNativeElement().classList.remove(className);
        }
        /**
         * @private
         * DOM WRITE
         */

    }, {
        key: "setScrollElementStyle",
        value: function setScrollElementStyle(prop, val) {
            this._scrollEle.style[prop] = val;
        }
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

    }, {
        key: "getContentDimensions",
        value: function getContentDimensions() {
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
                scrollRight: _scrollEle.scrollLeft + _scrollEle.scrollWidth
            };
        }
        /**
         * @private
         * DOM WRITE
         * Adds padding to the bottom of the scroll element when the keyboard is open
         * so content below the keyboard can be scrolled into view.
         */

    }, {
        key: "addScrollPadding",
        value: function addScrollPadding(newPadding) {
            if (newPadding > this._scrollPadding) {
                console.debug('content addScrollPadding', newPadding);
                this._scrollPadding = newPadding;
                this._scrollEle.style.paddingBottom = newPadding + 'px';
            }
        }
        /**
         * @private
         * DOM WRITE
         */

    }, {
        key: "clearScrollPaddingFocusOut",
        value: function clearScrollPaddingFocusOut() {
            var _this4 = this;

            if (!this._inputPolling) {
                this._inputPolling = true;
                this._keyboard.onClose(function () {
                    _this4._scrollPadding = 0;
                    _this4._scrollEle.style.paddingBottom = _this4._paddingBottom > 0 ? _this4._paddingBottom + 'px' : '';
                    _this4._inputPolling = false;
                    _this4.addScrollPadding(0);
                }, 200, Infinity);
            }
        }
        /**
         * Tell the content to recalculate its dimensions. This should be called
         * after dynamically adding headers, footers, or tabs.
         *
         */

    }, {
        key: "resize",
        value: function resize() {
            var _this5 = this;

            nativeRaf(function () {
                _this5.readDimensions();
                _this5.writeDimensions();
            });
        }
        /**
         * @private
         * DOM READ
         */

    }, {
        key: "readDimensions",
        value: function readDimensions() {
            this._paddingTop = 0;
            this._paddingRight = 0;
            this._paddingBottom = 0;
            this._paddingLeft = 0;
            this._headerHeight = 0;
            this._footerHeight = 0;
            this._tabsPlacement = null;
            var ele = this._elementRef.nativeElement;
            if (!ele) return;
            var parentEle = ele.parentElement;
            var computedStyle = void 0;
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
                } else if (ele.tagName === 'ION-HEADER') {
                    this._headerHeight = ele.clientHeight;
                } else if (ele.tagName === 'ION-FOOTER') {
                    this._footerHeight = ele.clientHeight;
                    this._footerEle = ele;
                }
            }
            ele = parentEle;
            var tabbarEle = void 0;
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
        }
        /**
         * @private
         * DOM WRITE
         */

    }, {
        key: "writeDimensions",
        value: function writeDimensions() {
            var newVal = void 0;
            var scrollEle = this._scrollEle;
            if (!scrollEle) return;
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
                    scrollEle.style.paddingTop = newVal > 0 ? newVal + 'px' : '';
                    this.contentTop = newVal;
                }
                newVal = this._footerHeight + this._paddingBottom;
                if (this._tabsPlacement === 'bottom') {
                    newVal += this._tabbarHeight;
                    if (newVal > 0 && this._footerEle) {
                        this._footerEle.style.bottom = newVal - this._footerHeight - this._paddingBottom + 'px';
                    }
                }
                if (newVal !== this.contentBottom) {
                    scrollEle.style.paddingBottom = newVal > 0 ? newVal + 'px' : '';
                    this.contentBottom = newVal;
                }
            } else {
                // adjust the content with margins
                newVal = this._headerHeight;
                if (this._tabsPlacement === 'top') {
                    newVal += this._tabbarHeight;
                }
                if (newVal !== this.contentTop) {
                    scrollEle.style.marginTop = newVal > 0 ? newVal + 'px' : '';
                    this.contentTop = newVal;
                }
                newVal = this._footerHeight;
                if (this._tabsPlacement === 'bottom') {
                    newVal += this._tabbarHeight;
                }
                if (newVal !== this.contentBottom) {
                    scrollEle.style.marginBottom = newVal > 0 ? newVal + 'px' : '';
                    this.contentBottom = newVal;
                    if (newVal > 0 && this._footerEle) {
                        this._footerEle.style.bottom = newVal - this._footerHeight + 'px';
                    }
                }
            }
            if (this._tabsPlacement !== null && this._tabs) {
                // set the position of the tabbar
                if (this._tabsPlacement === 'top') {
                    this._tabs.setTabbarPosition(this._headerHeight, -1);
                } else {
                    this._tabs.setTabbarPosition(-1, 0);
                }
            }
        }
    }, {
        key: "fullscreen",
        get: function get() {
            return !!this._fullscreen;
        },
        set: function set(val) {
            this._fullscreen = isTrueProperty(val);
        }
    }]);

    return Content;
}(Ion);
__decorate([Input(), __metadata('design:type', Boolean)], Content.prototype, "fullscreen", null);
Content = __decorate([Component({
    selector: 'ion-content',
    template: '<scroll-content>' + '<ng-content></ng-content>' + '</scroll-content>' + '<ng-content select="ion-fixed"></ng-content>' + '<ng-content select="ion-refresher"></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.statusbar-padding]': '_sbPadding'
    }
}), __param(5, Optional()), __param(6, Optional()), __metadata('design:paramtypes', [typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a || Object, typeof (_b = typeof Config !== 'undefined' && Config) === 'function' && _b || Object, typeof (_c = typeof App !== 'undefined' && App) === 'function' && _c || Object, typeof (_d = typeof Keyboard !== 'undefined' && Keyboard) === 'function' && _d || Object, typeof (_e = typeof NgZone !== 'undefined' && NgZone) === 'function' && _e || Object, typeof (_f = typeof ViewController !== 'undefined' && ViewController) === 'function' && _f || Object, typeof (_g = typeof Tabs !== 'undefined' && Tabs) === 'function' && _g || Object])], Content);
function parsePxUnit(val) {
    return val.indexOf('px') > 0 ? parseInt(val, 10) : 0;
}
var _a, _b, _c, _d, _e, _f, _g;