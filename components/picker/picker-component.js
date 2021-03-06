"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var common_1 = require('@angular/common');
var platform_browser_1 = require('@angular/platform-browser');
var animation_1 = require('../../animations/animation');
var backdrop_1 = require('../backdrop/backdrop');
var dom_1 = require('../../util/dom');
var util_1 = require('../../util/util');
var config_1 = require('../../config/config');
var key_1 = require('../../util/key');
var nav_params_1 = require('../nav/nav-params');
var transition_1 = require('../../transitions/transition');
var ui_event_manager_1 = require('../../util/ui-event-manager');
var view_controller_1 = require('../nav/view-controller');
/**
 * @private
 */
var PickerColumnCmp = (function () {
    function PickerColumnCmp(config, elementRef, _sanitizer) {
        this.elementRef = elementRef;
        this._sanitizer = _sanitizer;
        this.y = 0;
        this.pos = [];
        this.startY = null;
        this.receivingEvents = false;
        this.events = new ui_event_manager_1.UIEventManager();
        this.ionChange = new core_1.EventEmitter();
        this.rotateFactor = config.getNumber('pickerRotateFactor', 0);
    }
    PickerColumnCmp.prototype.ngAfterViewInit = function () {
        // get the scrollable element within the column
        var colEle = this.colEle.nativeElement;
        this.colHeight = colEle.clientHeight;
        // get the height of one option
        this.optHeight = (colEle.firstElementChild ? colEle.firstElementChild.clientHeight : 0);
        // set the scroll position for the selected option
        this.setSelected(this.col.selectedIndex, 0);
        // Listening for pointer events
        this.events.pointerEvents({
            elementRef: this.elementRef,
            pointerDown: this.pointerStart.bind(this),
            pointerMove: this.pointerMove.bind(this),
            pointerUp: this.pointerEnd.bind(this)
        });
    };
    PickerColumnCmp.prototype.ngOnDestroy = function () {
        this.events.unlistenAll();
    };
    PickerColumnCmp.prototype.pointerStart = function (ev) {
        void 0;
        // cancel any previous raf's that haven't fired yet
        dom_1.cancelRaf(this.rafId);
        // remember where the pointer started from`
        this.startY = dom_1.pointerCoord(ev).y;
        // reset everything
        this.receivingEvents = true;
        this.velocity = 0;
        this.pos.length = 0;
        this.pos.push(this.startY, Date.now());
        var minY = (this.col.options.length - 1);
        var maxY = 0;
        for (var i = 0; i < this.col.options.length; i++) {
            if (!this.col.options[i].disabled) {
                minY = Math.min(minY, i);
                maxY = Math.max(maxY, i);
            }
        }
        this.minY = (minY * this.optHeight * -1);
        this.maxY = (maxY * this.optHeight * -1);
        return true;
    };
    PickerColumnCmp.prototype.pointerMove = function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        if (this.startY === null) {
            return;
        }
        var currentY = dom_1.pointerCoord(ev).y;
        this.pos.push(currentY, Date.now());
        // update the scroll position relative to pointer start position
        var y = this.y + (currentY - this.startY);
        if (y > this.minY) {
            // scrolling up higher than scroll area
            y = Math.pow(y, 0.8);
            this.bounceFrom = y;
        }
        else if (y < this.maxY) {
            // scrolling down below scroll area
            y += Math.pow(this.maxY - y, 0.9);
            this.bounceFrom = y;
        }
        else {
            this.bounceFrom = 0;
        }
        this.update(y, 0, false, false);
    };
    PickerColumnCmp.prototype.pointerEnd = function (ev) {
        if (!this.receivingEvents) {
            return;
        }
        this.receivingEvents = false;
        this.velocity = 0;
        if (this.bounceFrom > 0) {
            // bounce back up
            this.update(this.minY, 100, true, true);
        }
        else if (this.bounceFrom < 0) {
            // bounce back down
            this.update(this.maxY, 100, true, true);
        }
        else if (this.startY !== null) {
            var endY = dom_1.pointerCoord(ev).y;
            void 0;
            this.pos.push(endY, Date.now());
            var endPos = (this.pos.length - 1);
            var startPos = endPos;
            var timeRange = (Date.now() - 100);
            // move pointer to position measured 100ms ago
            for (var i = endPos; i > 0 && this.pos[i] > timeRange; i -= 2) {
                startPos = i;
            }
            if (startPos !== endPos) {
                // compute relative movement between these two points
                var timeOffset = (this.pos[endPos] - this.pos[startPos]);
                var movedTop = (this.pos[startPos - 1] - this.pos[endPos - 1]);
                // based on XXms compute the movement to apply for each render step
                this.velocity = ((movedTop / timeOffset) * FRAME_MS);
            }
            if (Math.abs(endY - this.startY) > 3) {
                ev.preventDefault();
                ev.stopPropagation();
                var y = this.y + (endY - this.startY);
                this.update(y, 0, true, true);
            }
        }
        this.startY = null;
        this.decelerate();
    };
    PickerColumnCmp.prototype.decelerate = function () {
        var y = 0;
        dom_1.cancelRaf(this.rafId);
        if (isNaN(this.y) || !this.optHeight) {
            // fallback in case numbers get outta wack
            this.update(y, 0, true, true);
        }
        else if (Math.abs(this.velocity) > 0) {
            // still decelerating
            this.velocity *= DECELERATION_FRICTION;
            // do not let it go slower than a velocity of 1
            this.velocity = (this.velocity > 0 ? Math.max(this.velocity, 1) : Math.min(this.velocity, -1));
            y = Math.round(this.y - this.velocity);
            if (y > this.minY) {
                // whoops, it's trying to scroll up farther than the options we have!
                y = this.minY;
                this.velocity = 0;
            }
            else if (y < this.maxY) {
                // gahh, it's trying to scroll down farther than we can!
                y = this.maxY;
                this.velocity = 0;
            }
            void 0;
            var notLockedIn = (y % this.optHeight !== 0 || Math.abs(this.velocity) > 1);
            this.update(y, 0, true, !notLockedIn);
            if (notLockedIn) {
                // isn't locked in yet, keep decelerating until it is
                this.rafId = dom_1.raf(this.decelerate.bind(this));
            }
        }
        else if (this.y % this.optHeight !== 0) {
            // needs to still get locked into a position so options line up
            var currentPos = Math.abs(this.y % this.optHeight);
            // create a velocity in the direction it needs to scroll
            this.velocity = (currentPos > (this.optHeight / 2) ? 1 : -1);
            this.decelerate();
        }
    };
    PickerColumnCmp.prototype.optClick = function (ev, index) {
        if (!this.velocity) {
            ev.preventDefault();
            ev.stopPropagation();
            this.setSelected(index, 150);
        }
    };
    PickerColumnCmp.prototype.setSelected = function (selectedIndex, duration) {
        // if there is a selected index, then figure out it's y position
        // if there isn't a selected index, then just use the top y position
        var y = (selectedIndex > -1) ? ((selectedIndex * this.optHeight) * -1) : 0;
        dom_1.cancelRaf(this.rafId);
        this.velocity = 0;
        // so what y position we're at
        this.update(y, duration, true, true);
    };
    PickerColumnCmp.prototype.update = function (y, duration, saveY, emitChange) {
        // ensure we've got a good round number :)
        y = Math.round(y);
        this.col.selectedIndex = Math.max(Math.abs(Math.round(y / this.optHeight)), 0);
        for (var i = 0; i < this.col.options.length; i++) {
            var opt = this.col.options[i];
            var optTop = (i * this.optHeight);
            var optOffset = (optTop + y);
            var rotateX = (optOffset * this.rotateFactor);
            var translateX = 0;
            var translateY = 0;
            var translateZ = 0;
            if (this.rotateFactor !== 0) {
                translateX = 0;
                translateZ = 90;
                if (rotateX > 90 || rotateX < -90) {
                    translateX = -9999;
                    rotateX = 0;
                }
            }
            else {
                translateY = optOffset;
            }
            opt._trans = this._sanitizer.bypassSecurityTrustStyle("rotateX(" + rotateX + "deg) translate3d(" + translateX + "px," + translateY + "px," + translateZ + "px)");
            opt._dur = (duration > 0 ? duration + 'ms' : '');
        }
        if (saveY) {
            this.y = y;
        }
        if (emitChange) {
            if (this.lastIndex === undefined) {
                // have not set a last index yet
                this.lastIndex = this.col.selectedIndex;
            }
            else if (this.lastIndex !== this.col.selectedIndex) {
                // new selected index has changed from the last index
                // update the lastIndex and emit that it has changed
                this.lastIndex = this.col.selectedIndex;
                this.ionChange.emit(this.col.options[this.col.selectedIndex]);
            }
        }
    };
    PickerColumnCmp.prototype.refresh = function () {
        var min = this.col.options.length - 1;
        var max = 0;
        for (var i = 0; i < this.col.options.length; i++) {
            if (!this.col.options[i].disabled) {
                min = Math.min(min, i);
                max = Math.max(max, i);
            }
        }
        var selectedIndex = util_1.clamp(min, this.col.selectedIndex, max);
        if (selectedIndex !== this.col.selectedIndex) {
            var y = (selectedIndex * this.optHeight) * -1;
            this.update(y, 150, true, true);
        }
    };
    __decorate([
        core_1.ViewChild('colEle'), 
        __metadata('design:type', core_1.ElementRef)
    ], PickerColumnCmp.prototype, "colEle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PickerColumnCmp.prototype, "col", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], PickerColumnCmp.prototype, "ionChange", void 0);
    PickerColumnCmp = __decorate([
        core_1.Component({
            selector: '.picker-col',
            template: "\n    <div *ngIf=\"col.prefix\" class=\"picker-prefix\" [style.width]=\"col.prefixWidth\">{{col.prefix}}</div>\n    <div class=\"picker-opts\" #colEle [style.width]=\"col.optionsWidth\">\n      <button *ngFor=\"let o of col.options; let i=index\" [style.transform]=\"o._trans\" [style.transitionDuration]=\"o._dur\" [style.webkitTransform]=\"o._trans\" [style.webkitTransitionDuration]=\"o._dur\" [class.picker-opt-selected]=\"col.selectedIndex === i\" [class.picker-opt-disabled]=\"o.disabled\" (click)=\"optClick($event, i)\" type=\"button\" category=\"picker-opt\">\n        {{o.text}}\n      </button>\n    </div>\n    <div *ngIf=\"col.suffix\" class=\"picker-suffix\" [style.width]=\"col.suffixWidth\">{{col.suffix}}</div>\n  ",
            directives: [common_1.NgFor, common_1.NgIf],
            host: {
                '[style.min-width]': 'col.columnWidth',
                '[class.picker-opts-left]': 'col.align=="left"',
                '[class.picker-opts-right]': 'col.align=="right"',
            }
        }), 
        __metadata('design:paramtypes', [config_1.Config, core_1.ElementRef, platform_browser_1.DomSanitizationService])
    ], PickerColumnCmp);
    return PickerColumnCmp;
}());
exports.PickerColumnCmp = PickerColumnCmp;
/**
 * @private
 */
