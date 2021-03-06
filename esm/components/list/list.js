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
import { Attribute, Directive, ElementRef, Input, Renderer } from '@angular/core';
import { Ion } from '../ion';
import { isTrueProperty } from '../../util/util';
import { ItemSlidingGesture } from '../item/item-sliding-gesture';
import { GestureController } from '../../gestures/gesture-controller';
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
export var List = function (_Ion) {
    _inherits(List, _Ion);

    function List(elementRef, _rendered, _gestureCtrl) {
        _classCallCheck(this, List);

        var _this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, elementRef));

        _this._rendered = _rendered;
        _this._gestureCtrl = _gestureCtrl;
        _this._enableSliding = true;
        _this._containsSlidingItems = false;
        return _this;
    }
    /**
     * @private
     */


    _createClass(List, [{
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
            this._slidingGesture && this._slidingGesture.destroy();
        }
        /**
         * @input {boolean} shouldEnable whether the item-sliding should be enabled or not
         */

    }, {
        key: "containsSlidingItem",

        /**
         * @private
         */
        value: function containsSlidingItem(contains) {
            this._containsSlidingItems = contains;
            this._updateSlidingState();
        }
    }, {
        key: "_updateSlidingState",
        value: function _updateSlidingState() {
            var shouldSlide = this._enableSliding && this._containsSlidingItems;
            if (!shouldSlide) {
                this._slidingGesture && this._slidingGesture.destroy();
                this._slidingGesture = null;
            } else if (!this._slidingGesture) {
                console.debug('enableSlidingItems');
                this._slidingGesture = new ItemSlidingGesture(this);
                this._slidingGesture.listen();
            }
        }
        /**
         * Close any sliding items that are open.
         */

    }, {
        key: "closeSlidingItems",
        value: function closeSlidingItems() {
            this._slidingGesture && this._slidingGesture.closeOpened();
        }
    }, {
        key: "sliding",
        get: function get() {
            return this._enableSliding;
        },
        set: function set(val) {
            this._enableSliding = isTrueProperty(val);
            this._updateSlidingState();
        }
    }]);

    return List;
}(Ion);
__decorate([Input(), __metadata('design:type', Boolean)], List.prototype, "sliding", null);
List = __decorate([Directive({
    selector: 'ion-list'
}), __metadata('design:paramtypes', [typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a || Object, typeof (_b = typeof Renderer !== 'undefined' && Renderer) === 'function' && _b || Object, typeof (_c = typeof GestureController !== 'undefined' && GestureController) === 'function' && _c || Object])], List);
/**
 * @private
 */
export var ListHeader = function () {
    function ListHeader(_renderer, _elementRef, _id) {
        _classCallCheck(this, ListHeader);

        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._id = _id;
    }

    _createClass(ListHeader, [{
        key: "id",
        get: function get() {
            return this._id;
        },
        set: function set(val) {
            this._id = val;
            this._renderer.setElementAttribute(this._elementRef.nativeElement, 'id', val);
        }
    }]);

    return ListHeader;
}();
ListHeader = __decorate([Directive({
    selector: 'ion-list-header'
}), __param(2, Attribute('id')), __metadata('design:paramtypes', [typeof (_d = typeof Renderer !== 'undefined' && Renderer) === 'function' && _d || Object, typeof (_e = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _e || Object, String])], ListHeader);
var _a, _b, _c, _d, _e;