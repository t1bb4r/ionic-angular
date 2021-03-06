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
var __param = this && this.__param || function (paramIndex, decorator) {
    return function (target, key) {
        decorator(target, key, paramIndex);
    };
};
import { ChangeDetectionStrategy, Component, Directive, ElementRef, Optional } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
import { ViewController } from '../nav/view-controller';
/**
 * @name Header
 * @description
 * Header is a parent compnent that holds the navbar and toolbar component.
 * It's important to note that `ion-header` needs to be the one of the three root elements of a page
 *
 * @usage
 *
 * ```ts
 * @Component({
 *   template: `
 *      <ion-header>
 *        <ion-navbar>
 *          <ion-title>Page1</ion-title>
 *        </ion-navbar>
 *
 *        <ion-toolbar>
 *          <ion-title>Subheader</ion-title>
 *        </ion-toolbar>
 *      </ion-header>
 *
 *      <ion-content></ion-content>
 *   `
 * })
 * ```
 *
 */
export var Header = function Header(viewCtrl) {
    _classCallCheck(this, Header);

    viewCtrl && viewCtrl.setHeader(this);
};
Header = __decorate([Directive({
    selector: 'ion-header'
}), __param(0, Optional()), __metadata('design:paramtypes', [typeof (_a = typeof ViewController !== 'undefined' && ViewController) === 'function' && _a || Object])], Header);
/**
 * @name Footer
 * @description
 * Footer is a root component of a page that sits at the bottom of the page.
 * Footer can be a wrapper for `ion-toolbar` to make sure the content area is sized correctly.
 *
 * @usage
 *
 * ```ts
 * @Component({
 *   template: `
 *      <ion-content></ion-content>
 *      <ion-footer>
 *        <ion-toolbar>
 *          <ion-title>Footer</ion-title>
 *        </ion-toolbar>
 *      </ion-footer>
 *   `
 * })
 * ```
 *
 */
export var Footer = function Footer(viewCtrl) {
    _classCallCheck(this, Footer);

    viewCtrl && viewCtrl.setFooter(this);
};
Footer = __decorate([Directive({
    selector: 'ion-footer'
}), __param(0, Optional()), __metadata('design:paramtypes', [typeof (_b = typeof ViewController !== 'undefined' && ViewController) === 'function' && _b || Object])], Footer);
/**
 * @private
 */
