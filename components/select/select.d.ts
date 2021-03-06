import { AfterContentInit, ElementRef, EventEmitter, OnDestroy, Provider, Renderer } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { App } from '../app/app';
import { Form } from '../../util/form';
import { Item } from '../item/item';
import { NavController } from '../nav/nav-controller';
export declare const SELECT_VALUE_ACCESSOR: Provider;
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
export declare class Select implements AfterContentInit, ControlValueAccessor, OnDestroy {
    private _app;
    private _form;
    private _elementRef;
    private _renderer;
    private _item;
    private _nav;
    private _disabled;
    private _labelId;
    private _multi;
    private _options;
    private _values;
    private _texts;
    private _text;
    private _fn;
    private _isOpen;
    /**
     * @private
     */
    id: string;
    /**
     * @input {string} The text to display on the cancel button. Default: `Cancel`.
     */
    cancelText: string;
    /**
     * @input {string} The text to display on the ok button. Default: `OK`.
     */
    okText: string;
    /**
     * @input {string} The text to display when the select is empty.
     */
    placeholder: string;
    /**
     * @input {any} Any addition options that the alert interface can take.
     * See the [Alert API docs](../../alert/Alert) for the create options.
     */
    alertOptions: any;
    /**
     * @input {string} The interface the select should use: `action-sheet` or `alert`. Default: `alert`.
     */
    interface: string;
    /**
     * @input {string} The text to display instead of the selected option's value.
     */
    selectedText: string;
    /**
     * @output {any} Any expression you want to evaluate when the selection has changed.
     */
    ionChange: EventEmitter<any>;
    /**
     * @output {any} Any expression you want to evaluate when the selection was cancelled.
     */
    ionCancel: EventEmitter<any>;
    constructor(_app: App, _form: Form, _elementRef: ElementRef, _renderer: Renderer, _item: Item, _nav: NavController);
    private _click(ev);
    private _keyup();
    /**
     * Open the select interface.
     */
    open(): void;
    /**
     * @input {boolean} Whether or not the select component can accept multiple values. Default: `false`.
     */
    multiple: any;
    /**
     * @private
     */
    text: string[] | string;
    /**
     * @private
     */
    private options;
    /**
     * @private
     */
    private _updOpts();
    /**
     * @input {boolean} Whether or not the select component is disabled. Default `false`.
     */
    disabled: any;
    /**
     * @private
     */
    writeValue(val: any): void;
    /**
     * @private
     */
    ngAfterContentInit(): void;
    /**
     * @private
     */
    registerOnChange(fn: Function): void;
    /**
     * @private
     */
    registerOnTouched(fn: any): void;
    /**
     * @private
     */
    onChange(val: any): void;
    /**
     * @private
     */
    onTouched(): void;
    /**
     * @private
     */
    ngOnDestroy(): void;
}