var PickerCmp = (function () {
    function PickerCmp(_viewCtrl, _elementRef, _config, params, renderer) {
        this._viewCtrl = _viewCtrl;
        this._elementRef = _elementRef;
        this._config = _config;
        this.d = params.data;
        if (this.d.cssClass) {
            this.d.cssClass.split(' ').forEach(function (cssClass) {
                renderer.setElementClass(_elementRef.nativeElement, cssClass, true);
            });
        }
        this.id = (++pickerIds);
        this.lastClick = 0;
    }
    PickerCmp.prototype.ionViewLoaded = function () {
        // normalize the data
        var data = this.d;
        data.buttons = data.buttons.map(function (button) {
            if (util_1.isString(button)) {
                return { text: button };
            }
            if (button.role) {
                button.cssRole = "picker-toolbar-" + button.role;
            }
            return button;
        });
        // clean up dat data
        data.columns = data.columns.map(function (column) {
            if (!util_1.isPresent(column.columnWidth)) {
                column.columnWidth = (100 / data.columns.length) + '%';
            }
            if (!util_1.isPresent(column.options)) {
                column.options = [];
            }
            column.options = column.options.map(function (inputOpt) {
                var opt = {
                    text: '',
                    value: '',
                    disabled: inputOpt.disabled,
                };
                if (util_1.isPresent(inputOpt)) {
                    if (util_1.isString(inputOpt) || util_1.isNumber(inputOpt)) {
                        opt.text = inputOpt.toString();
                        opt.value = inputOpt;
                    }
                    else {
                        opt.text = util_1.isPresent(inputOpt.text) ? inputOpt.text : inputOpt.value;
                        opt.value = util_1.isPresent(inputOpt.value) ? inputOpt.value : inputOpt.text;
                    }
                }
                return opt;
            });
            return column;
        });
    };
    PickerCmp.prototype.refresh = function () {
        this._cols.forEach(function (column) {
            column.refresh();
        });
    };
    PickerCmp.prototype._colChange = function (selectedOption) {
        // one of the columns has changed its selected index
        var picker = this._viewCtrl;
        picker.ionChange.emit(this.getSelected());
    };
    PickerCmp.prototype._keyUp = function (ev) {
        if (this.enabled && this._viewCtrl.isLast()) {
            if (ev.keyCode === key_1.Key.ENTER) {
                if (this.lastClick + 1000 < Date.now()) {
                    // do not fire this click if there recently was already a click
                    // this can happen when the button has focus and used the enter
                    // key to click the button. However, both the click handler and
                    // this keyup event will fire, so only allow one of them to go.
                    void 0;
                    var button = this.d.buttons[this.d.buttons.length - 1];
                    this.btnClick(button);
                }
            }
            else if (ev.keyCode === key_1.Key.ESCAPE) {
                void 0;
                this.bdClick();
            }
        }
    };
    PickerCmp.prototype.ionViewDidEnter = function () {
        var activeElement = document.activeElement;
        if (activeElement) {
            activeElement.blur();
        }
        var focusableEle = this._elementRef.nativeElement.querySelector('button');
        if (focusableEle) {
            focusableEle.focus();
        }
        this.enabled = true;
    };
    PickerCmp.prototype.btnClick = function (button, dismissDelay) {
        var _this = this;
        if (!this.enabled) {
            return;
        }
        // keep the time of the most recent button click
        this.lastClick = Date.now();
        var shouldDismiss = true;
        if (button.handler) {
            // a handler has been provided, execute it
            // pass the handler the values from the inputs
            if (button.handler(this.getSelected()) === false) {
                // if the return value of the handler is false then do not dismiss
                shouldDismiss = false;
            }
        }
        if (shouldDismiss) {
            setTimeout(function () {
                _this.dismiss(button.role);
            }, dismissDelay || this._config.get('pageTransitionDelay'));
        }
    };
    PickerCmp.prototype.bdClick = function () {
        if (this.enabled && this.d.enableBackdropDismiss) {
            this.dismiss('backdrop');
        }
    };
    PickerCmp.prototype.dismiss = function (role) {
        return this._viewCtrl.dismiss(this.getSelected(), role);
    };
    PickerCmp.prototype.getSelected = function () {
        var selected = {};
        this.d.columns.forEach(function (col, index) {
            var selectedColumn = col.options[col.selectedIndex];
            selected[col.name] = {
                text: selectedColumn ? selectedColumn.text : null,
                value: selectedColumn ? selectedColumn.value : null,
                columnIndex: index,
            };
        });
        return selected;
    };
    __decorate([
        core_1.ViewChildren(PickerColumnCmp), 
        __metadata('design:type', core_1.QueryList)
    ], PickerCmp.prototype, "_cols", void 0);
    __decorate([
        core_1.HostListener('body:keyup', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [KeyboardEvent]), 
        __metadata('design:returntype', void 0)
    ], PickerCmp.prototype, "_keyUp", null);
    PickerCmp = __decorate([
        core_1.Component({
            selector: 'ion-picker-cmp',
            template: "\n    <ion-backdrop (click)=\"bdClick()\"></ion-backdrop>\n    <div class=\"picker-wrapper\">\n      <div class=\"picker-toolbar\">\n        <div *ngFor=\"let b of d.buttons\" class=\"picker-toolbar-button\" [ngClass]=\"b.cssRole\">\n          <button (click)=\"btnClick(b)\" [ngClass]=\"b.cssClass\" class=\"picker-button\" clear>\n            {{b.text}}\n          </button>\n        </div>\n      </div>\n      <div class=\"picker-columns\">\n        <div class=\"picker-above-highlight\"></div>\n        <div *ngFor=\"let c of d.columns\" [col]=\"c\" class=\"picker-col\" (ionChange)=\"_colChange($event)\"></div>\n        <div class=\"picker-below-highlight\"></div>\n      </div>\n    </div>\n  ",
            directives: [backdrop_1.Backdrop, common_1.NgClass, common_1.NgFor, PickerColumnCmp],
            host: {
                'role': 'dialog'
            },
            encapsulation: core_1.ViewEncapsulation.None,
        }), 
        __metadata('design:paramtypes', [view_controller_1.ViewController, core_1.ElementRef, config_1.Config, nav_params_1.NavParams, core_1.Renderer])
    ], PickerCmp);
    return PickerCmp;
}());
exports.PickerCmp = PickerCmp;
/**
 * Animations for pickers
 */
