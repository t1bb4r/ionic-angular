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
import { Component, ElementRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Ion } from '../ion';
/**
 * @name Scroll
 * @description
 * Scroll is a non-flexboxed scroll area that can scroll horizontally or vertically. `ion-Scroll` Can be used in places where you may not need a full page scroller, but a highly customized one, such as image scubber or comment scroller.
 * @usage
 * ```html
 * <ion-scroll scrollX="true">
 * </ion-scroll>
 *
 * <ion-scroll scrollY="true">
 * </ion-scroll>
 *
 * <ion-scroll scrollX="true" scrollY="true">
 * </ion-scroll>
 * ```
 *@property {boolean} [scrollX] - whether to enable scrolling along the X axis
 *@property {boolean} [scrollY] - whether to enable scrolling along the Y axis
 *@property {boolean} [zoom] - whether to enable zooming
 *@property {number} [maxZoom] - set the max zoom amount for ion-scroll
 * @demo /docs/v2/demos/scroll/
 */
export var Scroll = function (_Ion) {
    _inherits(Scroll, _Ion);

    function Scroll(elementRef) {
        _classCallCheck(this, Scroll);

        /**
         * @private
         */
        var _this = _possibleConstructorReturn(this, (Scroll.__proto__ || Object.getPrototypeOf(Scroll)).call(this, elementRef));

        _this.maxScale = 3;
        /**
         * @private
         */
        _this.zoomDuration = 250;
        return _this;
    }
    /**
     * @private
     */


    _createClass(Scroll, [{
        key: "ngOnInit",
        value: function ngOnInit() {
            this.scrollElement = this.getNativeElement().children[0];
        }
        /**
         * @private
         * Add a scroll event handler to the scroll element if it exists.
         * @param {Function} handler  The scroll handler to add to the scroll element.
         * @returns {?Function} a function to remove the specified handler, otherwise
         * undefined if the scroll element doesn't exist.
         */

    }, {
        key: "addScrollEventListener",
        value: function addScrollEventListener(handler) {
            var _this2 = this;

            if (!this.scrollElement) {
                return;
            }
            this.scrollElement.addEventListener('scroll', handler);
            return function () {
                _this2.scrollElement.removeEventListener('scroll', handler);
            };
        }
    }]);

    return Scroll;
}(Ion);
Scroll = __decorate([Component({
    selector: 'ion-scroll',
    inputs: ['scrollX', 'scrollY', 'zoom', 'maxZoom'],
    host: {
        '[class.scroll-x]': 'scrollX',
        '[class.scroll-y]': 'scrollY'
    },
    template: '<scroll-content>' + '<div class="scroll-zoom-wrapper">' + '<ng-content></ng-content>' + '</div>' + '</scroll-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
}), __metadata('design:paramtypes', [typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a || Object])], Scroll);
var _a;