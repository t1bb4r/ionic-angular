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
var action_sheet_1 = require('../action-sheet/action-sheet');
var alert_1 = require('../alert/alert');
var app_1 = require('../app/app');
var form_1 = require('../../util/form');
var util_1 = require('../../util/util');
var item_1 = require('../item/item');
var nav_controller_1 = require('../nav/nav-controller');
var option_1 = require('../option/option');
exports.SELECT_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, { useExisting: core_1.forwardRef(function () { return Select; }), multi: true });
/**
 * @name Select
 * @description
 * The `ion-select` component is similar to an HTML `<select>` element, however,
 * Ionic's select component makes it easier for users to sort through and select
 * the preferred option or options. When users tap the select component, a
 * dialog will appear with all of the options in a large, easy to select list
 * for users.
 *
 * The select component takes child `ion-option` components. If `ion-option` is not
 * given a `value` attribute then it will use its text as the value.
 *
 * ### Interfaces
 *
 * By default, the `ion-select` uses the {@link ../../alert/Alert Alert API} to
 * open up the overlay of options in an alert. The interface can be changed to use the
 * {@link ../../action-sheet/ActionSheet ActionSheet API} by passing `action-sheet` to
 * the `interface` property. Read the other sections for the limitations of the
 * action sheet interface.
 *
 * ### Single Value: Radio Buttons
 *
 * The standard `ion-select` component allows the user to select only one
 * option. When selecting only one option the alert interface presents users with
 * a radio button styled list of options. The action sheet interface can only be
 * used with a single value select. If the number of options exceed 6, it will
 * use the `alert` interface even if `action-sheet` is passed. The `ion-select`
 * component's value receives the value of the selected option's value.
 *
 * ```html
 * <ion-item>
 *   <ion-label>Gender</ion-label>
 *   <ion-select [(ngModel)]="gender">
 *     <ion-option value="f" selected="true">Female</ion-option>
 *     <ion-option value="m">Male</ion-option>
 *   </ion-select>
 * </ion-item>
 * ```
 *
 * ### Multiple Value: Checkboxes
 *
 * By adding the `multiple="true"` attribute to `ion-select`, users are able
 * to select multiple options. When multiple options can be selected, the alert
 * overlay presents users with a checkbox styled list of options. The
 * `ion-select multiple="true"` component's value receives an array of all the
 * selected option values. In the example below, because each option is not given
 * a `value`, then it'll use its text as the value instead.
 *
 * Note: the action sheet interface will not work with a multi-value select.
 *
 * ```html
 * <ion-item>
 *   <ion-label>Toppings</ion-label>
 *   <ion-select [(ngModel)]="toppings" multiple="true">
 *     <ion-option>Bacon</ion-option>
 *     <ion-option>Black Olives</ion-option>
 *     <ion-option>Extra Cheese</ion-option>
 *     <ion-option>Mushrooms</ion-option>
 *     <ion-option>Pepperoni</ion-option>
 *     <ion-option>Sausage</ion-option>
 *   </ion-select>
 * </ion-item>
 * ```
 *
 * ### Select Buttons
 * By default, the two buttons read `Cancel` and `OK`. Each button's text
 * can be customized using the `cancelText` and `okText` attributes:
 *
 * ```html
 * <ion-select okText="Okay" cancelText="Dismiss">
 *   ...
 * </ion-select>
 * ```
 *
 * The action sheet interface does not have an `OK` button, clicking
 * on any of the options will automatically close the overlay and select
 * that value.
 *
 * ### Alert Options
 *
 * Since `ion-select` is a wrapper to `Alert`, by default, it can be
 * passed options in the `alertOptions` property. This can be used to
 * pass a custom alert title, subtitle or message. See the {@link ../../alert/Alert Alert API docs}
 * for more properties.
 *
 * ```html
 * <ion-select [alertOptions]="alertOptions">
 *   ...
 * </ion-select>
 * ```
 *
 * ```ts
 * this.alertOptions = {
 *   title: 'Pizza Toppings',
 *   subTitle: 'Select your toppings'
 * };
 * ```
 *
 * @demo /docs/v2/demos/select/
 */
