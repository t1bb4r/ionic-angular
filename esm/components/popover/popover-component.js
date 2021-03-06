var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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
import { Component, ComponentResolver, ElementRef, HostListener, Renderer, ViewChild, ViewContainerRef } from '@angular/core';
import { addSelector } from '../../config/bootstrap';
import { Animation } from '../../animations/animation';
import { Backdrop } from '../backdrop/backdrop';
import { Config } from '../../config/config';
import { CSS, nativeRaf } from '../../util/dom';
import { Key } from '../../util/key';
import { NavParams } from '../nav/nav-params';
import { PageTransition } from '../../transitions/page-transition';
import { ViewController } from '../nav/view-controller';
/**
 * @private
 */
export var PopoverCmp = function () {
    function PopoverCmp(_compiler, _elementRef, _renderer, _config, _navParams, _viewCtrl) {
        _classCallCheck(this, PopoverCmp);

        this._compiler = _compiler;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._config = _config;
        this._navParams = _navParams;
        this._viewCtrl = _viewCtrl;
        this.d = _navParams.data.opts;
        if (this.d.cssClass) {
            _renderer.setElementClass(_elementRef.nativeElement, this.d.cssClass, true);
        }
        this.id = ++popoverIds;
    }

    _createClass(PopoverCmp, [{
        key: "ionViewWillEnter",
        value: function ionViewWillEnter() {
            var _this = this;

            addSelector(this._navParams.data.componentType, 'ion-popover-inner');
            this._compiler.resolveComponent(this._navParams.data.componentType).then(function (componentFactory) {
                var componentRef = _this.viewport.createComponent(componentFactory, _this.viewport.length, _this.viewport.parentInjector);
                _this._viewCtrl.setInstance(componentRef.instance);
                // manually fire ionViewWillEnter() since PopoverCmp's ionViewWillEnter already happened
                _this._viewCtrl.fireWillEnter();
            });
        }
    }, {
        key: "ngAfterViewInit",
        value: function ngAfterViewInit() {
            var activeElement = document.activeElement;
            if (document.activeElement) {
                activeElement.blur();
            }
            this.enabled = true;
        }
    }, {
        key: "dismiss",
        value: function dismiss(role) {
            return this._viewCtrl.dismiss(null, role);
        }
    }, {
        key: "bdTouch",
        value: function bdTouch(ev) {
            ev.preventDefault();
            ev.stopPropagation();
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
            if (this.enabled && ev.keyCode === Key.ESCAPE && this._viewCtrl.isLast()) {
                this.bdClick();
            }
        }
    }]);

    return PopoverCmp;
}();
__decorate([ViewChild('viewport', { read: ViewContainerRef }), __metadata('design:type', typeof (_a = typeof ViewContainerRef !== 'undefined' && ViewContainerRef) === 'function' && _a || Object)], PopoverCmp.prototype, "viewport", void 0);
__decorate([HostListener('body:keyup', ['$event']), __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], PopoverCmp.prototype, "_keyUp", null);
PopoverCmp = __decorate([Component({
    selector: 'ion-popover',
    template: "\n    <ion-backdrop (click)=\"bdClick($event)\" [class.hide-backdrop]=\"!d.showBackdrop\"></ion-backdrop>\n    <div class=\"popover-wrapper\">\n      <div class=\"popover-arrow\"></div>\n      <div class=\"popover-content\">\n        <div class=\"popover-viewport\">\n          <div #viewport nav-viewport></div>\n        </div>\n      </div>\n    </div>\n  ",
    directives: [Backdrop]
}), __metadata('design:paramtypes', [typeof (_b = typeof ComponentResolver !== 'undefined' && ComponentResolver) === 'function' && _b || Object, typeof (_c = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _c || Object, typeof (_d = typeof Renderer !== 'undefined' && Renderer) === 'function' && _d || Object, typeof (_e = typeof Config !== 'undefined' && Config) === 'function' && _e || Object, typeof (_f = typeof NavParams !== 'undefined' && NavParams) === 'function' && _f || Object, typeof (_g = typeof ViewController !== 'undefined' && ViewController) === 'function' && _g || Object])], PopoverCmp);
/**
 * Animations for popover
 */

var PopoverTransition = function (_PageTransition) {
    _inherits(PopoverTransition, _PageTransition);

    function PopoverTransition(enteringView, leavingView, opts) {
        _classCallCheck(this, PopoverTransition);

        return _possibleConstructorReturn(this, (PopoverTransition.__proto__ || Object.getPrototypeOf(PopoverTransition)).call(this, enteringView, leavingView, opts));
    }

    _createClass(PopoverTransition, [{
        key: "mdPositionView",
        value: function mdPositionView(nativeEle, ev) {
            var originY = 'top';
            var originX = 'left';
            var popoverWrapperEle = nativeEle.querySelector('.popover-wrapper');
            // Popover content width and height
            var popoverEle = nativeEle.querySelector('.popover-content');
            var popoverDim = popoverEle.getBoundingClientRect();
            var popoverWidth = popoverDim.width;
            var popoverHeight = popoverDim.height;
            // Window body width and height
            var bodyWidth = window.innerWidth;
            var bodyHeight = window.innerHeight;
            // If ev was passed, use that for target element
            var targetDim = ev && ev.target && ev.target.getBoundingClientRect();
            var targetTop = targetDim && 'top' in targetDim ? targetDim.top : bodyHeight / 2 - popoverHeight / 2;
            var targetLeft = targetDim && 'left' in targetDim ? targetDim.left : bodyWidth / 2 - popoverWidth / 2;
            var targetWidth = targetDim && targetDim.width || 0;
            var targetHeight = targetDim && targetDim.height || 0;
            var popoverCSS = {
                top: targetTop,
                left: targetLeft
            };
            // If the popover left is less than the padding it is off screen
            // to the left so adjust it, else if the width of the popover
            // exceeds the body width it is off screen to the right so adjust
            if (popoverCSS.left < POPOVER_MD_BODY_PADDING) {
                popoverCSS.left = POPOVER_MD_BODY_PADDING;
            } else if (popoverWidth + POPOVER_MD_BODY_PADDING + popoverCSS.left > bodyWidth) {
                popoverCSS.left = bodyWidth - popoverWidth - POPOVER_MD_BODY_PADDING;
                originX = 'right';
            }
            // If the popover when popped down stretches past bottom of screen,
            // make it pop up if there's room above
            if (targetTop + targetHeight + popoverHeight > bodyHeight && targetTop - popoverHeight > 0) {
                popoverCSS.top = targetTop - popoverHeight;
                nativeEle.className = nativeEle.className + ' popover-bottom';
                originY = 'bottom';
            } else if (targetTop + targetHeight + popoverHeight > bodyHeight) {
                popoverEle.style.bottom = POPOVER_MD_BODY_PADDING + 'px';
            }
            popoverEle.style.top = popoverCSS.top + 'px';
            popoverEle.style.left = popoverCSS.left + 'px';
            popoverEle.style[CSS.transformOrigin] = originY + ' ' + originX;
            // Since the transition starts before styling is done we
            // want to wait for the styles to apply before showing the wrapper
            popoverWrapperEle.style.opacity = '1';
        }
    }, {
        key: "iosPositionView",
        value: function iosPositionView(nativeEle, ev) {
            var originY = 'top';
            var originX = 'left';
            var popoverWrapperEle = nativeEle.querySelector('.popover-wrapper');
            // Popover content width and height
            var popoverEle = nativeEle.querySelector('.popover-content');
            var popoverDim = popoverEle.getBoundingClientRect();
            var popoverWidth = popoverDim.width;
            var popoverHeight = popoverDim.height;
            // Window body width and height
            var bodyWidth = window.innerWidth;
            var bodyHeight = window.innerHeight;
            // If ev was passed, use that for target element
            var targetDim = ev && ev.target && ev.target.getBoundingClientRect();
            var targetTop = targetDim && 'top' in targetDim ? targetDim.top : bodyHeight / 2 - popoverHeight / 2;
            var targetLeft = targetDim && 'left' in targetDim ? targetDim.left : bodyWidth / 2;
            var targetWidth = targetDim && targetDim.width || 0;
            var targetHeight = targetDim && targetDim.height || 0;
            // The arrow that shows above the popover on iOS
            var arrowEle = nativeEle.querySelector('.popover-arrow');
            var arrowDim = arrowEle.getBoundingClientRect();
            var arrowWidth = arrowDim.width;
            var arrowHeight = arrowDim.height;
            // If no ev was passed, hide the arrow
            if (!targetDim) {
                arrowEle.style.display = 'none';
            }
            var arrowCSS = {
                top: targetTop + targetHeight,
                left: targetLeft + targetWidth / 2 - arrowWidth / 2
            };
            var popoverCSS = {
                top: targetTop + targetHeight + (arrowHeight - 1),
                left: targetLeft + targetWidth / 2 - popoverWidth / 2
            };
            // If the popover left is less than the padding it is off screen
            // to the left so adjust it, else if the width of the popover
            // exceeds the body width it is off screen to the right so adjust
            if (popoverCSS.left < POPOVER_IOS_BODY_PADDING) {
                popoverCSS.left = POPOVER_IOS_BODY_PADDING;
            } else if (popoverWidth + POPOVER_IOS_BODY_PADDING + popoverCSS.left > bodyWidth) {
                popoverCSS.left = bodyWidth - popoverWidth - POPOVER_IOS_BODY_PADDING;
                originX = 'right';
            }
            // If the popover when popped down stretches past bottom of screen,
            // make it pop up if there's room above
            if (targetTop + targetHeight + popoverHeight > bodyHeight && targetTop - popoverHeight > 0) {
                arrowCSS.top = targetTop - (arrowHeight + 1);
                popoverCSS.top = targetTop - popoverHeight - (arrowHeight - 1);
                nativeEle.className = nativeEle.className + ' popover-bottom';
                originY = 'bottom';
            } else if (targetTop + targetHeight + popoverHeight > bodyHeight) {
                popoverEle.style.bottom = POPOVER_IOS_BODY_PADDING + '%';
            }
            arrowEle.style.top = arrowCSS.top + 'px';
            arrowEle.style.left = arrowCSS.left + 'px';
            popoverEle.style.top = popoverCSS.top + 'px';
            popoverEle.style.left = popoverCSS.left + 'px';
            popoverEle.style[CSS.transformOrigin] = originY + ' ' + originX;
            // Since the transition starts before styling is done we
            // want to wait for the styles to apply before showing the wrapper
            popoverWrapperEle.style.opacity = '1';
        }
    }]);

    return PopoverTransition;
}(PageTransition);

var PopoverPopIn = function (_PopoverTransition) {
    _inherits(PopoverPopIn, _PopoverTransition);

    function PopoverPopIn(enteringView, leavingView, opts) {
        _classCallCheck(this, PopoverPopIn);

        var _this3 = _possibleConstructorReturn(this, (PopoverPopIn.__proto__ || Object.getPrototypeOf(PopoverPopIn)).call(this, enteringView, leavingView, opts));

        _this3.opts = opts;
        var ele = enteringView.pageRef().nativeElement;
        var backdrop = new Animation(ele.querySelector('ion-backdrop'));
        var wrapper = new Animation(ele.querySelector('.popover-wrapper'));
        wrapper.fromTo('opacity', 0.01, 1);
        backdrop.fromTo('opacity', 0.01, 0.08);
        _this3.easing('ease').duration(100).add(backdrop).add(wrapper);
        return _this3;
    }

    _createClass(PopoverPopIn, [{
        key: "play",
        value: function play() {
            var _this4 = this;

            nativeRaf(function () {
                _this4.iosPositionView(_this4.enteringView.pageRef().nativeElement, _this4.opts.ev);
                _get(PopoverPopIn.prototype.__proto__ || Object.getPrototypeOf(PopoverPopIn.prototype), "play", _this4).call(_this4);
            });
        }
    }]);

    return PopoverPopIn;
}(PopoverTransition);

PageTransition.register('popover-pop-in', PopoverPopIn);

var PopoverPopOut = function (_PopoverTransition2) {
    _inherits(PopoverPopOut, _PopoverTransition2);

    function PopoverPopOut(enteringView, leavingView, opts) {
        _classCallCheck(this, PopoverPopOut);

        var _this5 = _possibleConstructorReturn(this, (PopoverPopOut.__proto__ || Object.getPrototypeOf(PopoverPopOut)).call(this, enteringView, leavingView, opts));

        _this5.opts = opts;
        var ele = leavingView.pageRef().nativeElement;
        var backdrop = new Animation(ele.querySelector('ion-backdrop'));
        var wrapper = new Animation(ele.querySelector('.popover-wrapper'));
        wrapper.fromTo('opacity', 0.99, 0);
        backdrop.fromTo('opacity', 0.08, 0);
        _this5.easing('ease').duration(500).add(backdrop).add(wrapper);
        return _this5;
    }

    return PopoverPopOut;
}(PopoverTransition);

PageTransition.register('popover-pop-out', PopoverPopOut);

var PopoverMdPopIn = function (_PopoverTransition3) {
    _inherits(PopoverMdPopIn, _PopoverTransition3);

    function PopoverMdPopIn(enteringView, leavingView, opts) {
        _classCallCheck(this, PopoverMdPopIn);

        var _this6 = _possibleConstructorReturn(this, (PopoverMdPopIn.__proto__ || Object.getPrototypeOf(PopoverMdPopIn)).call(this, enteringView, leavingView, opts));

        _this6.opts = opts;
        var ele = enteringView.pageRef().nativeElement;
        var content = new Animation(ele.querySelector('.popover-content'));
        var viewport = new Animation(ele.querySelector('.popover-viewport'));
        content.fromTo('scale', 0.001, 1);
        viewport.fromTo('opacity', 0.01, 1);
        _this6.easing('cubic-bezier(0.36,0.66,0.04,1)').duration(300).add(content).add(viewport);
        return _this6;
    }

    _createClass(PopoverMdPopIn, [{
        key: "play",
        value: function play() {
            var _this7 = this;

            nativeRaf(function () {
                _this7.mdPositionView(_this7.enteringView.pageRef().nativeElement, _this7.opts.ev);
                _get(PopoverMdPopIn.prototype.__proto__ || Object.getPrototypeOf(PopoverMdPopIn.prototype), "play", _this7).call(_this7);
            });
        }
    }]);

    return PopoverMdPopIn;
}(PopoverTransition);

PageTransition.register('popover-md-pop-in', PopoverMdPopIn);

var PopoverMdPopOut = function (_PopoverTransition4) {
    _inherits(PopoverMdPopOut, _PopoverTransition4);

    function PopoverMdPopOut(enteringView, leavingView, opts) {
        _classCallCheck(this, PopoverMdPopOut);

        var _this8 = _possibleConstructorReturn(this, (PopoverMdPopOut.__proto__ || Object.getPrototypeOf(PopoverMdPopOut)).call(this, enteringView, leavingView, opts));

        _this8.opts = opts;
        var ele = leavingView.pageRef().nativeElement;
        var wrapper = new Animation(ele.querySelector('.popover-wrapper'));
        wrapper.fromTo('opacity', 0.99, 0);
        _this8.easing('ease').duration(500).fromTo('opacity', 0.01, 1).add(wrapper);
        return _this8;
    }

    return PopoverMdPopOut;
}(PopoverTransition);

PageTransition.register('popover-md-pop-out', PopoverMdPopOut);
var popoverIds = -1;
var POPOVER_IOS_BODY_PADDING = 2;
var POPOVER_MD_BODY_PADDING = 12;
var _a, _b, _c, _d, _e, _f, _g;