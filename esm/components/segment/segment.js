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
import { Component, ContentChildren, Directive, ElementRef, EventEmitter, HostListener, Input, Output, Optional, QueryList, Renderer, ViewEncapsulation } from '@angular/core';
import { NgControl } from '@angular/forms';
import { isPresent, isTrueProperty } from '../../util/util';
/**
 * @name SegmentButton
 * @description
 * The child buttons of the `ion-segment` component. Each `ion-segment-button` must have a value.
 *
 * @usage
 *
 * ```html
 * <ion-content>
 *   <!-- Segment buttons with icons -->
 *   <ion-segment [(ngModel)]="icons" secondary>
 *     <ion-segment-button value="camera">
 *       <ion-icon name="camera"></ion-icon>
 *     </ion-segment-button>
 *     <ion-segment-button value="bookmark">
 *       <ion-icon name="bookmark"></ion-icon>
 *     </ion-segment-button>
 *   </ion-segment>
 *
 *   <!-- Segment buttons with text -->
 *   <ion-segment [(ngModel)]="relationship" primary>
 *     <ion-segment-button value="friends" (ionSelect)="selectedFriends()">
 *       Friends
 *     </ion-segment-button>
 *     <ion-segment-button value="enemies" (ionSelect)="selectedEnemies()">
 *       Enemies
 *     </ion-segment-button>
 *   </ion-segment>
 * </ion-content>
 * ```
 *
 *
 * @demo /docs/v2/demos/segment/
 * @see {@link /docs/v2/components#segment Segment Component Docs}
 * @see {@link /docs/v2/api/components/segment/Segment/ Segment API Docs}
 */
