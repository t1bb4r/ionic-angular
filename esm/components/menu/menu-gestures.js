var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { SlideEdgeGesture } from '../../gestures/slide-edge-gesture';
import { assign } from '../../util/util';
import { GesturePriority } from '../../gestures/gesture-controller';
/**
 * Gesture attached to the content which the menu is assigned to
 */
export var MenuContentGesture = function (_SlideEdgeGesture) {
    _inherits(MenuContentGesture, _SlideEdgeGesture);

    function MenuContentGesture(menu, contentEle) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, MenuContentGesture);

        var _this = _possibleConstructorReturn(this, (MenuContentGesture.__proto__ || Object.getPrototypeOf(MenuContentGesture)).call(this, contentEle, assign({
            direction: 'x',
            edge: menu.side,
            threshold: 0,
            maxEdgeStart: menu.maxEdgeStart || 50,
            maxAngle: 40,
            gesture: menu.gestureCtrl.create('menu-swipe', {
                priority: GesturePriority.MenuSwipe
            })
        }, options)));

        _this.menu = menu;
        return _this;
    }

    _createClass(MenuContentGesture, [{
        key: 'canStart',
        value: function canStart(ev) {
            var menu = this.menu;
            if (!menu.enabled || !menu.swipeEnabled) {
                return false;
            }
            if (menu.isOpen) {
                return true;
            } else if (menu.getMenuController().getOpen()) {
                return false;
            }
            return _get(MenuContentGesture.prototype.__proto__ || Object.getPrototypeOf(MenuContentGesture.prototype), 'canStart', this).call(this, ev);
        }
        // Set CSS, then wait one frame for it to apply before sliding starts

    }, {
        key: 'onSlideBeforeStart',
        value: function onSlideBeforeStart(slide, ev) {
            console.debug('menu gesture, onSlideBeforeStart', this.menu.side);
            this.menu.swipeStart();
        }
    }, {
        key: 'onSlide',
        value: function onSlide(slide, ev) {
            var z = this.menu.side === 'right' ? slide.min : slide.max;
            var stepValue = slide.distance / z;
            console.debug('menu gesture, onSlide', this.menu.side, 'distance', slide.distance, 'min', slide.min, 'max', slide.max, 'z', z, 'stepValue', stepValue);
            ev.preventDefault();
            this.menu.swipeProgress(stepValue);
        }
    }, {
        key: 'onSlideEnd',
        value: function onSlideEnd(slide, ev) {
            var z = this.menu.side === 'right' ? slide.min : slide.max;
            var currentStepValue = slide.distance / z;
            var velocity = slide.velocity;
            z = Math.abs(z * 0.5);
            var shouldCompleteRight = velocity >= 0 && (velocity > 0.2 || slide.delta > z);
            var shouldCompleteLeft = velocity <= 0 && (velocity < -0.2 || slide.delta < -z);
            console.debug('menu gesture, onSlide', this.menu.side, 'distance', slide.distance, 'delta', slide.delta, 'velocity', velocity, 'min', slide.min, 'max', slide.max, 'shouldCompleteLeft', shouldCompleteLeft, 'shouldCompleteRight', shouldCompleteRight, 'currentStepValue', currentStepValue);
            this.menu.swipeEnd(shouldCompleteLeft, shouldCompleteRight, currentStepValue);
        }
    }, {
        key: 'getElementStartPos',
        value: function getElementStartPos(slide, ev) {
            if (this.menu.side === 'right') {
                // right menu
                return this.menu.isOpen ? slide.min : slide.max;
            }
            // left menu
            return this.menu.isOpen ? slide.max : slide.min;
        }
    }, {
        key: 'getSlideBoundaries',
        value: function getSlideBoundaries() {
            if (this.menu.side === 'right') {
                // right menu
                return {
                    min: -this.menu.width(),
                    max: 0
                };
            }
            // left menu
            return {
                min: 0,
                max: this.menu.width()
            };
        }
    }]);

    return MenuContentGesture;
}(SlideEdgeGesture);