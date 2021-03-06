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
var __param = this && this.__param || function (paramIndex, decorator) {
    return function (target, key) {
        decorator(target, key, paramIndex);
    };
};
import { Component, ElementRef, Optional, forwardRef, Inject, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Ion } from '../ion';
import { Navbar } from '../navbar/navbar';
import { Toolbar } from './toolbar';
/**
 * @name Title
 * @description
 * `ion-title` is a component that sets the title of the `Toolbar` or `Navbar`
 *
 * @usage
 *
 * ```html
 * <ion-header>
 *
 *   <ion-navbar>
 *     <ion-title>Settings</ion-title>
 *   </ion-navbar>
 *
 * </ion-header>
 * ```
 *
 * Or to create a navbar with a toolbar as a subheader:
 *
 * ```html
 * <ion-header>
 *
 *   <ion-navbar>
 *     <ion-title>Main Heder</ion-title>
 *   </ion-navbar>
 *
 *   <ion-toolbar>
 *     <ion-title>Subheader</ion-title>
 *   </ion-toolbar>
 *
 * </ion-header>
 * ```
 *
 * @demo /docs/v2/demos/title/
 */
export var ToolbarTitle = function (_Ion) {
    _inherits(ToolbarTitle, _Ion);

    function ToolbarTitle(_elementRef, toolbar, navbar) {
        _classCallCheck(this, ToolbarTitle);

        var _this = _possibleConstructorReturn(this, (ToolbarTitle.__proto__ || Object.getPrototypeOf(ToolbarTitle)).call(this, _elementRef));

        _this._elementRef = _elementRef;
        toolbar && toolbar.setTitleCmp(_this);
        navbar && navbar.setTitleCmp(_this);
        return _this;
    }
    /**
     * @private
     */


    _createClass(ToolbarTitle, [{
        key: "getTitleText",
        value: function getTitleText() {
            return this._elementRef.nativeElement.textContent;
        }
    }]);

    return ToolbarTitle;
}(Ion);
ToolbarTitle = __decorate([Component({
    selector: 'ion-title',
    template: '<div class="toolbar-title">' + '<ng-content></ng-content>' + '</div>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
}), __param(1, Optional()), __param(2, Optional()), __param(2, Inject(forwardRef(function () {
    return Navbar;
}))), __metadata('design:paramtypes', [typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a || Object, typeof (_b = typeof Toolbar !== 'undefined' && Toolbar) === 'function' && _b || Object, typeof (_c = typeof Navbar !== 'undefined' && Navbar) === 'function' && _c || Object])], ToolbarTitle);
var _a, _b, _c;