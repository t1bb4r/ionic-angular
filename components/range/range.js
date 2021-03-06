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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var util_1 = require('../../util/util');
var dom_1 = require('../../util/dom');
var debouncer_1 = require('../../util/debouncer');
var form_1 = require('../../util/form');
var item_1 = require('../item/item');
var ui_event_manager_1 = require('../../util/ui-event-manager');
exports.RANGE_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, { useExisting: core_1.forwardRef(function () { return Range; }), multi: true });
/**
 * @private
 */
var RangeKnob = (function () {
    function RangeKnob(range) {
        this.range = range;
    }
    Object.defineProperty(RangeKnob.prototype, "ratio", {
        get: function () {
            return this._ratio;
        },
        set: function (ratio) {
            this._ratio = util_1.clamp(0, ratio, 1);
            this._val = this.range.ratioToValue(this._ratio);
            if (this.range.snaps) {
                this._ratio = this.range.valueToRatio(this._val);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeKnob.prototype, "value", {
        get: function () {
            return this._val;
        },
        set: function (val) {
            if (util_1.isString(val)) {
                val = Math.round(val);
            }
            if (util_1.isNumber(val) && !isNaN(val)) {
                this._ratio = this.range.valueToRatio(val);
                this._val = this.range.ratioToValue(this._ratio);
            }
        },
        enumerable: true,
        configurable: true
    });
    RangeKnob.prototype.position = function () {
        this._x = this._ratio * 100 + "%";
    };
    RangeKnob.prototype.ngOnInit = function () {
        if (util_1.isPresent(this.range.value)) {
            // we already have a value
            if (this.range.dualKnobs) {
                // we have a value and there are two knobs
                if (this.upper) {
                    // this is the upper knob
                    this.value = this.range.value.upper;
                }
                else {
                    // this is the lower knob
                    this.value = this.range.value.lower;
                }
            }
            else {
                // we have a value and there is only one knob
                this.value = this.range.value;
            }
        }
        else {
            // we do not have a value so set defaults
            this.ratio = ((this.range.dualKnobs && this.upper) ? 1 : 0);
        }
        this.position();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RangeKnob.prototype, "upper", void 0);
    RangeKnob = __decorate([
        core_1.Component({
            selector: '.range-knob-handle',
            template: "\n    <div class=\"range-pin\" *ngIf=\"range.pin\">{{_val}}</div>\n    <div class=\"range-knob\"></div>\n  ",
            directives: [common_1.NgIf],
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
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return Range; }))), 
        __metadata('design:paramtypes', [Range])
    ], RangeKnob);
    return RangeKnob;
}());
exports.RangeKnob = RangeKnob;
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
var Range = (function () {
    function Range(_form, _item, _renderer) {
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
        this._debouncer = new debouncer_1.Debouncer(0);
        this._events = new ui_event_manager_1.UIEventManager();
        /**
         * @output {Range} Expression to evaluate when the range value changes.
         */
        this.ionChange = new core_1.EventEmitter();
        _form.register(this);
        if (_item) {
            this.id = 'rng-' + _item.registerInput('range');
            this._labelId = 'lbl-' + _item.id;
            _item.setCssClass('item-range', true);
        }
    }
    Object.defineProperty(Range.prototype, "min", {
        /**
         * @input {number} Minimum integer value of the range. Defaults to `0`.
         */
        get: function () {
            return this._min;
        },
        set: function (val) {
            val = Math.round(val);
            if (!isNaN(val)) {
                this._min = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "max", {
        /**
         * @input {number} Maximum integer value of the range. Defaults to `100`.
         */
        get: function () {
            return this._max;
        },
        set: function (val) {
            val = Math.round(val);
            if (!isNaN(val)) {
                this._max = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "step", {
        /**
         * @input {number} Specifies the value granularity. Defaults to `1`.
         */
        get: function () {
            return this._step;
        },
        set: function (val) {
            val = Math.round(val);
            if (!isNaN(val) && val > 0) {
                this._step = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "snaps", {
        /**
         * @input {number} If true, the knob snaps to tick marks evenly spaced based on the step property value. Defaults to `false`.
         */
        get: function () {
            return this._snaps;
        },
        set: function (val) {
            this._snaps = util_1.isTrueProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "pin", {
        /**
         * @input {number} If true, a pin with integer value is shown when the knob is pressed. Defaults to `false`.
         */
        get: function () {
            return this._pin;
        },
        set: function (val) {
            this._pin = util_1.isTrueProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "debounce", {
        /**
         * @input {number} How long, in milliseconds, to wait to trigger the `ionChange`
         * event after each change in the range value. Default `0`.
         */
        get: function () {
            return this._debouncer.wait;
        },
        set: function (val) {
            this._debouncer.wait = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "dualKnobs", {
        /**
         * @input {boolean} Show two knobs. Defaults to `false`.
         */
        get: function () {
            return this._dual;
        },
        set: function (val) {
            this._dual = util_1.isTrueProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    Range.prototype.ngAfterViewInit = function () {
        var barL = '';
        var barR = '';
        var firstRatio = this._knobs.first.ratio;
        if (this._dual) {
            var lastRatio = this._knobs.last.ratio;
            barL = (Math.min(firstRatio, lastRatio) * 100) + "%";
            barR = (100 - (Math.max(firstRatio, lastRatio) * 100)) + "%";
        }
        else {
            barR = (100 - (firstRatio * 100)) + "%";
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
    };
    /**
     * @private
     */
    Range.prototype.pointerDown = function (ev) {
        // TODO: we could stop listening for events instead of checking this._disabled.
        // since there are a lot of events involved, this solution is
        // enough for the moment
        if (this._disabled) {
            return false;
        }
        void 0;
        // prevent default so scrolling does not happen
        ev.preventDefault();
        ev.stopPropagation();
        // get the start coordinates
        this._start = dom_1.pointerCoord(ev);
        // get the full dimensions of the slider element
        var rect = this._rect = this._slider.nativeElement.getBoundingClientRect();
        // figure out the offset
        // the start of the pointer could actually
        // have been left or right of the slider bar
        if (this._start.x < rect.left) {
            rect.xOffset = (this._start.x - rect.left);
        }
        else if (this._start.x > rect.right) {
            rect.xOffset = (this._start.x - rect.right);
        }
        else {
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
    };
    /**
     * @private
     */
    Range.prototype.pointerMove = function (ev) {
        void 0;
        // prevent default so scrolling does not happen
        ev.preventDefault();
        ev.stopPropagation();
        // update the ratio for the active knob
        this.updateKnob(dom_1.pointerCoord(ev), this._rect);
        // update the active knob's position
        this._active.position();
        this._pressed = this._active.pressed = true;
    };
    /**
     * @private
     */
    Range.prototype.pointerUp = function (ev) {
        void 0;
        // prevent default so scrolling does not happen
        ev.preventDefault();
        ev.stopPropagation();
        // update the ratio for the active knob
        this.updateKnob(dom_1.pointerCoord(ev), this._rect);
        // update the active knob's position
        this._active.position();
        // clear the start coordinates and active knob
        this._start = this._active = null;
        this._pressed = this._knobs.first.pressed = this._knobs.last.pressed = false;
    };
    /**
     * @private
     */
    Range.prototype.setActiveKnob = function (current, rect) {
        // figure out which knob is the closest one to the pointer
        var ratio = (current.x - rect.left) / (rect.width);
        if (this._dual && Math.abs(ratio - this._knobs.first.ratio) > Math.abs(ratio - this._knobs.last.ratio)) {
            this._active = this._knobs.last;
        }
        else {
            this._active = this._knobs.first;
        }
    };
    /**
     * @private
     */
    Range.prototype.updateKnob = function (current, rect) {
        var _this = this;
        // figure out where the pointer is currently at
        // update the knob being interacted with
        if (this._active) {
            var oldVal = this._active.value;
            this._active.ratio = (current.x - rect.left) / (rect.width);
            var newVal = this._active.value;
            if (oldVal !== newVal) {
                // value has been updated
                if (this._dual) {
                    this.value = {
                        lower: Math.min(this._knobs.first.value, this._knobs.last.value),
                        upper: Math.max(this._knobs.first.value, this._knobs.last.value),
                    };
                }
                else {
                    this.value = newVal;
                }
                this._debouncer.debounce(function () {
                    _this.onChange(_this.value);
                    _this.ionChange.emit(_this);
                });
            }
            this.updateBar();
        }
    };
    /**
     * @private
     */
    Range.prototype.updateBar = function () {
        var firstRatio = this._knobs.first.ratio;
        if (this._dual) {
            var lastRatio = this._knobs.last.ratio;
            this._barL = (Math.min(firstRatio, lastRatio) * 100) + "%";
            this._barR = (100 - (Math.max(firstRatio, lastRatio) * 100)) + "%";
        }
        else {
            this._barL = '';
            this._barR = (100 - (firstRatio * 100)) + "%";
        }
        this.updateTicks();
    };
    /**
     * @private
     */
    Range.prototype.createTicks = function () {
        var _this = this;
        if (this._snaps) {
            dom_1.raf(function () {
                // TODO: Fix to not use RAF
                _this._ticks = [];
                for (var value = _this._min; value <= _this._max; value += _this._step) {
                    var ratio = _this.valueToRatio(value);
                    _this._ticks.push({
                        ratio: ratio,
                        left: ratio * 100 + "%",
                    });
                }
                _this.updateTicks();
            });
        }
    };
    /**
     * @private
     */
    Range.prototype.updateTicks = function () {
        if (this._snaps) {
            var ratio_1 = this.ratio;
            if (this._dual) {
                var upperRatio_1 = this.ratioUpper;
                this._ticks.forEach(function (t) {
                    t.active = (t.ratio >= ratio_1 && t.ratio <= upperRatio_1);
                });
            }
            else {
                this._ticks.forEach(function (t) {
                    t.active = (t.ratio <= ratio_1);
                });
            }
        }
    };
    /**
     * @private
     */
    Range.prototype.ratioToValue = function (ratio) {
        ratio = Math.round(((this._max - this._min) * ratio) + this._min);
        return Math.round(ratio / this._step) * this._step;
    };
    /**
     * @private
     */
    Range.prototype.valueToRatio = function (value) {
        value = Math.round(util_1.clamp(this._min, value, this._max) / this._step) * this._step;
        return (value - this._min) / (this._max - this._min);
    };
    /**
     * @private
     */
    Range.prototype.writeValue = function (val) {
        if (util_1.isPresent(val)) {
            var knobs = this._knobs;
            this.value = val;
            if (this._knobs) {
                if (this._dual) {
                    knobs.first.value = val.lower;
                    knobs.last.value = val.upper;
                    knobs.last.position();
                }
                else {
                    knobs.first.value = val;
                }
                knobs.first.position();
                this.updateBar();
            }
        }
    };
    /**
     * @private
     */
    Range.prototype.registerOnChange = function (fn) {
        var _this = this;
        this._fn = fn;
        this.onChange = function (val) {
            fn(val);
            _this.onTouched();
        };
    };
    /**
     * @private
     */
    Range.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    Object.defineProperty(Range.prototype, "disabled", {
        /**
         * @input {boolean} Whether or not the range is disabled. Defaults to `false`.
         */
        get: function () {
            return this._disabled;
        },
        set: function (val) {
            this._disabled = util_1.isTrueProperty(val);
            this._item && this._item.setCssClass('item-range-disabled', this._disabled);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "ratio", {
        /**
         * Returns the ratio of the knob's is current location, which is a number between `0` and `1`.
         * If two knobs are used, this property represents the lower value.
         */
        get: function () {
            if (this._dual) {
                return Math.min(this._knobs.first.ratio, this._knobs.last.ratio);
            }
            return this._knobs.first.ratio;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "ratioUpper", {
        /**
         * Returns the ratio of the upper value's is current location, which is a number between `0` and `1`.
         * If there is only one knob, then this will return `null`.
         */
        get: function () {
            if (this._dual) {
                return Math.max(this._knobs.first.ratio, this._knobs.last.ratio);
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    Range.prototype.onChange = function (val) {
        // used when this input does not have an ngModel or formControlName
        this.onTouched();
    };
    /**
     * @private
     */
    Range.prototype.onTouched = function () { };
    /**
     * @private
     */
    Range.prototype.ngOnDestroy = function () {
        this._form.deregister(this);
        this._events.unlistenAll();
    };
    __decorate([
        core_1.ViewChild('bar'), 
        __metadata('design:type', core_1.ElementRef)
    ], Range.prototype, "_bar", void 0);
    __decorate([
        core_1.ViewChild('slider'), 
        __metadata('design:type', core_1.ElementRef)
    ], Range.prototype, "_slider", void 0);
    __decorate([
        core_1.ViewChildren(RangeKnob), 
        __metadata('design:type', core_1.QueryList)
    ], Range.prototype, "_knobs", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Range.prototype, "min", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Range.prototype, "max", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Range.prototype, "step", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Range.prototype, "snaps", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Range.prototype, "pin", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Range.prototype, "debounce", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Range.prototype, "dualKnobs", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Range.prototype, "ionChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Range.prototype, "disabled", null);
    Range = __decorate([
        core_1.Component({
            selector: 'ion-range',
            template: "\n    <ng-content select=\"[range-left]\"></ng-content>\n    <div class=\"range-slider\" #slider>\n      <div class=\"range-tick\" *ngFor=\"let t of _ticks\" [style.left]=\"t.left\" [class.range-tick-active]=\"t.active\"></div>\n      <div class=\"range-bar\"></div>\n      <div class=\"range-bar range-bar-active\" [style.left]=\"_barL\" [style.right]=\"_barR\" #bar></div>\n      <div class=\"range-knob-handle\"></div>\n      <div class=\"range-knob-handle\" [upper]=\"true\" *ngIf=\"_dual\"></div>\n    </div>\n    <ng-content select=\"[range-right]\"></ng-content>\n  ",
            directives: [common_1.NgFor, common_1.NgIf, RangeKnob],
            host: {
                '[class.range-disabled]': '_disabled',
                '[class.range-pressed]': '_pressed',
                '[class.range-has-pin]': '_pin'
            },
            providers: [exports.RANGE_VALUE_ACCESSOR],
            encapsulation: core_1.ViewEncapsulation.None,
        }),
        __param(1, core_1.Optional()), 
        __metadata('design:paramtypes', [form_1.Form, item_1.Item, core_1.Renderer])
    ], Range);
    return Range;
}());
exports.Range = Range;
