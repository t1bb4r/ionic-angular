import { ElementRef, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Config } from '../../config/config';
/**
 * @name Searchbar
 * @module ionic
 * @description
 * Manages the display of a Searchbar which can be used to search or filter items.
 *
 * @usage
 * ```html
 * <ion-searchbar
 *   [(ngModel)]="myInput"
 *   [showCancelButton]="shouldShowCancel"
 *   (ionInput)="onInput($event)"
 *   (ionCancel)="onCancel($event)">
 * </ion-searchbar>
 * ```
 *
 * @demo /docs/v2/demos/searchbar/
 * @see {@link /docs/v2/components#searchbar Searchbar Component Docs}
 */
export declare class Searchbar {
    private _elementRef;
    private _config;
    private _value;
    private _shouldBlur;
    private _isActive;
    private _searchbarInput;
    private _debouncer;
    /**
     * @input {string} Set the the cancel button text. Default: `"Cancel"`.
     */
    cancelButtonText: string;
    /**
     * @input {boolean} Whether to show the cancel button or not. Default: `"false"`.
     */
    showCancelButton: any;
    /**
     * @input {number} How long, in milliseconds, to wait to trigger the `input` event after each keystroke. Default `250`.
     */
    debounce: number;
    /**
     * @input {string} Set the input's placeholder. Default `"Search"`.
     */
    placeholder: string;
    /**
     * @input {string} Set the input's autocomplete property. Values: `"on"`, `"off"`. Default `"off"`.
     */
    autocomplete: string;
    /**
     * @input {string} Set the input's autocorrect property. Values: `"on"`, `"off"`. Default `"off"`.
     */
    autocorrect: string;
    /**
     * @input {string|boolean} Set the input's spellcheck property. Values: `true`, `false`. Default `false`.
     */
    spellcheck: string | boolean;
    /**
     * @input {string} Set the type of the input. Values: `"text"`, `"password"`, `"email"`, `"number"`, `"search"`, `"tel"`, `"url"`. Default `"search"`.
     */
    type: string;
    /**
     * @output {event} When the Searchbar input has changed including cleared.
     */
    ionInput: EventEmitter<UIEvent>;
    /**
     * @output {event} When the Searchbar input has blurred.
     */
    ionBlur: EventEmitter<UIEvent>;
    /**
     * @output {event} When the Searchbar input has focused.
     */
    ionFocus: EventEmitter<UIEvent>;
    /**
     * @output {event} When the cancel button is clicked.
     */
    ionCancel: EventEmitter<UIEvent>;
    /**
     * @output {event} When the clear input button is clicked.
     */
    ionClear: EventEmitter<UIEvent>;
    /**
     * @private
     */
    _sbHasFocus: boolean;
    constructor(_elementRef: ElementRef, _config: Config, ngControl: NgControl);
    /**
     * @private
     */
    private searchbarInput;
    _searchbarIcon: ElementRef;
    _cancelButton: ElementRef;
    /**
     * @input {string} Set the input value.
     */
    value: string | number;
    /**
     * @private
     * On Initialization check for attributes
     */
    ngOnInit(): void;
    /**
     * @private
     * After View Initialization position the elements
     */
    ngAfterViewInit(): void;
    /**
     * @private
     * Positions the input search icon, placeholder, and the cancel button
     * based on the input value and if it is focused. (ios only)
     */
    positionElements(): void;
    /**
     * @private
     * Calculates the amount of padding/margin left for the elements
     * in order to center them based on the placeholder width
     */
    positionInputPlaceholder(inputEle: HTMLElement, iconEle: HTMLElement): void;
    /**
     * @private
     * Show the iOS Cancel button on focus, hide it offscreen otherwise
     */
    positionCancelButton(cancelButtonEle: HTMLElement): void;
    /**
     * @private
     * Align the input placeholder left on focus or if a value exists
     */
    shouldAlignLeft(): boolean;
    /**
     * @private
     * Update the Searchbar input value when the input changes
     */
    inputChanged(ev: any): void;
    /**
     * @private
     * Sets the Searchbar to focused and active on input focus.
     */
    inputFocused(ev: UIEvent): void;
    /**
     * @private
     * Sets the Searchbar to not focused and checks if it should align left
     * based on whether there is a value in the searchbar or not.
     */
    inputBlurred(ev: UIEvent): void;
    /**
     * @private
     * Clears the input field and triggers the control change.
     */
    clearInput(ev: UIEvent): void;
    /**
     * @private
     * Clears the input field and tells the input to blur since
     * the clearInput function doesn't want the input to blur
     * then calls the custom cancel function if the user passed one in.
     */
    cancelSearchbar(ev: UIEvent): void;
    /**
     * @private
     * Write a new value to the element.
     */
    writeValue(val: any): void;
    /**
     * @private
     */
    onChange: (_: any) => void;
    /**
     * @private
     */
    onTouched: () => void;
    /**
     * @private
     * Set the function to be called when the control receives a change event.
     */
    registerOnChange(fn: (_: any) => {}): void;
    /**
     * @private
     * Set the function to be called when the control receives a touch event.
     */
    registerOnTouched(fn: () => {}): void;
}
