var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { SlideGesture } from './slide-gesture';
import { defaults } from '../util/util';
import { pointerCoord, windowDimensions } from '../util/dom';
/**
 * @private
 */
export var SlideEdgeGesture = function (_SlideGesture) {
    _inherits(SlideEdgeGesture, _SlideGesture);

    function SlideEdgeGesture(element) {
        var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, SlideEdgeGesture);

        defaults(opts, {
            edge: 'left',
            maxEdgeStart: 50
        });

        // Can check corners through use of eg 'left top'
        var _this = _possibleConstructorReturn(this, (SlideEdgeGesture.__proto__ || Object.getPrototypeOf(SlideEdgeGesture)).call(this, element, opts));

        _this.edges = opts.edge.split(' ');
        _this.maxEdgeStart = opts.maxEdgeStart;
        return _this;
    }

    _createClass(SlideEdgeGesture, [{
        key: 'canStart',
        value: function canStart(ev) {
            var _this2 = this;

            var coord = pointerCoord(ev);
            this._d = this.getContainerDimensions();
            return this.edges.every(function (edge) {
                return _this2._checkEdge(edge, coord);
            });
        }
    }, {
        key: 'getContainerDimensions',
        value: function getContainerDimensions() {
            return {
                left: 0,
                top: 0,
                width: windowDimensions().width,
                height: windowDimensions().height
            };
        }
    }, {
        key: '_checkEdge',
        value: function _checkEdge(edge, pos) {
            switch (edge) {
                case 'left':
                    return pos.x <= this._d.left + this.maxEdgeStart;
                case 'right':
                    return pos.x >= this._d.width - this.maxEdgeStart;
                case 'top':
                    return pos.y <= this._d.top + this.maxEdgeStart;
                case 'bottom':
                    return pos.y >= this._d.height - this.maxEdgeStart;
            }
        }
    }]);

    return SlideEdgeGesture;
}(SlideGesture);