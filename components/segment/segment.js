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
var forms_1 = require('@angular/forms');
var util_1 = require('../../util/util');
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
var SegmentButton = (function () {
    function SegmentButton(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._disabled = false;
        /**
         * @output {SegmentButton} expression to evaluate when a segment button has been clicked
         */
        this.ionSelect = new core_1.EventEmitter();
    }
    Object.defineProperty(SegmentButton.prototype, "disabled", {
        /**
         * @private
         */
        get: function () {
            return this._disabled;
        },
        set: function (val) {
            this._disabled = util_1.isTrueProperty(val);
            this.setCssClass('segment-button-disabled', this._disabled);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    SegmentButton.prototype.setCssClass = function (cssClass, shouldAdd) {
        this._renderer.setElementClass(this._elementRef.nativeElement, cssClass, shouldAdd);
    };
    /**
     * @private
     * On click of a SegmentButton
     */
    SegmentButton.prototype.onClick = function () {
        void 0;
        this.ionSelect.emit(this);
    };
    /**
     * @private
     */
    SegmentButton.prototype.ngOnInit = function () {
        if (!util_1.isPresent(this.value)) {
            void 0;
        }
    };
    Object.defineProperty(SegmentButton.prototype, "isActive", {
        /**
         * @private
         */
        set: function (isActive) {
            this._renderer.setElementClass(this._elementRef.nativeElement, 'segment-activated', isActive);
            this._renderer.setElementAttribute(this._elementRef.nativeElement, 'aria-pressed', isActive);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SegmentButton.prototype, "value", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SegmentButton.prototype, "ionSelect", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SegmentButton.prototype, "disabled", null);
    __decorate([
        core_1.HostListener('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], SegmentButton.prototype, "onClick", null);
    SegmentButton = __decorate([
        core_1.Component({
            selector: 'ion-segment-button',
            template: "\n    <ng-content></ng-content>\n    <ion-button-effect></ion-button-effect>\n  ",
            host: {
                'tappable': '',
                'class': 'segment-button',
                'role': 'button'
            },
            encapsulation: core_1.ViewEncapsulation.None,
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
    ], SegmentButton);
    return SegmentButton;
}());
exports.SegmentButton = SegmentButton;
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
var Segment = (function () {
    function Segment(ngControl) {
        this._disabled = false;
        /**
         * @output {Any}  expression to evaluate when a segment button has been changed
         */
        this.ionChange = new core_1.EventEmitter();
        /**
         * @private
         */
        this.onChange = function (_) { };
        /**
         * @private
         */
        this.onTouched = function (_) { };
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
    }
    Object.defineProperty(Segment.prototype, "disabled", {
        /**
         * @private
         */
        get: function () {
            return this._disabled;
        },
        set: function (val) {
            this._disabled = util_1.isTrueProperty(val);
            if (this._buttons) {
                var buttons = this._buttons.toArray();
                for (var _i = 0, buttons_1 = buttons; _i < buttons_1.length; _i++) {
                    var button = buttons_1[_i];
                    button.setCssClass('segment-button-disabled', this._disabled);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * Write a new value to the element.
     */
    Segment.prototype.writeValue = function (value) {
        this.value = util_1.isPresent(value) ? value : '';
        if (this._buttons) {
            var buttons = this._buttons.toArray();
            for (var _i = 0, buttons_2 = buttons; _i < buttons_2.length; _i++) {
                var button = buttons_2[_i];
                button.isActive = (button.value === this.value);
            }
        }
    };
    /**
     * @private
     */
    Segment.prototype.ngAfterViewInit = function () {
        var _this = this;
        var buttons = this._buttons.toArray();
        for (var _i = 0, buttons_3 = buttons; _i < buttons_3.length; _i++) {
            var button = buttons_3[_i];
            button.ionSelect.subscribe(function (selectedButton) {
                _this.writeValue(selectedButton.value);
                _this.onChange(selectedButton.value);
                _this.ionChange.emit(selectedButton);
            });
            if (util_1.isPresent(this.value)) {
                button.isActive = (button.value === this.value);
            }
            if (util_1.isTrueProperty(this._disabled)) {
                button.setCssClass('segment-button-disabled', this._disabled);
            }
        }
    };
    /**
     * @private
     * Set the function to be called when the control receives a change event.
     */
    Segment.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    /**
     * @private
     * Set the function to be called when the control receives a touch event.
     */
    Segment.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Segment.prototype, "ionChange", void 0);
    __decorate([
        core_1.ContentChildren(SegmentButton), 
        __metadata('design:type', core_1.QueryList)
    ], Segment.prototype, "_buttons", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Segment.prototype, "disabled", null);
    Segment = __decorate([
        core_1.Directive({
            selector: 'ion-segment'
        }),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [forms_1.NgControl])
    ], Segment);
    return Segment;
}());
exports.Segment = Segment;
