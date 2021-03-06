var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Animation } from '../animations/animation';
import { Content } from '../components/content/content';
import { Transition } from './transition';
/**
 * @private
 */
export var PageTransition = function (_Transition) {
    _inherits(PageTransition, _Transition);

    function PageTransition(enteringView, leavingView, opts) {
        _classCallCheck(this, PageTransition);

        var _this = _possibleConstructorReturn(this, (PageTransition.__proto__ || Object.getPrototypeOf(PageTransition)).call(this, enteringView, leavingView, opts));

        _this.enteringPage = new Animation(_this.enteringView.pageRef());
        _this.enteringPage.before.addClass('show-page');
        _this.add(_this.enteringPage);
        _this.before.addDomReadFn(_this.readDimensions.bind(_this));
        _this.before.addDomWriteFn(_this.writeDimensions.bind(_this));
        return _this;
    }
    /**
     * DOM READ
     */


    _createClass(PageTransition, [{
        key: 'readDimensions',
        value: function readDimensions() {
            var content = this.enteringView.getContent();
            if (content && content instanceof Content) {
                content.readDimensions();
            }
        }
        /**
         * DOM WRITE
         */

    }, {
        key: 'writeDimensions',
        value: function writeDimensions() {
            var content = this.enteringView.getContent();
            if (content && content instanceof Content) {
                content.writeDimensions();
            }
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            _get(PageTransition.prototype.__proto__ || Object.getPrototypeOf(PageTransition.prototype), 'destroy', this).call(this);
            this.enteringView = this.enteringPage = null;
        }
    }]);

    return PageTransition;
}(Transition);
function parsePxUnit(val) {
    return val.indexOf('px') > 0 ? parseInt(val, 10) : 0;
}