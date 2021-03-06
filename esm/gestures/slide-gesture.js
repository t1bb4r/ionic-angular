var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { PanGesture } from './drag-gesture';
import { clamp } from '../util';
import { pointerCoord } from '../util/dom';
/**
 * @private
 */
export var SlideGesture = function (_PanGesture) {
    _inherits(SlideGesture, _PanGesture);

    function SlideGesture(element) {
        var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, SlideGesture);

        var _this = _possibleConstructorReturn(this, (SlideGesture.__proto__ || Object.getPrototypeOf(SlideGesture)).call(this, element, opts));

        _this.slide = null;
        return _this;
    }
    /*
     * Get the min and max for the slide. pageX/pageY.
     * Only called on dragstart.
     */


    _createClass(SlideGesture, [{
        key: 'getSlideBoundaries',
        value: function getSlideBoundaries(slide, ev) {
            return {
                min: 0,
                max: this.getNativeElement().offsetWidth
            };
        }
        /*
         * Get the element's pos when the drag starts.
         * For example, an open side menu starts at 100% and a closed
         * sidemenu starts at 0%.
         */

    }, {
        key: 'getElementStartPos',
        value: function getElementStartPos(slide, ev) {
            return 0;
        }
    }, {
        key: 'onDragStart',
        value: function onDragStart(ev) {
            this.slide = {};
            this.onSlideBeforeStart(this.slide, ev);

            var _getSlideBoundaries = this.getSlideBoundaries(this.slide, ev);

            var min = _getSlideBoundaries.min;
            var max = _getSlideBoundaries.max;

            var coord = pointerCoord(ev);
            this.slide.min = min;
            this.slide.max = max;
            this.slide.elementStartPos = this.getElementStartPos(this.slide, ev);
            this.slide.pos = this.slide.pointerStartPos = coord[this.direction];
            this.slide.timestamp = Date.now();
            this.slide.started = true;
            this.slide.velocity = 0;
            this.onSlideStart(this.slide, ev);
        }
    }, {
        key: 'onDragMove',
        value: function onDragMove(ev) {
            var slide = this.slide;
            var coord = pointerCoord(ev);
            var newPos = coord[this.direction];
            var newTimestamp = Date.now();
            var velocity = (newPos - slide.pos) / (newTimestamp - slide.timestamp);
            slide.pos = newPos;
            slide.timestamp = newTimestamp;
            slide.distance = clamp(slide.min, newPos - slide.pointerStartPos + slide.elementStartPos, slide.max);
            slide.velocity = velocity;
            slide.delta = newPos - slide.pointerStartPos;
            this.onSlide(slide, ev);
            return true;
        }
    }, {
        key: 'onDragEnd',
        value: function onDragEnd(ev) {
            this.onSlideEnd(this.slide, ev);
            this.slide = null;
        }
    }, {
        key: 'onSlideBeforeStart',
        value: function onSlideBeforeStart(slide, ev) {}
    }, {
        key: 'onSlideStart',
        value: function onSlideStart(slide, ev) {}
    }, {
        key: 'onSlide',
        value: function onSlide(slide, ev) {}
    }, {
        key: 'onSlideEnd',
        value: function onSlideEnd(slide, ev) {}
    }]);

    return SlideGesture;
}(PanGesture);