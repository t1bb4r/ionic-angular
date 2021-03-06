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
import { ModalCmp } from './modal-component';
import { ViewController } from '../nav/view-controller';
/**
 * @private
 */
export var Modal = function (_ViewController) {
    _inherits(Modal, _ViewController);

    function Modal(app, componentType) {
        var data = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        var opts = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

        _classCallCheck(this, Modal);

        data.componentType = componentType;
        opts.showBackdrop = isPresent(opts.showBackdrop) ? !!opts.showBackdrop : true;
        opts.enableBackdropDismiss = isPresent(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;
        data.opts = opts;

        var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, ModalCmp, data));

        _this._app = app;
        _this.isOverlay = true;
        return _this;
    }
    /**
     * @private
     */


    _createClass(Modal, [{
        key: "getTransitionName",
        value: function getTransitionName(direction) {
            var key = direction === 'back' ? 'modalLeave' : 'modalEnter';
            return this._nav && this._nav.config.get(key);
        }
        /**
         * @private
         * Override the load method and load our child component
         */

    }, {
        key: "loaded",
        value: function loaded(done) {
            var _this2 = this;

            // grab the instance, and proxy the ngAfterViewInit method
            var originalNgAfterViewInit = this.instance.ngAfterViewInit;
            this.instance.ngAfterViewInit = function () {
                if (originalNgAfterViewInit) {
                    originalNgAfterViewInit();
                }
                _this2.instance.loadComponent(done);
            };
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
         * DEPRECATED: Please inject ModalController instead
         */

    }], [{
        key: "create",
        value: function create(cmp, opt) {
            // deprecated warning: added beta.11 2016-06-27
            console.warn('Modal.create(..) has been deprecated. Please inject ModalController instead');
        }
    }]);

    return Modal;
}(ViewController);
/**
 * @name ModalController
 * @description
 * A Modal is a content pane that goes over the user's current page.
 * Usually it is used for making a choice or editing an item. A modal uses the
 * `NavController` to
 * {@link /docs/v2/api/components/nav/NavController/#present present}
 * itself in the root nav stack. It is added to the stack similar to how
 * {@link /docs/v2/api/components/nav/NavController/#push NavController.push}
 * works.
 *
 * When a modal (or any other overlay such as an alert or actionsheet) is
 * "presented" to a nav controller, the overlay is added to the app's root nav.
 * After the modal has been presented, from within the component instance The
 * modal can later be closed or "dismissed" by using the ViewController's
 * `dismiss` method. Additionally, you can dismiss any overlay by using `pop`
 * on the root nav controller.
 *
 * Data can be passed to a new modal through `Modal.create()` as the second
 * argument. The data can then be accessed from the opened page by injecting
 * `NavParams`. Note that the page, which opened as a modal, has no special
 * "modal" logic within it, but uses `NavParams` no differently than a
 * standard page.
 *
 * @usage
 * ```ts
 * import { ModalController, NavParams } from 'ionic-angular';
 *
 * @Component(...)
 * class HomePage {
 *
 *  constructor(public modalCtrl: ModalController) {
 *
 *  }
 *
 *  presentProfileModal() {
 *    let profileModal = this.modalCtrl.create(Profile, { userId: 8675309 });
 *    profileModal.present();
 *  }
 *
 * }
 *
 * @Component(...)
 * class Profile {
 *
 *  constructor(params: NavParams) {
 *    console.log('UserId', params.get('userId'));
 *  }
 *
 * }
 * ```
 *
 * @advanced
 *
 * | Option                | Type       | Description                                                                                                      |
 * |-----------------------|------------|------------------------------------------------------------------------------------------------------------------|
 * | showBackdrop          |`boolean`   | Whether to show the backdrop. Default true.                                                                      |
 * | enableBackdropDismiss |`boolean`   | Whether the popover should be dismissed by tapping the backdrop. Default true.                                   |
 *
 * A modal can also emit data, which is useful when it is used to add or edit
 * data. For example, a profile page could slide up in a modal, and on submit,
 * the submit button could pass the updated profile data, then dismiss the
 * modal.
 *
 * ```ts
 * import { Component } from '@angular/core';
 * import { ModalController, ViewController } from 'ionic-angular';
 *
 * @Component(...)
 * class HomePage {
 *
 *  constructor(public modalCtrl: ModalController) {
 *
 *  }
 *
 *  presentContactModal() {
 *    let contactModal = this.modalCtrl.create(ContactUs);
 *    contactModal.present();
 *  }
 *
 *  presentProfileModal() {
 *    let profileModal = this.modalCtrl.create(Profile, { userId: 8675309 });
 *    profileModal.onDidDismiss(data => {
 *      console.log(data);
 *    });
 *    profileModal.present();
 *  }
 *
 * }
 *
 * @Component(...)
 * class Profile {
 *
 *  constructor(public viewCtrl: ViewController) {
 *
 *  }
 *
 *  dismiss() {
 *    let data = { 'foo': 'bar' };
 *    this.viewCtrl.dismiss(data);
 *  }
 *
 * }
 * ```
 * @demo /docs/v2/demos/modal/
 * @see {@link /docs/v2/components#modals Modal Component Docs}
 */
export var ModalController = function () {
    function ModalController(_app) {
        _classCallCheck(this, ModalController);

        this._app = _app;
    }
    /**
     * Create a modal to display. See below for options.
     *
     * @param {object} componentType The Modal view
     * @param {object} data Any data to pass to the Modal view
     * @param {object} opts Modal options
     */


    _createClass(ModalController, [{
        key: "create",
        value: function create(componentType) {
            var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            return new Modal(this._app, componentType, data, opts);
        }
    }]);

    return ModalController;
}();
ModalController = __decorate([Injectable(), __metadata('design:paramtypes', [typeof (_a = typeof App !== 'undefined' && App) === 'function' && _a || Object])], ModalController);
var _a;