var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
import { Component, ElementRef, Renderer, Attribute, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Config } from '../../config/config';
import { isTrueProperty } from '../../util/util';
/**
  * @name Button
  * @module ionic
  *
  * @description
  * Buttons are simple components in Ionic. They can consist of text and icons
  * and be enhanced by a wide range of attributes.
  *
  * @property [outline] - A transparent button with a border.
  * @property [clear] - A transparent button without a border.
  * @property [round] - A button with rounded corners.
  * @property [block] - A button that fills its parent container with a border-radius.
  * @property [full] - A button that fills its parent container without a border-radius or borders on the left/right.
  * @property [small] - A button with size small.
  * @property [large] - A button with size large.
  * @property [disabled] - A disabled button.
  * @property [fab] - A floating action button.
  * @property [fab-left] - Position a fab button to the left.
  * @property [fab-right] - Position a fab button to the right.
  * @property [fab-center] - Position a fab button towards the center.
  * @property [fab-top] - Position a fab button towards the top.
  * @property [fab-bottom] - Position a fab button towards the bottom.
  * @property [fab-fixed] - Makes a fab button have a fixed position.
  * @property [color] - Dynamically set which predefined color this button should use (e.g. primary, secondary, danger, etc).
  *
  * @demo /docs/v2/demos/button/
  * @see {@link /docs/v2/components#buttons Button Component Docs}
 */
