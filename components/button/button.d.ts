import { ElementRef, Renderer } from '@angular/core';
import { Config } from '../../config/config';
/**
  * @name Button
  * @module ionic
  *
  * @description
  * Buttons are simple components in Ionic. They can consist of text and icons
  * and be enhanced by a wide range of attributes.
  *
  * @property [outline] - A transparent button with a border.
  * @property [clear] - A transparent button without a border.
  * @property [round] - A button with rounded corners.
  * @property [block] - A button that fills its parent container with a border-radius.
  * @property [full] - A button that fills its parent container without a border-radius or borders on the left/right.
  * @property [small] - A button with size small.
  * @property [large] - A button with size large.
  * @property [disabled] - A disabled button.
  * @property [fab] - A floating action button.
  * @property [fab-left] - Position a fab button to the left.
  * @property [fab-right] - Position a fab button to the right.
  * @property [fab-center] - Position a fab button towards the center.
  * @property [fab-top] - Position a fab button towards the top.
  * @property [fab-bottom] - Position a fab button towards the bottom.
  * @property [fab-fixed] - Makes a fab button have a fixed position.
  * @property [color] - Dynamically set which predefined color this button should use (e.g. primary, secondary, danger, etc).
  *
  * @demo /docs/v2/demos/button/
  * @see {@link /docs/v2/components#buttons Button Component Docs}
 */
export declare class Button {
    private _elementRef;
    private _renderer;
    private _role;
    private _size;
    private _style;
    private _shape;
    private _display;
    private _colors;
    private _icon;
    private _disabled;
    private _init;
    /**
     * @private
     */
    isItem: boolean;
    /**
     * @input {string} The category of the button.
     */
    category: string;
    /**
     * @input {string} Large button.
     */
    large: boolean;
    /**
     * @input {string} Small button.
     */
    small: boolean;
    /**
     * @input {string} Default button.
     */
    default: boolean;
    /**
     * @input {string} A transparent button with a border.
     */
    outline: boolean;
    /**
     * @input {string} A transparent button without a border.
     */
    clear: boolean;
    /**
     * @input {string} Force a solid button. Useful for buttons within an item.
     */
    solid: boolean;
    /**
     * @input {string} A button with rounded corners.
     */
    round: boolean;
    /**
     * @input {string} A button that fills its parent container with a border-radius.
     */
    block: boolean;
    /**
     * @input {string} A button that fills its parent container without a border-radius or borders on the left/right.
     */
    full: boolean;
    _attr(type: string, attrName: string, attrValue: boolean): void;
    /**
     * @input {string} Dynamically set which predefined color this button should use (e.g. primary, secondary, danger, etc).
     */
    color: string | string[];
    constructor(config: Config, _elementRef: ElementRef, _renderer: Renderer, ionItem: string);
    /**
     * @private
     */
    ngOnInit(): void;
    /**
     * @private
     */
    ngAfterContentInit(): void;
    /**
     * @private
     */
    ngAfterContentChecked(): void;
    /**
     * @private
     */
    addClass(className: string): void;
    /**
     * @private
     */
    setRole(val: string): void;
    /**
     * @private
     */
    private _readIcon(element);
    /**
     * @private
     */
    private _readAttrs(element);
    /**
     * @private
     */
    private _assignCss(assignCssClass);
    /**
     * @private
     */
    private _setClass(type, assignCssClass);
    /**
     * @private
     */
    private _setColor(type, assignCssClass);
}
