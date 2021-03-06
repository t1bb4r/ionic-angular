var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
import { Component, ElementRef, EventEmitter, Input, HostListener, Output, QueryList, Renderer, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { DomSanitizationService } from '@angular/platform-browser';
import { Animation } from '../../animations/animation';
import { Backdrop } from '../backdrop/backdrop';
import { cancelRaf, pointerCoord, raf } from '../../util/dom';
import { clamp, isNumber, isPresent, isString } from '../../util/util';
import { Config } from '../../config/config';
import { Key } from '../../util/key';
import { NavParams } from '../nav/nav-params';
import { PickerColumn } from './picker-options';
import { Transition } from '../../transitions/transition';
import { UIEventManager } from '../../util/ui-event-manager';
import { ViewController } from '../nav/view-controller';
/**
 * @private
 */
export var PickerColumnCmp = function () {
    function PickerColumnCmp(config, elementRef, _sanitizer) {
        _classCallCheck(this, PickerColumnCmp);

        this.elementRef = elementRef;
        this._sanitizer = _sanitizer;
        this.y = 0;
        this.pos = [];
        this.startY = null;
        this.receivingEvents = false;
        this.events = new UIEventManager();
        this.ionChange = new EventEmitter();
        this.rotateFactor = config.getNumber('pickerRotateFactor', 0);
    }

    _createClass(PickerColumnCmp, [{
        key: "ngAfterViewInit",
        value: function ngAfterViewInit() {
            // get the scrollable element within the column
            var colEle = this.colEle.nativeElement;
            this.colHeight = colEle.clientHeight;
            // get the height of one option
            this.optHeight = colEle.firstElementChild ? colEle.firstElementChild.clientHeight : 0;
            // set the scroll position for the selected option
            this.setSelected(this.col.selectedIndex, 0);
            // Listening for pointer events
            this.events.pointerEvents({
                elementRef: this.elementRef,
                pointerDown: this.pointerStart.bind(this),
                pointerMove: this.pointerMove.bind(this),
                pointerUp: this.pointerEnd.bind(this)
            });
        }
    }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
            this.events.unlistenAll();
        }
    }, {
        key: "pointerStart",
        value: function pointerStart(ev) {
            console.debug('picker, pointerStart', ev.type, this.startY);
            // cancel any previous raf's that haven't fired yet
            cancelRaf(this.rafId);
            // remember where the pointer started from`
            this.startY = pointerCoord(ev).y;
            // reset everything
            this.receivingEvents = true;
            this.velocity = 0;
            this.pos.length = 0;
            this.pos.push(this.startY, Date.now());
            var minY = this.col.options.length - 1;
            var maxY = 0;
            for (var i = 0; i < this.col.options.length; i++) {
                if (!this.col.options[i].disabled) {
                    minY = Math.min(minY, i);
                    maxY = Math.max(maxY, i);
                }
            }
            this.minY = minY * this.optHeight * -1;
            this.maxY = maxY * this.optHeight * -1;
            return true;
        }
    }, {
        key: "pointerMove",
        value: function pointerMove(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            if (this.startY === null) {
                return;
            }
            var currentY = pointerCoord(ev).y;
            this.pos.push(currentY, Date.now());
            // update the scroll position relative to pointer start position
            var y = this.y + (currentY - this.startY);
            if (y > this.minY) {
                // scrolling up higher than scroll area
                y = Math.pow(y, 0.8);
                this.bounceFrom = y;
            } else if (y < this.maxY) {
                // scrolling down below scroll area
                y += Math.pow(this.maxY - y, 0.9);
                this.bounceFrom = y;
            } else {
                this.bounceFrom = 0;
            }
            this.update(y, 0, false, false);
        }
    }, {
        key: "pointerEnd",
        value: function pointerEnd(ev) {
            if (!this.receivingEvents) {
                return;
            }
            this.receivingEvents = false;
            this.velocity = 0;
            if (this.bounceFrom > 0) {
                // bounce back up
                this.update(this.minY, 100, true, true);
            } else if (this.bounceFrom < 0) {
                // bounce back down
                this.update(this.maxY, 100, true, true);
            } else if (this.startY !== null) {
                var endY = pointerCoord(ev).y;
                console.debug('picker, pointerEnd', ev.type, endY);
                this.pos.push(endY, Date.now());
                var endPos = this.pos.length - 1;
                var startPos = endPos;
                var timeRange = Date.now() - 100;
                // move pointer to position measured 100ms ago
                for (var i = endPos; i > 0 && this.pos[i] > timeRange; i -= 2) {
                    startPos = i;
                }
                if (startPos !== endPos) {
                    // compute relative movement between these two points
                    var timeOffset = this.pos[endPos] - this.pos[startPos];
                    var movedTop = this.pos[startPos - 1] - this.pos[endPos - 1];
                    // based on XXms compute the movement to apply for each render step
                    this.velocity = movedTop / timeOffset * FRAME_MS;
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
        }
    }, {
        key: "decelerate",
        value: function decelerate() {
            var y = 0;
            cancelRaf(this.rafId);
            if (isNaN(this.y) || !this.optHeight) {
                // fallback in case numbers get outta wack
                this.update(y, 0, true, true);
            } else if (Math.abs(this.velocity) > 0) {
                // still decelerating
                this.velocity *= DECELERATION_FRICTION;
                // do not let it go slower than a velocity of 1
                this.velocity = this.velocity > 0 ? Math.max(this.velocity, 1) : Math.min(this.velocity, -1);
                y = Math.round(this.y - this.velocity);
                if (y > this.minY) {
                    // whoops, it's trying to scroll up farther than the options we have!
                    y = this.minY;
                    this.velocity = 0;
                } else if (y < this.maxY) {
                    // gahh, it's trying to scroll down farther than we can!
                    y = this.maxY;
                    this.velocity = 0;
                }
                console.log("decelerate y: " + y + ", velocity: " + this.velocity + ", optHeight: " + this.optHeight);
                var notLockedIn = y % this.optHeight !== 0 || Math.abs(this.velocity) > 1;
                this.update(y, 0, true, !notLockedIn);
                if (notLockedIn) {
                    // isn't locked in yet, keep decelerating until it is
                    this.rafId = raf(this.decelerate.bind(this));
                }
            } else if (this.y % this.optHeight !== 0) {
                // needs to still get locked into a position so options line up
                var currentPos = Math.abs(this.y % this.optHeight);
                // create a velocity in the direction it needs to scroll
                this.velocity = currentPos > this.optHeight / 2 ? 1 : -1;
                this.decelerate();
            }
        }
    }, {
        key: "optClick",
        value: function optClick(ev, index) {
            if (!this.velocity) {
                ev.preventDefault();
                ev.stopPropagation();
                this.setSelected(index, 150);
            }
        }
    }, {
        key: "setSelected",
        value: function setSelected(selectedIndex, duration) {
            // if there is a selected index, then figure out it's y position
            // if there isn't a selected index, then just use the top y position
            var y = selectedIndex > -1 ? selectedIndex * this.optHeight * -1 : 0;
            cancelRaf(this.rafId);
            this.velocity = 0;
            // so what y position we're at
            this.update(y, duration, true, true);
        }
    }, {
        key: "update",
        value: function update(y, duration, saveY, emitChange) {
            // ensure we've got a good round number :)
            y = Math.round(y);
            this.col.selectedIndex = Math.max(Math.abs(Math.round(y / this.optHeight)), 0);
            for (var i = 0; i < this.col.options.length; i++) {
                var opt = this.col.options[i];
                var optTop = i * this.optHeight;
                var optOffset = optTop + y;
                var rotateX = optOffset * this.rotateFactor;
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
                } else {
                    translateY = optOffset;
                }
                opt._trans = this._sanitizer.bypassSecurityTrustStyle("rotateX(" + rotateX + "deg) translate3d(" + translateX + "px," + translateY + "px," + translateZ + "px)");
                opt._dur = duration > 0 ? duration + 'ms' : '';
            }
            if (saveY) {
                this.y = y;
            }
            if (emitChange) {
                if (this.lastIndex === undefined) {
                    // have not set a last index yet
                    this.lastIndex = this.col.selectedIndex;
                } else if (this.lastIndex !== this.col.selectedIndex) {
                    // new selected index has changed from the last index
                    // update the lastIndex and emit that it has changed
                    this.lastIndex = this.col.selectedIndex;
                    this.ionChange.emit(this.col.options[this.col.selectedIndex]);
                }
            }
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var min = this.col.options.length - 1;
            var max = 0;
            for (var i = 0; i < this.col.options.length; i++) {
                if (!this.col.options[i].disabled) {
                    min = Math.min(min, i);
                    max = Math.max(max, i);
                }
            }
            var selectedIndex = clamp(min, this.col.selectedIndex, max);
            if (selectedIndex !== this.col.selectedIndex) {
                var y = selectedIndex * this.optHeight * -1;
                this.update(y, 150, true, true);
            }
        }
    }]);

    return PickerColumnCmp;
}();
__decorate([ViewChild('colEle'), __metadata('design:type', typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a || Object)], PickerColumnCmp.prototype, "colEle", void 0);
__decorate([Input(), __metadata('design:type', typeof (_b = typeof PickerColumn !== 'undefined' && PickerColumn) === 'function' && _b || Object)], PickerColumnCmp.prototype, "col", void 0);
__decorate([Output(), __metadata('design:type', typeof (_c = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _c || Object)], PickerColumnCmp.prototype, "ionChange", void 0);
PickerColumnCmp = __decorate([Component({
    selector: '.picker-col',
    template: "\n    <div *ngIf=\"col.prefix\" class=\"picker-prefix\" [style.width]=\"col.prefixWidth\">{{col.prefix}}</div>\n    <div class=\"picker-opts\" #colEle [style.width]=\"col.optionsWidth\">\n      <button *ngFor=\"let o of col.options; let i=index\" [style.transform]=\"o._trans\" [style.transitionDuration]=\"o._dur\" [style.webkitTransform]=\"o._trans\" [style.webkitTransitionDuration]=\"o._dur\" [class.picker-opt-selected]=\"col.selectedIndex === i\" [class.picker-opt-disabled]=\"o.disabled\" (click)=\"optClick($event, i)\" type=\"button\" category=\"picker-opt\">\n        {{o.text}}\n      </button>\n    </div>\n    <div *ngIf=\"col.suffix\" class=\"picker-suffix\" [style.width]=\"col.suffixWidth\">{{col.suffix}}</div>\n  ",
    directives: [NgFor, NgIf],
    host: {
        '[style.min-width]': 'col.columnWidth',
        '[class.picker-opts-left]': 'col.align=="left"',
        '[class.picker-opts-right]': 'col.align=="right"'
    }
}), __metadata('design:paramtypes', [typeof (_d = typeof Config !== 'undefined' && Config) === 'function' && _d || Object, typeof (_e = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _e || Object, typeof (_f = typeof DomSanitizationService !== 'undefined' && DomSanitizationService) === 'function' && _f || Object])], PickerColumnCmp);
/**
 * @private
 */
export var PickerCmp = function () {
    function PickerCmp(_viewCtrl, _elementRef, _config, params, renderer) {
        _classCallCheck(this, PickerCmp);

        this._viewCtrl = _viewCtrl;
        this._elementRef = _elementRef;
        this._config = _config;
        this.d = params.data;
        if (this.d.cssClass) {
            this.d.cssClass.split(' ').forEach(function (cssClass) {
                renderer.setElementClass(_elementRef.nativeElement, cssClass, true);
            });
        }
        this.id = ++pickerIds;
        this.lastClick = 0;
    }

    _createClass(PickerCmp, [{
        key: "ionViewLoaded",
        value: function ionViewLoaded() {
            // normalize the data
            var data = this.d;
            data.buttons = data.buttons.map(function (button) {
                if (isString(button)) {
                    return { text: button };
                }
                if (button.role) {
                    button.cssRole = "picker-toolbar-" + button.role;
                }
                return button;
            });
            // clean up dat data
            data.columns = data.columns.map(function (column) {
                if (!isPresent(column.columnWidth)) {
                    column.columnWidth = 100 / data.columns.length + '%';
                }
                if (!isPresent(column.options)) {
                    column.options = [];
                }
                column.options = column.options.map(function (inputOpt) {
                    var opt = {
                        text: '',
                        value: '',
                        disabled: inputOpt.disabled
                    };
                    if (isPresent(inputOpt)) {
                        if (isString(inputOpt) || isNumber(inputOpt)) {
                            opt.text = inputOpt.toString();
                            opt.value = inputOpt;
                        } else {
                            opt.text = isPresent(inputOpt.text) ? inputOpt.text : inputOpt.value;
                            opt.value = isPresent(inputOpt.value) ? inputOpt.value : inputOpt.text;
                        }
                    }
                    return opt;
                });
                return column;
            });
        }
    }, {
        key: "refresh",
        value: function refresh() {
            this._cols.forEach(function (column) {
                column.refresh();
            });
        }
    }, {
        key: "_colChange",
        value: function _colChange(selectedOption) {
            // one of the columns has changed its selected index
            var picker = this._viewCtrl;
            picker.ionChange.emit(this.getSelected());
        }
    }, {
        key: "_keyUp",
        value: function _keyUp(ev) {
            if (this.enabled && this._viewCtrl.isLast()) {
                if (ev.keyCode === Key.ENTER) {
                    if (this.lastClick + 1000 < Date.now()) {
                        // do not fire this click if there recently was already a click
                        // this can happen when the button has focus and used the enter
                        // key to click the button. However, both the click handler and
                        // this keyup event will fire, so only allow one of them to go.
                        console.debug('picker, enter button');
                        var button = this.d.buttons[this.d.buttons.length - 1];
                        this.btnClick(button);
                    }
                } else if (ev.keyCode === Key.ESCAPE) {
                    console.debug('picker, escape button');
                    this.bdClick();
                }
            }
        }
    }, {
        key: "ionViewDidEnter",
        value: function ionViewDidEnter() {
            var activeElement = document.activeElement;
            if (activeElement) {
                activeElement.blur();
            }
            var focusableEle = this._elementRef.nativeElement.querySelector('button');
            if (focusableEle) {
                focusableEle.focus();
            }
            this.enabled = true;
        }
    }, {
        key: "btnClick",
        value: function btnClick(button, dismissDelay) {
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
        }
    }, {
        key: "bdClick",
        value: function bdClick() {
            if (this.enabled && this.d.enableBackdropDismiss) {
                this.dismiss('backdrop');
            }
        }
    }, {
        key: "dismiss",
        value: function dismiss(role) {
            return this._viewCtrl.dismiss(this.getSelected(), role);
        }
    }, {
        key: "getSelected",
        value: function getSelected() {
            var selected = {};
            this.d.columns.forEach(function (col, index) {
                var selectedColumn = col.options[col.selectedIndex];
                selected[col.name] = {
                    text: selectedColumn ? selectedColumn.text : null,
                    value: selectedColumn ? selectedColumn.value : null,
                    columnIndex: index
                };
            });
            return selected;
        }
    }]);

    return PickerCmp;
}();
__decorate([ViewChildren(PickerColumnCmp), __metadata('design:type', typeof (_g = typeof QueryList !== 'undefined' && QueryList) === 'function' && _g || Object)], PickerCmp.prototype, "_cols", void 0);
__decorate([HostListener('body:keyup', ['$event']), __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], PickerCmp.prototype, "_keyUp", null);
PickerCmp = __decorate([Component({
    selector: 'ion-picker-cmp',
    template: "\n    <ion-backdrop (click)=\"bdClick()\"></ion-backdrop>\n    <div class=\"picker-wrapper\">\n      <div class=\"picker-toolbar\">\n        <div *ngFor=\"let b of d.buttons\" class=\"picker-toolbar-button\" [ngClass]=\"b.cssRole\">\n          <button (click)=\"btnClick(b)\" [ngClass]=\"b.cssClass\" class=\"picker-button\" clear>\n            {{b.text}}\n          </button>\n        </div>\n      </div>\n      <div class=\"picker-columns\">\n        <div class=\"picker-above-highlight\"></div>\n        <div *ngFor=\"let c of d.columns\" [col]=\"c\" class=\"picker-col\" (ionChange)=\"_colChange($event)\"></div>\n        <div class=\"picker-below-highlight\"></div>\n      </div>\n    </div>\n  ",
    directives: [Backdrop, NgClass, NgFor, PickerColumnCmp],
    host: {
        'role': 'dialog'
    },
    encapsulation: ViewEncapsulation.None
}), __metadata('design:paramtypes', [typeof (_h = typeof ViewController !== 'undefined' && ViewController) === 'function' && _h || Object, typeof (_j = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _j || Object, typeof (_k = typeof Config !== 'undefined' && Config) === 'function' && _k || Object, typeof (_l = typeof NavParams !== 'undefined' && NavParams) === 'function' && _l || Object, typeof (_m = typeof Renderer !== 'undefined' && Renderer) === 'function' && _m || Object])], PickerCmp);
/**
 * Animations for pickers
 */

var PickerSlideIn = function (_Transition) {
    _inherits(PickerSlideIn, _Transition);

    function PickerSlideIn(enteringView, leavingView, opts) {
        _classCallCheck(this, PickerSlideIn);

        var _this2 = _possibleConstructorReturn(this, (PickerSlideIn.__proto__ || Object.getPrototypeOf(PickerSlideIn)).call(this, enteringView, leavingView, opts));

        var ele = enteringView.pageRef().nativeElement;
        var backdrop = new Animation(ele.querySelector('ion-backdrop'));
        var wrapper = new Animation(ele.querySelector('.picker-wrapper'));
        backdrop.fromTo('opacity', 0.01, 0.26);
        wrapper.fromTo('translateY', '100%', '0%');
        _this2.easing('cubic-bezier(.36,.66,.04,1)').duration(400).add(backdrop).add(wrapper);
        return _this2;
    }

    return PickerSlideIn;
}(Transition);

Transition.register('picker-slide-in', PickerSlideIn);

var PickerSlideOut = function (_Transition2) {
    _inherits(PickerSlideOut, _Transition2);

    function PickerSlideOut(enteringView, leavingView, opts) {
        _classCallCheck(this, PickerSlideOut);

        var _this3 = _possibleConstructorReturn(this, (PickerSlideOut.__proto__ || Object.getPrototypeOf(PickerSlideOut)).call(this, enteringView, leavingView, opts));

        var ele = leavingView.pageRef().nativeElement;
        var backdrop = new Animation(ele.querySelector('ion-backdrop'));
        var wrapper = new Animation(ele.querySelector('.picker-wrapper'));
        backdrop.fromTo('opacity', 0.26, 0);
        wrapper.fromTo('translateY', '0%', '100%');
        _this3.easing('cubic-bezier(.36,.66,.04,1)').duration(450).add(backdrop).add(wrapper);
        return _this3;
    }

    return PickerSlideOut;
}(Transition);

Transition.register('picker-slide-out', PickerSlideOut);
var pickerIds = -1;
var DECELERATION_FRICTION = 0.97;
var FRAME_MS = 1000 / 60;
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;