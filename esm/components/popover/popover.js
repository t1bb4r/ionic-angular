var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { App } from '../app/app';
import { isPresent } from '../../util/util';
import { PopoverCmp } from './popover-component';
import { ViewController } from '../nav/view-controller';
/**
 * @private
 */
export var Popover = function (_ViewController) {
    _inherits(Popover, _ViewController);

    function Popover(app, componentType) {
        var data = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        var opts = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

        _classCallCheck(this, Popover);

        opts.showBackdrop = isPresent(opts.showBackdrop) ? !!opts.showBackdrop : true;
        opts.enableBackdropDismiss = isPresent(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;
        data.componentType = componentType;
        data.opts = opts;

        var _this = _possibleConstructorReturn(this, (Popover.__proto__ || Object.getPrototypeOf(Popover)).call(this, PopoverCmp, data));

        _this._app = app;
        _this.isOverlay = true;
        // by default, popovers should not fire lifecycle events of other views
        // for example, when a popover enters, the current active view should
        // not fire its lifecycle events because it's not conceptually leaving
        _this.fireOtherLifecycles = false;
        return _this;
    }
    /**
     * @private
     */


    _createClass(Popover, [{
        key: "getTransitionName",
        value: function getTransitionName(direction) {
            var key = direction === 'back' ? 'popoverLeave' : 'popoverEnter';
            return this._nav && this._nav.config.get(key);
        }
        /**
         * Present the popover instance.
         *
         * @param {NavOptions} [opts={}] Nav options to go with this transition.
         * @returns {Promise} Returns a promise which is resolved when the transition has completed.
         */

    }, {
        key: "present",
        value: function present() {
            var navOptions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            return this._app.present(this, navOptions);
        }
        /**
         * @private
         * DEPRECATED: Please inject PopoverController instead
         */

    }], [{
        key: "create",
        value: function create(componentType) {
            var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            // deprecated warning: added beta.11 2016-06-27
            console.warn('Popover.create(..) has been deprecated. Please inject PopoverController instead');
        }
    }]);

    return Popover;
}(ViewController);
/**
 * @name PopoverController
 * @description
 * A Popover is a dialog that appears on top of the current page.
 * It can be used for anything, but generally it is used for overflow
 * actions that don't fit in the navigation bar.
 *
 * ### Creating
 * A popover can be created by calling the `create` method. The view
 * to display in the popover should be passed as the first argument.
 * Any data to pass to the popover view can optionally be passed in
 * the second argument. Options for the popover can optionally be
 * passed in the third argument. See the [create](#create) method
 * below for all available options.
 *
 * ### Presenting
 * To present a popover, call the `present` method on the [NavController](../../nav/NavController).
 * The first argument passed to the `present` should be the popover. In order
 * to position the popover relative to the element clicked, the event needs to be
 * passed as the second argument. If the event is not passed, the popover will be
 * positioned in the center of the current view. See the [usage](#usage) section for
 * an example of passing this event.
 *
 * ### Dismissing
 * To dismiss the popover after creation, call the `dismiss()` method on the
 * `Popover` instance. The popover can also be dismissed from within the popover's
 * view by calling the `dismiss()` method on the [ViewController](../../nav/ViewController).
 * The `onDidDismiss` function can be called to perform an action after the popover
 * is dismissed. The popover will dismiss when the backdrop is clicked, but this
 * can be disabled by setting `enableBackdropDismiss` to `false` in the popover
 * options.
 *
 * > Note that after the component is dismissed, it will not be usable anymore and
 * another one must be created. This can be avoided by wrapping the creation and
 * presentation of the component in a reusable function as shown in the [usage](#usage)
 * section below.
 *
 * @usage
 *
 * To open a popover on the click of a button, pass `$event` to the method
 * which creates and presents the popover:
 *
 * ```html
 * <button (click)="presentPopover($event)">
 *   <ion-icon name="more"></ion-icon>
 * </button>
 * ```
 *
 * ```ts
 * @Component({})
 * class MyPage {
 *   constructor(private popoverCtrl: PopoverController) {}
 *
 *   presentPopover(myEvent) {
 *     let popover = this.popoverCtrl.create(PopoverPage);
 *     popover.present({
 *       ev: myEvent
 *     });
 *   }
 * }
 * ```
 *
 * The `PopoverPage` will display inside of the popover, and
 * can be anything. Below is an example of a page with items
 * that close the popover on click.
 *
 * ```ts
 * @Component({
 *   template: `
 *     <ion-list>
 *       <ion-list-header>Ionic</ion-list-header>
 *       <button ion-item (click)="close()">Learn Ionic</button>
 *       <button ion-item (click)="close()">Documentation</button>
 *       <button ion-item (click)="close()">Showcase</button>
 *       <button ion-item (click)="close()">GitHub Repo</button>
 *     </ion-list>
 *   `
 * })
 * class PopoverPage {
 *   constructor(private viewCtrl: ViewController) {}
 *
 *   close() {
 *     this.viewCtrl.dismiss();
 *   }
 * }
 * ```
 * @advanced
 * Popover Options
 *
 * | Option                | Type       | Description                                                                                                      |
 * |-----------------------|------------|------------------------------------------------------------------------------------------------------------------|
 * | cssClass              |`string`    | An additional class for custom styles.                                                                           |
 * | showBackdrop          |`boolean`   | Whether to show the backdrop. Default true.                                                                      |
 * | enableBackdropDismiss |`boolean`   | Whether the popover should be dismissed by tapping the backdrop. Default true.                                   |
 *
 *
 *
 * @demo /docs/v2/demos/popover/
 */
export var PopoverController = function () {
    function PopoverController(_app) {
        _classCallCheck(this, PopoverController);

        this._app = _app;
    }
    /**
     * Present a popover. See below for options
     * @param {object} componentType The Popover
     * @param {object} data Any data to pass to the Popover view
     * @param {PopoverOptions} opts Popover options
     */


    _createClass(PopoverController, [{
        key: "create",
        value: function create(componentType) {
            var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            return new Popover(this._app, componentType, data, opts);
        }
    }]);

    return PopoverController;
}();
PopoverController = __decorate([Injectable(), __metadata('design:paramtypes', [typeof (_a = typeof App !== 'undefined' && App) === 'function' && _a || Object])], PopoverController);
var _a;