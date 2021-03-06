"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var activator_1 = require('./activator');
var app_1 = require('../app/app');
var config_1 = require('../../config/config');
var dom_1 = require('../../util/dom');
var ripple_1 = require('./ripple');
/**
 * @private
 */
var TapClick = (function () {
    function TapClick(config, app, zone) {
        this.app = app;
        this.lastTouch = 0;
        this.disableClick = 0;
        this.lastActivated = 0;
        var self = this;
        if (config.get('activator') === 'ripple') {
            self.activator = new ripple_1.RippleActivator(app, config);
        }
        else if (config.get('activator') === 'highlight') {
            self.activator = new activator_1.Activator(app, config);
        }
        self.usePolyfill = (config.get('tapPolyfill') === true);
        zone.runOutsideAngular(function () {
            addListener('click', self.click.bind(self), true);
            addListener('touchstart', self.touchStart.bind(self));
            addListener('touchend', self.touchEnd.bind(self));
            addListener('touchcancel', self.pointerCancel.bind(self));
            addListener('mousedown', self.mouseDown.bind(self), true);
            addListener('mouseup', self.mouseUp.bind(self), true);
        });
        self.pointerMove = function (ev) {
            if (dom_1.hasPointerMoved(POINTER_MOVE_UNTIL_CANCEL, self.startCoord, dom_1.pointerCoord(ev))) {
                self.pointerCancel(ev);
            }
        };
    }
    TapClick.prototype.touchStart = function (ev) {
        this.lastTouch = Date.now();
        this.pointerStart(ev);
    };
    TapClick.prototype.touchEnd = function (ev) {
        this.lastTouch = Date.now();
        if (this.usePolyfill && this.startCoord && this.app.isEnabled()) {
            // only dispatch mouse click events from a touchend event
            // when tapPolyfill config is true, and the startCoordand endCoord
            // are not too far off from each other
            var endCoord = dom_1.pointerCoord(ev);
            if (!dom_1.hasPointerMoved(POINTER_TOLERANCE, this.startCoord, endCoord)) {
                // prevent native mouse click events for XX amount of time
                this.disableClick = this.lastTouch + DISABLE_NATIVE_CLICK_AMOUNT;
                if (this.app.isScrolling()) {
                    // do not fire off a click event while the app was scrolling
                    void 0;
                }
                else {
                    // dispatch a mouse click event
                    void 0;
                    var clickEvent = document.createEvent('MouseEvents');
                    clickEvent.initMouseEvent('click', true, true, window, 1, 0, 0, endCoord.x, endCoord.y, false, false, false, false, 0, null);
                    clickEvent.isIonicTap = true;
                    ev.target.dispatchEvent(clickEvent);
                }
            }
        }
        this.pointerEnd(ev);
    };
    TapClick.prototype.mouseDown = function (ev) {
        if (this.isDisabledNativeClick()) {
            void 0;
            // does not prevent default on purpose
            // so native blur events from inputs can happen
            ev.stopPropagation();
        }
        else if (this.lastTouch + DISABLE_NATIVE_CLICK_AMOUNT < Date.now()) {
            this.pointerStart(ev);
        }
    };
    TapClick.prototype.mouseUp = function (ev) {
        if (this.isDisabledNativeClick()) {
            void 0;
            ev.preventDefault();
            ev.stopPropagation();
        }
        if (this.lastTouch + DISABLE_NATIVE_CLICK_AMOUNT < Date.now()) {
            this.pointerEnd(ev);
        }
    };
    TapClick.prototype.pointerStart = function (ev) {
        var activatableEle = getActivatableTarget(ev.target);
        if (activatableEle) {
            this.startCoord = dom_1.pointerCoord(ev);
            var now = Date.now();
            if (this.lastActivated + 150 < now && !this.app.isScrolling()) {
                this.activator && this.activator.downAction(ev, activatableEle, this.startCoord);
                this.lastActivated = now;
            }
            this.moveListeners(true);
        }
        else {
            this.startCoord = null;
        }
    };
    TapClick.prototype.pointerEnd = function (ev) {
        if (this.startCoord && this.activator) {
            var activatableEle = getActivatableTarget(ev.target);
            if (activatableEle) {
                this.activator.upAction(ev, activatableEle, this.startCoord);
            }
        }
        this.moveListeners(false);
    };
    TapClick.prototype.pointerCancel = function (ev) {
        void 0;
        this.activator && this.activator.clearState();
        this.moveListeners(false);
    };
    TapClick.prototype.moveListeners = function (shouldAdd) {
        removeListener(this.usePolyfill ? 'touchmove' : 'mousemove', this.pointerMove);
        if (shouldAdd) {
            addListener(this.usePolyfill ? 'touchmove' : 'mousemove', this.pointerMove);
        }
    };
    TapClick.prototype.click = function (ev) {
        var preventReason = null;
        if (!this.app.isEnabled()) {
            preventReason = 'appDisabled';
        }
        else if (!ev.isIonicTap && this.isDisabledNativeClick()) {
            preventReason = 'nativeClick';
        }
        if (preventReason !== null) {
            void 0;
            ev.preventDefault();
            ev.stopPropagation();
        }
    };
    TapClick.prototype.isDisabledNativeClick = function () {
        return this.disableClick > Date.now();
    };
    TapClick = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [config_1.Config, app_1.App, core_1.NgZone])
    ], TapClick);
    return TapClick;
}());
exports.TapClick = TapClick;
function getActivatableTarget(ele) {
    var targetEle = ele;
    for (var x = 0; x < 4; x++) {
        if (!targetEle)
            break;
        if (exports.isActivatable(targetEle))
            return targetEle;
        targetEle = targetEle.parentElement;
    }
    return null;
}
/**
 * @private
 */
exports.isActivatable = function (ele) {
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
