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
var __param = this && this.__param || function (paramIndex, decorator) {
    return function (target, key) {
        decorator(target, key, paramIndex);
    };
};
import { Component, ElementRef, EventEmitter, forwardRef, Input, Inject, Optional, Output, Provider, QueryList, Renderer, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { clamp, isNumber, isPresent, isString, isTrueProperty } from '../../util/util';
import { pointerCoord, raf } from '../../util/dom';
import { Debouncer } from '../../util/debouncer';
import { Form } from '../../util/form';
import { Item } from '../item/item';
import { UIEventManager } from '../../util/ui-event-manager';
export var RANGE_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, { useExisting: forwardRef(function () {
        return Range;
    }), multi: true });
/**
 * @private
 */
export var RangeKnob = function () {
    function RangeKnob(range) {
        _classCallCheck(this, RangeKnob);

        this.range = range;
    }

    _createClass(RangeKnob, [{
        key: "position",
        value: function position() {
            this._x = this._ratio * 100 + "%";
        }
    }, {
        key: "ngOnInit",
        value: function ngOnInit() {
            if (isPresent(this.range.value)) {
                // we already have a value
                if (this.range.dualKnobs) {
                    // we have a value and there are two knobs
                    if (this.upper) {
                        // this is the upper knob
                        this.value = this.range.value.upper;
                    } else {
                        // this is the lower knob
                        this.value = this.range.value.lower;
                    }
                } else {
                    // we have a value and there is only one knob
                    this.value = this.range.value;
                }
            } else {
                // we do not have a value so set defaults
                this.ratio = this.range.dualKnobs && this.upper ? 1 : 0;
            }
            this.position();
        }
    }, {
        key: "ratio",
        get: function get() {
            return this._ratio;
        },
        set: function set(ratio) {
            this._ratio = clamp(0, ratio, 1);
            this._val = this.range.ratioToValue(this._ratio);
            if (this.range.snaps) {
                this._ratio = this.range.valueToRatio(this._val);
            }
        }
    }, {
        key: "value",
        get: function get() {
            return this._val;
        },
        set: function set(val) {
            if (isString(val)) {
                val = Math.round(val);
            }
            if (isNumber(val) && !isNaN(val)) {
                this._ratio = this.range.valueToRatio(val);
                this._val = this.range.ratioToValue(this._ratio);
            }
        }
    }]);

    return RangeKnob;
}();
__decorate([Input(), __metadata('design:type', Boolean)], RangeKnob.prototype, "upper", void 0);
RangeKnob = __decorate([Component({
    selector: '.range-knob-handle',
    template: "\n    <div class=\"range-pin\" *ngIf=\"range.pin\">{{_val}}</div>\n    <div class=\"range-knob\"></div>\n  ",
    directives: [NgIf],
    host: {
        '[class.range-knob-pressed]': 'pressed',
        '[class.range-knob-min]': '_val===range.min',
        '[class.range-knob-max]': '_val===range.max',
        '[style.left]': '_x',
        '[style.top]': '_y',
        '[style.transform]': '_trns',
        '[attr.aria-valuenow]': '_val',
        '[attr.aria-valuemin]': 'range.min',
        '[attr.aria-valuemax]': 'range.max',
        'role': 'slider',
        'tabindex': '0'
    }
}), __param(0, Inject(forwardRef(function () {
    return Range;
}))), __metadata('design:paramtypes', [Range])], RangeKnob);
/**
 * @name Range
 * @description
 * The Range slider lets users select from a range of values by moving
 * the slider knob. It can accept dual knobs, but by default one knob
 * controls the value of the range.
 *
 * ### Range Labels
 * Labels can be placed on either side of the range by adding the
 * `range-left` or `range-right` property to the element. The element
 * doesn't have to be an `ion-label`, it can be added to any element
 * to place it to the left or right of the range. See [usage](#usage)
 * below for examples.
 *
 *
 * ### Minimum and Maximum Values
 * Minimum and maximum values can be passed to the range through the `min`
 * and `max` properties, respectively. By default, the range sets the `min`
 * to `0` and the `max` to `100`.
 *
 *
 * ### Steps and Snaps
 * The `step` property specifies the value granularity of the range's value.
 * It can be useful to set the `step` when the value isn't in increments of `1`.
 * Setting the `step` property will show tick marks on the range for each step.
 * The `snaps` property can be set to automatically move the knob to the nearest
 * tick mark based on the step property value.
 *
 *
 * ### Dual Knobs
 * Setting the `dualKnobs` property to `true` on the range component will
 * enable two knobs on the range. If the range has two knobs, the value will
 * be an object containing two properties: `lower` and `upper`.
 *
 *
 * @usage
 * ```html
 * <ion-list>
 *   <ion-item>
 *     <ion-range [(ngModel)]="singleValue" danger pin="true"></ion-range>
 *   </ion-item>
 *
 *   <ion-item>
 *     <ion-range min="-200" max="200" [(ngModel)]="saturation" secondary>
 *       <ion-label range-left>-200</ion-label>
 *       <ion-label range-right>200</ion-label>
 *     </ion-range>
 *   </ion-item>
 *
 *  <ion-item>
 *    <ion-range min="20" max="80" step="2" [(ngModel)]="brightness">
 *      <ion-icon small range-left name="sunny"></ion-icon>
 *      <ion-icon range-right name="sunny"></ion-icon>
 *    </ion-range>
 *  </ion-item>
 *
 *   <ion-item>
 *     <ion-label>step=100, snaps, {{singleValue4}}</ion-label>
 *     <ion-range min="1000" max="2000" step="100" snaps="true" secondary [(ngModel)]="singleValue4"></ion-range>
 *   </ion-item>
 *
 *   <ion-item>
 *     <ion-label>dual, step=3, snaps, {{dualValue2 | json}}</ion-label>
 *     <ion-range dualKnobs="true" [(ngModel)]="dualValue2" min="21" max="72" step="3" snaps="true"></ion-range>
 *   </ion-item>
 * </ion-list>
 * ```
 *
 *
 * @demo /docs/v2/demos/range/
 */
