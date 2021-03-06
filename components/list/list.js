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
var ion_1 = require('../ion');
var util_1 = require('../../util/util');
var item_sliding_gesture_1 = require('../item/item-sliding-gesture');
var gesture_controller_1 = require('../../gestures/gesture-controller');
/**
 * The List is a widely used interface element in almost any mobile app,
 * and can include content ranging from basic text all the way to
 * buttons, toggles, icons, and thumbnails.
 *
 * Both the list, which contains items, and the list items themselves
 * can be any HTML element.
 *
 * Using the List and Item components make it easy to support various
 * interaction modes such as swipe to edit, drag to reorder, and
 * removing items.
 *
 * @demo /docs/v2/demos/list/
 * @see {@link /docs/v2/components#lists List Component Docs}
 * @advanced
 *
 * Enable the sliding items.
 *
 * ```ts
 * import { Component, ViewChild } from '@angular/core';
 * import { List } from 'ionic-angular';
 *
 * @Component({...})
 * export class MyClass {
 *   @ViewChild(List) list: List;
 *
 *   constructor() { }
 *
 *   stopSliding() {
 *     this.list.enableSlidingItems(false);
 *   }
 * }
 * ```
 *
 */
var List = (function (_super) {
    __extends(List, _super);
    function List(elementRef, _rendered, _gestureCtrl) {
        _super.call(this, elementRef);
        this._rendered = _rendered;
        this._gestureCtrl = _gestureCtrl;
        this._enableSliding = true;
        this._containsSlidingItems = false;
    }
    /**
     * @private
     */
    List.prototype.ngOnDestroy = function () {
        this._slidingGesture && this._slidingGesture.destroy();
    };
    Object.defineProperty(List.prototype, "sliding", {
        /**
         * @input {boolean} shouldEnable whether the item-sliding should be enabled or not
         */
        get: function () {
            return this._enableSliding;
        },
        set: function (val) {
            this._enableSliding = util_1.isTrueProperty(val);
            this._updateSlidingState();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    List.prototype.containsSlidingItem = function (contains) {
        this._containsSlidingItems = contains;
        this._updateSlidingState();
    };
    List.prototype._updateSlidingState = function () {
        var shouldSlide = this._enableSliding && this._containsSlidingItems;
        if (!shouldSlide) {
            this._slidingGesture && this._slidingGesture.destroy();
            this._slidingGesture = null;
        }
        else if (!this._slidingGesture) {
            void 0;
            this._slidingGesture = new item_sliding_gesture_1.ItemSlidingGesture(this);
            this._slidingGesture.listen();
        }
    };
    /**
     * Close any sliding items that are open.
     */
    List.prototype.closeSlidingItems = function () {
        this._slidingGesture && this._slidingGesture.closeOpened();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], List.prototype, "sliding", null);
    List = __decorate([
        core_1.Directive({
            selector: 'ion-list',
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer, gesture_controller_1.GestureController])
    ], List);
    return List;
}(ion_1.Ion));
exports.List = List;
/**
 * @private
 */
var ListHeader = (function () {
    function ListHeader(_renderer, _elementRef, _id) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._id = _id;
    }
    Object.defineProperty(ListHeader.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (val) {
            this._id = val;
            this._renderer.setElementAttribute(this._elementRef.nativeElement, 'id', val);
        },
        enumerable: true,
        configurable: true
    });
    ListHeader = __decorate([
        core_1.Directive({
            selector: 'ion-list-header'
        }),
        __param(2, core_1.Attribute('id')), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef, String])
    ], ListHeader);
    return ListHeader;
}());
exports.ListHeader = ListHeader;
