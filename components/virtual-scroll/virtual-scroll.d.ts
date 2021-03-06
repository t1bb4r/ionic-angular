import { AfterContentInit, ChangeDetectorRef, DoCheck, ElementRef, IterableDiffers, NgZone, OnDestroy, Renderer, TrackByFn } from '@angular/core';
import { Config } from '../../config/config';
import { Content } from '../content/content';
import { Platform } from '../../platform/platform';
import { ViewController } from '../nav/view-controller';
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
export declare class VirtualScroll implements DoCheck, AfterContentInit, OnDestroy {
    private _iterableDiffers;
    private _elementRef;
    private _renderer;
    private _zone;
    private _cd;
    private _content;
    private _platform;
    private _ctrl;
    private _trackBy;
    private _differ;
    private _unreg;
    private _init;
    private _rafId;
    private _tmId;
    private _hdrFn;
    private _ftrFn;
    private _records;
    private _cells;
    private _nodes;
    private _vHeight;
    private _lastCheck;
    private _data;
    private _eventAssist;
    private _queue;
    private _itmTmp;
    private _hdrTmp;
    private _ftrTmp;
    private _imgs;
    /**
     * @input {array} The data that builds the templates within the virtual scroll.
     * This is the same data that you'd pass to `ngFor`. It's important to note
     * that when this data has changed, then the entire virtual scroll is reset,
     * which is an expensive operation and should be avoided if possible.
     */
    virtualScroll: any;
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
    bufferRatio: number;
    /**
     * @input {string} The approximate width of each item template's cell.
     * This dimension is used to help determine how many cells should
     * be created when initialized, and to help calculate the height of
     * the scrollable area. This value can use either `px` or `%` units.
     * Note that the actual rendered size of each cell comes from the
     * app's CSS, whereas this approximation is used to help calculate
     * initial dimensions. Default is `100%`.
     */
    approxItemWidth: string;
    /**
     * @input {string} The approximate height of each item template's cell.
     * This dimension is used to help determine how many cells should
     * be created when initialized, and to help calculate the height of
     * the scrollable area. This height value can only use `px` units.
     * Note that the actual rendered size of each cell comes from the
     * app's CSS, whereas this approximation is used to help calculate
     * initial dimensions. Default is `40px`.
     */
    approxItemHeight: string;
    /**
     * @input {string} The approximate width of each header template's cell.
     * This dimension is used to help determine how many cells should
     * be created when initialized, and to help calculate the height of
     * the scrollable area. This value can use either `px` or `%` units.
     * Note that the actual rendered size of each cell comes from the
     * app's CSS, whereas this approximation is used to help calculate
     * initial dimensions. Default is `100%`.
     */
    approxHeaderWidth: string;
    /**
     * @input {string} The approximate height of each header template's cell.
     * This dimension is used to help determine how many cells should
     * be created when initialized, and to help calculate the height of
     * the scrollable area. This height value can only use `px` units.
     * Note that the actual rendered size of each cell comes from the
     * app's CSS, whereas this approximation is used to help calculate
     * initial dimensions. Default is `40px`.
     */
    approxHeaderHeight: string;
    /**
     * @input {string} The approximate width of each footer template's cell.
     * This dimension is used to help determine how many cells should
     * be created when initialized, and to help calculate the height of
     * the scrollable area. This value can use either `px` or `%` units.
     * Note that the actual rendered size of each cell comes from the
     * app's CSS, whereas this approximation is used to help calculate
     * initial dimensions. Default is `100%`.
     */
    approxFooterWidth: string;
    /**
     * @input {string} The approximate height of each footer template's cell.
     * This dimension is used to help determine how many cells should
     * be created when initialized, and to help calculate the height of
     * the scrollable area. This height value can only use `px` units.
     * Note that the actual rendered size of each cell comes from the
     * app's CSS, whereas this approximation is used to help calculate
     * initial dimensions. Default is `40px`.
     */
    approxFooterHeight: string;
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
    headerFn: Function;
    /**
     * @input {function} Section footers and the data used within its given
     * template can be dynamically created by passing a function to `footerFn`.
     * The logic within the footer function can decide if the footer template
     * should be used, and what data to give to the footer template. The function
     * must return `null` if a footer cell shouldn't be created.
     */
    footerFn: Function;
    /**
     * @input {function} Same as `ngForTrackBy` which can be used on `ngFor`.
     */
    virtualTrackBy: TrackByFn;
    constructor(_iterableDiffers: IterableDiffers, _elementRef: ElementRef, _renderer: Renderer, _zone: NgZone, _cd: ChangeDetectorRef, _content: Content, _platform: Platform, _ctrl: ViewController, config: Config);
    /**
     * @private
     */
    ngDoCheck(): void;
    /**
     * @private
     */
    ngAfterContentInit(): void;
    /**
     * @private
     * DOM READ THEN DOM WRITE
     */
    update(checkChanges: boolean): void;
    /**
     * @private
     * DOM WRITE
     */
    renderVirtual(): void;
    /**
     * @private
     * DOM READ THEN DOM WRITE
     */
    postRenderVirtual(): void;
    /**
     * @private
     */
    scrollUpdate(): void;
    /**
     * @private
     * DOM WRITE
     */
    onScrollEnd(): void;
    /**
     * @private
     * DOM WRITE
     */
    setVirtualHeight(newVirtualHeight: number): void;
    /**
     * @private
     * NO DOM
     */
    addScrollListener(): void;
    /**
     * @private
     * NO DOM
     */
    ngOnDestroy(): void;
}