export var Range = function () {
    function Range(_form, _item, _renderer) {
        _classCallCheck(this, Range);

        this._form = _form;
        this._item = _item;
        this._renderer = _renderer;
        this._dual = false;
        this._disabled = false;
        this._start = null;
        this._ticks = [];
        this._min = 0;
        this._max = 100;
        this._step = 1;
        this._snaps = false;
        this._debouncer = new Debouncer(0);
        this._events = new UIEventManager();
        /**
         * @output {Range} Expression to evaluate when the range value changes.
         */
        this.ionChange = new EventEmitter();
        _form.register(this);
        if (_item) {
            this.id = 'rng-' + _item.registerInput('range');
            this._labelId = 'lbl-' + _item.id;
            _item.setCssClass('item-range', true);
        }
    }
    /**
     * @input {number} Minimum integer value of the range. Defaults to `0`.
     */


    _createClass(Range, [{
        key: "ngAfterViewInit",

        /**
         * @private
         */
        value: function ngAfterViewInit() {
            var barL = '';
            var barR = '';
            var firstRatio = this._knobs.first.ratio;
            if (this._dual) {
                var lastRatio = this._knobs.last.ratio;
                barL = Math.min(firstRatio, lastRatio) * 100 + "%";
                barR = 100 - Math.max(firstRatio, lastRatio) * 100 + "%";
            } else {
                barR = 100 - firstRatio * 100 + "%";
            }
            this._renderer.setElementStyle(this._bar.nativeElement, 'left', barL);
            this._renderer.setElementStyle(this._bar.nativeElement, 'right', barR);
            // add touchstart/mousedown listeners
            this._events.pointerEvents({
                elementRef: this._slider,
                pointerDown: this.pointerDown.bind(this),
                pointerMove: this.pointerMove.bind(this),
                pointerUp: this.pointerUp.bind(this)
            });
            this.createTicks();
        }
        /**
         * @private
         */

    }, {
        key: "pointerDown",
        value: function pointerDown(ev) {
            // TODO: we could stop listening for events instead of checking this._disabled.
            // since there are a lot of events involved, this solution is
            // enough for the moment
            if (this._disabled) {
                return false;
            }
            console.debug("range, " + ev.type);
            // prevent default so scrolling does not happen
            ev.preventDefault();
            ev.stopPropagation();
            // get the start coordinates
            this._start = pointerCoord(ev);
            // get the full dimensions of the slider element
            var rect = this._rect = this._slider.nativeElement.getBoundingClientRect();
            // figure out the offset
            // the start of the pointer could actually
            // have been left or right of the slider bar
            if (this._start.x < rect.left) {
                rect.xOffset = this._start.x - rect.left;
            } else if (this._start.x > rect.right) {
                rect.xOffset = this._start.x - rect.right;
            } else {
                rect.xOffset = 0;
            }
            // figure out which knob we're interacting with
            this.setActiveKnob(this._start, rect);
            // update the ratio for the active knob
            this.updateKnob(this._start, rect);
            // update the active knob's position
            this._active.position();
            this._pressed = this._active.pressed = true;
            return true;
        }
        /**
         * @private
         */

    }, {
        key: "pointerMove",
        value: function pointerMove(ev) {
            console.debug("range, " + ev.type);
            // prevent default so scrolling does not happen
            ev.preventDefault();
            ev.stopPropagation();
            // update the ratio for the active knob
            this.updateKnob(pointerCoord(ev), this._rect);
            // update the active knob's position
            this._active.position();
            this._pressed = this._active.pressed = true;
        }
        /**
         * @private
         */

    }, {
        key: "pointerUp",
        value: function pointerUp(ev) {
            console.debug("range, " + ev.type);
            // prevent default so scrolling does not happen
            ev.preventDefault();
            ev.stopPropagation();
            // update the ratio for the active knob
            this.updateKnob(pointerCoord(ev), this._rect);
            // update the active knob's position
            this._active.position();
            // clear the start coordinates and active knob
            this._start = this._active = null;
            this._pressed = this._knobs.first.pressed = this._knobs.last.pressed = false;
        }
        /**
         * @private
         */

    }, {
        key: "setActiveKnob",
        value: function setActiveKnob(current, rect) {
            // figure out which knob is the closest one to the pointer
            var ratio = (current.x - rect.left) / rect.width;
            if (this._dual && Math.abs(ratio - this._knobs.first.ratio) > Math.abs(ratio - this._knobs.last.ratio)) {
                this._active = this._knobs.last;
            } else {
                this._active = this._knobs.first;
            }
        }
        /**
         * @private
         */

    }, {
        key: "updateKnob",
        value: function updateKnob(current, rect) {
            var _this = this;

            // figure out where the pointer is currently at
            // update the knob being interacted with
            if (this._active) {
                var oldVal = this._active.value;
                this._active.ratio = (current.x - rect.left) / rect.width;
                var newVal = this._active.value;
                if (oldVal !== newVal) {
                    // value has been updated
                    if (this._dual) {
                        this.value = {
                            lower: Math.min(this._knobs.first.value, this._knobs.last.value),
                            upper: Math.max(this._knobs.first.value, this._knobs.last.value)
                        };
                    } else {
                        this.value = newVal;
                    }
                    this._debouncer.debounce(function () {
                        _this.onChange(_this.value);
                        _this.ionChange.emit(_this);
                    });
                }
                this.updateBar();
            }
        }
        /**
         * @private
         */

    }, {
        key: "updateBar",
        value: function updateBar() {
            var firstRatio = this._knobs.first.ratio;
            if (this._dual) {
                var lastRatio = this._knobs.last.ratio;
                this._barL = Math.min(firstRatio, lastRatio) * 100 + "%";
                this._barR = 100 - Math.max(firstRatio, lastRatio) * 100 + "%";
            } else {
                this._barL = '';
                this._barR = 100 - firstRatio * 100 + "%";
            }
            this.updateTicks();
        }
        /**
         * @private
         */

    }, {
        key: "createTicks",
        value: function createTicks() {
            var _this2 = this;

            if (this._snaps) {
                raf(function () {
                    // TODO: Fix to not use RAF
                    _this2._ticks = [];
                    for (var value = _this2._min; value <= _this2._max; value += _this2._step) {
                        var ratio = _this2.valueToRatio(value);
                        _this2._ticks.push({
                            ratio: ratio,
                            left: ratio * 100 + "%"
                        });
                    }
                    _this2.updateTicks();
                });
            }
        }
        /**
         * @private
         */

    }, {
        key: "updateTicks",
        value: function updateTicks() {
            var _this3 = this;

            if (this._snaps) {
                (function () {
                    var ratio = _this3.ratio;
                    if (_this3._dual) {
                        (function () {
                            var upperRatio = _this3.ratioUpper;
                            _this3._ticks.forEach(function (t) {
                                t.active = t.ratio >= ratio && t.ratio <= upperRatio;
                            });
                        })();
                    } else {
                        _this3._ticks.forEach(function (t) {
                            t.active = t.ratio <= ratio;
                        });
                    }
                })();
            }
        }
        /**
         * @private
         */

    }, {
        key: "ratioToValue",
        value: function ratioToValue(ratio) {
            ratio = Math.round((this._max - this._min) * ratio + this._min);
            return Math.round(ratio / this._step) * this._step;
        }
        /**
         * @private
         */

    }, {
        key: "valueToRatio",
        value: function valueToRatio(value) {
            value = Math.round(clamp(this._min, value, this._max) / this._step) * this._step;
            return (value - this._min) / (this._max - this._min);
        }
        /**
         * @private
         */

    }, {
        key: "writeValue",
        value: function writeValue(val) {
            if (isPresent(val)) {
                var knobs = this._knobs;
                this.value = val;
                if (this._knobs) {
                    if (this._dual) {
                        knobs.first.value = val.lower;
                        knobs.last.value = val.upper;
                        knobs.last.position();
                    } else {
                        knobs.first.value = val;
                    }
                    knobs.first.position();
                    this.updateBar();
                }
            }
        }
        /**
         * @private
         */

    }, {
        key: "registerOnChange",
        value: function registerOnChange(fn) {
            var _this4 = this;

            this._fn = fn;
            this.onChange = function (val) {
                fn(val);
                _this4.onTouched();
            };
        }
        /**
         * @private
         */

    }, {
        key: "registerOnTouched",
        value: function registerOnTouched(fn) {
            this.onTouched = fn;
        }
        /**
         * @input {boolean} Whether or not the range is disabled. Defaults to `false`.
         */

    }, {
        key: "onChange",

        /**
         * @private
         */
        value: function onChange(val) {
            // used when this input does not have an ngModel or formControlName
            this.onTouched();
        }
        /**
         * @private
         */

    }, {
        key: "onTouched",
        value: function onTouched() {}
        /**
         * @private
         */

    }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
            this._form.deregister(this);
            this._events.unlistenAll();
        }
    }, {
        key: "min",
        get: function get() {
            return this._min;
        },
        set: function set(val) {
            val = Math.round(val);
            if (!isNaN(val)) {
                this._min = val;
            }
        }
        /**
         * @input {number} Maximum integer value of the range. Defaults to `100`.
         */

    }, {
        key: "max",
        get: function get() {
            return this._max;
        },
        set: function set(val) {
            val = Math.round(val);
            if (!isNaN(val)) {
                this._max = val;
            }
        }
        /**
         * @input {number} Specifies the value granularity. Defaults to `1`.
         */

    }, {
        key: "step",
        get: function get() {
            return this._step;
        },
        set: function set(val) {
            val = Math.round(val);
            if (!isNaN(val) && val > 0) {
                this._step = val;
            }
        }
        /**
         * @input {number} If true, the knob snaps to tick marks evenly spaced based on the step property value. Defaults to `false`.
         */

    }, {
        key: "snaps",
        get: function get() {
            return this._snaps;
        },
        set: function set(val) {
            this._snaps = isTrueProperty(val);
        }
        /**
         * @input {number} If true, a pin with integer value is shown when the knob is pressed. Defaults to `false`.
         */

    }, {
        key: "pin",
        get: function get() {
            return this._pin;
        },
        set: function set(val) {
            this._pin = isTrueProperty(val);
        }
        /**
         * @input {number} How long, in milliseconds, to wait to trigger the `ionChange`
         * event after each change in the range value. Default `0`.
         */

    }, {
        key: "debounce",
        get: function get() {
            return this._debouncer.wait;
        },
        set: function set(val) {
            this._debouncer.wait = val;
        }
        /**
         * @input {boolean} Show two knobs. Defaults to `false`.
         */

    }, {
        key: "dualKnobs",
        get: function get() {
            return this._dual;
        },
        set: function set(val) {
            this._dual = isTrueProperty(val);
        }
    }, {
        key: "disabled",
        get: function get() {
            return this._disabled;
        },
        set: function set(val) {
            this._disabled = isTrueProperty(val);
            this._item && this._item.setCssClass('item-range-disabled', this._disabled);
        }
        /**
         * Returns the ratio of the knob's is current location, which is a number between `0` and `1`.
         * If two knobs are used, this property represents the lower value.
         */

    }, {
        key: "ratio",
        get: function get() {
            if (this._dual) {
                return Math.min(this._knobs.first.ratio, this._knobs.last.ratio);
            }
            return this._knobs.first.ratio;
        }
        /**
         * Returns the ratio of the upper value's is current location, which is a number between `0` and `1`.
         * If there is only one knob, then this will return `null`.
         */

    }, {
        key: "ratioUpper",
        get: function get() {
            if (this._dual) {
                return Math.max(this._knobs.first.ratio, this._knobs.last.ratio);
            }
            return null;
        }
    }]);

    return Range;
}();
__decorate([ViewChild('bar'), __metadata('design:type', typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a || Object)], Range.prototype, "_bar", void 0);
__decorate([ViewChild('slider'), __metadata('design:type', typeof (_b = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _b || Object)], Range.prototype, "_slider", void 0);
__decorate([ViewChildren(RangeKnob), __metadata('design:type', typeof (_c = typeof QueryList !== 'undefined' && QueryList) === 'function' && _c || Object)], Range.prototype, "_knobs", void 0);
__decorate([Input(), __metadata('design:type', Number)], Range.prototype, "min", null);
__decorate([Input(), __metadata('design:type', Number)], Range.prototype, "max", null);
__decorate([Input(), __metadata('design:type', Number)], Range.prototype, "step", null);
__decorate([Input(), __metadata('design:type', Boolean)], Range.prototype, "snaps", null);
__decorate([Input(), __metadata('design:type', Boolean)], Range.prototype, "pin", null);
__decorate([Input(), __metadata('design:type', Number)], Range.prototype, "debounce", null);
__decorate([Input(), __metadata('design:type', Boolean)], Range.prototype, "dualKnobs", null);
__decorate([Output(), __metadata('design:type', typeof (_d = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _d || Object)], Range.prototype, "ionChange", void 0);
__decorate([Input(), __metadata('design:type', Boolean)], Range.prototype, "disabled", null);
Range = __decorate([Component({
    selector: 'ion-range',
    template: "\n    <ng-content select=\"[range-left]\"></ng-content>\n    <div class=\"range-slider\" #slider>\n      <div class=\"range-tick\" *ngFor=\"let t of _ticks\" [style.left]=\"t.left\" [class.range-tick-active]=\"t.active\"></div>\n      <div class=\"range-bar\"></div>\n      <div class=\"range-bar range-bar-active\" [style.left]=\"_barL\" [style.right]=\"_barR\" #bar></div>\n      <div class=\"range-knob-handle\"></div>\n      <div class=\"range-knob-handle\" [upper]=\"true\" *ngIf=\"_dual\"></div>\n    </div>\n    <ng-content select=\"[range-right]\"></ng-content>\n  ",
    directives: [NgFor, NgIf, RangeKnob],
    host: {
        '[class.range-disabled]': '_disabled',
        '[class.range-pressed]': '_pressed',
        '[class.range-has-pin]': '_pin'
    },
    providers: [RANGE_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None
}), __param(1, Optional()), __metadata('design:paramtypes', [typeof (_e = typeof Form !== 'undefined' && Form) === 'function' && _e || Object, typeof (_f = typeof Item !== 'undefined' && Item) === 'function' && _f || Object, typeof (_g = typeof Renderer !== 'undefined' && Renderer) === 'function' && _g || Object])], Range);
var _a, _b, _c, _d, _e, _f, _g;