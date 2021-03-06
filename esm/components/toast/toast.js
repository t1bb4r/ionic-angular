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
import { ToastCmp } from './toast-component';
import { ViewController } from '../nav/view-controller';
/**
 * @private
 */
export var Toast = function (_ViewController) {
    _inherits(Toast, _ViewController);

    function Toast(app) {
        var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, Toast);

        opts.dismissOnPageChange = isPresent(opts.dismissOnPageChange) ? !!opts.dismissOnPageChange : false;

        var _this = _possibleConstructorReturn(this, (Toast.__proto__ || Object.getPrototypeOf(Toast)).call(this, ToastCmp, opts));

        _this._app = app;
        // set the position to the bottom if not provided
        if (!opts.position || !_this.isValidPosition(opts.position)) {
            opts.position = TOAST_POSITION_BOTTOM;
        }
        _this.isOverlay = true;
        // by default, toasts should not fire lifecycle events of other views
        // for example, when an toast enters, the current active view should
        // not fire its lifecycle events because it's not conceptually leaving
        _this.fireOtherLifecycles = false;
        return _this;
    }
    /**
    * @private
    */


    _createClass(Toast, [{
        key: "getTransitionName",
        value: function getTransitionName(direction) {
            var key = 'toast' + (direction === 'back' ? 'Leave' : 'Enter');
            return this._nav && this._nav.config.get(key);
        }
        /**
        * @private
        */

    }, {
        key: "isValidPosition",
        value: function isValidPosition(position) {
            return position === TOAST_POSITION_TOP || position === TOAST_POSITION_MIDDLE || position === TOAST_POSITION_BOTTOM;
        }
        /**
         * @param {string} message  Toast message content
         */

    }, {
        key: "setMessage",
        value: function setMessage(message) {
            this.data.message = message;
        }
        /**
         * Present the toast instance.
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
         * DEPRECATED: Please inject ToastController instead
         */

    }], [{
        key: "create",
        value: function create(opt) {
            // deprecated warning: added beta.11 2016-06-27
            console.warn('Toast.create(..) has been deprecated. Please inject ToastController instead');
        }
    }]);

    return Toast;
}(ViewController);
/**
 * @name ToastController
 * @description
 * A Toast is a subtle notification commonly used in modern applications.
 * It can be used to provide feedback about an operation or to
 * display a system message. The toast appears on top of the app's content,
 * and can be dismissed by the app to resume user interaction with
 * the app.
 *
 * ### Creating
 * All of the toast options should be passed in the first argument of
 * the create method: `create(opts)`. The message to display should be
 * passed in the `message` property. The `showCloseButton` option can be set to
 * true in order to display a close button on the toast. See the [create](#create)
 * method below for all available options.
 *
 * ### Positioning
 * Toasts can be positioned at the top, bottom or middle of the
 * view port. The position can be passed to the `Toast.create(opts)` method.
 * The position option is a string, and the values accepted are `top`, `bottom` and `middle`.
 * If the position is not specified, the toast will be displayed at the bottom of the view port.
 *
 * ### Dismissing
 * The toast can be dismissed automatically after a specific amount of time
 * by passing the number of milliseconds to display it in the `duration` of
 * the toast options. If `showCloseButton` is set to true, then the close button
 * will dismiss the toast. To dismiss the toast after creation, call the `dismiss()`
 * method on the Toast instance. The `onDidDismiss` function can be called to perform an action after the toast
 * is dismissed.
 *
 * @usage
 * ```ts
 * constructor(private toastCtrl: ToastController) {
 *
 * }
 *
 * presentToast() {
 *   let toast = this.toastCtrl.create({
 *     message: 'User was added successfully',
 *     duration: 3000,
 *     position: 'top'
 *   });
 *
 *   toast.onDidDismiss(() => {
 *     console.log('Dismissed toast');
 *   });
 *
 *   toast.present();
 * }
 * ```
 * @advanced
 * | Property              | Type      | Default         | Description                                                                                                   |
 * |-----------------------|-----------|-----------------|---------------------------------------------------------------------------------------------------------------|
 * | message               | `string`  | -               | The message for the toast. Long strings will wrap and the toast container will expand.                        |
 * | duration              | `number`  | -               | How many milliseconds to wait before hiding the toast. By default, it will show until `dismiss()` is called.  |
 * | position              | `string`  | "bottom"        | The position of the toast on the screen. Accepted values: "top", "middle", "bottom".                          |
 * | cssClass              | `string`  | -               | Any additional class for custom styles.                                                                       |
 * | showCloseButton       | `boolean` | false           | Whether or not to show a button to close the toast.                                                           |
 * | closeButtonText       | `string`  | "Close"         | Text to display in the close button.                                                                          |
 * | dismissOnPageChange   | `boolean` | false           | Whether to dismiss the toast when navigating to a new page.                                                   |
 *
 * @demo /docs/v2/demos/toast/
 */
export var ToastController = function () {
    function ToastController(_app) {
        _classCallCheck(this, ToastController);

        this._app = _app;
    }
    /**
     * Create a new toast component. See options below
     * @param {ToastOptions} opts Toast options. See the above table for available options.
     */


    _createClass(ToastController, [{
        key: "create",
        value: function create() {
            var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            return new Toast(this._app, opts);
        }
    }]);

    return ToastController;
}();
ToastController = __decorate([Injectable(), __metadata('design:paramtypes', [typeof (_a = typeof App !== 'undefined' && App) === 'function' && _a || Object])], ToastController);
var TOAST_POSITION_TOP = 'top';
var TOAST_POSITION_MIDDLE = 'middle';
var TOAST_POSITION_BOTTOM = 'bottom';
var _a;