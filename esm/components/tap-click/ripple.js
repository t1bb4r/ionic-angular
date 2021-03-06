var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Activator } from './activator';
import { CSS, hasPointerMoved, nativeRaf, pointerCoord, rafFrames } from '../../util/dom';
/**
 * @private
 */
export var RippleActivator = function (_Activator) {
    _inherits(RippleActivator, _Activator);

    function RippleActivator(app, config) {
        _classCallCheck(this, RippleActivator);

        return _possibleConstructorReturn(this, (RippleActivator.__proto__ || Object.getPrototypeOf(RippleActivator)).call(this, app, config));
    }

    _createClass(RippleActivator, [{
        key: 'downAction',
        value: function downAction(ev, activatableEle, startCoord) {
            var self = this;
            if (self.disableActivated(ev)) {
                return;
            }
            // queue to have this element activated
            self._queue.push(activatableEle);
            nativeRaf(function () {
                for (var i = 0; i < self._queue.length; i++) {
                    var queuedEle = self._queue[i];
                    if (queuedEle && queuedEle.parentNode) {
                        self._active.push(queuedEle);
                        // DOM WRITE
                        queuedEle.classList.add(self._css);
                        var j = queuedEle.childElementCount;
                        while (j--) {
                            var rippleEle = queuedEle.children[j];
                            if (rippleEle.tagName === 'ION-BUTTON-EFFECT') {
                                // DOM WRITE
                                rippleEle.style.left = '-9999px';
                                rippleEle.style.opacity = '';
                                rippleEle.style[CSS.transform] = 'scale(0.001) translateZ(0px)';
                                rippleEle.style[CSS.transition] = '';
                                // DOM READ
                                var clientRect = activatableEle.getBoundingClientRect();
                                rippleEle.$top = clientRect.top;
                                rippleEle.$left = clientRect.left;
                                rippleEle.$width = clientRect.width;
                                rippleEle.$height = clientRect.height;
                                break;
                            }
                        }
                    }
                }
                self._queue = [];
            });
        }
    }, {
        key: 'upAction',
        value: function upAction(ev, activatableEle, startCoord) {
            var self = this;
            if (!hasPointerMoved(6, startCoord, pointerCoord(ev))) {
                var i = activatableEle.childElementCount;
                while (i--) {
                    var rippleEle = activatableEle.children[i];
                    if (rippleEle.tagName === 'ION-BUTTON-EFFECT') {
                        var clientPointerX = startCoord.x - rippleEle.$left;
                        var clientPointerY = startCoord.y - rippleEle.$top;
                        var x = Math.max(Math.abs(rippleEle.$width - clientPointerX), clientPointerX) * 2;
                        var y = Math.max(Math.abs(rippleEle.$height - clientPointerY), clientPointerY) * 2;
                        var diameter = Math.min(Math.max(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)), 64), 240);
                        if (activatableEle.hasAttribute('ion-item')) {
                            diameter = Math.min(diameter, 140);
                        }
                        var radius = Math.sqrt(rippleEle.$width + rippleEle.$height);
                        var scaleTransitionDuration = Math.max(1600 * Math.sqrt(radius / TOUCH_DOWN_ACCEL) + 0.5, 260);
                        var opacityTransitionDuration = scaleTransitionDuration * 0.7;
                        var opacityTransitionDelay = scaleTransitionDuration - opacityTransitionDuration;
                        // DOM WRITE
                        rippleEle.style.width = rippleEle.style.height = diameter + 'px';
                        rippleEle.style.marginTop = rippleEle.style.marginLeft = -(diameter / 2) + 'px';
                        rippleEle.style.left = clientPointerX + 'px';
                        rippleEle.style.top = clientPointerY + 'px';
                        rippleEle.style.opacity = '0';
                        rippleEle.style[CSS.transform] = 'scale(1) translateZ(0px)';
                        rippleEle.style[CSS.transition] = 'transform ' + scaleTransitionDuration + 'ms,opacity ' + opacityTransitionDuration + 'ms ' + opacityTransitionDelay + 'ms';
                    }
                }
            }
            _get(RippleActivator.prototype.__proto__ || Object.getPrototypeOf(RippleActivator.prototype), 'upAction', this).call(this, ev, activatableEle, startCoord);
        }
    }, {
        key: 'deactivate',
        value: function deactivate() {
            // remove the active class from all active elements
            var self = this;
            self._queue = [];
            rafFrames(2, function () {
                for (var i = 0; i < self._active.length; i++) {
                    self._active[i].classList.remove(self._css);
                }
                self._active = [];
            });
        }
    }]);

    return RippleActivator;
}(Activator);
var TOUCH_DOWN_ACCEL = 300;