import { ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { App } from '../app/app';
import { Config } from '../../config/config';
import { Content } from '../content/content';
import { Form } from '../../util/form';
import { InputBase } from './input-base';
import { Item } from '../item/item';
import { NavController } from '../nav/nav-controller';
import { Platform } from '../../platform/platform';
/**
 * @name Input
 * @description
 *
 * `ion-input` is meant for text type inputs only, such as `text`,
 * `password`, `email`, `number`, `search`, `tel`, and `url`. Ionic
 * still uses an actual `<input type="text">` HTML element within the
 * component, however, with Ionic wrapping the native HTML input
 * element it's able to better handle the user experience and
 * interactivity.
 *
 * Similarily, `<ion-textarea>` should be used in place of `<textarea>`.
 *
 * An `ion-input` is **not** used for non-text type inputs, such as a
 * `checkbox`, `radio`, `toggle`, `range`, `select`, etc.
 *
 * @property [type] - The HTML input type (text, password, email, number, search, tel, or url)
 * @property [clearInput] - A clear icon will appear in the input when there is a value. Clicking it clears the input.
 *
 * @usage
 * ```html
 * <ion-list>
 *   <ion-item>
 *     <ion-label primary>Inline Label</ion-label>
 *     <ion-input placeholder="Text Input"></ion-input>
 *   </ion-item>
 *
 *   <ion-item>
 *     <ion-label primary fixed>Fixed Label</ion-label>
 *     <ion-input type="tel" placeholder="Tel Input"></ion-input>
 *   </ion-item>
 *
 *   <ion-item>
 *     <ion-input type="number" placeholder="Number Input with no label"></ion-input>
 *   </ion-item>
 *
 *   <ion-item>
 *     <ion-label primary stacked>Stacked Label</ion-label>
 *     <ion-input type="email" placeholder="Email Input"></ion-input>
 *   </ion-item>
 *
 *   <ion-item>
 *     <ion-label primary stacked>Stacked Label</ion-label>
 *     <ion-input type="password" placeholder="Password Input"></ion-input>
 *   </ion-item>
 *
 *   <ion-item>
 *     <ion-label primary floating>Floating Label</ion-label>
 *     <ion-input></ion-input>
 *   </ion-item>
 *
 *   <ion-item>
 *     <ion-input placeholder="Clear Input" clearInput></ion-input>
 *   </ion-item>
 * </ion-list>
 * ```
 *
 * @demo /docs/v2/demos/input/
 */
export declare class TextInput extends InputBase {
    constructor(config: Config, form: Form, item: Item, app: App, platform: Platform, elementRef: ElementRef, scrollView: Content, nav: NavController, ngControl: NgControl);
    /**
     * @private
     */
    inputBlurred(ev: UIEvent): void;
    /**
     * @private
     */
    inputFocused(ev: UIEvent): void;
    /**
     * @private
     */
    clearTextInput(): void;
}
/**
 * @name TextArea
 * @description
 *
 * `ion-textarea` is is used for multi-line text inputs. Ionic still
 * uses an actual `<textarea>` HTML element within the component;
 * however, with Ionic wrapping the native HTML text area element, Ionic
 * is able to better handle the user experience and interactivity.
 *
 * Not that `<ion-textarea>` must load its value from the `value` or
 * `[(ngModel)]` attribute. Unlike the native `<textarea>` element,
 * `<ion-textarea>` does not support loading its value from the
 * textarea's inner content.
 *
 * When requiring only a single-line text input, we recommend using
 * `<ion-input>` instead.
 *
 * @usage
 * ```html
 *  <ion-item>
 *    <ion-label>Comments</ion-label>
 *    <ion-textarea></ion-textarea>
 *  </ion-item>
 *
 *  <ion-item>
 *    <ion-label stacked>Message</ion-label>
 *    <ion-textarea [(ngModel)]="msg"></ion-textarea>
 *  </ion-item>
 *
 *  <ion-item>
 *    <ion-label floating>Description</ion-label>
 *    <ion-textarea></ion-textarea>
 *  </ion-item>
 *
 * <ion-item>
 *    <ion-label>Long Description</ion-label>
 *    <ion-textarea rows="6" placeholder="enter long description here..."></ion-textarea>
 *  </ion-item>
 * ```
 *
 * @demo /docs/v2/demos/textarea/
 */
export declare class TextArea extends InputBase {
    constructor(config: Config, form: Form, item: Item, app: App, platform: Platform, elementRef: ElementRef, scrollView: Content, nav: NavController, ngControl: NgControl);
    /**
     * @private
     */
    ngOnInit(): void;
    /**
     * @private
     */
    inputBlurred(ev: UIEvent): void;
    /**
     * @private
     */
    inputFocused(ev: UIEvent): void;
}
