import { ChangeDetectorRef, ElementRef, EventEmitter, Renderer } from '@angular/core';
import { Footer, Header } from '../toolbar/toolbar';
import { Navbar } from '../navbar/navbar';
import { NavController } from './nav-controller';
import { NavOptions } from './nav-interfaces';
import { NavParams } from './nav-params';
/**
 * @name ViewController
 * @description
 * Access various features and information about the current view.
 * @usage
 *  ```ts
 * import { Component } from '@angular/core';
 * import { ViewController } from 'ionic-angular';
 *
 * @Component({...})
 * export class MyPage{
 *
 *   constructor(public viewCtrl: ViewController) {}
 *
 * }
 * ```
 */
export declare class ViewController {
    componentType: any;
    private _cntDir;
    private _cntRef;
    private _tbRefs;
    private _hdrDir;
    private _ftrDir;
    private _destroyFn;
    private _hdAttr;
    private _leavingOpts;
    private _loaded;
    private _nbDir;
    private _onDidDismiss;
    private _onWillDismiss;
    private _pgRef;
    private _cd;
    protected _nav: NavController;
    /**
     * Observable to be subscribed to when the current component will become active
     * @returns {Observable} Returns an observable
     */
    willEnter: EventEmitter<any>;
    /**
     * Observable to be subscribed to when the current component has become active
     * @returns {Observable} Returns an observable
     */
    didEnter: EventEmitter<any>;
    /**
     * Observable to be subscribed to when the current component will no longer be active
     * @returns {Observable} Returns an observable
     */
    willLeave: EventEmitter<any>;
    /**
     * Observable to be subscribed to when the current component is no long active
     * @returns {Observable} Returns an observable
     */
    didLeave: EventEmitter<any>;
    /**
     * Observable to be subscribed to when the current component will be destroyed
     * @returns {Observable} Returns an observable
     */
    willUnload: EventEmitter<any>;
    /**
     * Observable to be subscribed to when the current component has been destroyed
     * @returns {Observable} Returns an observable
     */
    didUnload: EventEmitter<any>;
    /**
     * @private
     */
    data: any;
    /**
     * @private
     */
    id: string;
    /**
     * @private
     */
    instance: any;
    /**
     * @private
     */
    state: number;
    /**
     * @private
     * If this is currently the active view, then set to false
     * if it does not want the other views to fire their own lifecycles.
     */
    fireOtherLifecycles: boolean;
    /**
     * @private
     */
    isOverlay: boolean;
    /**
     * @private
     */
    zIndex: number;
    /**
     * @private
     */
    private _emitter;
    constructor(componentType?: any, data?: any);
    /**
     * @private
     */
    subscribe(generatorOrNext?: any): any;
    /**
     * @private
     */
    emit(data?: any): void;
    /**
     * @private
     * onDismiss(..) has been deprecated. Please use onDidDismiss(..) instead
     */
    private onDismiss(callback);
    /**
     * @private
     */
    onDidDismiss(callback: Function): void;
    /**
     * @private
     */
    onWillDismiss(callback: Function): void;
    /**
     * @private
     */
    dismiss(data?: any, role?: any, navOptions?: NavOptions): Promise<any>;
    /**
     * @private
     */
    setNav(navCtrl: NavController): void;
    /**
     * @private
     */
    getNav(): NavController;
    /**
     * @private
     */
    getTransitionName(direction: string): string;
    /**
     * @private
     */
    getNavParams(): NavParams;
    /**
     * @private
     */
    setLeavingOpts(opts: NavOptions): void;
    /**
     * Check to see if you can go back in the navigation stack.
     * @param {boolean} Check whether or not you can go back from this page
     * @returns {boolean} Returns if it's possible to go back from this Page.
     */
    enableBack(): boolean;
    /**
     * @private
     */
    setChangeDetector(cd: ChangeDetectorRef): void;
    /**
     * @private
     */
    setInstance(instance: any): void;
    /**
     * @private
     */
    name: string;
    /**
     * Get the index of the current component in the current navigation stack.
     * @returns {number} Returns the index of this page within its `NavController`.
     */
    index: number;
    /**
     * @returns {boolean} Returns if this Page is the first in the stack of pages within its NavController.
     */
    isFirst(): boolean;
    /**
     * @returns {boolean} Returns if this Page is the last in the stack of pages within its NavController.
     */
    isLast(): boolean;
    /**
     * @private
     */
    domShow(shouldShow: boolean, renderer: Renderer): void;
    /**
     * @private
     */
    setZIndex(zIndex: number, renderer: Renderer): void;
    /**
     * @private
     */
    setPageRef(elementRef: ElementRef): void;
    /**
     * @private
     * @returns {elementRef} Returns the Page's ElementRef
     */
    pageRef(): ElementRef;
    /**
     * @private
     */
    setContentRef(elementRef: ElementRef): void;
    /**
     * @private
     * @returns {elementRef} Returns the Page's Content ElementRef
     */
    contentRef(): ElementRef;
    /**
     * @private
     */
    setContent(directive: any): void;
    /**
     * @private
     */
    setToolbarRef(elementRef: ElementRef): void;
    /**
     * @private
     */
    toolbarRefs(): ElementRef[];
    /**
     * @private
     */
    setHeader(directive: Header): void;
    /**
     * @private
     */
    getHeader(): Header;
    /**
     * @private
     */
    setFooter(directive: Footer): void;
    /**
     * @private
     */
    getFooter(): Footer;
    /**
     * @private
     * @returns {component} Returns the Page's Content component reference.
     */
    getContent(): any;
    /**
     * @private
     */
    setNavbar(directive: Navbar): void;
    /**
     * @private
     */
    getNavbar(): Navbar;
    /**
     *
     * Find out if the current component has a NavBar or not. Be sure
     * to wrap this in an `ionViewWillEnter` method in order to make sure
     * the view has rendered fully.
     * @returns {boolean} Returns a boolean if this Page has a navbar or not.
     */
    hasNavbar(): boolean;
    /**
     * @private
     */
    navbarRef(): ElementRef;
    /**
     * @private
     */
    titleRef(): ElementRef;
    /**
     * @private
     */
    navbarItemRefs(): Array<ElementRef>;
    /**
     * @private
     */
    backBtnRef(): ElementRef;
    /**
     * @private
     */
    backBtnTextRef(): ElementRef;
    /**
     * @private
     */
    navbarBgRef(): ElementRef;
    /**
     * Change the title of the back-button. Be sure to call this
     * after `ionViewWillEnter` to make sure the  DOM has been rendered.
     * @param {string} backButtonText Set the back button text.
     */
    setBackButtonText(val: string): void;
    /**
     * Set if the back button for the current view is visible or not. Be sure to call this
     * after `ionViewWillEnter` to make sure the  DOM has been rendered.
     * @param {boolean} Set if this Page's back button should show or not.
     */
    showBackButton(shouldShow: boolean): void;
    /**
     * @private
     */
    isLoaded(): boolean;
    /**
     * The loaded method is used to load any dynamic content/components
     * into the dom before proceeding with the transition.  If a component
     * needs dynamic component loading, extending ViewController and
     * overriding this method is a good option
     * @param {function} done is a callback that must be called when async
     * loading/actions are completed
     */
    loaded(done: (() => any)): void;
    /**
     * @private
     * The view has loaded. This event only happens once per view being
     * created. If a view leaves but is cached, then this will not
     * fire again on a subsequent viewing. This method is a good place
     * to put your setup code for the view; however, it is not the
     * recommended method to use when a view becomes active.
     */
    fireLoaded(): void;
    /**
     * @private
     * The view is about to enter and become the active view.
     */
    fireWillEnter(): void;
    /**
     * @private
     * The view has fully entered and is now the active view. This
     * will fire, whether it was the first load or loaded from the cache.
     */
    fireDidEnter(): void;
    /**
     * @private
     * The view has is about to leave and no longer be the active view.
     */
    fireWillLeave(): void;
    /**
     * @private
     * The view has finished leaving and is no longer the active view. This
     * will fire, whether it is cached or unloaded.
     */
    fireDidLeave(): void;
    /**
     * @private
     * The view is about to be destroyed and have its elements removed.
     */
    fireWillUnload(): void;
    /**
     * @private
     */
    onDestroy(destroyFn: Function): void;
    /**
     * @private
     */
    destroy(): void;
}
export interface LifeCycleEvent {
    componentType?: any;
}
