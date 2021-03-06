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
import { Component, Renderer, ElementRef, HostListener, ViewEncapsulation } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Animation } from '../../animations/animation';
import { Backdrop } from '../backdrop/backdrop';
import { Config } from '../../config/config';
import { Form } from '../../util/form';
import { Icon } from '../icon/icon';
import { Key } from '../../util/key';
import { NavParams } from '../nav/nav-params';
import { Transition } from '../../transitions/transition';
import { ViewController } from '../nav/view-controller';
/**
 * @private
 */
export var ActionSheetCmp = function () {
    function ActionSheetCmp(_viewCtrl, _config, _elementRef, _form, params, renderer) {
        _classCallCheck(this, ActionSheetCmp);

        this._viewCtrl = _viewCtrl;
        this._config = _config;
        this._elementRef = _elementRef;
        this._form = _form;
        this.d = params.data;
        if (this.d.cssClass) {
            renderer.setElementClass(_elementRef.nativeElement, this.d.cssClass, true);
        }
        this.id = ++actionSheetIds;
        if (this.d.title) {
            this.hdrId = 'acst-hdr-' + this.id;
        }
        if (this.d.subTitle) {
            this.descId = 'acst-subhdr-' + this.id;
        }
    }

    _createClass(ActionSheetCmp, [{
        key: "ionViewLoaded",
        value: function ionViewLoaded() {
            var _this = this;

            // normalize the data
            var buttons = [];
            this.d.buttons.forEach(function (button) {
                if (typeof button === 'string') {
                    button = { text: button };
                }
                if (!button.cssClass) {
                    button.cssClass = '';
                }
                if (button.role === 'cancel') {
                    _this.d.cancelButton = button;
                } else {
                    if (button.role === 'destructive') {
                        button.cssClass = (button.cssClass + ' ' || '') + 'action-sheet-destructive';
                    } else if (button.role === 'selected') {
                        button.cssClass = (button.cssClass + ' ' || '') + 'action-sheet-selected';
                    }
                    buttons.push(button);
                }
            });
            this.d.buttons = buttons;
        }
    }, {
        key: "ionViewDidEnter",
        value: function ionViewDidEnter() {
            this._form.focusOut();
            var focusableEle = this._elementRef.nativeElement.querySelector('button');
            if (focusableEle) {
                focusableEle.focus();
            }
            this.enabled = true;
        }
    }, {
        key: "_keyUp",
        value: function _keyUp(ev) {
            if (this.enabled && this._viewCtrl.isLast()) {
                if (ev.keyCode === Key.ESCAPE) {
                    console.debug('actionsheet, escape button');
                    this.bdClick();
                }
            }
        }
    }, {
        key: "click",
        value: function click(button, dismissDelay) {
            var _this2 = this;

            if (!this.enabled) {
                return;
            }
            var shouldDismiss = true;
            if (button.handler) {
                // a handler has been provided, execute it
                if (button.handler() === false) {
                    // if the return value of the handler is false then do not dismiss
                    shouldDismiss = false;
                }
            }
            if (shouldDismiss) {
                setTimeout(function () {
                    _this2.dismiss(button.role);
                }, dismissDelay || this._config.get('pageTransitionDelay'));
            }
        }
    }, {
        key: "bdClick",
        value: function bdClick() {
            if (this.enabled && this.d.enableBackdropDismiss) {
                if (this.d.cancelButton) {
                    this.click(this.d.cancelButton, 1);
                } else {
                    this.dismiss('backdrop');
                }
            }
        }
    }, {
        key: "dismiss",
        value: function dismiss(role) {
            return this._viewCtrl.dismiss(null, role);
        }
    }]);

    return ActionSheetCmp;
}();
__decorate([HostListener('body:keyup', ['$event']), __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], ActionSheetCmp.prototype, "_keyUp", null);
ActionSheetCmp = __decorate([Component({
    selector: 'ion-action-sheet',
    template: "\n    <ion-backdrop (click)=\"bdClick()\"></ion-backdrop>\n    <div class=\"action-sheet-wrapper\">\n      <div class=\"action-sheet-container\">\n        <div class=\"action-sheet-group\">\n          <div class=\"action-sheet-title\" id=\"{{hdrId}}\" *ngIf=\"d.title\">{{d.title}}</div>\n          <div class=\"action-sheet-sub-title\" id=\"{{descId}}\" *ngIf=\"d.subTitle\">{{d.subTitle}}</div>\n          <button category=\"action-sheet-button\" (click)=\"click(b)\" *ngFor=\"let b of d.buttons\" class=\"disable-hover\" [ngClass]=\"b.cssClass\">\n            <ion-icon [name]=\"b.icon\" *ngIf=\"b.icon\" class=\"action-sheet-icon\"></ion-icon>\n            {{b.text}}\n          </button>\n        </div>\n        <div class=\"action-sheet-group\" *ngIf=\"d.cancelButton\">\n          <button category=\"action-sheet-button\" (click)=\"click(d.cancelButton)\" class=\"action-sheet-cancel disable-hover\" [ngClass]=\"d.cancelButton.cssClass\">\n            <ion-icon [name]=\"d.cancelButton.icon\" *ngIf=\"d.cancelButton.icon\" class=\"action-sheet-icon\"></ion-icon>\n            {{d.cancelButton.text}}\n          </button>\n        </div>\n      </div>\n    </div>\n    ",
    directives: [Backdrop, Icon, NgClass, NgFor, NgIf],
    host: {
        'role': 'dialog',
        '[attr.aria-labelledby]': 'hdrId',
        '[attr.aria-describedby]': 'descId'
    },
    encapsulation: ViewEncapsulation.None
}), __metadata('design:paramtypes', [typeof (_a = typeof ViewController !== 'undefined' && ViewController) === 'function' && _a || Object, typeof (_b = typeof Config !== 'undefined' && Config) === 'function' && _b || Object, typeof (_c = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _c || Object, typeof (_d = typeof Form !== 'undefined' && Form) === 'function' && _d || Object, typeof (_e = typeof NavParams !== 'undefined' && NavParams) === 'function' && _e || Object, typeof (_f = typeof Renderer !== 'undefined' && Renderer) === 'function' && _f || Object])], ActionSheetCmp);

var ActionSheetSlideIn = function (_Transition) {
    _inherits(ActionSheetSlideIn, _Transition);

    function ActionSheetSlideIn(enteringView, leavingView, opts) {
        _classCallCheck(this, ActionSheetSlideIn);

        var _this3 = _possibleConstructorReturn(this, (ActionSheetSlideIn.__proto__ || Object.getPrototypeOf(ActionSheetSlideIn)).call(this, enteringView, leavingView, opts));

        var ele = enteringView.pageRef().nativeElement;
        var backdrop = new Animation(ele.querySelector('ion-backdrop'));
        var wrapper = new Animation(ele.querySelector('.action-sheet-wrapper'));
        backdrop.fromTo('opacity', 0.01, 0.4);
        wrapper.fromTo('translateY', '100%', '0%');
        _this3.easing('cubic-bezier(.36,.66,.04,1)').duration(400).add(backdrop).add(wrapper);
        return _this3;
    }

    return ActionSheetSlideIn;
}(Transition);

Transition.register('action-sheet-slide-in', ActionSheetSlideIn);

var ActionSheetSlideOut = function (_Transition2) {
    _inherits(ActionSheetSlideOut, _Transition2);

    function ActionSheetSlideOut(enteringView, leavingView, opts) {
        _classCallCheck(this, ActionSheetSlideOut);

        var _this4 = _possibleConstructorReturn(this, (ActionSheetSlideOut.__proto__ || Object.getPrototypeOf(ActionSheetSlideOut)).call(this, enteringView, leavingView, opts));

        var ele = leavingView.pageRef().nativeElement;
        var backdrop = new Animation(ele.querySelector('ion-backdrop'));
        var wrapper = new Animation(ele.querySelector('.action-sheet-wrapper'));
        backdrop.fromTo('opacity', 0.4, 0);
        wrapper.fromTo('translateY', '0%', '100%');
        _this4.easing('cubic-bezier(.36,.66,.04,1)').duration(300).add(backdrop).add(wrapper);
        return _this4;
    }

    return ActionSheetSlideOut;
}(Transition);

Transition.register('action-sheet-slide-out', ActionSheetSlideOut);

var ActionSheetMdSlideIn = function (_Transition3) {
    _inherits(ActionSheetMdSlideIn, _Transition3);

    function ActionSheetMdSlideIn(enteringView, leavingView, opts) {
        _classCallCheck(this, ActionSheetMdSlideIn);

        var _this5 = _possibleConstructorReturn(this, (ActionSheetMdSlideIn.__proto__ || Object.getPrototypeOf(ActionSheetMdSlideIn)).call(this, enteringView, leavingView, opts));

        var ele = enteringView.pageRef().nativeElement;
        var backdrop = new Animation(ele.querySelector('ion-backdrop'));
        var wrapper = new Animation(ele.querySelector('.action-sheet-wrapper'));
        backdrop.fromTo('opacity', 0.01, 0.26);
        wrapper.fromTo('translateY', '100%', '0%');
        _this5.easing('cubic-bezier(.36,.66,.04,1)').duration(400).add(backdrop).add(wrapper);
        return _this5;
    }

    return ActionSheetMdSlideIn;
}(Transition);

Transition.register('action-sheet-md-slide-in', ActionSheetMdSlideIn);

var ActionSheetMdSlideOut = function (_Transition4) {
    _inherits(ActionSheetMdSlideOut, _Transition4);

    function ActionSheetMdSlideOut(enteringView, leavingView, opts) {
        _classCallCheck(this, ActionSheetMdSlideOut);

        var _this6 = _possibleConstructorReturn(this, (ActionSheetMdSlideOut.__proto__ || Object.getPrototypeOf(ActionSheetMdSlideOut)).call(this, enteringView, leavingView, opts));

        var ele = leavingView.pageRef().nativeElement;
        var backdrop = new Animation(ele.querySelector('ion-backdrop'));
        var wrapper = new Animation(ele.querySelector('.action-sheet-wrapper'));
        backdrop.fromTo('opacity', 0.26, 0);
        wrapper.fromTo('translateY', '0%', '100%');
        _this6.easing('cubic-bezier(.36,.66,.04,1)').duration(450).add(backdrop).add(wrapper);
        return _this6;
    }

    return ActionSheetMdSlideOut;
}(Transition);

Transition.register('action-sheet-md-slide-out', ActionSheetMdSlideOut);

var ActionSheetWpSlideIn = function (_Transition5) {
    _inherits(ActionSheetWpSlideIn, _Transition5);

    function ActionSheetWpSlideIn(enteringView, leavingView, opts) {
        _classCallCheck(this, ActionSheetWpSlideIn);

        var _this7 = _possibleConstructorReturn(this, (ActionSheetWpSlideIn.__proto__ || Object.getPrototypeOf(ActionSheetWpSlideIn)).call(this, enteringView, leavingView, opts));

        var ele = enteringView.pageRef().nativeElement;
        var backdrop = new Animation(ele.querySelector('ion-backdrop'));
        var wrapper = new Animation(ele.querySelector('.action-sheet-wrapper'));
        backdrop.fromTo('opacity', 0.01, 0.16);
        wrapper.fromTo('translateY', '100%', '0%');
        _this7.easing('cubic-bezier(.36,.66,.04,1)').duration(400).add(backdrop).add(wrapper);
        return _this7;
    }

    return ActionSheetWpSlideIn;
}(Transition);

Transition.register('action-sheet-wp-slide-in', ActionSheetWpSlideIn);

var ActionSheetWpSlideOut = function (_Transition6) {
    _inherits(ActionSheetWpSlideOut, _Transition6);

    function ActionSheetWpSlideOut(enteringView, leavingView, opts) {
        _classCallCheck(this, ActionSheetWpSlideOut);

        var _this8 = _possibleConstructorReturn(this, (ActionSheetWpSlideOut.__proto__ || Object.getPrototypeOf(ActionSheetWpSlideOut)).call(this, enteringView, leavingView, opts));

        var ele = leavingView.pageRef().nativeElement;
        var backdrop = new Animation(ele.querySelector('ion-backdrop'));
        var wrapper = new Animation(ele.querySelector('.action-sheet-wrapper'));
        backdrop.fromTo('opacity', 0.1, 0);
        wrapper.fromTo('translateY', '0%', '100%');
        _this8.easing('cubic-bezier(.36,.66,.04,1)').duration(450).add(backdrop).add(wrapper);
        return _this8;
    }

    return ActionSheetWpSlideOut;
}(Transition);

Transition.register('action-sheet-wp-slide-out', ActionSheetWpSlideOut);
var actionSheetIds = -1;
var _a, _b, _c, _d, _e, _f;