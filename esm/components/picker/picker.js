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
import { EventEmitter, Injectable, Output } from '@angular/core';
import { App } from '../app/app';
import { isPresent } from '../../util/util';
import { PickerCmp } from './picker-component';
import { ViewController } from '../nav/view-controller';
/**
 * @private
 */
export var Picker = function (_ViewController) {
    _inherits(Picker, _ViewController);

    function Picker(app) {
        var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, Picker);

        opts.columns = opts.columns || [];
        opts.buttons = opts.buttons || [];
        opts.enableBackdropDismiss = isPresent(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;

        var _this = _possibleConstructorReturn(this, (Picker.__proto__ || Object.getPrototypeOf(Picker)).call(this, PickerCmp, opts));

        _this._app = app;
        _this.isOverlay = true;
        _this.ionChange = new EventEmitter();
        // by default, pickers should not fire lifecycle events of other views
        // for example, when an picker enters, the current active view should
        // not fire its lifecycle events because it's not conceptually leaving
        _this.fireOtherLifecycles = false;
        return _this;
    }
    /**
    * @private
    */


    _createClass(Picker, [{
        key: "getTransitionName",
        value: function getTransitionName(direction) {
            var key = direction === 'back' ? 'pickerLeave' : 'pickerEnter';
            return this._nav && this._nav.config.get(key);
        }
        /**
         * @param {any} button Picker toolbar button
         */

    }, {
        key: "addButton",
        value: function addButton(button) {
            this.data.buttons.push(button);
        }
        /**
         * @param {any} button Picker toolbar button
         */

    }, {
        key: "addColumn",
        value: function addColumn(column) {
            this.data.columns.push(column);
        }
    }, {
        key: "getColumns",
        value: function getColumns() {
            return this.data.columns;
        }
    }, {
        key: "refresh",
        value: function refresh() {
            this.instance.refresh && this.instance.refresh();
        }
        /**
         * @param {string} cssClass CSS class name to add to the picker's outer wrapper.
         */

    }, {
        key: "setCssClass",
        value: function setCssClass(cssClass) {
            this.data.cssClass = cssClass;
        }
        /**
         * Present the picker instance.
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
         * DEPRECATED: Please inject PickerController instead
         */

    }], [{
        key: "create",
        value: function create(opt) {
            // deprecated warning: added beta.11 2016-06-27
            console.warn('Picker.create(..) has been deprecated. Please inject PickerController instead');
        }
    }]);

    return Picker;
}(ViewController);
__decorate([Output(), __metadata('design:type', typeof (_a = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _a || Object)], Picker.prototype, "ionChange", void 0);
/**
 * @private
 * @name PickerController
 * @description
 *
 */
export var PickerController = function () {
    function PickerController(_app) {
        _classCallCheck(this, PickerController);

        this._app = _app;
    }
    /**
     * Open a picker.
     */


    _createClass(PickerController, [{
        key: "create",
        value: function create() {
            var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            return new Picker(this._app, opts);
        }
    }]);

    return PickerController;
}();
PickerController = __decorate([Injectable(), __metadata('design:paramtypes', [typeof (_b = typeof App !== 'undefined' && App) === 'function' && _b || Object])], PickerController);
var _a, _b;