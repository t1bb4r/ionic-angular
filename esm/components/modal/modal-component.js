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
import { Component, ComponentResolver, HostListener, Renderer, ViewChild, ViewContainerRef } from '@angular/core';
import { addSelector } from '../../config/bootstrap';
import { Animation } from '../../animations/animation';
import { Backdrop } from '../backdrop/backdrop';
import { Key } from '../../util/key';
import { NavParams } from '../nav/nav-params';
import { pascalCaseToDashCase } from '../../util/util';
import { PageTransition } from '../../transitions/page-transition';
import { ViewController } from '../nav/view-controller';
import { windowDimensions } from '../../util/dom';
/**
 * @private
 */
export var ModalCmp = function () {
    function ModalCmp(_compiler, _renderer, _navParams, _viewCtrl) {
        _classCallCheck(this, ModalCmp);

        this._compiler = _compiler;
        this._renderer = _renderer;
        this._navParams = _navParams;
        this._viewCtrl = _viewCtrl;
        this.d = _navParams.data.opts;
    }

    _createClass(ModalCmp, [{
        key: "loadComponent",
        value: function loadComponent(done) {
            var _this = this;

            var componentType = this._navParams.data.componentType;
            addSelector(componentType, 'ion-page');
            this._compiler.resolveComponent(componentType).then(function (componentFactory) {
                var componentRef = _this.viewport.createComponent(componentFactory, _this.viewport.length, _this.viewport.parentInjector);
                _this._renderer.setElementClass(componentRef.location.nativeElement, 'show-page', true);
                // auto-add page css className created from component JS class name
                var cssClassName = pascalCaseToDashCase(componentType.name);
                _this._renderer.setElementClass(componentRef.location.nativeElement, cssClassName, true);
                _this._viewCtrl.setInstance(componentRef.instance);
                _this.enabled = true;
                done();
            });
        }
    }, {
        key: "ngAfterViewInit",
        value: function ngAfterViewInit() {
            // intentionally kept empty
        }
    }, {
        key: "dismiss",
        value: function dismiss(role) {
            return this._viewCtrl.dismiss(null, role);
        }
    }, {
        key: "bdClick",
        value: function bdClick() {
            if (this.enabled && this.d.enableBackdropDismiss) {
                this.dismiss('backdrop');
            }
        }
    }, {
        key: "_keyUp",
        value: function _keyUp(ev) {
            if (this.enabled && this._viewCtrl.isLast() && ev.keyCode === Key.ESCAPE) {
                this.bdClick();
            }
        }
    }]);

    return ModalCmp;
}();
__decorate([ViewChild('viewport', { read: ViewContainerRef }), __metadata('design:type', typeof (_a = typeof ViewContainerRef !== 'undefined' && ViewContainerRef) === 'function' && _a || Object)], ModalCmp.prototype, "viewport", void 0);
__decorate([HostListener('body:keyup', ['$event']), __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], ModalCmp.prototype, "_keyUp", null);
ModalCmp = __decorate([Component({
    selector: 'ion-modal',
    template: "\n    <ion-backdrop disableScroll=\"false\" (click)=\"bdClick($event)\"></ion-backdrop>\n    <div class=\"modal-wrapper\">\n      <div #viewport nav-viewport></div>\n    </div>\n  ",
    directives: [Backdrop]
}), __metadata('design:paramtypes', [typeof (_b = typeof ComponentResolver !== 'undefined' && ComponentResolver) === 'function' && _b || Object, typeof (_c = typeof Renderer !== 'undefined' && Renderer) === 'function' && _c || Object, typeof (_d = typeof NavParams !== 'undefined' && NavParams) === 'function' && _d || Object, typeof (_e = typeof ViewController !== 'undefined' && ViewController) === 'function' && _e || Object])], ModalCmp);
/**
 * Animations for modals
 */

var ModalSlideIn = function (_PageTransition) {
    _inherits(ModalSlideIn, _PageTransition);

    function ModalSlideIn(enteringView, leavingView, opts) {
        _classCallCheck(this, ModalSlideIn);

        var _this2 = _possibleConstructorReturn(this, (ModalSlideIn.__proto__ || Object.getPrototypeOf(ModalSlideIn)).call(this, enteringView, leavingView, opts));

        var ele = enteringView.pageRef().nativeElement;
        var backdropEle = ele.querySelector('ion-backdrop');
        var backdrop = new Animation(backdropEle);
        var wrapper = new Animation(ele.querySelector('.modal-wrapper'));
        backdrop.fromTo('opacity', 0.01, 0.4);
        wrapper.fromTo('translateY', '100%', '0%');
        _this2.element(enteringView.pageRef()).easing('cubic-bezier(0.36,0.66,0.04,1)').duration(400).add(backdrop).add(wrapper);
        if (enteringView.hasNavbar()) {
            // entering page has a navbar
            var enteringNavBar = new Animation(enteringView.navbarRef());
            enteringNavBar.before.addClass('show-navbar');
            _this2.add(enteringNavBar);
        }
        return _this2;
    }

    return ModalSlideIn;
}(PageTransition);

