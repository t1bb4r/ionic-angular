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
var __param = this && this.__param || function (paramIndex, decorator) {
    return function (target, key) {
        decorator(target, key, paramIndex);
    };
};
import { ChangeDetectorRef, ContentChild, ContentChildren, Directive, ElementRef, Input, IterableDiffers, NgZone, Optional, QueryList, Renderer, TrackByFn } from '@angular/core';
import { adjustRendered, calcDimensions, estimateHeight, initReadNodes, processRecords, populateNodeData, updateDimensions, writeToNodes } from './virtual-util';
import { clearNativeTimeout, nativeRaf, nativeTimeout } from '../../util/dom';
import { Config } from '../../config/config';
import { Content } from '../content/content';
import { Img } from '../img/img';
import { isBlank, isFunction, isPresent } from '../../util/util';
import { Platform } from '../../platform/platform';
import { ViewController } from '../nav/view-controller';
import { VirtualFooter, VirtualHeader, VirtualItem } from './virtual-item';
/**
 * @name VirtualScroll
 * @description
 * Virtual Scroll displays a virtual, "infinite" list. An array of records
 * is passed to the virtual scroll containing the data to create templates
 * for. The template created for each record, referred to as a cell, can
 * consist of items, headers, and footers.
 *
 * For performance reasons, not every record in the list is rendered at once;
 * instead a small subset of records (enough to fill the viewport) are rendered
 * and reused as the user scrolls.
 *
 * ### The Basics
 *
 * The array of records should be passed to the `virtualScroll` property.
 * The data given to the `virtualScroll` property must be an array. An item
 * template with the `*virtualItem` property is required in the `virtualScroll`.
 * The `virtualScroll` and `*virtualItem` properties can be added to any element.
 *
 * ```html
 * <ion-list [virtualScroll]="items">
 *
 *   <ion-item *virtualItem="let item">
 *     {% raw %}{{ item }}{% endraw %}
 *   </ion-item>
 *
 * </ion-list>
 * ```
 *
 *
 * ### Section Headers and Footers
 *
 * Section headers and footers are optional. They can be dynamically created
 * from developer-defined functions. For example, a large list of contacts
 * usually has a divider for each letter in the alphabet. Developers provide
 * their own custom function to be called on each record. The logic in the
 * custom function should determine whether to create the section template
 * and what data to provide to the template. The custom function should
 * return `null` if a template shouldn't be created.
 *
 * ```html
 * <ion-list [virtualScroll]="items" [headerFn]="myHeaderFn">
 *
 *   <ion-item-divider *virtualHeader="let header">
 *     Header: {% raw %}{{ header }}{% endraw %}
 *   </ion-item-divider>
 *
 *   <ion-item *virtualItem="let item">
 *     Item: {% raw %}{{ item }}{% endraw %}
 *   </ion-item>
 *
 * </ion-list>
 * ```
 *
 * Below is an example of a custom function called on every record. It
 * gets passed the individual record, the record's index number,
 * and the entire array of records. In this example, after every 20
 * records a header will be inserted. So between the 19th and 20th records,
 * between the 39th and 40th, and so on, a `<ion-item-divider>` will
 * be created and the template's data will come from the function's
 * returned data.
 *
 * ```ts
 * myHeaderFn(record, recordIndex, records) {
 *   if (recordIndex % 20 === 0) {
 *     return 'Header ' + recordIndex;
 *   }
 *   return null;
 * }
 * ```
 *
 *
 * ### Approximate Widths and Heights
 *
 * The approximate width and height of each template is used to help
 * determine how many cells should be created, and to help calculate
 * the height of the scrollable area. Note that the actual rendered size
 * of each cell comes from the app's CSS, whereas this approximation
 * is only used to help calculate initial dimensions.
 *
 * It's also important to know that Ionic's default item sizes have
 * slightly different heights between platforms, which is perfectly fine.
 * An exact pixel-perfect size is not necessary, but a good estimation
 * is important. Basically if each item is roughly 500px tall, rather than
 * the default of 40px tall, it's extremely important to know for virtual
 * scroll to calculate a good height.
 *
 *
 * ### Images Within Virtual Scroll
 *
 * Ionic provides `<ion-img>` to manage HTTP requests and image rendering.
 * Additionally, it includes a customizable placeholder element which shows
 * before the image has finished loading. While scrolling through items
 * quickly, `<ion-img>` knows not to make any image requests, and only loads
 * the images that are viewable after scrolling. It's also important for app
 * developers to ensure image sizes are locked in, and after images have fully
 * loaded they do not change size and affect any other element sizes.
 *
 * We recommend using our `<ion-img>` element over the native `<img>` element
 * because when an `<img>` element is added to the DOM, it immediately
 * makes a HTTP request for the image file. HTTP requests, image
 * decoding, and image rendering can cause issues while scrolling. For virtual
 * scrolling, the natural effects of the `<img>` are not desirable features.
 *
 * Note: `<ion-img>` should only be used with Virtual Scroll. If you are using
 * an image outside of Virtual Scroll you should use the standard `<img>` tag.
 *
 * ```html
 * <ion-list [virtualScroll]="items">
 *
 *   <ion-item *virtualItem="let item">
 *     <ion-avatar item-left>
 *       <ion-img [src]="item.avatarUrl"></ion-img>
 *     </ion-avatar>
 *    {% raw %} {{ item.firstName }} {{ item.lastName }}{% endraw %}
 *   </ion-item>
 *
 * </ion-list>
 * ```
 *
 *
 * ### Performance Tips
 *
 * - Use `<ion-img>` rather than `<img>` so images are lazy loaded
 *   while scrolling.
 * - Image sizes should be locked in, meaning the size of any element
 *   should not change after the image has loaded.
 * - Provide an approximate width and height so the virtual scroll can
 *   best calculate the cell height.
 * - Changing the dataset requires the entire virtual scroll to be
 *   reset, which is an expensive operation and should be avoided
 *   if possible.
 * - Do not perform any DOM manipulation within section header and
 *   footer functions. These functions are called for every record in the
 *   dataset, so please make sure they're performant.
 *
 */
