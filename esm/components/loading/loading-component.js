var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
import { Component, ElementRef, Renderer, ViewEncapsulation } from '@angular/core';
import { NgIf } from '@angular/common';
import { Animation } from '../../animations/animation';
import { Backdrop } from '../backdrop/backdrop';
import { Config } from '../../config/config';
import { isDefined, isUndefined } from '../../util/util';
import { NavParams } from '../nav/nav-params';
import { Spinner } from '../spinner/spinner';
import { Transition } from '../../transitions/transition';
import { ViewController } from '../nav/view-controller';
/**
* @private
*/
export var LoadingCmp = function () {
    function LoadingCmp(_viewCtrl, _config, _elementRef, params, renderer) {
        _classCallCheck(this, LoadingCmp);

        this._viewCtrl = _viewCtrl;
        this._config = _config;
        this._elementRef = _elementRef;
        this.d = params.data;
        if (this.d.cssClass) {
            renderer.setElementClass(_elementRef.nativeElement, this.d.cssClass, true);
        }
        this.id = ++loadingIds;
    }

    _createClass(LoadingCmp, [{
        key: "ngOnInit",
        value: function ngOnInit() {
            // If no spinner was passed in loading options we need to fall back
            // to the loadingSpinner in the app's config, then the mode spinner
            if (isUndefined(this.d.spinner)) {
                this.d.spinner = this._config.get('loadingSpinner', this._config.get('spinner', 'ios'));
            }
            // If the user passed hide to the spinner we don't want to show it
            this.showSpinner = isDefined(this.d.spinner) && this.d.spinner !== 'hide';
        }
    }, {
        key: "ionViewDidEnter",
        value: function ionViewDidEnter() {
            var _this = this;

            var activeElement = document.activeElement;
            if (document.activeElement) {
                activeElement.blur();
            }
            // If there is a duration, dismiss after that amount of time
            this.d.duration ? this.durationTimeout = setTimeout(function () {
                return _this.dismiss('backdrop');
            }, this.d.duration) : null;
        }
    }, {
        key: "dismiss",
        value: function dismiss(role) {
            if (this.durationTimeout) {
                clearTimeout(this.durationTimeout);
            }
            return this._viewCtrl.dismiss(null, role);
        }
    }]);

    return LoadingCmp;
}();
LoadingCmp = __decorate([Component({
    selector: 'ion-loading',
    template: "\n    <ion-backdrop [class.hide-backdrop]=\"!d.showBackdrop\"></ion-backdrop>\n    <div class=\"loading-wrapper\">\n      <div *ngIf=\"showSpinner\" class=\"loading-spinner\">\n        <ion-spinner [name]=\"d.spinner\"></ion-spinner>\n      </div>\n      <div *ngIf=\"d.content\" [innerHTML]=\"d.content\" class=\"loading-content\"></div>\n    </div>\n  ",
    directives: [Backdrop, NgIf, Spinner],
    host: {
        'role': 'dialog'
    },
    encapsulation: ViewEncapsulation.None
}), __metadata('design:paramtypes', [typeof (_a = typeof ViewController !== 'undefined' && ViewController) === 'function' && _a || Object, typeof (_b = typeof Config !== 'undefined' && Config) === 'function' && _b || Object, typeof (_c = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _c || Object, typeof (_d = typeof NavParams !== 'undefined' && NavParams) === 'function' && _d || Object, typeof (_e = typeof Renderer !== 'undefined' && Renderer) === 'function' && _e || Object])], LoadingCmp);
/**
 * Animations for loading
 */

var LoadingPopIn = function (_Transition) {
    _inherits(LoadingPopIn, _Transition);

    function LoadingPopIn(enteringView, leavingView, opts) {
        _classCallCheck(this, LoadingPopIn);

        var _this2 = _possibleConstructorReturn(this, (LoadingPopIn.__proto__ || Object.getPrototypeOf(LoadingPopIn)).call(this, enteringView, leavingView, opts));

        var ele = enteringView.pageRef().nativeElement;
        var backdrop = new Animation(ele.querySelector('ion-backdrop'));
        var wrapper = new Animation(ele.querySelector('.loading-wrapper'));
        wrapper.fromTo('opacity', 0.01, 1).fromTo('scale', 1.1, 1);
        backdrop.fromTo('opacity', 0.01, 0.3);
        _this2.easing('ease-in-out').duration(200).add(backdrop).add(wrapper);
        return _this2;
    }

    return LoadingPopIn;
}(Transition);

Transition.register('loading-pop-in', LoadingPopIn);

var LoadingPopOut = function (_Transition2) {
    _inherits(LoadingPopOut, _Transition2);

    function LoadingPopOut(enteringView, leavingView, opts) {
        _classCallCheck(this, LoadingPopOut);

        var _this3 = _possibleConstructorReturn(this, (LoadingPopOut.__proto__ || Object.getPrototypeOf(LoadingPopOut)).call(this, enteringView, leavingView, opts));

        var ele = leavingView.pageRef().nativeElement;
        var backdrop = new Animation(ele.querySelector('ion-backdrop'));
        var wrapper = new Animation(ele.querySelector('.loading-wrapper'));
        wrapper.fromTo('opacity', 0.99, 0).fromTo('scale', 1, 0.9);
        backdrop.fromTo('opacity', 0.3, 0);
        _this3.easing('ease-in-out').duration(200).add(backdrop).add(wrapper);
        return _this3;
    }

    return LoadingPopOut;
}(Transition);

Transition.register('loading-pop-out', LoadingPopOut);

var LoadingMdPopIn = function (_Transition3) {
    _inherits(LoadingMdPopIn, _Transition3);

    function LoadingMdPopIn(enteringView, leavingView, opts) {
        _classCallCheck(this, LoadingMdPopIn);

        var _this4 = _possibleConstructorReturn(this, (LoadingMdPopIn.__proto__ || Object.getPrototypeOf(LoadingMdPopIn)).call(this, enteringView, leavingView, opts));

        var ele = enteringView.pageRef().nativeElement;
        var backdrop = new Animation(ele.querySelector('ion-backdrop'));
        var wrapper = new Animation(ele.querySelector('.loading-wrapper'));
        wrapper.fromTo('opacity', 0.01, 1).fromTo('scale', 1.1, 1);
        backdrop.fromTo('opacity', 0.01, 0.5);
        _this4.easing('ease-in-out').duration(200).add(backdrop).add(wrapper);
        return _this4;
    }

    return LoadingMdPopIn;
}(Transition);

Transition.register('loading-md-pop-in', LoadingMdPopIn);

var LoadingMdPopOut = function (_Transition4) {
    _inherits(LoadingMdPopOut, _Transition4);

    function LoadingMdPopOut(enteringView, leavingView, opts) {
        _classCallCheck(this, LoadingMdPopOut);

        var _this5 = _possibleConstructorReturn(this, (LoadingMdPopOut.__proto__ || Object.getPrototypeOf(LoadingMdPopOut)).call(this, enteringView, leavingView, opts));

        var ele = leavingView.pageRef().nativeElement;
        var backdrop = new Animation(ele.querySelector('ion-backdrop'));
        var wrapper = new Animation(ele.querySelector('.loading-wrapper'));
        wrapper.fromTo('opacity', 0.99, 0).fromTo('scale', 1, 0.9);
        backdrop.fromTo('opacity', 0.5, 0);
        _this5.easing('ease-in-out').duration(200).add(backdrop).add(wrapper);
        return _this5;
    }

    return LoadingMdPopOut;
}(Transition);

Transition.register('loading-md-pop-out', LoadingMdPopOut);

var LoadingWpPopIn = function (_Transition5) {
    _inherits(LoadingWpPopIn, _Transition5);

    function LoadingWpPopIn(enteringView, leavingView, opts) {
        _classCallCheck(this, LoadingWpPopIn);

        var _this6 = _possibleConstructorReturn(this, (LoadingWpPopIn.__proto__ || Object.getPrototypeOf(LoadingWpPopIn)).call(this, enteringView, leavingView, opts));

        var ele = enteringView.pageRef().nativeElement;
        var backdrop = new Animation(ele.querySelector('ion-backdrop'));
        var wrapper = new Animation(ele.querySelector('.loading-wrapper'));
        wrapper.fromTo('opacity', 0.01, 1).fromTo('scale', 1.3, 1);
        backdrop.fromTo('opacity', 0.01, 0.16);
        _this6.easing('cubic-bezier(0,0 0.05,1)').duration(200).add(backdrop).add(wrapper);
        return _this6;
    }

    return LoadingWpPopIn;
}(Transition);

Transition.register('loading-wp-pop-in', LoadingWpPopIn);

var LoadingWpPopOut = function (_Transition6) {
    _inherits(LoadingWpPopOut, _Transition6);

    function LoadingWpPopOut(enteringView, leavingView, opts) {
        _classCallCheck(this, LoadingWpPopOut);

        var _this7 = _possibleConstructorReturn(this, (LoadingWpPopOut.__proto__ || Object.getPrototypeOf(LoadingWpPopOut)).call(this, enteringView, leavingView, opts));

        var ele = leavingView.pageRef().nativeElement;
        var backdrop = new Animation(ele.querySelector('ion-backdrop'));
        var wrapper = new Animation(ele.querySelector('.loading-wrapper'));
        wrapper.fromTo('opacity', 0.99, 0).fromTo('scale', 1, 1.3);
        backdrop.fromTo('opacity', 0.16, 0);
        _this7.easing('ease-out').duration(150).add(backdrop).add(wrapper);
        return _this7;
    }

    return LoadingWpPopOut;
}(Transition);

Transition.register('loading-wp-pop-out', LoadingWpPopOut);
var loadingIds = -1;
var _a, _b, _c, _d, _e;