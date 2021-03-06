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
import { ChangeDetectionStrategy, Component, ContentChildren, ContentChild, Directive, ElementRef, EventEmitter, Input, Optional, Output, QueryList, Renderer, ViewEncapsulation } from '@angular/core';
import { CSS, nativeRaf, nativeTimeout, clearNativeTimeout } from '../../util/dom';
import { Item } from './item';
import { isPresent } from '../../util/util';
import { List } from '../list/list';
var SWIPE_MARGIN = 30;
var ELASTIC_FACTOR = 0.55;
export var ItemSideFlags;
(function (ItemSideFlags) {
    ItemSideFlags[ItemSideFlags["None"] = 0] = "None";
    ItemSideFlags[ItemSideFlags["Left"] = 1] = "Left";
    ItemSideFlags[ItemSideFlags["Right"] = 2] = "Right";
    ItemSideFlags[ItemSideFlags["Both"] = 3] = "Both";
})(ItemSideFlags || (ItemSideFlags = {}));
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
export var ItemOptions = function () {
    function ItemOptions(_elementRef, _renderer) {
        _classCallCheck(this, ItemOptions);

        this._elementRef = _elementRef;
        this._renderer = _renderer;
        /**
         * @output {event} Expression to evaluate when the item has been fully swiped.
         */
        this.ionSwipe = new EventEmitter();
    }
    /**
     * @private
     */


    _createClass(ItemOptions, [{
        key: "setCssStyle",
        value: function setCssStyle(property, value) {
            this._renderer.setElementStyle(this._elementRef.nativeElement, property, value);
        }
        /**
         * @private
         */

    }, {
        key: "getSides",
        value: function getSides() {
            if (isPresent(this.side) && this.side === 'left') {
                return ItemSideFlags.Left;
            } else {
                return ItemSideFlags.Right;
            }
        }
        /**
         * @private
         */

    }, {
        key: "width",
        value: function width() {
            return this._elementRef.nativeElement.offsetWidth;
        }
    }]);

    return ItemOptions;
}();
__decorate([Input(), __metadata('design:type', String)], ItemOptions.prototype, "side", void 0);
__decorate([Output(), __metadata('design:type', typeof (_a = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _a || Object)], ItemOptions.prototype, "ionSwipe", void 0);
ItemOptions = __decorate([Directive({
    selector: 'ion-item-options'
}), __metadata('design:paramtypes', [typeof (_b = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _b || Object, typeof (_c = typeof Renderer !== 'undefined' && Renderer) === 'function' && _c || Object])], ItemOptions);
var SlidingState;
(function (SlidingState) {
    SlidingState[SlidingState["Disabled"] = 2] = "Disabled";
    SlidingState[SlidingState["Enabled"] = 4] = "Enabled";
    SlidingState[SlidingState["Right"] = 8] = "Right";
    SlidingState[SlidingState["Left"] = 16] = "Left";
    SlidingState[SlidingState["SwipeRight"] = 32] = "SwipeRight";
    SlidingState[SlidingState["SwipeLeft"] = 64] = "SwipeLeft";
})(SlidingState || (SlidingState = {}));
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
export var ItemSliding = function () {
    function ItemSliding(list, _renderer, _elementRef) {
        _classCallCheck(this, ItemSliding);

        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._openAmount = 0;
        this._startX = 0;
        this._optsWidthRightSide = 0;
        this._optsWidthLeftSide = 0;
        this._timer = null;
        this._optsDirty = true;
        this._state = SlidingState.Disabled;
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
        this.ionDrag = new EventEmitter();
        list && list.containsSlidingItem(true);
        _elementRef.nativeElement.$ionComponent = this;
        this.setCssClass('item-wrapper', true);
    }

    _createClass(ItemSliding, [{
        key: "getOpenAmount",

        /**
         * @private
         */
        value: function getOpenAmount() {
            return this._openAmount;
        }
        /**
         * @private
         */

    }, {
        key: "getSlidingPercent",
        value: function getSlidingPercent() {
            var openAmount = this._openAmount;
            if (openAmount > 0) {
                return openAmount / this._optsWidthRightSide;
            } else if (openAmount < 0) {
                return openAmount / this._optsWidthLeftSide;
            } else {
                return 0;
            }
        }
        /**
         * @private
         */

    }, {
        key: "startSliding",
        value: function startSliding(startX) {
            if (this._timer) {
                clearNativeTimeout(this._timer);
                this._timer = null;
            }
            if (this._openAmount === 0) {
                this._optsDirty = true;
                this._setState(SlidingState.Enabled);
            }
            this._startX = startX + this._openAmount;
            this.item.setCssStyle(CSS.transition, 'none');
        }
        /**
         * @private
         */

    }, {
        key: "moveSliding",
        value: function moveSliding(x) {
            if (this._optsDirty) {
                this.calculateOptsWidth();
                return;
            }
            var openAmount = this._startX - x;
            switch (this._sides) {
                case ItemSideFlags.Right:
                    openAmount = Math.max(0, openAmount);
                    break;
                case ItemSideFlags.Left:
                    openAmount = Math.min(0, openAmount);
                    break;
                case ItemSideFlags.Both:
                    break;
                default:
                    return;
            }
            if (openAmount > this._optsWidthRightSide) {
                var optsWidth = this._optsWidthRightSide;
                openAmount = optsWidth + (openAmount - optsWidth) * ELASTIC_FACTOR;
            } else if (openAmount < -this._optsWidthLeftSide) {
                var optsWidth = -this._optsWidthLeftSide;
                openAmount = optsWidth + (openAmount - optsWidth) * ELASTIC_FACTOR;
            }
            this._setOpenAmount(openAmount, false);
            return openAmount;
        }
        /**
         * @private
         */

    }, {
        key: "endSliding",
        value: function endSliding(velocity) {
            var restingPoint = this._openAmount > 0 ? this._optsWidthRightSide : -this._optsWidthLeftSide;
            // Check if the drag didn't clear the buttons mid-point
            // and we aren't moving fast enough to swipe open
            var isCloseDirection = this._openAmount > 0 === !(velocity < 0);
            var isMovingFast = Math.abs(velocity) > 0.3;
            var isOnCloseZone = Math.abs(this._openAmount) < Math.abs(restingPoint / 2);
            if (shouldClose(isCloseDirection, isMovingFast, isOnCloseZone)) {
                restingPoint = 0;
            }
            this._setOpenAmount(restingPoint, true);
            this.fireSwipeEvent();
            return restingPoint;
        }
        /**
         * @private
         */

    }, {
        key: "fireSwipeEvent",
        value: function fireSwipeEvent() {
            if (this._state & SlidingState.SwipeRight) {
                this._rightOptions.ionSwipe.emit(this);
            } else if (this._state & SlidingState.SwipeLeft) {
                this._leftOptions.ionSwipe.emit(this);
            }
        }
        /**
         * @private
         */

    }, {
        key: "calculateOptsWidth",
        value: function calculateOptsWidth() {
            var _this = this;

            nativeRaf(function () {
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
        }
    }, {
        key: "_setOpenAmount",
        value: function _setOpenAmount(openAmount, isFinal) {
            var _this2 = this;

            if (this._timer) {
                clearNativeTimeout(this._timer);
                this._timer = null;
            }
            this._openAmount = openAmount;
            if (isFinal) {
                this.item.setCssStyle(CSS.transition, '');
            } else {
                if (openAmount > 0) {
                    var state = openAmount >= this._optsWidthRightSide + SWIPE_MARGIN ? SlidingState.Right | SlidingState.SwipeRight : SlidingState.Right;
                    this._setState(state);
                } else if (openAmount < 0) {
                    var _state = openAmount <= -this._optsWidthLeftSide - SWIPE_MARGIN ? SlidingState.Left | SlidingState.SwipeLeft : SlidingState.Left;
                    this._setState(_state);
                }
            }
            if (openAmount === 0) {
                this._timer = nativeTimeout(function () {
                    _this2._setState(SlidingState.Disabled);
                    _this2._timer = null;
                }, 600);
                this.item.setCssStyle(CSS.transform, '');
                return;
            }
            this.item.setCssStyle(CSS.transform, "translate3d(" + -openAmount + "px,0,0)");
            this.ionDrag.emit(this);
        }
    }, {
        key: "_setState",
        value: function _setState(state) {
            if (state === this._state) {
                return;
            }
            this.setCssClass('active-slide', state !== SlidingState.Disabled);
            this.setCssClass('active-options-right', !!(state & SlidingState.Right));
            this.setCssClass('active-options-left', !!(state & SlidingState.Left));
            this.setCssClass('active-swipe-right', !!(state & SlidingState.SwipeRight));
            this.setCssClass('active-swipe-left', !!(state & SlidingState.SwipeLeft));
            this._state = state;
        }
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

    }, {
        key: "close",
        value: function close() {
            this._setOpenAmount(0, true);
        }
        /**
         * @private
         */

    }, {
        key: "setCssClass",
        value: function setCssClass(cssClass, shouldAdd) {
            this._renderer.setElementClass(this._elementRef.nativeElement, cssClass, shouldAdd);
        }
        /**
         * @private
         */

    }, {
        key: "setCssStyle",
        value: function setCssStyle(property, value) {
            this._renderer.setElementStyle(this._elementRef.nativeElement, property, value);
        }
    }, {
        key: "_itemOptions",
        set: function set(itemOptions) {
            var sides = 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = itemOptions.toArray()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    var side = item.getSides();
                    if (side === ItemSideFlags.Left) {
                        this._leftOptions = item;
                    } else {
                        this._rightOptions = item;
                    }
                    sides |= item.getSides();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this._optsDirty = true;
            this._sides = sides;
        }
    }]);

    return ItemSliding;
}();
__decorate([ContentChild(Item), __metadata('design:type', typeof (_d = typeof Item !== 'undefined' && Item) === 'function' && _d || Object)], ItemSliding.prototype, "item", void 0);
__decorate([Output(), __metadata('design:type', typeof (_e = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _e || Object)], ItemSliding.prototype, "ionDrag", void 0);
__decorate([ContentChildren(ItemOptions), __metadata('design:type', typeof (_f = typeof QueryList !== 'undefined' && QueryList) === 'function' && _f || Object), __metadata('design:paramtypes', [typeof (_g = typeof QueryList !== 'undefined' && QueryList) === 'function' && _g || Object])], ItemSliding.prototype, "_itemOptions", null);
ItemSliding = __decorate([Component({
    selector: 'ion-item-sliding',
    template: "\n    <ng-content select=\"ion-item,[ion-item]\"></ng-content>\n    <ng-content select=\"ion-item-options\"></ng-content>\n  ",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
}), __param(0, Optional()), __metadata('design:paramtypes', [typeof (_h = typeof List !== 'undefined' && List) === 'function' && _h || Object, typeof (_j = typeof Renderer !== 'undefined' && Renderer) === 'function' && _j || Object, typeof (_k = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _k || Object])], ItemSliding);
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
    var shouldClose = !isMovingFast && isOnCloseZone || isCloseDirection && isMovingFast;
    return shouldClose;
}
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;