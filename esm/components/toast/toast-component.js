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
import { Component, ElementRef, Renderer } from '@angular/core';
import { NgIf } from '@angular/common';
import { Animation } from '../../animations/animation';
import { Config } from '../../config/config';
import { NavParams } from '../nav/nav-params';
import { Transition } from '../../transitions/transition';
import { ViewController } from '../nav/view-controller';
/**
* @private
*/
export var ToastCmp = function () {
    function ToastCmp(_viewCtrl, _config, _elementRef, params, renderer) {
        _classCallCheck(this, ToastCmp);

        this._viewCtrl = _viewCtrl;
        this._config = _config;
        this._elementRef = _elementRef;
        this.dismissTimeout = undefined;
        this.d = params.data;
        if (this.d.cssClass) {
            renderer.setElementClass(_elementRef.nativeElement, this.d.cssClass, true);
        }
        this.id = ++toastIds;
        if (this.d.message) {
            this.hdrId = 'toast-hdr-' + this.id;
        }
    }

    _createClass(ToastCmp, [{
        key: "ngAfterViewInit",
        value: function ngAfterViewInit() {
            var _this = this;

            // if there's a `duration` set, automatically dismiss.
            if (this.d.duration) {
                this.dismissTimeout = setTimeout(function () {
                    _this.dismiss('backdrop');
                }, this.d.duration);
            }
            this.enabled = true;
        }
    }, {
        key: "ionViewDidEnter",
        value: function ionViewDidEnter() {
            var _document = document;
            var activeElement = _document.activeElement;

            if (activeElement) {
                activeElement.blur();
            }
            var focusableEle = this._elementRef.nativeElement.querySelector('button');
            if (focusableEle) {
                focusableEle.focus();
            }
        }
    }, {
        key: "cbClick",
        value: function cbClick() {
            if (this.enabled) {
                this.dismiss('close');
            }
        }
    }, {
        key: "dismiss",
        value: function dismiss(role) {
            clearTimeout(this.dismissTimeout);
            this.dismissTimeout = undefined;
            return this._viewCtrl.dismiss(null, role);
        }
    }]);

    return ToastCmp;
}();
ToastCmp = __decorate([Component({
    selector: 'ion-toast',
    template: "\n    <div class=\"toast-wrapper\"\n      [class.toast-bottom]=\"d.position === 'bottom'\"\n      [class.toast-middle]=\"d.position === 'middle'\"\n      [class.toast-top]=\"d.position === 'top'\">\n      <div class=\"toast-container\">\n        <div class=\"toast-message\" id=\"{{hdrId}}\" *ngIf=\"d.message\">{{d.message}}</div>\n        <button clear class=\"toast-button\" *ngIf=\"d.showCloseButton\" (click)=\"cbClick()\">\n          {{ d.closeButtonText || 'Close' }}\n         </button>\n      </div>\n    </div>\n  ",
    directives: [NgIf],
    host: {
        'role': 'dialog',
        '[attr.aria-labelledby]': 'hdrId',
        '[attr.aria-describedby]': 'descId'
    }
}), __metadata('design:paramtypes', [typeof (_a = typeof ViewController !== 'undefined' && ViewController) === 'function' && _a || Object, typeof (_b = typeof Config !== 'undefined' && Config) === 'function' && _b || Object, typeof (_c = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _c || Object, typeof (_d = typeof NavParams !== 'undefined' && NavParams) === 'function' && _d || Object, typeof (_e = typeof Renderer !== 'undefined' && Renderer) === 'function' && _e || Object])], ToastCmp);

var ToastSlideIn = function (_Transition) {
    _inherits(ToastSlideIn, _Transition);

    function ToastSlideIn(enteringView, leavingView, opts) {
        _classCallCheck(this, ToastSlideIn);

        // DOM READS
        var _this2 = _possibleConstructorReturn(this, (ToastSlideIn.__proto__ || Object.getPrototypeOf(ToastSlideIn)).call(this, enteringView, leavingView, opts));

        var ele = enteringView.pageRef().nativeElement;
        var wrapperEle = ele.querySelector('.toast-wrapper');
        var wrapper = new Animation(wrapperEle);
        if (enteringView.data && enteringView.data.position === TOAST_POSITION_TOP) {
            // top
            // by default, it is -100% hidden (above the screen)
            // so move from that to 10px below top: 0px;
            wrapper.fromTo('translateY', '-100%', 10 + "px");
        } else if (enteringView.data && enteringView.data.position === TOAST_POSITION_MIDDLE) {
            // Middle
            // just center it and fade it in
            var topPosition = Math.floor(ele.clientHeight / 2 - wrapperEle.clientHeight / 2);
            // DOM WRITE
            wrapperEle.style.top = topPosition + "px";
            wrapper.fromTo('opacity', 0.01, 1);
        } else {
            // bottom
            // by default, it is 100% hidden (below the screen),
            // so move from that to 10 px above bottom: 0px
            wrapper.fromTo('translateY', '100%', 0 - 10 + "px");
        }
        _this2.easing('cubic-bezier(.36,.66,.04,1)').duration(400).add(wrapper);
        return _this2;
    }

    return ToastSlideIn;
}(Transition);

var ToastSlideOut = function (_Transition2) {
    _inherits(ToastSlideOut, _Transition2);

    function ToastSlideOut(enteringView, leavingView, opts) {
        _classCallCheck(this, ToastSlideOut);

        var _this3 = _possibleConstructorReturn(this, (ToastSlideOut.__proto__ || Object.getPrototypeOf(ToastSlideOut)).call(this, enteringView, leavingView, opts));

        var ele = leavingView.pageRef().nativeElement;
        var wrapperEle = ele.querySelector('.toast-wrapper');
        var wrapper = new Animation(wrapperEle);
        if (leavingView.data && leavingView.data.position === TOAST_POSITION_TOP) {
            // top
            // reverse arguments from enter transition
            wrapper.fromTo('translateY', 10 + "px", '-100%');
        } else if (leavingView.data && leavingView.data.position === TOAST_POSITION_MIDDLE) {
            // Middle
            // just fade it out
            wrapper.fromTo('opacity', 0.99, 0);
        } else {
            // bottom
            // reverse arguments from enter transition
            wrapper.fromTo('translateY', 0 - 10 + "px", '100%');
        }
        _this3.easing('cubic-bezier(.36,.66,.04,1)').duration(300).add(wrapper);
        return _this3;
    }

    return ToastSlideOut;
}(Transition);

var ToastMdSlideIn = function (_Transition3) {
    _inherits(ToastMdSlideIn, _Transition3);

    function ToastMdSlideIn(enteringView, leavingView, opts) {
        _classCallCheck(this, ToastMdSlideIn);

        // DOM reads
        var _this4 = _possibleConstructorReturn(this, (ToastMdSlideIn.__proto__ || Object.getPrototypeOf(ToastMdSlideIn)).call(this, enteringView, leavingView, opts));

        var ele = enteringView.pageRef().nativeElement;
        var wrapperEle = ele.querySelector('.toast-wrapper');
        var wrapper = new Animation(wrapperEle);
        if (enteringView.data && enteringView.data.position === TOAST_POSITION_TOP) {
            // top
            // by default, it is -100% hidden (above the screen)
            // so move from that to top: 0px;
            wrapper.fromTo('translateY', '-100%', "0%");
        } else if (enteringView.data && enteringView.data.position === TOAST_POSITION_MIDDLE) {
            // Middle
            // just center it and fade it in
            var topPosition = Math.floor(ele.clientHeight / 2 - wrapperEle.clientHeight / 2);
            // DOM WRITE
            wrapperEle.style.top = topPosition + "px";
            wrapper.fromTo('opacity', 0.01, 1);
        } else {
            // bottom
            // by default, it is 100% hidden (below the screen),
            // so move from that to bottom: 0px
            wrapper.fromTo('translateY', '100%', "0%");
        }
        _this4.easing('cubic-bezier(.36,.66,.04,1)').duration(400).add(wrapper);
        return _this4;
    }

    return ToastMdSlideIn;
}(Transition);

var ToastMdSlideOut = function (_Transition4) {
    _inherits(ToastMdSlideOut, _Transition4);

    function ToastMdSlideOut(enteringView, leavingView, opts) {
        _classCallCheck(this, ToastMdSlideOut);

        var _this5 = _possibleConstructorReturn(this, (ToastMdSlideOut.__proto__ || Object.getPrototypeOf(ToastMdSlideOut)).call(this, enteringView, leavingView, opts));

        var ele = leavingView.pageRef().nativeElement;
        var wrapperEle = ele.querySelector('.toast-wrapper');
        var wrapper = new Animation(wrapperEle);
        if (leavingView.data && leavingView.data.position === TOAST_POSITION_TOP) {
            // top
            // reverse arguments from enter transition
            wrapper.fromTo('translateY', 0 + "%", '-100%');
        } else if (leavingView.data && leavingView.data.position === TOAST_POSITION_MIDDLE) {
            // Middle
            // just fade it out
            wrapper.fromTo('opacity', 0.99, 0);
        } else {
            // bottom
            // reverse arguments from enter transition
            wrapper.fromTo('translateY', 0 + "%", '100%');
        }
        _this5.easing('cubic-bezier(.36,.66,.04,1)').duration(450).add(wrapper);
        return _this5;
    }

    return ToastMdSlideOut;
}(Transition);

var ToastWpPopIn = function (_Transition5) {
    _inherits(ToastWpPopIn, _Transition5);

    function ToastWpPopIn(enteringView, leavingView, opts) {
        _classCallCheck(this, ToastWpPopIn);

        var _this6 = _possibleConstructorReturn(this, (ToastWpPopIn.__proto__ || Object.getPrototypeOf(ToastWpPopIn)).call(this, enteringView, leavingView, opts));

        var ele = enteringView.pageRef().nativeElement;
        var wrapperEle = ele.querySelector('.toast-wrapper');
        var wrapper = new Animation(wrapperEle);
        if (enteringView.data && enteringView.data.position === TOAST_POSITION_TOP) {
            // top
            wrapper.fromTo('opacity', 0.01, 1);
            wrapper.fromTo('scale', 1.3, 1);
        } else if (enteringView.data && enteringView.data.position === TOAST_POSITION_MIDDLE) {
            // Middle
            // just center it and fade it in
            var topPosition = Math.floor(ele.clientHeight / 2 - wrapperEle.clientHeight / 2);
            // DOM WRITE
            wrapperEle.style.top = topPosition + "px";
            wrapper.fromTo('opacity', 0.01, 1);
            wrapper.fromTo('scale', 1.3, 1);
        } else {
            // bottom
            wrapper.fromTo('opacity', 0.01, 1);
            wrapper.fromTo('scale', 1.3, 1);
        }
        _this6.easing('cubic-bezier(0,0 0.05,1)').duration(200).add(wrapper);
        return _this6;
    }

    return ToastWpPopIn;
}(Transition);

var ToastWpPopOut = function (_Transition6) {
    _inherits(ToastWpPopOut, _Transition6);

    function ToastWpPopOut(enteringView, leavingView, opts) {
        _classCallCheck(this, ToastWpPopOut);

        // DOM reads
        var _this7 = _possibleConstructorReturn(this, (ToastWpPopOut.__proto__ || Object.getPrototypeOf(ToastWpPopOut)).call(this, enteringView, leavingView, opts));

        var ele = leavingView.pageRef().nativeElement;
        var wrapperEle = ele.querySelector('.toast-wrapper');
        var wrapper = new Animation(wrapperEle);
        if (leavingView.data && leavingView.data.position === TOAST_POSITION_TOP) {
            // top
            // reverse arguments from enter transition
            wrapper.fromTo('opacity', 0.99, 0);
            wrapper.fromTo('scale', 1, 1.3);
        } else if (leavingView.data && leavingView.data.position === TOAST_POSITION_MIDDLE) {
            // Middle
            // just fade it out
            wrapper.fromTo('opacity', 0.99, 0);
            wrapper.fromTo('scale', 1, 1.3);
        } else {
            // bottom
            // reverse arguments from enter transition
            wrapper.fromTo('opacity', 0.99, 0);
            wrapper.fromTo('scale', 1, 1.3);
        }
        // DOM writes
        var EASE = 'ease-out';
        var DURATION = 150;
        _this7.easing(EASE).duration(DURATION).add(wrapper);
        return _this7;
    }

    return ToastWpPopOut;
}(Transition);

Transition.register('toast-slide-in', ToastSlideIn);
Transition.register('toast-slide-out', ToastSlideOut);
Transition.register('toast-md-slide-in', ToastMdSlideIn);
Transition.register('toast-md-slide-out', ToastMdSlideOut);
Transition.register('toast-wp-slide-out', ToastWpPopOut);
Transition.register('toast-wp-slide-in', ToastWpPopIn);
var toastIds = -1;
var TOAST_POSITION_TOP = 'top';
var TOAST_POSITION_MIDDLE = 'middle';
var TOAST_POSITION_BOTTOM = 'bottom';
var _a, _b, _c, _d, _e;