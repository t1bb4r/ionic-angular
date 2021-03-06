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
import { AlertCmp } from './alert-component';
import { isPresent } from '../../util/util';
import { ViewController } from '../nav/view-controller';
/**
 * @private
 */
export var Alert = function (_ViewController) {
    _inherits(Alert, _ViewController);

    function Alert(app) {
        var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, Alert);

        opts.inputs = opts.inputs || [];
        opts.buttons = opts.buttons || [];
        opts.enableBackdropDismiss = isPresent(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;

        var _this = _possibleConstructorReturn(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).call(this, AlertCmp, opts));

        _this._app = app;
        _this.isOverlay = true;
        // by default, alerts should not fire lifecycle events of other views
        // for example, when an alert enters, the current active view should
        // not fire its lifecycle events because it's not conceptually leaving
        _this.fireOtherLifecycles = false;
        return _this;
    }
    /**
    * @private
    */


    _createClass(Alert, [{
        key: "getTransitionName",
        value: function getTransitionName(direction) {
            var key = direction === 'back' ? 'alertLeave' : 'alertEnter';
            return this._nav && this._nav.config.get(key);
        }
        /**
         * @param {string} title Alert title
         */

    }, {
        key: "setTitle",
        value: function setTitle(title) {
            this.data.title = title;
        }
        /**
         * @param {string} subTitle Alert subtitle
         */

    }, {
        key: "setSubTitle",
        value: function setSubTitle(subTitle) {
            this.data.subTitle = subTitle;
        }
        /**
         * @private
         */

    }, {
        key: "setBody",
        value: function setBody(message) {
            // deprecated warning
            console.warn('Alert setBody() has been renamed to setMessage()');
            this.setMessage(message);
        }
        /**
         * @param {string} message  Alert message content
         */

    }, {
        key: "setMessage",
        value: function setMessage(message) {
            this.data.message = message;
        }
        /**
         * @param {object} input Alert input
         */

    }, {
        key: "addInput",
        value: function addInput(input) {
            this.data.inputs.push(input);
        }
        /**
         * @param {any} button Alert button
         */

    }, {
        key: "addButton",
        value: function addButton(button) {
            this.data.buttons.push(button);
        }
        /**
         * @param {string} cssClass Set the CSS class names on the alert's outer wrapper.
         */

    }, {
        key: "setCssClass",
        value: function setCssClass(cssClass) {
            this.data.cssClass = cssClass;
        }
        /**
         * Present the alert instance.
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
         * DEPRECATED: Please inject AlertController instead
         */

    }], [{
        key: "create",
        value: function create(opt) {
            // deprecated warning: added beta.11 2016-06-27
            console.warn('Alert.create(..) has been deprecated. Please inject AlertController instead');
        }
    }]);

    return Alert;
}(ViewController);
/**
 * @name AlertController
 * @description
 * An Alert is a dialog that presents users with information or collects
 * information from the user using inputs. An alert appears on top
 * of the app's content, and must be manually dismissed by the user before
 * they can resume interaction with the app. It can also optionally have a
 * `title`, `subTitle` and `message`.
 *
 * You can pass all of the alert's options in the first argument of
 * the create method: `create(opts)`. Otherwise the alert's instance
 * has methods to add options, such as `setTitle()` or `addButton()`.
 *
 *
 * ### Alert Buttons
 *
 * In the array of `buttons`, each button includes properties for its `text`,
 * and optionally a `handler`. If a handler returns `false` then the alert
 * will not automatically be dismissed when the button is clicked. All
 * buttons will show  up in the order they have been added to the `buttons`
 * array, from left to right. Note: The right most button (the last one in
 * the array) is the main button.
 *
 * Optionally, a `role` property can be added to a button, such as `cancel`.
 * If a `cancel` role is on one of the buttons, then if the alert is
 * dismissed by tapping the backdrop, then it will fire the handler from
 * the button with a cancel role.
 *
 *
 * ### Alert Inputs
 *
 * Alerts can also include several different inputs whose data can be passed
 * back to the app. Inputs can be used as a simple way to prompt users for
 * information. Radios, checkboxes and text inputs are all accepted, but they
 * cannot be mixed. For example, an alert could have all radio button inputs,
 * or all checkbox inputs, but the same alert cannot mix radio and checkbox
 * inputs. Do note however, different types of "text"" inputs can be mixed,
 * such as `url`, `email`, `text`, etc. If you require a complex form UI
 * which doesn't fit within the guidelines of an alert then we recommend
 * building the form within a modal instead.
 *
 *
 * @usage
 * ```ts
 * constructor(private alertCtrl: AlertController) {
 *
 * }
 *
 * presentAlert() {
 *   let alert = this.alertCtrl.create({
 *     title: 'Low battery',
 *     subTitle: '10% of battery remaining',
 *     buttons: ['Dismiss']
 *   });
 *   alert.present();
 * }
 *
 * presentConfirm() {
 *   let alert = this.alertCtrl.create({
 *     title: 'Confirm purchase',
 *     message: 'Do you want to buy this book?',
 *     buttons: [
 *       {
 *         text: 'Cancel',
 *         role: 'cancel',
 *         handler: () => {
 *           console.log('Cancel clicked');
 *         }
 *       },
 *       {
 *         text: 'Buy',
 *         handler: () => {
 *           console.log('Buy clicked');
 *         }
 *       }
 *     ]
 *   });
 *   alert.present();
 * }
 *
 * presentPrompt() {
 *   let alert = this.alertCtrl.create({
 *     title: 'Login',
 *     inputs: [
 *       {
 *         name: 'username',
 *         placeholder: 'Username'
 *       },
 *       {
 *         name: 'password',
 *         placeholder: 'Password',
 *         type: 'password'
 *       }
 *     ],
 *     buttons: [
 *       {
 *         text: 'Cancel',
 *         role: 'cancel',
 *         handler: data => {
 *           console.log('Cancel clicked');
 *         }
 *       },
 *       {
 *         text: 'Login',
 *         handler: data => {
 *           if (User.isValid(data.username, data.password)) {
 *             // logged in!
 *           } else {
 *             // invalid login
 *             return false;
 *           }
 *         }
 *       }
 *     ]
 *   });
 *   alert.present();
 * }
 * ```
 * @advanced
 *
 *
 *  Alert options
 *
 *  | Property              | Type      | Description                                                               |
 *  |-----------------------|-----------|---------------------------------------------------------------------------|
 *  | title                 | `string`  | The string for the alert (optional)                                       |
 *  | subTitle              | `string`  | The subtitle for the alert (optional)                                     |
 *  | message               | `string`  | The message for the alert (optional)                                      |
 *  | cssClass              | `string`  | Any additional class for the alert (optional)                             |
 *  | inputs                | `array`   | An array of inputs for the alert. See input options. (optional)           |
 *  | buttons               | `array`   | An array of buttons for the alert. See buttons options. (optional)        |
 *  | enableBackdropDismiss | `boolean` | Whether the alert should be dismissed by tapping the backdrop (optional)  |
 *
 *
 *  Input options
 *
 *  | Property    | Type      | Description                                                     |
 *  |-------------|-----------|-----------------------------------------------------------------|
 *  | type        | `string`  | The type the input should be, text, tel, number, etc (optional) |
 *  | name        | `string`  | The name for the input (optional)                               |
 *  | placeholder | `string`  | The input's placeholder (optional, for textual/numeric inputs)  |
 *  | value       | `string`  | The input's value (optional)                                    |
 *  | label       | `string`  | The input's label (optional, only for radio/checkbox inputs)    |
 *  | checked     | `boolean` | Whether or not the input is checked or not (optional)           |
 *  | id          | `string`  | The input's id (optional)                                       |
 *
 *  Button options
 *
 *  | Property | Type     | Description                                                    |
 *  |----------|----------|----------------------------------------------------------------|
 *  | text     | `string` | The buttons displayed text                                     |
 *  | handler  | `any`    | Expression that should be evaluated when the button is pressed |
 *  | cssClass | `string` | An additional CSS class for the button                         |
 *  | role     | `string` | The buttons role, null or `cancel`                             |
 * ### Dismissing And Async Navigation
 *
 * After an alert has been dismissed, the app may need to also transition
 * to another page depending on the handler's logic. However, because multiple
 * transitions were fired at roughly the same time, it's difficult for the
 * nav controller to cleanly animate multiple transitions that may
 * have been kicked off asynchronously. This is further described in the
 * [`Nav Transition Promises`](../../nav/NavController) section. For alerts,
 * this means it's best to wait for the alert to finish its transition
 * out before starting a new transition on the same nav controller.
 *
 * In the example below, after the alert button has been clicked, its handler
 * waits on async operation to complete, *then* it uses `pop` to navigate
 * back a page in the same stack. The potential problem is that the async operation
 * may have been completed before the alert has even finished its transition
 * out. In this case, it's best to ensure the alert has finished its transition
 * out first, *then* start the next transition.
 *
 * ```ts
 * let alert = this.alertCtrl.create({
 *   title: 'Hello',
 *   buttons: [{
 *     text: 'Ok',
 *     handler: () => {
 *       // user has clicked the alert button
 *       // begin the alert's dismiss transition
 *       let navTransition = alert.dismiss();
 *
 *       // start some async method
 *       someAsyncOperation().then(() => {
 *         // once the async operation has completed
 *         // then run the next nav transition after the
 *         // first transition has finished animating out
 *
 *         navTransition.then(() => {
 *           this.nav.pop();
 *         });
 *       });
 *       return false;
 *     }
 *   }]
 * });
 *
 * alert.present();
 * ```
 *
 * It's important to note that the handler returns `false`. A feature of
 * button handlers is that they automatically dismiss the alert when their button
 * was clicked, however, we'll need more control regarding the transition. Because
 * the handler returns `false`, then the alert does not automatically dismiss
 * itself. Instead, you now have complete control of when the alert has finished
 * transitioning, and the ability to wait for the alert to finish transitioning
 * out before starting a new transition.
 *
 *
 * @demo /docs/v2/demos/alert/
 */
export var AlertController = function () {
    function AlertController(_app) {
        _classCallCheck(this, AlertController);

        this._app = _app;
    }
    /**
     * Display an alert with a title, inputs, and buttons
     * @param {AlertOptions} opts Alert. See the table below
     */


    _createClass(AlertController, [{
        key: "create",
        value: function create() {
            var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            return new Alert(this._app, opts);
        }
    }]);

    return AlertController;
}();
AlertController = __decorate([Injectable(), __metadata('design:paramtypes', [typeof (_a = typeof App !== 'undefined' && App) === 'function' && _a || Object])], AlertController);
var _a;