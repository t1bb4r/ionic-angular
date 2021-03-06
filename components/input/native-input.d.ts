import { ElementRef, EventEmitter, Renderer } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Config } from '../../config/config';
/**
 * @private
 */
export declare class NativeInput {
    private _elementRef;
    private _renderer;
    ngControl: NgControl;
    private _relocated;
    private _clone;
    private _blurring;
    private _unrefBlur;
    focusChange: EventEmitter<boolean>;
    valueChange: EventEmitter<string>;
    constructor(_elementRef: ElementRef, _renderer: Renderer, config: Config, ngControl: NgControl);
    private _change(ev);
    private _focus();
    private _blur();
    labelledBy(val: string): void;
    isDisabled(val: boolean): void;
    setFocus(): void;
    beginFocus(shouldFocus: boolean, inputRelativeY: number): void;
    hideFocus(shouldHideFocus: boolean): void;
    hasFocus(): boolean;
    getValue(): string;
    setCssClass(cssClass: string, shouldAdd: boolean): void;
    element(): HTMLInputElement;
    ngOnDestroy(): void;
}
/**
 * @private
 */
export declare class NextInput {
    focused: EventEmitter<boolean>;
    receivedFocus(): void;
}