export var Button = function () {
    function Button(config, _elementRef, _renderer, ionItem) {
        _classCallCheck(this, Button);

        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._role = 'button'; // bar-button/item-button
        this._size = null; // large/small/default
        this._style = 'default'; // outline/clear/solid
        this._shape = null; // round/fab
        this._display = null; // block/full
        this._colors = []; // primary/secondary
        this._icon = null; // left/right/only
        this._disabled = false; // disabled
        this.isItem = ionItem === '';
        var element = _elementRef.nativeElement;
        if (config.get('hoverCSS') === false) {
            _renderer.setElementClass(_elementRef.nativeElement, 'disable-hover', true);
        }
        if (element.hasAttribute('ion-item')) {
            // no need to put on these classes for an ion-item
            this._role = null;
            return;
        }
        if (element.hasAttribute('disabled')) {
            this._disabled = true;
        }
        this._readAttrs(element);
    }
    /**
     * @input {string} Large button.
     */


    _createClass(Button, [{
        key: "_attr",
        value: function _attr(type, attrName, attrValue) {
            this._setClass(this[type], false);
            if (isTrueProperty(attrValue)) {
                this[type] = attrName;
                this._setClass(attrName, true);
            } else {
                // Special handling for '_style' which defaults to 'default'.
                this[type] = type === '_style' ? 'default' : null;
            }
            if (type === '_style') {
                this._setColor(attrName, isTrueProperty(attrValue));
            }
        }
        /**
         * @input {string} Dynamically set which predefined color this button should use (e.g. primary, secondary, danger, etc).
         */

    }, {
        key: "ngOnInit",

        /**
         * @private
         */
        value: function ngOnInit() {
            // If the button has a role applied to it
            if (this.category) {
                this.setRole(this.category);
            }
        }
        /**
         * @private
         */

    }, {
        key: "ngAfterContentInit",
        value: function ngAfterContentInit() {
            this._init = true;
            this._readIcon(this._elementRef.nativeElement);
            this._assignCss(true);
        }
        /**
         * @private
         */

    }, {
        key: "ngAfterContentChecked",
        value: function ngAfterContentChecked() {
            this._readIcon(this._elementRef.nativeElement);
            this._assignCss(true);
        }
        /**
         * @private
         */

    }, {
        key: "addClass",
        value: function addClass(className) {
            this._renderer.setElementClass(this._elementRef.nativeElement, className, true);
        }
        /**
         * @private
         */

    }, {
        key: "setRole",
        value: function setRole(val) {
            this._assignCss(false);
            this._role = val;
            this._readIcon(this._elementRef.nativeElement);
            this._assignCss(true);
        }
        /**
         * @private
         */

    }, {
        key: "_readIcon",
        value: function _readIcon(element) {
            // figure out if and where the icon lives in the button
            var childNodes = element.childNodes;
            if (childNodes.length > 0) {
                childNodes = childNodes[0].childNodes;
            }
            var childNode = void 0;
            var nodes = [];
            for (var i = 0, l = childNodes.length; i < l; i++) {
                childNode = childNodes[i];
                if (childNode.nodeType === 3) {
                    // text node
                    if (childNode.textContent.trim() !== '') {
                        nodes.push(TEXT);
                    }
                } else if (childNode.nodeType === 1) {
                    if (childNode.nodeName === 'ION-ICON') {
                        // icon element node
                        nodes.push(ICON);
                    } else {
                        // element other than an <ion-icon>
                        nodes.push(TEXT);
                    }
                }
            }
            // Remove any classes that are set already
            this._setClass(this._icon, false);
            if (nodes.length > 1) {
                if (nodes[0] === ICON && nodes[1] === TEXT) {
                    this._icon = 'icon-left';
                } else if (nodes[0] === TEXT && nodes[1] === ICON) {
                    this._icon = 'icon-right';
                }
            } else if (nodes.length === 1 && nodes[0] === ICON) {
                this._icon = 'icon-only';
            }
        }
        /**
         * @private
         */

    }, {
        key: "_readAttrs",
        value: function _readAttrs(element) {
            var elementAttrs = element.attributes;
            var attrName = void 0;
            for (var i = 0, l = elementAttrs.length; i < l; i++) {
                if (elementAttrs[i].value !== '') continue;
                attrName = elementAttrs[i].name;
                if (BUTTON_STYLE_ATTRS.indexOf(attrName) > -1) {
                    this._style = attrName;
                } else if (BUTTON_DISPLAY_ATTRS.indexOf(attrName) > -1) {
                    this._display = attrName;
                } else if (BUTTON_SHAPE_ATTRS.indexOf(attrName) > -1) {
                    this._shape = attrName;
                } else if (BUTTON_SIZE_ATTRS.indexOf(attrName) > -1) {
                    this._size = attrName;
                } else if (!IGNORE_ATTRS.test(attrName)) {
                    this._colors.push(attrName);
                }
            }
        }
        /**
         * @private
         */

    }, {
        key: "_assignCss",
        value: function _assignCss(assignCssClass) {
            var role = this._role;
            if (role) {
                this._renderer.setElementClass(this._elementRef.nativeElement, role, assignCssClass); // button
                this._setClass(this._style, assignCssClass); // button-clear
                this._setClass(this._shape, assignCssClass); // button-round
                this._setClass(this._display, assignCssClass); // button-full
                this._setClass(this._size, assignCssClass); // button-small
                this._setClass(this._icon, assignCssClass); // button-icon-left
                this._setColor(this._style, assignCssClass); // button-secondary, button-clear-secondary
            }
        }
        /**
         * @private
         */

    }, {
        key: "_setClass",
        value: function _setClass(type, assignCssClass) {
            if (type && this._init) {
                this._renderer.setElementClass(this._elementRef.nativeElement, this._role + '-' + type.toLowerCase(), assignCssClass);
            }
        }
        /**
         * @private
         */

    }, {
        key: "_setColor",
        value: function _setColor(type, assignCssClass) {
            var _this = this;

            if (type && this._init) {
                // Support array to allow removal of many styles at once.
                var styles = type instanceof Array ? type : [type];
                styles.forEach(function (styleName) {
                    // If the role is not a bar-button, don't apply the solid style
                    styleName = _this._role !== 'bar-button' && styleName === 'solid' ? 'default' : styleName;
                    var colorStyle = styleName !== null && styleName !== 'default' ? styleName.toLowerCase() + '-' : '';
                    _this._colors.forEach(function (colorName) {
                        _this._setClass(colorStyle + colorName, assignCssClass); // button-secondary, button-clear-secondary
                    });
                });
            }
        }
    }, {
        key: "large",
        set: function set(val) {
            this._attr('_size', 'large', val);
        }
        /**
         * @input {string} Small button.
         */

    }, {
        key: "small",
        set: function set(val) {
            this._attr('_size', 'small', val);
        }
        /**
         * @input {string} Default button.
         */

    }, {
        key: "default",
        set: function set(val) {
            this._attr('_size', 'default', val);
        }
        /**
         * @input {string} A transparent button with a border.
         */

    }, {
        key: "outline",
        set: function set(val) {
            this._attr('_style', 'outline', val);
        }
        /**
         * @input {string} A transparent button without a border.
         */

    }, {
        key: "clear",
        set: function set(val) {
            this._attr('_style', 'clear', val);
        }
        /**
         * @input {string} Force a solid button. Useful for buttons within an item.
         */

    }, {
        key: "solid",
        set: function set(val) {
            this._attr('_style', 'solid', val);
        }
        /**
         * @input {string} A button with rounded corners.
         */

    }, {
        key: "round",
        set: function set(val) {
            this._attr('_shape', 'round', val);
        }
        /**
         * @input {string} A button that fills its parent container with a border-radius.
         */

    }, {
        key: "block",
        set: function set(val) {
            this._attr('_display', 'block', val);
        }
        /**
         * @input {string} A button that fills its parent container without a border-radius or borders on the left/right.
         */

    }, {
        key: "full",
        set: function set(val) {
            this._attr('_display', 'full', val);
        }
    }, {
        key: "color",
        set: function set(val) {
            // Clear the colors for all styles including the default one.
            this._setColor(BUTTON_STYLE_ATTRS.concat(['default']), false);
            // Support array input which is also supported via multiple attributes (e.g. primary, secondary, etc).
            this._colors = val instanceof Array ? val : [val];
            // Set the colors for the currently effective style.
            this._setColor(this._style, true);
        }
    }]);

    return Button;
}();
__decorate([Input(), __metadata('design:type', String)], Button.prototype, "category", void 0);
__decorate([Input(), __metadata('design:type', Boolean), __metadata('design:paramtypes', [Boolean])], Button.prototype, "large", null);
__decorate([Input(), __metadata('design:type', Boolean), __metadata('design:paramtypes', [Boolean])], Button.prototype, "small", null);
__decorate([Input(), __metadata('design:type', Boolean), __metadata('design:paramtypes', [Boolean])], Button.prototype, "default", null);
__decorate([Input(), __metadata('design:type', Boolean), __metadata('design:paramtypes', [Boolean])], Button.prototype, "outline", null);
__decorate([Input(), __metadata('design:type', Boolean), __metadata('design:paramtypes', [Boolean])], Button.prototype, "clear", null);
__decorate([Input(), __metadata('design:type', Boolean), __metadata('design:paramtypes', [Boolean])], Button.prototype, "solid", null);
__decorate([Input(), __metadata('design:type', Boolean), __metadata('design:paramtypes', [Boolean])], Button.prototype, "round", null);
__decorate([Input(), __metadata('design:type', Boolean), __metadata('design:paramtypes', [Boolean])], Button.prototype, "block", null);
__decorate([Input(), __metadata('design:type', Boolean), __metadata('design:paramtypes', [Boolean])], Button.prototype, "full", null);
__decorate([Input(), __metadata('design:type', Object), __metadata('design:paramtypes', [Object])], Button.prototype, "color", null);
Button = __decorate([Component({
    selector: 'button:not([ion-item]),[button]',
    // NOTE: template must not contain spaces between elements
    template: '<span class="button-inner"><ng-content></ng-content></span><ion-button-effect></ion-button-effect>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
}), __param(3, Attribute('ion-item')), __metadata('design:paramtypes', [typeof (_a = typeof Config !== 'undefined' && Config) === 'function' && _a || Object, typeof (_b = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _b || Object, typeof (_c = typeof Renderer !== 'undefined' && Renderer) === 'function' && _c || Object, String])], Button);
var BUTTON_SIZE_ATTRS = ['large', 'small', 'default'];
var BUTTON_STYLE_ATTRS = ['clear', 'outline', 'solid'];
var BUTTON_SHAPE_ATTRS = ['round', 'fab'];
var BUTTON_DISPLAY_ATTRS = ['block', 'full'];
var IGNORE_ATTRS = /_ng|button|left|right/;
var TEXT = 1;
var ICON = 2;
var _a, _b, _c;