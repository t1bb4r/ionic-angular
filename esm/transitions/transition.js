var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Animation } from '../animations/animation';
/**
 * @private
 *
 * - play
 * - Add before classes - DOM WRITE
 * - Remove before classes - DOM WRITE
 * - Add before inline styles - DOM WRITE
 * - set inline FROM styles - DOM WRITE
 * - RAF
 * - read toolbar dimensions - DOM READ
 * - write content top/bottom padding - DOM WRITE
 * - set css transition duration/easing - DOM WRITE
 * - RAF
 * - set inline TO styles - DOM WRITE
 */
export var Transition = function (_Animation) {
    _inherits(Transition, _Animation);

    function Transition(enteringView, leavingView, opts) {
        _classCallCheck(this, Transition);

        var _this = _possibleConstructorReturn(this, (Transition.__proto__ || Object.getPrototypeOf(Transition)).call(this, null, {
            renderDelay: opts.renderDelay
        }));

        _this.enteringView = enteringView;
        return _this;
    }

    _createClass(Transition, null, [{
        key: 'createTransition',
        value: function createTransition(enteringView, leavingView, opts) {
            var TransitionClass = TransitionRegistry[opts.animation];
            if (!TransitionClass) {
                // didn't find a transition animation, default to ios-transition
                TransitionClass = TransitionRegistry['ios-transition'];
            }
            return new TransitionClass(enteringView, leavingView, opts);
        }
    }, {
        key: 'register',
        value: function register(name, TransitionClass) {
            TransitionRegistry[name] = TransitionClass;
        }
    }]);

    return Transition;
}(Animation);
var TransitionRegistry = {};