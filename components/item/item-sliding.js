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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var dom_1 = require('../../util/dom');
var item_1 = require('./item');
var util_1 = require('../../util/util');
var list_1 = require('../list/list');
var SWIPE_MARGIN = 30;
var ELASTIC_FACTOR = 0.55;
/**
 * @name ItemOptions
 * @description
 * The option buttons for an `ion-item-sliding`. These buttons can be placed either on the left or right side.
 * You can combind the `(ionSiwpe)` event plus the `expandable` directive to create a full swipe action for the item.
 *
 * @usage
 *
 * ```html
 * <ion-item-sliding>
 *   <ion-item>
 *     Item 1
 *   </ion-item>
 *   <ion-item-options side="right" (ionSwipe)="saveItem(item)">
 *     <button expandable (click)="saveItem(item)">
 *       <ion-icon name="star"></ion-icon>
 *     </button>
 *   </ion-item-options>
 * </ion-item-sliding>
 *```
 */
var ItemOptions = (function () {
    function ItemOptions(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        /**
         * @output {event} Expression to evaluate when the item has been fully swiped.
         */
        this.ionSwipe = new core_1.EventEmitter();
    }
    /**
     * @private
     */
    ItemOptions.prototype.setCssStyle = function (property, value) {
        this._renderer.setElementStyle(this._elementRef.nativeElement, property, value);
    };
    /**
     * @private
     */
    ItemOptions.prototype.getSides = function () {
        if (util_1.isPresent(this.side) && this.side === 'left') {
            return 1 /* Left */;
        }
        else {
            return 2 /* Right */;
        }
    };
    /**
     * @private
     */
    ItemOptions.prototype.width = function () {
        return this._elementRef.nativeElement.offsetWidth;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ItemOptions.prototype, "side", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ItemOptions.prototype, "ionSwipe", void 0);
    ItemOptions = __decorate([
        core_1.Directive({
            selector: 'ion-item-options',
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], ItemOptions);
    return ItemOptions;
}());
exports.ItemOptions = ItemOptions;
/**
 * @name ItemSliding
 * @description
 * A sliding item is a list item that can be swiped to reveal buttons. It requires
 * an [Item](../Item) component as a child and a [List](../../list/List) component as
 * a parent. All buttons to reveal can be placed in the `<ion-item-options>` element.
 *
 * @usage
 * ```html
 * <ion-list>
 *   <ion-item-sliding #item>
 *     <ion-item>
 *       Item
 *     </ion-item>
 *     <ion-item-options side="left">
 *       <button (click)="favorite(item)">Favorite</button>
 *       <button danger (click)="share(item)">Share</button>
 *     </ion-item-options>

 *     <ion-item-options side="right">
 *       <button (click)="unread(item)">Unread</button>
 *     </ion-item-options>
 *   </ion-item-sliding>
 * </ion-list>
 * ```
 *
 * ### Swipe Direction
 * By default, the buttons are revealed when the sliding item is swiped from right to left,
 * so the buttons are placed in the right side. But it's also possible to reveal them
 * in the right side (sliding from left to right) by setting the `side` attribute
 * on the `ion-item-options` element. Up to 2 `ion-item-options` can used at the same time
 * in order to reveal two different sets of buttons depending the swipping direction.
 *
 * ```html
 * <ion-item-options side="right">
 *   <button (click)="archive(item)">
 *     <ion-icon name="archive"></ion-icon>
 *     Archive
 *   </button>
 * </ion-item-options>

 * <ion-item-options side="left">
 *   <button (click)="archive(item)">
 *     <ion-icon name="archive"></ion-icon>
 *     Archive
 *   </button>
 * </ion-item-options>
 * ```
 *
 * ### Listening for events (ionDrag) and (ionSwipe)
 * It's possible to know the current relative position of the sliding item by subscribing
 * to the (ionDrag)` event.
 *
 * ```html
 * <ion-item-sliding (ionDrag)="logDrag($event)">
 *   <ion-item>Item</ion-item>
 *   <ion-item-options>
 *     <button>Favorite</button>
 *   </ion-item-options>
 * </ion-item-sliding>
 * ```
 *
 * ### Button Layout
 * If an icon is placed with text in the option button, by default it will
 * display the icon on top of the text. This can be changed to display the icon
 * to the left of the text by setting `icon-left` as an attribute on the
 * `<ion-item-options>` element.
 *
 * ```html
 * <ion-item-options icon-left>
 *    <button (click)="archive(item)">
 *      <ion-icon name="archive"></ion-icon>
 *      Archive
 *    </button>
 *  </ion-item-options>
 *
 * ```
 *
 *
 * @demo /docs/v2/demos/item-sliding/
 * @see {@link /docs/v2/components#lists List Component Docs}
 * @see {@link ../Item Item API Docs}
 * @see {@link ../../list/List List API Docs}
 */
var ItemSliding = (function () {
    function ItemSliding(list, _renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._openAmount = 0;
        this._startX = 0;
        this._optsWidthRightSide = 0;
        this._optsWidthLeftSide = 0;
        this._timer = null;
        this._optsDirty = true;
        this._state = 2 /* Disabled */;
        /**
         * @output {event} Expression to evaluate when the sliding position changes.
         * It reports the relative position.
         *
         * ```ts
         * ondrag(item) {
         *   let percent = item.getSlidingPercent();
         *   if (percent > 0) {
         *     // positive
         *     console.log('right side');
         *   } else {
         *     // negative
         *     console.log('left side');
         *   }
         *   if (Math.abs(percent) > 1) {
         *     console.log('overscroll');
         *   }
         * }
         * ```
         *
         */
        this.ionDrag = new core_1.EventEmitter();
        list && list.containsSlidingItem(true);
        _elementRef.nativeElement.$ionComponent = this;
        this.setCssClass('item-wrapper', true);
    }
    Object.defineProperty(ItemSliding.prototype, "_itemOptions", {
        set: function (itemOptions) {
            var sides = 0;
            for (var _i = 0, _a = itemOptions.toArray(); _i < _a.length; _i++) {
                var item = _a[_i];
                var side = item.getSides();
                if (side === 1 /* Left */) {
                    this._leftOptions = item;
                }
                else {
                    this._rightOptions = item;
                }
                sides |= item.getSides();
            }
            this._optsDirty = true;
            this._sides = sides;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    ItemSliding.prototype.getOpenAmount = function () {
        return this._openAmount;
    };
    /**
     * @private
     */
    ItemSliding.prototype.getSlidingPercent = function () {
        var openAmount = this._openAmount;
        if (openAmount > 0) {
            return openAmount / this._optsWidthRightSide;
        }
        else if (openAmount < 0) {
            return openAmount / this._optsWidthLeftSide;
        }
        else {
            return 0;
        }
    };
    /**
     * @private
     */
    ItemSliding.prototype.startSliding = function (startX) {
        if (this._timer) {
            dom_1.clearNativeTimeout(this._timer);
            this._timer = null;
        }
        if (this._openAmount === 0) {
            this._optsDirty = true;
            this._setState(4 /* Enabled */);
        }
        this._startX = startX + this._openAmount;
        this.item.setCssStyle(dom_1.CSS.transition, 'none');
    };
    /**
     * @private
     */
    ItemSliding.prototype.moveSliding = function (x) {
        if (this._optsDirty) {
            this.calculateOptsWidth();
            return;
        }
        var openAmount = (this._startX - x);
        switch (this._sides) {
            case 2 /* Right */:
                openAmount = Math.max(0, openAmount);
                break;
            case 1 /* Left */:
                openAmount = Math.min(0, openAmount);
                break;
            case 3 /* Both */: break;
            default: return;
        }
        if (openAmount > this._optsWidthRightSide) {
            var optsWidth = this._optsWidthRightSide;
            openAmount = optsWidth + (openAmount - optsWidth) * ELASTIC_FACTOR;
        }
        else if (openAmount < -this._optsWidthLeftSide) {
            var optsWidth = -this._optsWidthLeftSide;
            openAmount = optsWidth + (openAmount - optsWidth) * ELASTIC_FACTOR;
        }
        this._setOpenAmount(openAmount, false);
        return openAmount;
    };
    /**
     * @private
     */
    ItemSliding.prototype.endSliding = function (velocity) {
        var restingPoint = (this._openAmount > 0)
            ? this._optsWidthRightSide
            : -this._optsWidthLeftSide;
        // Check if the drag didn't clear the buttons mid-point
        // and we aren't moving fast enough to swipe open
        var isCloseDirection = (this._openAmount > 0) === !(velocity < 0);
        var isMovingFast = Math.abs(velocity) > 0.3;
        var isOnCloseZone = Math.abs(this._openAmount) < Math.abs(restingPoint / 2);
        if (shouldClose(isCloseDirection, isMovingFast, isOnCloseZone)) {
            restingPoint = 0;
        }
        this._setOpenAmount(restingPoint, true);
        this.fireSwipeEvent();
        return restingPoint;
    };
    /**
     * @private
     */
    ItemSliding.prototype.fireSwipeEvent = function () {
        if (this._state & 32 /* SwipeRight */) {
            this._rightOptions.ionSwipe.emit(this);
        }
        else if (this._state & 64 /* SwipeLeft */) {
            this._leftOptions.ionSwipe.emit(this);
        }
    };
    /**
     * @private
     */
    ItemSliding.prototype.calculateOptsWidth = function () {
        var _this = this;
        dom_1.nativeRaf(function () {
            if (!_this._optsDirty) {
                return;
            }
            _this._optsWidthRightSide = 0;
            if (_this._rightOptions) {
                _this._optsWidthRightSide = _this._rightOptions.width();
            }
            _this._optsWidthLeftSide = 0;
            if (_this._leftOptions) {
                _this._optsWidthLeftSide = _this._leftOptions.width();
            }
            _this._optsDirty = false;
        });
    };
    ItemSliding.prototype._setOpenAmount = function (openAmount, isFinal) {
        var _this = this;
        if (this._timer) {
            dom_1.clearNativeTimeout(this._timer);
            this._timer = null;
        }
        this._openAmount = openAmount;
        if (isFinal) {
            this.item.setCssStyle(dom_1.CSS.transition, '');
        }
        else {
            if (openAmount > 0) {
                var state = (openAmount >= (this._optsWidthRightSide + SWIPE_MARGIN))
                    ? 8 /* Right */ | 32 /* SwipeRight */
                    : 8 /* Right */;
                this._setState(state);
            }
            else if (openAmount < 0) {
                var state = (openAmount <= (-this._optsWidthLeftSide - SWIPE_MARGIN))
                    ? 16 /* Left */ | 64 /* SwipeLeft */
                    : 16 /* Left */;
                this._setState(state);
            }
        }
        if (openAmount === 0) {
            this._timer = dom_1.nativeTimeout(function () {
                _this._setState(2 /* Disabled */);
                _this._timer = null;
            }, 600);
            this.item.setCssStyle(dom_1.CSS.transform, '');
            return;
        }
        this.item.setCssStyle(dom_1.CSS.transform, "translate3d(" + -openAmount + "px,0,0)");
        this.ionDrag.emit(this);
    };
    ItemSliding.prototype._setState = function (state) {
        if (state === this._state) {
            return;
        }
        this.setCssClass('active-slide', (state !== 2 /* Disabled */));
        this.setCssClass('active-options-right', !!(state & 8 /* Right */));
        this.setCssClass('active-options-left', !!(state & 16 /* Left */));
        this.setCssClass('active-swipe-right', !!(state & 32 /* SwipeRight */));
        this.setCssClass('active-swipe-left', !!(state & 64 /* SwipeLeft */));
        this._state = state;
    };
    /**
     * Close the sliding item. Items can also be closed from the [List](../../list/List).
     *
     * The sliding item can be closed by grabbing a reference to `ItemSliding`. In the
     * below example, the template reference variable `slidingItem` is placed on the element
     * and passed to the `share` method.
     *
     * ```html
     * <ion-list>
     *   <ion-item-sliding #slidingItem>
     *     <ion-item>
     *       Item
     *     </ion-item>
     *     <ion-item-options>
     *       <button (click)="share(slidingItem)">Share</button>
     *     </ion-item-options>
     *   </ion-item-sliding>
     * </ion-list>
     * ```
     *
     * ```ts
     * import { Component } from '@angular/core';
     * import { ItemSliding } from 'ionic-angular';
     *
     * @Component({...})
     * export class MyClass {
     *   constructor() { }
     *
     *   share(slidingItem: ItemSliding) {
     *     slidingItem.close();
     *   }
     * }
     * ```
     */
    ItemSliding.prototype.close = function () {
        this._setOpenAmount(0, true);
    };
    /**
     * @private
     */
    ItemSliding.prototype.setCssClass = function (cssClass, shouldAdd) {
        this._renderer.setElementClass(this._elementRef.nativeElement, cssClass, shouldAdd);
    };
    /**
     * @private
     */
    ItemSliding.prototype.setCssStyle = function (property, value) {
        this._renderer.setElementStyle(this._elementRef.nativeElement, property, value);
    };
    __decorate([
        core_1.ContentChild(item_1.Item), 
        __metadata('design:type', item_1.Item)
    ], ItemSliding.prototype, "item", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ItemSliding.prototype, "ionDrag", void 0);
    __decorate([
        core_1.ContentChildren(ItemOptions), 
        __metadata('design:type', core_1.QueryList), 
        __metadata('design:paramtypes', [core_1.QueryList])
    ], ItemSliding.prototype, "_itemOptions", null);
    ItemSliding = __decorate([
        core_1.Component({
            selector: 'ion-item-sliding',
            template: "\n    <ng-content select=\"ion-item,[ion-item]\"></ng-content>\n    <ng-content select=\"ion-item-options\"></ng-content>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [list_1.List, core_1.Renderer, core_1.ElementRef])
    ], ItemSliding);
    return ItemSliding;
}());
exports.ItemSliding = ItemSliding;
function shouldClose(isCloseDirection, isMovingFast, isOnCloseZone) {
    // The logic required to know when the sliding item should close (openAmount=0)
    // depends on three booleans (isCloseDirection, isMovingFast, isOnCloseZone)
    // and it ended up being too complicated to be written manually without errors
    // so the truth table is attached below: (0=false, 1=true)
    // isCloseDirection | isMovingFast | isOnCloseZone || shouldClose
    //         0        |       0      |       0       ||    0
    //         0        |       0      |       1       ||    1
    //         0        |       1      |       0       ||    0
    //         0        |       1      |       1       ||    0
    //         1        |       0      |       0       ||    0
    //         1        |       0      |       1       ||    1
    //         1        |       1      |       0       ||    1
    //         1        |       1      |       1       ||    1
    // The resulting expression was generated by resolving the K-map (Karnaugh map):
    var shouldClose = (!isMovingFast && isOnCloseZone) || (isCloseDirection && isMovingFast);
    return shouldClose;
}