var PickerSlideIn = (function (_super) {
    __extends(PickerSlideIn, _super);
    function PickerSlideIn(enteringView, leavingView, opts) {
        _super.call(this, enteringView, leavingView, opts);
        var ele = enteringView.pageRef().nativeElement;
        var backdrop = new animation_1.Animation(ele.querySelector('ion-backdrop'));
        var wrapper = new animation_1.Animation(ele.querySelector('.picker-wrapper'));
        backdrop.fromTo('opacity', 0.01, 0.26);
        wrapper.fromTo('translateY', '100%', '0%');
        this.easing('cubic-bezier(.36,.66,.04,1)').duration(400).add(backdrop).add(wrapper);
    }
    return PickerSlideIn;
}(transition_1.Transition));
transition_1.Transition.register('picker-slide-in', PickerSlideIn);
var PickerSlideOut = (function (_super) {
    __extends(PickerSlideOut, _super);
    function PickerSlideOut(enteringView, leavingView, opts) {
        _super.call(this, enteringView, leavingView, opts);
        var ele = leavingView.pageRef().nativeElement;
        var backdrop = new animation_1.Animation(ele.querySelector('ion-backdrop'));
        var wrapper = new animation_1.Animation(ele.querySelector('.picker-wrapper'));
        backdrop.fromTo('opacity', 0.26, 0);
        wrapper.fromTo('translateY', '0%', '100%');
        this.easing('cubic-bezier(.36,.66,.04,1)').duration(450).add(backdrop).add(wrapper);
    }
    return PickerSlideOut;
}(transition_1.Transition));
transition_1.Transition.register('picker-slide-out', PickerSlideOut);
var pickerIds = -1;
var DECELERATION_FRICTION = 0.97;
var FRAME_MS = (1000 / 60);