export var VirtualScroll = function () {
    function VirtualScroll(_iterableDiffers, _elementRef, _renderer, _zone, _cd, _content, _platform, _ctrl, config) {
        _classCallCheck(this, VirtualScroll);

        this._iterableDiffers = _iterableDiffers;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._zone = _zone;
        this._cd = _cd;
        this._content = _content;
        this._platform = _platform;
        this._ctrl = _ctrl;
        this._records = [];
        this._cells = [];
        this._nodes = [];
        this._vHeight = 0;
        this._lastCheck = 0;
        this._data = {
            scrollTop: 0
        };
        this._queue = null;
        /**
         * @input {number} The buffer ratio is used to decide how many cells
         * should get created when initially rendered. The number is a
         * multiplier against the viewable area's height. For example, if it
         * takes `20` cells to fill up the height of the viewable area, then
         * with a buffer ratio of `2` it will create `40` cells that are
         * available for reuse while scrolling. For better performance, it's
         * better to have more cells than what are required to fill the
         * viewable area. Default is `2`.
         */
        this.bufferRatio = 2;
        /**
         * @input {string} The approximate width of each item template's cell.
         * This dimension is used to help determine how many cells should
         * be created when initialized, and to help calculate the height of
         * the scrollable area. This value can use either `px` or `%` units.
         * Note that the actual rendered size of each cell comes from the
         * app's CSS, whereas this approximation is used to help calculate
         * initial dimensions. Default is `100%`.
         */
        this.approxItemWidth = '100%';
        /**
         * @input {string} The approximate height of each item template's cell.
         * This dimension is used to help determine how many cells should
         * be created when initialized, and to help calculate the height of
         * the scrollable area. This height value can only use `px` units.
         * Note that the actual rendered size of each cell comes from the
         * app's CSS, whereas this approximation is used to help calculate
         * initial dimensions. Default is `40px`.
         */
        this.approxItemHeight = '40px';
        /**
         * @input {string} The approximate width of each header template's cell.
         * This dimension is used to help determine how many cells should
         * be created when initialized, and to help calculate the height of
         * the scrollable area. This value can use either `px` or `%` units.
         * Note that the actual rendered size of each cell comes from the
         * app's CSS, whereas this approximation is used to help calculate
         * initial dimensions. Default is `100%`.
         */
        this.approxHeaderWidth = '100%';
        /**
         * @input {string} The approximate height of each header template's cell.
         * This dimension is used to help determine how many cells should
         * be created when initialized, and to help calculate the height of
         * the scrollable area. This height value can only use `px` units.
         * Note that the actual rendered size of each cell comes from the
         * app's CSS, whereas this approximation is used to help calculate
         * initial dimensions. Default is `40px`.
         */
        this.approxHeaderHeight = '40px';
        /**
         * @input {string} The approximate width of each footer template's cell.
         * This dimension is used to help determine how many cells should
         * be created when initialized, and to help calculate the height of
         * the scrollable area. This value can use either `px` or `%` units.
         * Note that the actual rendered size of each cell comes from the
         * app's CSS, whereas this approximation is used to help calculate
         * initial dimensions. Default is `100%`.
         */
        this.approxFooterWidth = '100%';
        /**
         * @input {string} The approximate height of each footer template's cell.
         * This dimension is used to help determine how many cells should
         * be created when initialized, and to help calculate the height of
         * the scrollable area. This height value can only use `px` units.
         * Note that the actual rendered size of each cell comes from the
         * app's CSS, whereas this approximation is used to help calculate
         * initial dimensions. Default is `40px`.
         */
        this.approxFooterHeight = '40px';
        this._eventAssist = config.getBoolean('virtualScrollEventAssist');
    }
    /**
     * @input {array} The data that builds the templates within the virtual scroll.
     * This is the same data that you'd pass to `ngFor`. It's important to note
     * that when this data has changed, then the entire virtual scroll is reset,
     * which is an expensive operation and should be avoided if possible.
     */


    _createClass(VirtualScroll, [{
        key: "ngDoCheck",

        /**
         * @private
         */
        value: function ngDoCheck() {
            if (this._init) {
                this.update(true);
            }
        }
        /**
         * @private
         */

    }, {
        key: "ngAfterContentInit",
        value: function ngAfterContentInit() {
            var _this = this;

            if (!this._init) {
                if (!this._itmTmp) {
                    throw 'virtualItem required within virtualScroll';
                }
                this._init = true;
                this.update(true);
                this._platform.onResize(function () {
                    console.debug('VirtualScroll, onResize');
                    _this.update(false);
                });
            }
        }
        /**
         * @private
         * DOM READ THEN DOM WRITE
         */

    }, {
        key: "update",
        value: function update(checkChanges) {
            var self = this;
            if (!self._records || !self._records.length) return;
            if (checkChanges) {
                if (isPresent(self._differ)) {
                    var changes = self._differ.diff(self._records);
                    if (!isPresent(changes)) return;
                }
            }
            console.debug('VirtualScroll, update, records:', self._records.length);
            // reset everything
            self._cells.length = 0;
            self._nodes.length = 0;
            self._itmTmp.viewContainer.clear();
            self._elementRef.nativeElement.parentElement.scrollTop = 0;
            var attempts = 0;
            function readDimensions(done /* cuz promises add unnecessary overhead here */) {
                if (self._data.valid) {
                    // good to go, we already have good dimension data
                    done();
                } else {
                    // ******** DOM READ ****************
                    calcDimensions(self._data, self._elementRef.nativeElement.parentElement, self.approxItemWidth, self.approxItemHeight, self.approxHeaderWidth, self.approxHeaderHeight, self.approxFooterWidth, self.approxFooterHeight, self.bufferRatio);
                    if (self._data.valid) {
                        // sweet, we got some good dimension data!
                        done();
                    } else if (attempts < 30) {
                        // oh no! the DOM doesn't have good data yet!
                        // let's try again in XXms, and give up eventually if we never get data
                        attempts++;
                        nativeRaf(function () {
                            readDimensions(done);
                        });
                    }
                }
            }
            // ******** DOM READ ****************
            readDimensions(function () {
                processRecords(self._data.renderHeight, self._records, self._cells, self._hdrFn, self._ftrFn, self._data);
                // ******** DOM WRITE ****************
                self.renderVirtual();
                // list for scroll events
                self.addScrollListener();
            });
        }
        /**
         * @private
         * DOM WRITE
         */

    }, {
        key: "renderVirtual",
        value: function renderVirtual() {
            // initialize nodes with the correct cell data
            this._data.topCell = 0;
            this._data.bottomCell = this._cells.length - 1;
            populateNodeData(0, this._data.bottomCell, this._data.viewWidth, true, this._cells, this._records, this._nodes, this._itmTmp.viewContainer, this._itmTmp.templateRef, this._hdrTmp && this._hdrTmp.templateRef, this._ftrTmp && this._ftrTmp.templateRef, true);
            // ******** DOM WRITE ****************
            this._cd.detectChanges();
            // wait a frame before trying to read and calculate the dimensions
            nativeRaf(this.postRenderVirtual.bind(this));
        }
        /**
         * @private
         * DOM READ THEN DOM WRITE
         */

    }, {
        key: "postRenderVirtual",
        value: function postRenderVirtual() {
            // ******** DOM READ THEN DOM WRITE ****************
            initReadNodes(this._nodes, this._cells, this._data);
            // ******** DOM READS ABOVE / DOM WRITES BELOW ****************
            // ******** DOM WRITE ****************
            this._renderer.setElementClass(this._elementRef.nativeElement, 'virtual-scroll', true);
            // ******** DOM WRITE ****************
            writeToNodes(this._nodes, this._cells, this._records.length);
            // ******** DOM WRITE ****************
            this.setVirtualHeight(estimateHeight(this._records.length, this._cells[this._cells.length - 1], this._vHeight, 0.25));
        }
        /**
         * @private
         */

    }, {
        key: "scrollUpdate",
        value: function scrollUpdate() {
            clearNativeTimeout(this._tmId);
            this._tmId = nativeTimeout(this.onScrollEnd.bind(this), SCROLL_END_TIMEOUT_MS);
            var data = this._data;
            if (this._queue === QUEUE_CHANGE_DETECTION) {
                // ******** DOM WRITE ****************
                this._cd.detectChanges();
                // ******** DOM WRITE ****************
                writeToNodes(this._nodes, this._cells, this._records.length);
                // ******** DOM WRITE ****************
                this.setVirtualHeight(estimateHeight(this._records.length, this._cells[this._cells.length - 1], this._vHeight, 0.25));
                this._queue = null;
            } else {
                data.scrollDiff = data.scrollTop - this._lastCheck;
                if (Math.abs(data.scrollDiff) > SCROLL_DIFFERENCE_MINIMUM) {
                    // don't bother updating if the scrollTop hasn't changed much
                    this._lastCheck = data.scrollTop;
                    if (data.scrollDiff > 0) {
                        // load data we may not have processed yet
                        var stopAtHeight = data.scrollTop + data.renderHeight;
                        processRecords(stopAtHeight, this._records, this._cells, this._hdrFn, this._ftrFn, data);
                    }
                    // ******** DOM READ ****************
                    updateDimensions(this._nodes, this._cells, data, false);
                    adjustRendered(this._cells, data);
                    var madeChanges = populateNodeData(data.topCell, data.bottomCell, data.viewWidth, data.scrollDiff > 0, this._cells, this._records, this._nodes, this._itmTmp.viewContainer, this._itmTmp.templateRef, this._hdrTmp && this._hdrTmp.templateRef, this._ftrTmp && this._ftrTmp.templateRef, false);
                    if (madeChanges) {
                        // do not update images while scrolling
                        this._imgs.forEach(function (img) {
                            img.enable(false);
                        });
                        // queue making updates in the next frame
                        this._queue = QUEUE_CHANGE_DETECTION;
                    } else {
                        this._queue = null;
                    }
                }
            }
        }
        /**
         * @private
         * DOM WRITE
         */

    }, {
        key: "onScrollEnd",
        value: function onScrollEnd() {
            // scrolling is done, allow images to be updated now
            this._imgs.forEach(function (img) {
                img.enable(true);
            });
            // ******** DOM READ ****************
            updateDimensions(this._nodes, this._cells, this._data, false);
            adjustRendered(this._cells, this._data);
            // ******** DOM WRITE ****************
            this._cd.detectChanges();
            // ******** DOM WRITE ****************
            this.setVirtualHeight(estimateHeight(this._records.length, this._cells[this._cells.length - 1], this._vHeight, 0.05));
        }
        /**
         * @private
         * DOM WRITE
         */

    }, {
        key: "setVirtualHeight",
        value: function setVirtualHeight(newVirtualHeight) {
            if (newVirtualHeight !== this._vHeight) {
                // ******** DOM WRITE ****************
                this._renderer.setElementStyle(this._elementRef.nativeElement, 'height', newVirtualHeight > 0 ? newVirtualHeight + 'px' : '');
                this._vHeight = newVirtualHeight;
                console.debug('VirtualScroll, height', newVirtualHeight);
            }
        }
        /**
         * @private
         * NO DOM
         */

    }, {
        key: "addScrollListener",
        value: function addScrollListener() {
            var self = this;
            if (!self._unreg) {
                self._zone.runOutsideAngular(function () {
                    function onScroll() {
                        // ******** DOM READ ****************
                        self._data.scrollTop = self._content.getScrollTop();
                        // ******** DOM READ THEN DOM WRITE ****************
                        self.scrollUpdate();
                    }
                    if (self._eventAssist) {
                        // use JS scrolling for iOS UIWebView
                        // goal is to completely remove this when iOS
                        // fully supports scroll events
                        // listen to JS scroll events
                        self._unreg = self._content.jsScroll(onScroll);
                    } else {
                        // listen to native scroll events
                        self._unreg = self._content.addScrollListener(onScroll);
                    }
                });
            }
        }
        /**
         * @private
         * NO DOM
         */

    }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
            this._unreg && this._unreg();
            this._unreg = null;
        }
    }, {
        key: "virtualScroll",
        set: function set(val) {
            this._records = val;
            if (isBlank(this._differ) && isPresent(val)) {
                this._differ = this._iterableDiffers.find(val).create(this._cd, this._trackBy);
            }
        }
        /**
         * @input {function} Section headers and the data used within its given
         * template can be dynamically created by passing a function to `headerFn`.
         * For example, a large list of contacts usually has dividers between each
         * letter in the alphabet. App's can provide their own custom `headerFn`
         * which is called with each record within the dataset. The logic within
         * the header function can decide if the header template should be used,
         * and what data to give to the header template. The function must return
         * `null` if a header cell shouldn't be created.
         */

    }, {
        key: "headerFn",
        set: function set(val) {
            if (isFunction(val)) {
                this._hdrFn = val.bind(this._ctrl && this._ctrl.instance || this);
            }
        }
        /**
         * @input {function} Section footers and the data used within its given
         * template can be dynamically created by passing a function to `footerFn`.
         * The logic within the footer function can decide if the footer template
         * should be used, and what data to give to the footer template. The function
         * must return `null` if a footer cell shouldn't be created.
         */

    }, {
        key: "footerFn",
        set: function set(val) {
            if (isFunction(val)) {
                this._ftrFn = val.bind(this._ctrl && this._ctrl.instance || this);
            }
        }
        /**
         * @input {function} Same as `ngForTrackBy` which can be used on `ngFor`.
         */

    }, {
        key: "virtualTrackBy",
        set: function set(val) {
            this._trackBy = val;
        }
    }]);

    return VirtualScroll;
}();
__decorate([ContentChild(VirtualItem), __metadata('design:type', typeof (_a = typeof VirtualItem !== 'undefined' && VirtualItem) === 'function' && _a || Object)], VirtualScroll.prototype, "_itmTmp", void 0);
__decorate([ContentChild(VirtualHeader), __metadata('design:type', typeof (_b = typeof VirtualHeader !== 'undefined' && VirtualHeader) === 'function' && _b || Object)], VirtualScroll.prototype, "_hdrTmp", void 0);
__decorate([ContentChild(VirtualFooter), __metadata('design:type', typeof (_c = typeof VirtualFooter !== 'undefined' && VirtualFooter) === 'function' && _c || Object)], VirtualScroll.prototype, "_ftrTmp", void 0);
__decorate([ContentChildren(Img), __metadata('design:type', typeof (_d = typeof QueryList !== 'undefined' && QueryList) === 'function' && _d || Object)], VirtualScroll.prototype, "_imgs", void 0);
__decorate([Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], VirtualScroll.prototype, "virtualScroll", null);
__decorate([Input(), __metadata('design:type', Number)], VirtualScroll.prototype, "bufferRatio", void 0);
__decorate([Input(), __metadata('design:type', String)], VirtualScroll.prototype, "approxItemWidth", void 0);
__decorate([Input(), __metadata('design:type', String)], VirtualScroll.prototype, "approxItemHeight", void 0);
__decorate([Input(), __metadata('design:type', String)], VirtualScroll.prototype, "approxHeaderWidth", void 0);
__decorate([Input(), __metadata('design:type', String)], VirtualScroll.prototype, "approxHeaderHeight", void 0);
__decorate([Input(), __metadata('design:type', String)], VirtualScroll.prototype, "approxFooterWidth", void 0);
__decorate([Input(), __metadata('design:type', String)], VirtualScroll.prototype, "approxFooterHeight", void 0);
__decorate([Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], VirtualScroll.prototype, "headerFn", null);
__decorate([Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], VirtualScroll.prototype, "footerFn", null);
__decorate([Input(), __metadata('design:type', typeof (_e = typeof TrackByFn !== 'undefined' && TrackByFn) === 'function' && _e || Object), __metadata('design:paramtypes', [typeof (_f = typeof TrackByFn !== 'undefined' && TrackByFn) === 'function' && _f || Object])], VirtualScroll.prototype, "virtualTrackBy", null);
VirtualScroll = __decorate([Directive({
    selector: '[virtualScroll]'
}), __param(7, Optional()), __metadata('design:paramtypes', [typeof (_g = typeof IterableDiffers !== 'undefined' && IterableDiffers) === 'function' && _g || Object, typeof (_h = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _h || Object, typeof (_j = typeof Renderer !== 'undefined' && Renderer) === 'function' && _j || Object, typeof (_k = typeof NgZone !== 'undefined' && NgZone) === 'function' && _k || Object, typeof (_l = typeof ChangeDetectorRef !== 'undefined' && ChangeDetectorRef) === 'function' && _l || Object, typeof (_m = typeof Content !== 'undefined' && Content) === 'function' && _m || Object, typeof (_o = typeof Platform !== 'undefined' && Platform) === 'function' && _o || Object, typeof (_p = typeof ViewController !== 'undefined' && ViewController) === 'function' && _p || Object, typeof (_q = typeof Config !== 'undefined' && Config) === 'function' && _q || Object])], VirtualScroll);
var SCROLL_END_TIMEOUT_MS = 140;
var SCROLL_DIFFERENCE_MINIMUM = 20;
var QUEUE_CHANGE_DETECTION = 0;
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;