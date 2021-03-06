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
var __param = this && this.__param || function (paramIndex, decorator) {
    return function (target, key) {
        decorator(target, key, paramIndex);
    };
};
import { ComponentResolver, Directive, ElementRef, forwardRef, Inject, NgZone, Renderer, ViewContainerRef } from '@angular/core';
import { App } from '../app/app';
import { Config } from '../../config/config';
import { GestureController } from '../../gestures/gesture-controller';
import { Keyboard } from '../../util/keyboard';
import { NavControllerBase } from '../nav/nav-controller-base';
/**
 * @private
 */
export var NavPortal = function (_NavControllerBase) {
    _inherits(NavPortal, _NavControllerBase);

    function NavPortal(app, config, keyboard, elementRef, zone, renderer, compiler, gestureCtrl, viewPort) {
        _classCallCheck(this, NavPortal);

        var _this = _possibleConstructorReturn(this, (NavPortal.__proto__ || Object.getPrototypeOf(NavPortal)).call(this, null, app, config, keyboard, elementRef, zone, renderer, compiler, gestureCtrl));

        _this._isPortal = true;
        _this._init = true;
        _this.setViewport(viewPort);
        app.setPortal(_this);
        // on every page change make sure the portal has
        // dismissed any views that should be auto dismissed on page change
        app.viewDidLeave.subscribe(_this.dismissPageChangeViews.bind(_this));
        return _this;
    }

    return NavPortal;
}(NavControllerBase);
NavPortal = __decorate([Directive({
    selector: '[nav-portal]'
}), __param(0, Inject(forwardRef(function () {
    return App;
}))), __metadata('design:paramtypes', [typeof (_a = typeof App !== 'undefined' && App) === 'function' && _a || Object, typeof (_b = typeof Config !== 'undefined' && Config) === 'function' && _b || Object, typeof (_c = typeof Keyboard !== 'undefined' && Keyboard) === 'function' && _c || Object, typeof (_d = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _d || Object, typeof (_e = typeof NgZone !== 'undefined' && NgZone) === 'function' && _e || Object, typeof (_f = typeof Renderer !== 'undefined' && Renderer) === 'function' && _f || Object, typeof (_g = typeof ComponentResolver !== 'undefined' && ComponentResolver) === 'function' && _g || Object, typeof (_h = typeof GestureController !== 'undefined' && GestureController) === 'function' && _h || Object, typeof (_j = typeof ViewContainerRef !== 'undefined' && ViewContainerRef) === 'function' && _j || Object])], NavPortal);
var _a, _b, _c, _d, _e, _f, _g, _h, _j;