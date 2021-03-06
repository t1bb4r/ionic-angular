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
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
import { Tab } from './tab';
/**
 * @private
 */
export var TabButton = function (_Ion) {
    _inherits(TabButton, _Ion);

    function TabButton(config, elementRef) {
        _classCallCheck(this, TabButton);

        var _this = _possibleConstructorReturn(this, (TabButton.__proto__ || Object.getPrototypeOf(TabButton)).call(this, elementRef));

        _this.ionSelect = new EventEmitter();
        _this.disHover = config.get('hoverCSS') === false;
        _this.layout = config.get('tabsLayout');
        // TODO deprecated 07-07-2016 beta.11
        if (config.get('tabbarLayout') !== undefined) {
            _this.layout = config.get('tabbarLayout');
        }
        return _this;
    }

    _createClass(TabButton, [{
        key: "ngOnInit",
        value: function ngOnInit() {
            this.tab.btn = this;
            this.layout = this.tab.parent.tabsLayout || this.layout;
            this.hasTitle = !!this.tab.tabTitle;
            this.hasIcon = !!this.tab.tabIcon && this.layout !== 'icon-hide';
            this.hasTitleOnly = this.hasTitle && !this.hasIcon;
            this.hasIconOnly = this.hasIcon && !this.hasTitle;
            this.hasBadge = !!this.tab.tabBadge;
        }
    }, {
        key: "onClick",
        value: function onClick(ev) {
            this.ionSelect.emit(this.tab);
            ev.preventDefault();
        }
    }]);

    return TabButton;
}(Ion);
__decorate([Input(), __metadata('design:type', typeof (_a = typeof Tab !== 'undefined' && Tab) === 'function' && _a || Object)], TabButton.prototype, "tab", void 0);
__decorate([Output(), __metadata('design:type', typeof (_b = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _b || Object)], TabButton.prototype, "ionSelect", void 0);
__decorate([HostListener('click', ['$event']), __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], TabButton.prototype, "onClick", null);
TabButton = __decorate([Directive({
    selector: '.tab-button',
    host: {
        '[attr.id]': 'tab._btnId',
        '[attr.aria-controls]': 'tab._tabId',
        '[attr.aria-selected]': 'tab.isSelected',
        '[class.has-title]': 'hasTitle',
        '[class.has-icon]': 'hasIcon',
        '[class.has-title-only]': 'hasTitleOnly',
        '[class.icon-only]': 'hasIconOnly',
        '[class.has-badge]': 'hasBadge',
        '[class.disable-hover]': 'disHover'
    }
}), __metadata('design:paramtypes', [typeof (_c = typeof Config !== 'undefined' && Config) === 'function' && _c || Object, typeof (_d = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _d || Object])], TabButton);
var _a, _b, _c, _d;