PageTransition.register('modal-slide-in', ModalSlideIn);

var ModalSlideOut = function (_PageTransition2) {
    _inherits(ModalSlideOut, _PageTransition2);

    function ModalSlideOut(enteringView, leavingView, opts) {
        _classCallCheck(this, ModalSlideOut);

        var _this3 = _possibleConstructorReturn(this, (ModalSlideOut.__proto__ || Object.getPrototypeOf(ModalSlideOut)).call(this, enteringView, leavingView, opts));

        var ele = leavingView.pageRef().nativeElement;
        var backdrop = new Animation(ele.querySelector('ion-backdrop'));
        var wrapperEle = ele.querySelector('.modal-wrapper');
        var wrapperEleRect = wrapperEle.getBoundingClientRect();
        var wrapper = new Animation(wrapperEle);
        // height of the screen - top of the container tells us how much to scoot it down
        // so it's off-screen
        var screenDimensions = windowDimensions();
        wrapper.fromTo('translateY', '0px', screenDimensions.height - wrapperEleRect.top + "px");
        backdrop.fromTo('opacity', 0.4, 0.0);
        _this3.element(leavingView.pageRef()).easing('ease-out').duration(250).add(backdrop).add(wrapper);
        return _this3;
    }

    return ModalSlideOut;
}(PageTransition);

PageTransition.register('modal-slide-out', ModalSlideOut);

var ModalMDSlideIn = function (_PageTransition3) {
    _inherits(ModalMDSlideIn, _PageTransition3);

    function ModalMDSlideIn(enteringView, leavingView, opts) {
        _classCallCheck(this, ModalMDSlideIn);

        var _this4 = _possibleConstructorReturn(this, (ModalMDSlideIn.__proto__ || Object.getPrototypeOf(ModalMDSlideIn)).call(this, enteringView, leavingView, opts));

        var ele = enteringView.pageRef().nativeElement;
        var backdrop = new Animation(ele.querySelector('ion-backdrop'));
        var wrapper = new Animation(ele.querySelector('.modal-wrapper'));
        backdrop.fromTo('opacity', 0.01, 0.4);
        wrapper.fromTo('translateY', '40px', '0px');
        wrapper.fromTo('opacity', 0.01, 1);
        var DURATION = 280;
        var EASING = 'cubic-bezier(0.36,0.66,0.04,1)';
        _this4.element(enteringView.pageRef()).easing(EASING).duration(DURATION).add(backdrop).add(wrapper);
        if (enteringView.hasNavbar()) {
            // entering page has a navbar
            var enteringNavBar = new Animation(enteringView.navbarRef());
            enteringNavBar.before.addClass('show-navbar');
            _this4.add(enteringNavBar);
        }
        return _this4;
    }

    return ModalMDSlideIn;
}(PageTransition);

PageTransition.register('modal-md-slide-in', ModalMDSlideIn);

var ModalMDSlideOut = function (_PageTransition4) {
    _inherits(ModalMDSlideOut, _PageTransition4);

    function ModalMDSlideOut(enteringView, leavingView, opts) {
        _classCallCheck(this, ModalMDSlideOut);

        var _this5 = _possibleConstructorReturn(this, (ModalMDSlideOut.__proto__ || Object.getPrototypeOf(ModalMDSlideOut)).call(this, enteringView, leavingView, opts));

        var ele = leavingView.pageRef().nativeElement;
        var backdrop = new Animation(ele.querySelector('ion-backdrop'));
        var wrapper = new Animation(ele.querySelector('.modal-wrapper'));
        backdrop.fromTo('opacity', 0.4, 0.0);
        wrapper.fromTo('translateY', '0px', '40px');
        wrapper.fromTo('opacity', 0.99, 0);
        _this5.element(leavingView.pageRef()).duration(200).easing('cubic-bezier(0.47,0,0.745,0.715)').add(wrapper).add(backdrop);
        return _this5;
    }

    return ModalMDSlideOut;
}(PageTransition);

PageTransition.register('modal-md-slide-out', ModalMDSlideOut);
var _a, _b, _c, _d, _e;