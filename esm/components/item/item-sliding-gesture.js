var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { closest, pointerCoord } from '../../util/dom';
import { GesturePriority } from '../../gestures/gesture-controller';
import { PanGesture } from '../../gestures/drag-gesture';
var DRAG_THRESHOLD = 10;
var MAX_ATTACK_ANGLE = 20;
export var ItemSlidingGesture = function (_PanGesture) {
    _inherits(ItemSlidingGesture, _PanGesture);

    function ItemSlidingGesture(list) {
        _classCallCheck(this, ItemSlidingGesture);

        var _this = _possibleConstructorReturn(this, (ItemSlidingGesture.__proto__ || Object.getPrototypeOf(ItemSlidingGesture)).call(this, list.getNativeElement(), {
            maxAngle: MAX_ATTACK_ANGLE,
            threshold: DRAG_THRESHOLD,
            gesture: list._gestureCtrl.create('item-sliding', {
                priority: GesturePriority.SlidingItem
            })
        }));

        _this.list = list;
        _this.preSelectedContainer = null;
        _this.selectedContainer = null;
        _this.openContainer = null;
        return _this;
    }

    _createClass(ItemSlidingGesture, [{
        key: 'canStart',
        value: function canStart(ev) {
            if (this.selectedContainer) {
                return false;
            }
            // Get swiped sliding container
            var container = getContainer(ev);
            if (!container) {
                this.closeOpened();
                return false;
            }
            // Close open container if it is not the selected one.
            if (container !== this.openContainer) {
                this.closeOpened();
            }
            var coord = pointerCoord(ev);
            this.preSelectedContainer = container;
            this.firstCoordX = coord.x;
            this.firstTimestamp = Date.now();
            return true;
        }
    }, {
        key: 'onDragStart',
        value: function onDragStart(ev) {
            ev.preventDefault();
            var coord = pointerCoord(ev);
            this.selectedContainer = this.openContainer = this.preSelectedContainer;
            this.selectedContainer.startSliding(coord.x);
        }
    }, {
        key: 'onDragMove',
        value: function onDragMove(ev) {
            ev.preventDefault();
            var coordX = pointerCoord(ev).x;
            this.selectedContainer.moveSliding(coordX);
        }
    }, {
        key: 'onDragEnd',
        value: function onDragEnd(ev) {
            ev.preventDefault();
            var coordX = pointerCoord(ev).x;
            var deltaX = coordX - this.firstCoordX;
            var deltaT = Date.now() - this.firstTimestamp;
            var openAmount = this.selectedContainer.endSliding(deltaX / deltaT);
            this.selectedContainer = null;
            this.preSelectedContainer = null;
        }
    }, {
        key: 'notCaptured',
        value: function notCaptured(ev) {
            this.closeOpened();
        }
    }, {
        key: 'closeOpened',
        value: function closeOpened() {
            this.selectedContainer = null;
            if (this.openContainer) {
                this.openContainer.close();
                this.openContainer = null;
                return true;
            }
            return false;
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            _get(ItemSlidingGesture.prototype.__proto__ || Object.getPrototypeOf(ItemSlidingGesture.prototype), 'destroy', this).call(this);
            this.closeOpened();
            this.list = null;
            this.preSelectedContainer = null;
            this.selectedContainer = null;
            this.openContainer = null;
        }
    }]);

    return ItemSlidingGesture;
}(PanGesture);
function getContainer(ev) {
    var ele = closest(ev.target, 'ion-item-sliding', true);
    if (ele) {
        return ele['$ionComponent'];
    }
    return null;
}