export var ToolbarBase = function (_Ion) {
    _inherits(ToolbarBase, _Ion);

    function ToolbarBase(elementRef) {
        _classCallCheck(this, ToolbarBase);

        var _this = _possibleConstructorReturn(this, (ToolbarBase.__proto__ || Object.getPrototypeOf(ToolbarBase)).call(this, elementRef));

        _this.itemRefs = [];
        _this.titleRef = null;
        return _this;
    }
    /**
     * @private
     */


    _createClass(ToolbarBase, [{
        key: "setTitleCmp",
        value: function setTitleCmp(titleCmp) {
            this.titleCmp = titleCmp;
        }
        /**
         * @private
         * Returns the toolbar title text if it exists or an empty string
         */

    }, {
        key: "getTitleText",
        value: function getTitleText() {
            return this.titleCmp && this.titleCmp.getTitleText() || '';
        }
        /**
         * @private
         */

    }, {
        key: "getTitleRef",
        value: function getTitleRef() {
            return this.titleCmp && this.titleCmp.elementRef;
        }
        /**
         * @private
         * A toolbar items include the left and right side `ion-buttons`,
         * and every `menu-toggle`. It does not include the `ion-title`.
         * @returns {TODO} Array of this toolbar's item ElementRefs.
         */

    }, {
        key: "getItemRefs",
        value: function getItemRefs() {
            return this.itemRefs;
        }
        /**
         * @private
         */

    }, {
        key: "addItemRef",
        value: function addItemRef(itemElementRef) {
            this.itemRefs.push(itemElementRef);
        }
    }]);

    return ToolbarBase;
}(Ion);
/**
 * @name Toolbar
 * @description
 * A Toolbar is a generic bar that is positioned above or below content.
 * Unlike a [Navbar](../../nav/Navbar), a toolbar can be used as a subheader.
 * When toolbars are placed within an `<ion-header>` or `<ion-footer>`,
 * the toolbars stay fixed in their respective location. When placed within
 * `<ion-content>`, toolbars will scroll with the content.
 *
 *
 * ### Buttons in a Toolbar
 * Buttons placed in a toolbar should be placed inside of the `<ion-buttons>`
 * element. An exception to this is a [menuToggle](../../menu/MenuToggle) button.
 * It should not be placed inside of the `<ion-buttons>` element. Both the
 * `<ion-buttons>` element and the `menuToggle` can be positioned inside of the
 * toolbar using different properties. The below chart has a description of each
 * property.
 *
 * | Property    | Description                                                                                                           |
 * |-------------|-----------------------------------------------------------------------------------------------------------------------|
 * | `start`     | Positions element to the left of the content in `ios` mode, and directly to the right in `md` and `wp` mode.    |
 * | `end`       | Positions element to the right of the content in `ios` mode, and to the far right in `md` and `wp` mode.        |
 * | `left`      | Positions element to the left of all other elements.                                                            |
 * | `right`     | Positions element to the right of all other elements.                                                           |
 *
 *
 * ### Header / Footer Box Shadow
 * In `md` mode, the `ion-header` will receive a box-shadow on the bottom, and the
 * `ion-footer` will receive a box-shadow on the top. This can be removed by adding
 * the `no-shadow` attribute to the element.
 *
 * ```html
 * <ion-header no-shadow>
 *   <ion-toolbar>
 *     <ion-title>Header</ion-title>
 *   </ion-toolbar>
 * </ion-header>
 *
 * <ion-content>
 * </ion-content>
 *
 * <ion-footer no-shadow>
 *   <ion-toolbar>
 *     <ion-title>Footer</ion-title>
 *   </ion-toolbar>
 * </ion-footer>
 * ```
 *
 * ### Toolbar Borders
 * Toolbars can be stacked up vertically in `<ion-header>`, `<ion-content>`, and
 * `<ion-footer>` elements. In `ios` mode, toolbars have borders on the top and
 * bottom. To hide both borders, the `no-border` attribute should be used on the
 * `ion-toolbar`. To hide the top or bottom border, the `no-border-top` and
 * `no-border-bottom` attribute should be used.
 *
 * ```html
 * <ion-header no-shadow>
 *   <ion-toolbar no-border-bottom>
 *     <ion-title>Header</ion-title>
 *   </ion-toolbar>
 *   <ion-toolbar no-border>
 *     <ion-title>Subheader</ion-title>
 *   </ion-toolbar>
 *   <ion-toolbar no-border-top>
 *     <ion-title>Another Header</ion-title>
 *   </ion-toolbar>
 * </ion-header>
 *
 * <ion-content>
 * </ion-content>
 * ```
 *
 *
 * @usage
 * ```html
 * <ion-header no-shadow>
 *
 *   <ion-toolbar no-border-bottom>
 *     <ion-buttons start>
 *       <button>
 *         <ion-icon name="contact"></ion-icon>
 *       </button>
 *       <button>
 *         <ion-icon name="search"></ion-icon>
 *       </button>
 *     </ion-buttons>
 *     <ion-title>My Toolbar Title</ion-title>
 *   </ion-toolbar>
 *
 *   <ion-toolbar no-border-top>
 *     <ion-title>I'm a subheader</ion-title>
 *   </ion-toolbar>
 *
 * <ion-header>
 *
 *
 * <ion-content>
 *
 *   <ion-toolbar>
 *     <ion-title>Scrolls with the content</ion-title>
 *   </ion-toolbar>
 *
 * </ion-content>
 *
 *
 * <ion-footer>
 *
 *   <ion-toolbar no-border>
 *     <ion-title>I'm a subfooter</ion-title>
 *     <ion-buttons right>
 *       <button>
 *         <ion-icon name="menu"></ion-icon>
 *       </button>
 *     </ion-buttons>
 *   </ion-toolbar>
 *
 *   <ion-toolbar no-border-top>
 *     <ion-title>I'm a footer</ion-title>
 *     <ion-buttons end>
 *       <button>
 *         <ion-icon name="more"></ion-icon>
 *       </button>
 *       <button>
 *         <ion-icon name="options"></ion-icon>
 *       </button>
 *     </ion-buttons>
 *   </ion-toolbar>
 *
 * </ion-footer>
 *  ```
 *
 * @demo /docs/v2/demos/toolbar/
 * @see {@link ../../navbar/Navbar/ Navbar API Docs}
 */
export var Toolbar = function (_ToolbarBase) {
    _inherits(Toolbar, _ToolbarBase);

    function Toolbar(viewCtrl, header, footer, config, elementRef) {
        _classCallCheck(this, Toolbar);

        var _this2 = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, elementRef));

        if (viewCtrl && (header || footer)) {
            // only toolbars within headers and footer are view toolbars
            // toolbars within the content are not view toolbars, since they
            // are apart of the content, and could be anywhere within the content
            viewCtrl.setToolbarRef(elementRef);
        }
        _this2._sbPadding = config.getBoolean('statusbarPadding');
        return _this2;
    }

    return Toolbar;
}(ToolbarBase);
Toolbar = __decorate([Component({
    selector: 'ion-toolbar',
    template: "\n    <div class=\"toolbar-background\"></div>\n    <ng-content select=\"[menuToggle],ion-buttons[left]\"></ng-content>\n    <ng-content select=\"ion-buttons[start]\"></ng-content>\n    <ng-content select=\"ion-buttons[end],ion-buttons[right]\"></ng-content>\n    <div class=\"toolbar-content\">\n      <ng-content></ng-content>\n    </div>\n  ",
    host: {
        'class': 'toolbar',
        '[class.statusbar-padding]': '_sbPadding'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
}), __param(0, Optional()), __param(1, Optional()), __param(2, Optional()), __metadata('design:paramtypes', [typeof (_c = typeof ViewController !== 'undefined' && ViewController) === 'function' && _c || Object, Header, Footer, typeof (_d = typeof Config !== 'undefined' && Config) === 'function' && _d || Object, typeof (_e = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _e || Object])], Toolbar);
var _a, _b, _c, _d, _e;