export var SegmentButton = function () {
    function SegmentButton(_renderer, _elementRef) {
        _classCallCheck(this, SegmentButton);

        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._disabled = false;
        /**
         * @output {SegmentButton} expression to evaluate when a segment button has been clicked
         */
        this.ionSelect = new EventEmitter();
    }
    /**
     * @private
     */


    _createClass(SegmentButton, [{
        key: "setCssClass",

        /**
         * @private
         */
        value: function setCssClass(cssClass, shouldAdd) {
            this._renderer.setElementClass(this._elementRef.nativeElement, cssClass, shouldAdd);
        }
        /**
         * @private
         * On click of a SegmentButton
         */

    }, {
        key: "onClick",
        value: function onClick() {
            console.debug('SegmentButton, select', this.value);
            this.ionSelect.emit(this);
        }
        /**
         * @private
         */

    }, {
        key: "ngOnInit",
        value: function ngOnInit() {
            if (!isPresent(this.value)) {
                console.warn('<ion-segment-button> requires a "value" attribute');
            }
        }
        /**
         * @private
         */

    }, {
        key: "disabled",
        get: function get() {
            return this._disabled;
        },
        set: function set(val) {
            this._disabled = isTrueProperty(val);
            this.setCssClass('segment-button-disabled', this._disabled);
        }
    }, {
        key: "isActive",
        set: function set(isActive) {
            this._renderer.setElementClass(this._elementRef.nativeElement, 'segment-activated', isActive);
            this._renderer.setElementAttribute(this._elementRef.nativeElement, 'aria-pressed', isActive);
        }
    }]);

    return SegmentButton;
}();
__decorate([Input(), __metadata('design:type', String)], SegmentButton.prototype, "value", void 0);
__decorate([Output(), __metadata('design:type', typeof (_a = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _a || Object)], SegmentButton.prototype, "ionSelect", void 0);
__decorate([Input(), __metadata('design:type', Boolean)], SegmentButton.prototype, "disabled", null);
__decorate([HostListener('click'), __metadata('design:type', Function), __metadata('design:paramtypes', []), __metadata('design:returntype', void 0)], SegmentButton.prototype, "onClick", null);
SegmentButton = __decorate([Component({
    selector: 'ion-segment-button',
    template: "\n    <ng-content></ng-content>\n    <ion-button-effect></ion-button-effect>\n  ",
    host: {
        'tappable': '',
        'class': 'segment-button',
        'role': 'button'
    },
    encapsulation: ViewEncapsulation.None
}), __metadata('design:paramtypes', [typeof (_b = typeof Renderer !== 'undefined' && Renderer) === 'function' && _b || Object, typeof (_c = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _c || Object])], SegmentButton);
/**
 * @name Segment
 * @description
 * A Segment is a group of buttons, sometimes known as Segmented Controls, that allow the user to interact with a compact group of a number of controls.
 * Segments provide functionality similar to tabs, selecting one will unselect all others. You should use a tab bar instead of a segmented control when you want to let the user move back and forth between distinct pages in your app.
 * You could use Angular 2's `ngModel` or `FormBuilder` API. For an overview on how `FormBuilder` works, checkout [Angular 2 Forms](http://learnangular2.com/forms/), or [Angular FormBuilder](https://angular.io/docs/ts/latest/api/common/FormBuilder-class.html)
 *
 *
 * ```html
 * <!-- Segment in a header -->
 * <ion-header>
 *   <ion-toolbar>
 *     <ion-segment [(ngModel)]="icons" secondary>
 *       <ion-segment-button value="camera">
 *         <ion-icon name="camera"></ion-icon>
 *       </ion-segment-button>
 *       <ion-segment-button value="bookmark">
 *         <ion-icon name="bookmark"></ion-icon>
 *       </ion-segment-button>
 *     </ion-segment>
 *   </ion-toolbar>
 * </ion-header>
 *
 * <ion-content>
 *   <!-- Segment in content -->
 *   <ion-segment [(ngModel)]="relationship" primary>
 *     <ion-segment-button value="friends" (ionSelect)="selectedFriends()">
 *       Friends
 *     </ion-segment-button>
 *     <ion-segment-button value="enemies" (ionSelect)="selectedEnemies()">
 *       Enemies
 *     </ion-segment-button>
 *   </ion-segment>
 *
 *   <!-- Segment in a form -->
 *   <form [formGroup]="myForm">
 *     <ion-segment formControlName="mapStyle" danger>
 *       <ion-segment-button value="standard">
 *         Standard
 *       </ion-segment-button>
 *       <ion-segment-button value="hybrid">
 *         Hybrid
 *       </ion-segment-button>
 *       <ion-segment-button value="sat">
 *         Satellite
 *       </ion-segment-button>
 *     </ion-segment>
 *   </form>
 * </ion-content>
 * ```
 *
 *
 * @demo /docs/v2/demos/segment/
 * @see {@link /docs/v2/components#segment Segment Component Docs}
 * @see [Angular 2 Forms](http://learnangular2.com/forms/)
 */
export var Segment = function () {
    function Segment(ngControl) {
        _classCallCheck(this, Segment);

        this._disabled = false;
        /**
         * @output {Any}  expression to evaluate when a segment button has been changed
         */
        this.ionChange = new EventEmitter();
        /**
         * @private
         */
        this.onChange = function (_) {};
        /**
         * @private
         */
        this.onTouched = function (_) {};
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
    }
    /**
     * @private
     */


    _createClass(Segment, [{
        key: "writeValue",

        /**
         * @private
         * Write a new value to the element.
         */
        value: function writeValue(value) {
            this.value = isPresent(value) ? value : '';
            if (this._buttons) {
                var buttons = this._buttons.toArray();
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = buttons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var button = _step.value;

                        button.isActive = button.value === this.value;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        }
        /**
         * @private
         */

    }, {
        key: "ngAfterViewInit",
        value: function ngAfterViewInit() {
            var _this = this;

            var buttons = this._buttons.toArray();
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = buttons[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var button = _step2.value;

                    button.ionSelect.subscribe(function (selectedButton) {
                        _this.writeValue(selectedButton.value);
                        _this.onChange(selectedButton.value);
                        _this.ionChange.emit(selectedButton);
                    });
                    if (isPresent(this.value)) {
                        button.isActive = button.value === this.value;
                    }
                    if (isTrueProperty(this._disabled)) {
                        button.setCssClass('segment-button-disabled', this._disabled);
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
        /**
         * @private
         * Set the function to be called when the control receives a change event.
         */

    }, {
        key: "registerOnChange",
        value: function registerOnChange(fn) {
            this.onChange = fn;
        }
        /**
         * @private
         * Set the function to be called when the control receives a touch event.
         */

    }, {
        key: "registerOnTouched",
        value: function registerOnTouched(fn) {
            this.onTouched = fn;
        }
    }, {
        key: "disabled",
        get: function get() {
            return this._disabled;
        },
        set: function set(val) {
            this._disabled = isTrueProperty(val);
            if (this._buttons) {
                var buttons = this._buttons.toArray();
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = buttons[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var button = _step3.value;

                        button.setCssClass('segment-button-disabled', this._disabled);
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            }
        }
    }]);

    return Segment;
}();
__decorate([Output(), __metadata('design:type', typeof (_d = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _d || Object)], Segment.prototype, "ionChange", void 0);
__decorate([ContentChildren(SegmentButton), __metadata('design:type', typeof (_e = typeof QueryList !== 'undefined' && QueryList) === 'function' && _e || Object)], Segment.prototype, "_buttons", void 0);
__decorate([Input(), __metadata('design:type', Boolean)], Segment.prototype, "disabled", null);
Segment = __decorate([Directive({
    selector: 'ion-segment'
}), __param(0, Optional()), __metadata('design:paramtypes', [typeof (_f = typeof NgControl !== 'undefined' && NgControl) === 'function' && _f || Object])], Segment);
var _a, _b, _c, _d, _e, _f;