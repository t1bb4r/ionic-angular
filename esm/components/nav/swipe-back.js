var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { assign } from '../../util/util';
import { GesturePriority } from '../../gestures/gesture-controller';
import { SlideEdgeGesture } from '../../gestures/slide-edge-gesture';
export var SwipeBackGesture = function (_SlideEdgeGesture) {
    _inherits(SwipeBackGesture, _SlideEdgeGesture);

    function SwipeBackGesture(element, options, _nav, gestureCtlr) {
        _classCallCheck(this, SwipeBackGesture);

        var _this = _possibleConstructorReturn(this, (SwipeBackGesture.__proto__ || Object.getPrototypeOf(SwipeBackGesture)).call(this, element, assign({
            direction: 'x',
            maxEdgeStart: 75,
            gesture: gestureCtlr.create('goback-swipe', {
                priority: GesturePriority.GoBackSwipe
            })
        }, options)));

        _this._nav = _nav;
        return _this;
    }

    _createClass(SwipeBackGesture, [{
        key: 'canStart',
        value: function canStart(ev) {
            // the gesture swipe angle must be mainly horizontal and the
            // gesture distance would be relatively short for a swipe back
            // and swipe back must be possible on this nav controller
            return this._nav.canSwipeBack() && _get(SwipeBackGesture.prototype.__proto__ || Object.getPrototypeOf(SwipeBackGesture.prototype), 'canStart', this).call(this, ev);
        }
    }, {
        key: 'onSlideBeforeStart',
        value: function onSlideBeforeStart(slideData, ev) {
            console.debug('swipeBack, onSlideBeforeStart', ev.type);
            this._nav.swipeBackStart();
        }
    }, {
        key: 'onSlide',
        value: function onSlide(slide) {
            var stepValue = slide.distance / slide.max;
            console.debug('swipeBack, onSlide, distance', slide.distance, 'max', slide.max, 'stepValue', stepValue);
            this._nav.swipeBackProgress(stepValue);
        }
    }, {
        key: 'onSlideEnd',
        value: function onSlideEnd(slide, ev) {
            var shouldComplete = Math.abs(slide.velocity) > 0.2 || Math.abs(slide.delta) > Math.abs(slide.max) * 0.5;
            var currentStepValue = slide.distance / slide.max;
            console.debug('swipeBack, onSlideEnd, shouldComplete', shouldComplete, 'currentStepValue', currentStepValue);
            this._nav.swipeBackEnd(shouldComplete, currentStepValue);
        }
    }]);

    return SwipeBackGesture;
}(SlideEdgeGesture);