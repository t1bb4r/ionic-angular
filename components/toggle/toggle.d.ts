import { AfterContentInit, ElementRef, EventEmitter, OnDestroy, Provider, Renderer } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Form } from '../../util/form';
import { Item } from '../item/item';
export declare const TOGGLE_VALUE_ACCESSOR: Provider;
/**
 * @name Toggle
 * @description
 * A toggle technically is the same thing as an HTML checkbox input,
 * except it looks different and is easier to use on a touch device.
 * Toggles can also have colors assigned to them, by adding any color
 * attribute.
 *
 * See the [Angular 2 Docs](https://angular.io/docs/ts/latest/guide/forms.html)
 * for more info on forms and inputs.
 *
 * @usage
 * ```html
 *
 *  <ion-list>
 *
 *    <ion-item>
 *      <ion-label>Pepperoni</ion-label>
 *      <ion-toggle [(ngModel)]="pepperoni"></ion-toggle>
 *    </ion-item>
 *
 *    <ion-item>
 *      <ion-label>Sausage</ion-label>
 *      <ion-toggle [(ngModel)]="sausage" disabled="true"></ion-toggle>
 *    </ion-item>
 *
 *    <ion-item>
 *      <ion-label>Mushrooms</ion-label>
 *      <ion-toggle [(ngModel)]="mushrooms"></ion-toggle>
 *    </ion-item>
 *
 *  </ion-list>
 * ```
 *
 * @demo /docs/v2/demos/toggle/
 * @see {@link /docs/v2/components#toggle Toggle Component Docs}
 */
export declare class Toggle implements AfterContentInit, ControlValueAccessor, OnDestroy {
    private _form;
    private _elementRef;
    private _renderer;
    private _item;
    private _checked;
    private _init;
    private _disabled;
    private _labelId;
    private _activated;
    private _startX;
    private _msPrv;
    private _fn;
    private _events;
    /**
     * @private
     */
    id: string;
    /**
     * @output {Toggle} expression to evaluate when the toggle value changes
     */
    ionChange: EventEmitter<Toggle>;
    constructor(_form: Form, _elementRef: ElementRef, _renderer: Renderer, _item: Item);
    /**
     * @private
     */
    private pointerDown(ev);
    /**
     * @private
     */
    private pointerMove(ev);
    /**
     * @private
     */
    private pointerUp(ev);
    /**
     * @input {boolean} whether the toggle it toggled or not
     */
    checked: boolean;
    private _setChecked(isChecked);
    /**
     * @private
     */
    writeValue(val: any): void;
    /**
     * @private
     */
    registerOnChange(fn: Function): void;
    /**
     * @private
     */
    registerOnTouched(fn: any): void;
    /**
     * @input {boolean} whether the toggle is disabled or not
     */
    disabled: boolean;
    /**
     * @private
     */
    onChange(isChecked: boolean): void;
    /**
     * @private
     */
    onTouched(): void;
    /**
     * @private
     */
    ngAfterContentInit(): void;
    /**
     * @private
     */
    ngOnDestroy(): void;
}
