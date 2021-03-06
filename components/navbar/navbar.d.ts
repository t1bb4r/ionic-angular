import { ElementRef } from '@angular/core';
import { App } from '../app/app';
import { Config } from '../../config/config';
import { ToolbarBase } from '../toolbar/toolbar';
import { ViewController } from '../nav/view-controller';
/**
 * @name Navbar
 * @description
 * Navbar acts as the navigational toolbar, which also comes with a back
 * button. A navbar can contain a `ion-title`, any number of buttons,
 * a segment, or a searchbar. Navbars must be placed within an
 * `<ion-header>` in order for them to be placed above the content.
 * It's important to note that navbar's are part of the dynamica navigation
 * stack. If you need a static toolbar, use ion-toolbar.
 *
 * @usage
 * ```html
 * <ion-header>
 *
 *   <ion-navbar>
 *     <button menuToggle>
 *       <ion-icon name="menu"></ion-icon>
 *     </button>
 *
 *     <ion-title>
 *       Page Title
 *     </ion-title>
 *
 *     <ion-buttons end>
 *       <button (click)="openModal()">
 *         <ion-icon name="options"></ion-icon>
 *       </button>
 *     </ion-buttons>
 *   </ion-navbar>
 *
 * </ion-header>
 * ```
 *
 * @demo /docs/v2/demos/navbar/
 * @see {@link ../../toolbar/Toolbar/ Toolbar API Docs}
 */
export declare class Navbar extends ToolbarBase {
    private _app;
    private _bbIcon;
    private _bbText;
    private _hidden;
    private _hideBb;
    private _bbRef;
    private _bbtRef;
    private _bgRef;
    private _sbPadding;
    /**
     * @input {boolean} whether the back button should be shown or not
     */
    hideBackButton: boolean;
    constructor(_app: App, viewCtrl: ViewController, elementRef: ElementRef, config: Config);
    /**
     * @private
     */
    setBackButtonText(text: string): void;
    /**
     * @private
     */
    getBackButtonRef(): ElementRef;
    /**
     * @private
     */
    setBackButtonRef(backButtonElementRef: ElementRef): void;
    /**
     * @private
     */
    getBackButtonTextRef(): ElementRef;
    /**
     * @private
     */
    setBackButtonTextRef(backButtonTextElementRef: ElementRef): void;
    /**
     * @private
     */
    setBackgroundRef(backgrouneElementRef: ElementRef): void;
    /**
     * @private
     */
    getBackgroundRef(): ElementRef;
    /**
     * @private
     */
    didEnter(): void;
    /**
     * @private
     */
    setHidden(isHidden: boolean): void;
}
/**
 * @private
*/
export declare class NavbarTemplate {
    constructor();
}
