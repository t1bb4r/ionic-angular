var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
import { Injectable, NgZone } from '@angular/core';
import { Activator } from './activator';
import { App } from '../app/app';
import { Config } from '../../config/config';
import { hasPointerMoved, pointerCoord } from '../../util/dom';
import { RippleActivator } from './ripple';
/**
 * @private
 */
export var TapClick = function () {
    function TapClick(config, app, zone) {
        _classCallCheck(this, TapClick);

        this.app = app;
        this.lastTouch = 0;
        this.disableClick = 0;
        this.lastActivated = 0;
        var self = this;
        if (config.get('activator') === 'ripple') {
            self.activator = new RippleActivator(app, config);
        } else if (config.get('activator') === 'highlight') {
            self.activator = new Activator(app, config);
        }
        self.usePolyfill = config.get('tapPolyfill') === true;
        zone.runOutsideAngular(function () {
            addListener('click', self.click.bind(self), true);
            addListener('touchstart', self.touchStart.bind(self));
            addListener('touchend', self.touchEnd.bind(self));
            addListener('touchcancel', self.pointerCancel.bind(self));
            addListener('mousedown', self.mouseDown.bind(self), true);
            addListener('mouseup', self.mouseUp.bind(self), true);
        });
        self.pointerMove = function (ev) {
            if (hasPointerMoved(POINTER_MOVE_UNTIL_CANCEL, self.startCoord, pointerCoord(ev))) {
                self.pointerCancel(ev);
            }
        };
    }

    _createClass(TapClick, [{
        key: "touchStart",
        value: function touchStart(ev) {
            this.lastTouch = Date.now();
            this.pointerStart(ev);
        }
    }, {
        key: "touchEnd",
        value: function touchEnd(ev) {
            this.lastTouch = Date.now();
            if (this.usePolyfill && this.startCoord && this.app.isEnabled()) {
                // only dispatch mouse click events from a touchend event
                // when tapPolyfill config is true, and the startCoordand endCoord
                // are not too far off from each other
                var endCoord = pointerCoord(ev);
                if (!hasPointerMoved(POINTER_TOLERANCE, this.startCoord, endCoord)) {
                    // prevent native mouse click events for XX amount of time
                    this.disableClick = this.lastTouch + DISABLE_NATIVE_CLICK_AMOUNT;
                    if (this.app.isScrolling()) {
                        // do not fire off a click event while the app was scrolling
                        console.debug('click from touch prevented by scrolling ' + Date.now());
                    } else {
                        // dispatch a mouse click event
                        console.debug('create click from touch ' + Date.now());
                        var clickEvent = document.createEvent('MouseEvents');
                        clickEvent.initMouseEvent('click', true, true, window, 1, 0, 0, endCoord.x, endCoord.y, false, false, false, false, 0, null);
                        clickEvent.isIonicTap = true;
                        ev.target.dispatchEvent(clickEvent);
                    }
                }
            }
            this.pointerEnd(ev);
        }
    }, {
        key: "mouseDown",
        value: function mouseDown(ev) {
            if (this.isDisabledNativeClick()) {
                console.debug('mouseDown prevent ' + ev.target.tagName + ' ' + Date.now());
                // does not prevent default on purpose
                // so native blur events from inputs can happen
                ev.stopPropagation();
            } else if (this.lastTouch + DISABLE_NATIVE_CLICK_AMOUNT < Date.now()) {
                this.pointerStart(ev);
            }
        }
    }, {
        key: "mouseUp",
        value: function mouseUp(ev) {
            if (this.isDisabledNativeClick()) {
                console.debug('mouseUp prevent ' + ev.target.tagName + ' ' + Date.now());
                ev.preventDefault();
                ev.stopPropagation();
            }
            if (this.lastTouch + DISABLE_NATIVE_CLICK_AMOUNT < Date.now()) {
                this.pointerEnd(ev);
            }
        }
    }, {
        key: "pointerStart",
        value: function pointerStart(ev) {
            var activatableEle = getActivatableTarget(ev.target);
            if (activatableEle) {
                this.startCoord = pointerCoord(ev);
                var now = Date.now();
                if (this.lastActivated + 150 < now && !this.app.isScrolling()) {
                    this.activator && this.activator.downAction(ev, activatableEle, this.startCoord);
                    this.lastActivated = now;
                }
                this.moveListeners(true);
            } else {
                this.startCoord = null;
            }
        }
    }, {
        key: "pointerEnd",
        value: function pointerEnd(ev) {
            if (this.startCoord && this.activator) {
                var activatableEle = getActivatableTarget(ev.target);
                if (activatableEle) {
                    this.activator.upAction(ev, activatableEle, this.startCoord);
                }
            }
            this.moveListeners(false);
        }
    }, {
        key: "pointerCancel",
        value: function pointerCancel(ev) {
            console.debug('pointerCancel from ' + ev.type + ' ' + Date.now());
            this.activator && this.activator.clearState();
            this.moveListeners(false);
        }
    }, {
        key: "moveListeners",
        value: function moveListeners(shouldAdd) {
            removeListener(this.usePolyfill ? 'touchmove' : 'mousemove', this.pointerMove);
            if (shouldAdd) {
                addListener(this.usePolyfill ? 'touchmove' : 'mousemove', this.pointerMove);
            }
        }
    }, {
        key: "click",
        value: function click(ev) {
            var preventReason = null;
            if (!this.app.isEnabled()) {
                preventReason = 'appDisabled';
            } else if (!ev.isIonicTap && this.isDisabledNativeClick()) {
                preventReason = 'nativeClick';
            }
            if (preventReason !== null) {
                console.debug('click prevent ' + preventReason + ' ' + Date.now());
                ev.preventDefault();
                ev.stopPropagation();
            }
        }
    }, {
        key: "isDisabledNativeClick",
        value: function isDisabledNativeClick() {
            return this.disableClick > Date.now();
        }
    }]);

    return TapClick;
}();
TapClick = __decorate([Injectable(), __metadata('design:paramtypes', [typeof (_a = typeof Config !== 'undefined' && Config) === 'function' && _a || Object, typeof (_b = typeof App !== 'undefined' && App) === 'function' && _b || Object, typeof (_c = typeof NgZone !== 'undefined' && NgZone) === 'function' && _c || Object])], TapClick);
function getActivatableTarget(ele) {
    var targetEle = ele;
    for (var x = 0; x < 4; x++) {
        if (!targetEle) break;
        if (isActivatable(targetEle)) return targetEle;
        targetEle = targetEle.parentElement;
    }
    return null;
}
/**
 * @private
 */
export var isActivatable = function isActivatable(ele) {
    if (ACTIVATABLE_ELEMENTS.test(ele.tagName)) {
        return true;
    }
    var attributes = ele.attributes;
    for (var i = 0, l = attributes.length; i < l; i++) {
        if (ACTIVATABLE_ATTRIBUTES.test(attributes[i].name)) {
            return true;
        }
    }
    return false;
};
function addListener(type, listener, useCapture) {
    document.addEventListener(type, listener, useCapture);
}
function removeListener(type, listener) {
    document.removeEventListener(type, listener);
}
var ACTIVATABLE_ELEMENTS = /^(A|BUTTON)$/;
var ACTIVATABLE_ATTRIBUTES = /tappable|button/i;
var POINTER_TOLERANCE = 4;
var POINTER_MOVE_UNTIL_CANCEL = 10;
var DISABLE_NATIVE_CLICK_AMOUNT = 2500;
var _a, _b, _c;