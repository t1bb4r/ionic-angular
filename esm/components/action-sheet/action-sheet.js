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
import { ActionSheetCmp } from './action-sheet-component';
import { App } from '../app/app';
import { isPresent } from '../../util/util';
import { ViewController } from '../nav/view-controller';
/**
 * @private
 */
export var ActionSheet = function (_ViewController) {
    _inherits(ActionSheet, _ViewController);

    function ActionSheet(app, opts) {
        _classCallCheck(this, ActionSheet);

        opts.buttons = opts.buttons || [];
        opts.enableBackdropDismiss = isPresent(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;

        var _this = _possibleConstructorReturn(this, (ActionSheet.__proto__ || Object.getPrototypeOf(ActionSheet)).call(this, ActionSheetCmp, opts));

        _this._app = app;
        _this.isOverlay = true;
        // by default, actionsheets should not fire lifecycle events of other views
        // for example, when an actionsheets enters, the current active view should
        // not fire its lifecycle events because it's not conceptually leaving
        _this.fireOtherLifecycles = false;
        return _this;
    }
    /**
     * @private
     */


    _createClass(ActionSheet, [{
        key: "getTransitionName",
        value: function getTransitionName(direction) {
            var key = 'actionSheet' + (direction === 'back' ? 'Leave' : 'Enter');
            return this._nav && this._nav.config.get(key);
        }
        /**
         * @param {string} title Action sheet title
         */

    }, {
        key: "setTitle",
        value: function setTitle(title) {
            this.data.title = title;
        }
        /**
         * @param {string} subTitle Action sheet subtitle
         */

    }, {
        key: "setSubTitle",
        value: function setSubTitle(subTitle) {
            this.data.subTitle = subTitle;
        }
        /**
         * @param {object} button Action sheet button
         */

    }, {
        key: "addButton",
        value: function addButton(button) {
            this.data.buttons.push(button);
        }
        /**
         * Present the action sheet instance.
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
         * DEPRECATED: Please inject ActionSheetController instead
         */

    }], [{
        key: "create",
        value: function create(opt) {
            // deprecated warning: added beta.11 2016-06-27
            console.warn('ActionSheet.create(..) has been deprecated. Please inject ActionSheetController instead');
        }
    }]);

    return ActionSheet;
}(ViewController);
/**
 * @name ActionSheetController
 * @description
 * An Action Sheet is a dialog that lets the user choose from a set of
 * options. It appears on top of the app's content, and must be manually
 * dismissed by the user before they can resume interaction with the app.
 * Dangerous (destructive) options are made obvious in `ios` mode. There are easy
 * ways to cancel out of the action sheet, such as tapping the backdrop or
 * hitting the escape key on desktop.
 *
 * An action sheet is created from an array of `buttons`, with each button
 * including properties for its `text`, and optionally a `handler` and `role`.
 * If a handler returns `false` then the action sheet will not be dismissed. An
 * action sheet can also optionally have a `title`, `subTitle` and an `icon`.
 *
 * A button's `role` property can either be `destructive` or `cancel`. Buttons
 * without a role property will have the default look for the platform. Buttons
 * with the `cancel` role will always load as the bottom button, no matter where
 * they are in the array. All other buttons will be displayed in the order they
 * have been added to the `buttons` array. Note: We recommend that `destructive`
 * buttons are always the first button in the array, making them the top button.
 * Additionally, if the action sheet is dismissed by tapping the backdrop, then
 * it will fire the handler from the button with the cancel role.
 *
 * You can pass all of the action sheet's options in the first argument of
 * the create method: `ActionSheet.create(opts)`. Otherwise the action sheet's
 * instance has methods to add options, like `setTitle()` or `addButton()`.
 *
 * @usage
 * ```ts
 * import { ActionSheetController } from 'ionic-angular'
 *
 * export class MyClass{
 *
 *  constructor(public actionSheetCtrl: ActionSheetController) {}
 *
 *  presentActionSheet() {
 *    let actionSheet = this.actionSheetCtrl.create({
 *      title: 'Modify your album',
 *      buttons: [
 *        {
 *          text: 'Destructive',
 *          role: 'destructive',
 *          handler: () => {
 *            console.log('Destructive clicked');
 *          }
 *        },
 *        {
 *          text: 'Archive',
 *          handler: () => {
 *            console.log('Archive clicked');
 *          }
 *        },
 *        {
 *          text: 'Cancel',
 *          role: 'cancel',
 *          handler: () => {
 *            console.log('Cancel clicked');
 *          }
 *        }
 *      ]
 *    });
 *
 *    actionSheet.present();
 *  }
 * }
 * ```
 *
 * @advanced
 *
 * ActionSheet create options
 *
 * | Option                | Type       | Description                                                     |
 * |-----------------------|------------|-----------------------------------------------------------------|
 * | title                 |`string`    | The title for the actionsheet                                   |
 * | subTitle              |`string`    | The sub-title for the actionsheet                               |
 * | cssClass              |`string`    | An additional class for custom styles                           |
 * | enableBackdropDismiss |`boolean`   | If the actionsheet should close when the user taps the backdrop |
 * | buttons               |`array<any>`| An array of buttons to display                                  |
 *
 * ActionSheet button options
 *
 * | Option   | Type     | Description                                                                                                                                      |
 * |----------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------|
 * | text     | `string` | The buttons text                                                                                                                                 |
 * | icon     | `icon`   | The buttons icons                                                                                                                                |
 * | handler  | `any`    | An express the button should evaluate                                                                                                            |
 * | cssClass | `string` | An additional class for custom styles                                                                                                            |
 * | role     | `string` | How the button should be displayed, `destructive` or `cancel`. If not role is provided, it will display the button without any additional styles |
 *
 *
 *
 * ### Dismissing And Async Navigation
 *
 * After an action sheet has been dismissed, the app may need to also transition
 * to another page depending on the handler's logic. However, because multiple
 * transitions were fired at roughly the same time, it's difficult for the
 * nav controller to cleanly animate multiple transitions that may
 * have been kicked off asynchronously. This is further described in the
 * [`Nav Transition Promises`](../../nav/NavController/#nav-transition-promises) section. For action sheets,
 * this means it's best to wait for the action sheet to finish its transition
 * out before starting a new transition on the same nav controller.
 *
 * In the example below, after the button has been clicked, its handler
 * waits on async operation to complete, *then* it uses `pop` to navigate
 * back a page in the same stack. The potential problem is that the async operation
 * may have been completed before the action sheet has even finished its transition
 * out. In this case, it's best to ensure the action sheet has finished its transition
 * out first, *then* start the next transition.
 *
 * ```ts
 * let actionSheet = this.actionSheetCtrl.create({
 *   title: 'Hello',
 *   buttons: [{
 *     text: 'Ok',
 *     handler: () => {
 *       // user has clicked the action sheet button
 *       // begin the action sheet's dimiss transition
 *       let navTransition = actionSheet.dismiss();
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
 * actionSheet.present();
 * ```
 *
 * It's important to note that the handler returns `false`. A feature of
 * button handlers is that they automatically dismiss the action sheet when their button
 * was clicked, however, we'll need more control regarding the transition. Because
 * the handler returns `false`, then the action sheet does not automatically dismiss
 * itself. Instead, you now have complete control of when the action sheet has finished
 * transitioning, and the ability to wait for the action sheet to finish transitioning
 * out before starting a new transition.
 *
 *
 * @demo /docs/v2/demos/action-sheet/
 * @see {@link /docs/v2/components#action-sheets ActionSheet Component Docs}
 */
export var ActionSheetController = function () {
    function ActionSheetController(_app) {
        _classCallCheck(this, ActionSheetController);

        this._app = _app;
    }
    /**
     * Open an action sheet with a title, subTitle, and an array of buttons
     * @param {ActionSheetOptions} opts Action sheet options
     */


    _createClass(ActionSheetController, [{
        key: "create",
        value: function create() {
            var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            return new ActionSheet(this._app, opts);
        }
    }]);

    return ActionSheetController;
}();
ActionSheetController = __decorate([Injectable(), __metadata('design:paramtypes', [typeof (_a = typeof App !== 'undefined' && App) === 'function' && _a || Object])], ActionSheetController);
var _a;