import { EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Form } from '../../util/form';
import { Item } from '../item/item';
import { RadioGroup } from './radio-group';
/**
 * @description
 * A radio button is a button that can be either checked or unchecked. A user can tap
 * the button to check or uncheck it. It can also be checked from the template using
 * the `checked` property.
 *
 * Use an element with a `radio-group` attribute to group a set of radio buttons. When
 * radio buttons are inside a [radio group](../RadioGroup), exactly one radio button
 * in the group can be checked at any time. If a radio button is not placed in a group,
 * they will all have the ability to be checked at the same time.
 *
 * See the [Angular Forms Docs](https://angular.io/docs/ts/latest/guide/forms.html) for
 * more information on forms and input.
 *
 * @usage
 * ```html
 * <ion-list radio-group [(ngModel)]="relationship">
 *   <ion-item>
 *     <ion-label>Friends</ion-label>
 *     <ion-radio value="friends" checked></ion-radio>
 *   </ion-item>
 *   <ion-item>
 *     <ion-label>Family</ion-label>
 *     <ion-radio value="family"></ion-radio>
 *   </ion-item>
 *   <ion-item>
 *     <ion-label>Enemies</ion-label>
 *     <ion-radio value="enemies" [disabled]="isDisabled"></ion-radio>
 *   </ion-item>
 * </ion-list>
 * ```
 * @demo /docs/v2/demos/radio/
 * @see {@link /docs/v2/components#radio Radio Component Docs}
 * @see {@link ../RadioGroup RadioGroup API Docs}
 */
export declare class RadioButton implements OnDestroy, OnInit {
    private _form;
    private _item;
    private _group;
    private _checked;
    private _disabled;
    private _labelId;
    private _value;
    /**
     * @private
     */
    id: string;
    /**
     * @output {any} expression to be evaluated when selected
     */
    ionSelect: EventEmitter<any>;
    constructor(_form: Form, _item: Item, _group: RadioGroup);
    /**
     * @input {any} The value of the radio button. Defaults to the generated id.
     */
    value: any;
    /**
     * @input {boolean} Whether the radio button should be checked or not. Default false.
     */
    checked: boolean;
    /**
     * @input {boolean} Whether the radio button should be disabled or not. Default false.
     */
    disabled: boolean;
    /**
     * @private
     */
    private _click(ev);
    /**
     * @private
     */
    ngOnInit(): void;
    /**
     * @private
     */
    ngOnDestroy(): void;
}