var Select = (function () {
    function Select(_app, _form, _elementRef, _renderer, _item, _nav) {
        this._app = _app;
        this._form = _form;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._item = _item;
        this._nav = _nav;
        this._disabled = false;
        this._multi = false;
        this._values = [];
        this._texts = [];
        this._text = '';
        this._isOpen = false;
        /**
         * @input {string} The text to display on the cancel button. Default: `Cancel`.
         */
        this.cancelText = 'Cancel';
        /**
         * @input {string} The text to display on the ok button. Default: `OK`.
         */
        this.okText = 'OK';
        /**
         * @input {any} Any addition options that the alert interface can take.
         * See the [Alert API docs](../../alert/Alert) for the create options.
         */
        this.alertOptions = {};
        /**
         * @input {string} The interface the select should use: `action-sheet` or `alert`. Default: `alert`.
         */
        this.interface = '';
        /**
         * @input {string} The text to display instead of the selected option's value.
         */
        this.selectedText = '';
        /**
         * @output {any} Any expression you want to evaluate when the selection has changed.
         */
        this.ionChange = new core_1.EventEmitter();
        /**
         * @output {any} Any expression you want to evaluate when the selection was cancelled.
         */
        this.ionCancel = new core_1.EventEmitter();
        this._form.register(this);
        if (_item) {
            this.id = 'sel-' + _item.registerInput('select');
            this._labelId = 'lbl-' + _item.id;
            this._item.setCssClass('item-select', true);
        }
    }
    Select.prototype._click = function (ev) {
        if (ev.detail === 0) {
            // do not continue if the click event came from a form submit
            return;
        }
        ev.preventDefault();
        ev.stopPropagation();
        this.open();
    };
    Select.prototype._keyup = function () {
        if (!this._isOpen) {
            this.open();
        }
    };
    /**
     * Open the select interface.
     */
    Select.prototype.open = function () {
        var _this = this;
        if (this._disabled) {
            return;
        }
        void 0;
        // the user may have assigned some options specifically for the alert
        var alertOptions = util_1.merge({}, this.alertOptions);
        // make sure their buttons array is removed from the options
        // and we create a new array for the alert's two buttons
        alertOptions.buttons = [{
                text: this.cancelText,
                role: 'cancel',
                handler: function () {
                    _this.ionCancel.emit(null);
                }
            }];
        // if the alertOptions didn't provide an title then use the label's text
        if (!alertOptions.title && this._item) {
            alertOptions.title = this._item.getLabelText();
        }
        var options = this._options.toArray();
        if (this.interface === 'action-sheet' && options.length > 6) {
            void 0;
            this.interface = 'alert';
        }
        if (this.interface === 'action-sheet' && this._multi) {
            void 0;
            this.interface = 'alert';
        }
        var overlay;
        if (this.interface === 'action-sheet') {
            alertOptions.buttons = alertOptions.buttons.concat(options.map(function (input) {
                return {
                    role: (input.selected ? 'selected' : ''),
                    text: input.text,
                    handler: function () {
                        _this.onChange(input.value);
                        _this.ionChange.emit(input.value);
                    }
                };
            }));
            alertOptions.cssClass = 'select-action-sheet';
            overlay = new action_sheet_1.ActionSheet(this._app, alertOptions);
        }
        else {
            // default to use the alert interface
            this.interface = 'alert';
            // user cannot provide inputs from alertOptions
            // alert inputs must be created by ionic from ion-options
            alertOptions.inputs = this._options.map(function (input) {
                return {
                    type: (_this._multi ? 'checkbox' : 'radio'),
                    label: input.text,
                    value: input.value,
                    checked: input.selected,
                    disabled: input.disabled
                };
            });
            var selectCssClass = 'select-alert';
            // create the alert instance from our built up alertOptions
            overlay = new alert_1.Alert(this._app, alertOptions);
            if (this._multi) {
                // use checkboxes
                selectCssClass += ' multiple-select-alert';
            }
            else {
                // use radio buttons
                selectCssClass += ' single-select-alert';
            }
            // If the user passed a cssClass for the select, add it
            selectCssClass += alertOptions.cssClass ? ' ' + alertOptions.cssClass : '';
            overlay.setCssClass(selectCssClass);
            overlay.addButton({
                text: this.okText,
                handler: function (selectedValues) {
                    _this.onChange(selectedValues);
                    _this.ionChange.emit(selectedValues);
                }
            });
        }
        overlay.present(alertOptions);
        this._isOpen = true;
        overlay.onDidDismiss(function () {
            _this._isOpen = false;
        });
    };
    Object.defineProperty(Select.prototype, "multiple", {
        /**
         * @input {boolean} Whether or not the select component can accept multiple values. Default: `false`.
         */
        get: function () {
            return this._multi;
        },
        set: function (val) {
            this._multi = util_1.isTrueProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Select.prototype, "text", {
        /**
         * @private
         */
        get: function () {
            return (this._multi ? this._texts : this._texts.join());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Select.prototype, "options", {
        /**
         * @private
         */
        set: function (val) {
            this._options = val;
            if (!this._values.length) {
                // there are no values set at this point
                // so check to see who should be selected
                this._values = val.filter(function (o) { return o.selected; }).map(function (o) { return o.value; });
            }
            this._updOpts();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    Select.prototype._updOpts = function () {
        var _this = this;
        this._texts = [];
        if (this._options) {
            this._options.forEach(function (option) {
                // check this option if the option's value is in the values array
                option.selected = _this._values.some(function (selectValue) {
                    return util_1.isCheckedProperty(selectValue, option.value);
                });
                if (option.selected) {
                    _this._texts.push(option.text);
                }
            });
        }
        this._text = this._texts.join(', ');
    };
    Object.defineProperty(Select.prototype, "disabled", {
        /**
         * @input {boolean} Whether or not the select component is disabled. Default `false`.
         */
        get: function () {
            return this._disabled;
        },
        set: function (val) {
            this._disabled = util_1.isTrueProperty(val);
            this._item && this._item.setCssClass('item-select-disabled', this._disabled);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    Select.prototype.writeValue = function (val) {
        void 0;
        this._values = (Array.isArray(val) ? val : util_1.isBlank(val) ? [] : [val]);
        this._updOpts();
    };
    /**
     * @private
     */
    Select.prototype.ngAfterContentInit = function () {
        this._updOpts();
    };
    /**
     * @private
     */
    Select.prototype.registerOnChange = function (fn) {
        var _this = this;
        this._fn = fn;
        this.onChange = function (val) {
            void 0;
            fn(val);
            _this._values = (Array.isArray(val) ? val : util_1.isBlank(val) ? [] : [val]);
            _this._updOpts();
            _this.onTouched();
        };
    };
    /**
     * @private
     */
    Select.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    /**
     * @private
     */
    Select.prototype.onChange = function (val) {
        // onChange used when there is not an formControlName
        void 0;
        this._values = (Array.isArray(val) ? val : util_1.isBlank(val) ? [] : [val]);
        this._updOpts();
        this.onTouched();
    };
    /**
     * @private
     */
    Select.prototype.onTouched = function () { };
    /**
     * @private
     */
    Select.prototype.ngOnDestroy = function () {
        this._form.deregister(this);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Select.prototype, "cancelText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Select.prototype, "okText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Select.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Select.prototype, "alertOptions", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Select.prototype, "interface", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Select.prototype, "selectedText", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Select.prototype, "ionChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Select.prototype, "ionCancel", void 0);
    __decorate([
        core_1.HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [UIEvent]), 
        __metadata('design:returntype', void 0)
    ], Select.prototype, "_click", null);
    __decorate([
        core_1.HostListener('keyup.space'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], Select.prototype, "_keyup", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Select.prototype, "multiple", null);
    __decorate([
        core_1.ContentChildren(option_1.Option), 
        __metadata('design:type', core_1.QueryList), 
        __metadata('design:paramtypes', [core_1.QueryList])
    ], Select.prototype, "options", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Select.prototype, "disabled", null);
    Select = __decorate([
        core_1.Component({
            selector: 'ion-select',
            template: "\n    <div *ngIf=\"!_text\" class=\"select-placeholder select-text\">{{placeholder}}</div>\n    <div *ngIf=\"_text\" class=\"select-text\">{{selectedText || _text}}</div>\n    <div class=\"select-icon\">\n      <div class=\"select-icon-inner\"></div>\n    </div>\n    <button aria-haspopup=\"true\"\n            [id]=\"id\"\n            category=\"item-cover\"\n            [attr.aria-labelledby]=\"_labelId\"\n            [attr.aria-disabled]=\"_disabled\"\n            class=\"item-cover\">\n    </button>\n  ",
            directives: [common_1.NgIf],
            host: {
                '[class.select-disabled]': '_disabled'
            },
            providers: [exports.SELECT_VALUE_ACCESSOR],
            encapsulation: core_1.ViewEncapsulation.None,
        }),
        __param(4, core_1.Optional()),
        __param(5, core_1.Optional()), 
        __metadata('design:paramtypes', [app_1.App, form_1.Form, core_1.ElementRef, core_1.Renderer, item_1.Item, nav_controller_1.NavController])
    ], Select);
    return Select;
}());
exports.Select = Select;
