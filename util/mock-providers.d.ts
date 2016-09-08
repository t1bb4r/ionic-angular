import { ChangeDetectorRef, ElementRef, NgZone, Renderer } from '@angular/core';
import { Location } from '@angular/common';
import { App, Config, Platform, Tab, Tabs, Transition, ViewController } from '../../src';
import { NavControllerBase } from '../../src/components/nav/nav-controller-base';
export declare const mockConfig: (config?: any) => Config;
export declare const mockPlatform: (platforms?: string[]) => Platform;
export declare const mockApp: (config?: Config, platform?: Platform) => App;
export declare const mockZone: () => NgZone;
export declare const mockChangeDetectorRef: () => ChangeDetectorRef;
export declare const mockElementRef: () => ElementRef;
export declare const mockRenderer: () => Renderer;
export declare const mockLocation: () => Location;
export declare const mockTransition: (playCallback: Function, duration: number) => (enteringView: ViewController, leavingView: ViewController, transitionOpts: any) => Transition;
export declare const mockNavController: () => NavControllerBase;
export declare const mockTab: (parentTabs: Tabs) => Tab;
export declare const mockTabs: (app?: App) => Tabs;