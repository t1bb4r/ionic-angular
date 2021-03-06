import { ComponentRef } from '@angular/core';
/**
 * @name ionicBootstrap
 * @description
 * `ionicBootstrap` allows you to bootstrap your entire application. Similar to Angular's `bootstrap`, `ionicBootstrap`
 * takes a root component in order to start the app. You can pass along any providers that you may want to inject into your
 * app as an array for the second argument. You can also pass a config object as the third argument to configure your app's settings.
 *
 * @usage
 *
 * ```ts
 * import { ionicBootstrap } from 'ionic-angular';
 * import { Component } from '@angular/core';
 *
 * @Component({
 *   templateUrl: 'build/app.html',
 * })
 * export class MyClass{}
 *
 * ionicBootstrap(MyClass, null, {tabsPlacement: 'bottom'})
 * ```
 */
export declare function ionicBootstrap(appRootComponent: any, customProviders?: Array<any>, config?: any): Promise<{}>;
/**
 * @private
 */
export declare function ionicPostBootstrap(ngComponentRef: ComponentRef<any>): ComponentRef<any>;
/**
 * @private
 */
export declare function addSelector(type: any, selector: string): void;
