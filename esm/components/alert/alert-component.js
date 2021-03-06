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
import { Component, ElementRef, HostListener, Renderer, ViewEncapsulation } from '@angular/core';
import { NgClass, NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { NgModel } from '@angular/forms';
import { Animation } from '../../animations/animation';
import { Backdrop } from '../backdrop/backdrop';
import { Config } from '../../config/config';
import { isPresent } from '../../util/util';
import { Key } from '../../util/key';
import { NavParams } from '../nav/nav-params';
import { Transition } from '../../transitions/transition';
import { ViewController } from '../nav/view-controller';
/**
 * @private
 */
export var AlertCmp = function () {
    function AlertCmp(_viewCtrl, _elementRef, _config, params, renderer) {
        _classCallCheck(this, AlertCmp);

        this._viewCtrl = _viewCtrl;
        this._elementRef = _elementRef;
        this._config = _config;
        this.d = params.data;
        if (this.d.cssClass) {
            this.d.cssClass.split(' ').forEach(function (cssClass) {
                // Make sure the class isn't whitespace, otherwise it throws exceptions
                if (cssClass.trim() !== '') renderer.setElementClass(_elementRef.nativeElement, cssClass, true);
            });
        }
        this.id = ++alertIds;
        this.descId = '';
        this.hdrId = 'alert-hdr-' + this.id;
        this.subHdrId = 'alert-subhdr-' + this.id;
        this.msgId = 'alert-msg-' + this.id;
        this.activeId = '';
        this.lastClick = 0;
        if (this.d.message) {
            this.descId = this.msgId;
        } else if (this.d.subTitle) {
            this.descId = this.subHdrId;
        }
        if (!this.d.message) {
            this.d.message = '';
        }
    }

    _createClass(AlertCmp, [{
        key: "ionViewLoaded",
        value: function ionViewLoaded() {
            var _this = this;

            // normalize the data
            var data = this.d;
            data.buttons = data.buttons.map(function (button) {
                if (typeof button === 'string') {
                    return { text: button };
                }
                return button;
            });
            data.inputs = data.inputs.map(function (input, index) {
                return {
                    type: input.type || 'text',
                    name: isPresent(input.name) ? input.name : index,
                    placeholder: isPresent(input.placeholder) ? input.placeholder : '',
                    value: isPresent(input.value) ? input.value : '',
                    label: input.label,
                    checked: !!input.checked,
                    disabled: !!input.disabled,
                    id: 'alert-input-' + _this.id + '-' + index
                };
            });
            // An alert can be created with several different inputs. Radios,
            // checkboxes and inputs are all accepted, but they cannot be mixed.
            var inputTypes = [];
            data.inputs.forEach(function (input) {
                if (inputTypes.indexOf(input.type) < 0) {
                    inputTypes.push(input.type);
                }
            });
            if (inputTypes.length > 1 && (inputTypes.indexOf('checkbox') > -1 || inputTypes.indexOf('radio') > -1)) {
                console.warn('Alert cannot mix input types: ' + inputTypes.join('/') + '. Please see alert docs for more info.');
            }
            this.inputType = inputTypes.length ? inputTypes[0] : null;
            var checkedInput = this.d.inputs.find(function (input) {
                return input.checked;
            });
            if (checkedInput) {
                this.activeId = checkedInput.id;
            }
        }
    }, {
        key: "_keyUp",
        value: function _keyUp(ev) {
            if (this.enabled && this._viewCtrl.isLast()) {
                if (ev.keyCode === Key.ENTER) {
                    if (this.lastClick + 1000 < Date.now()) {
                        // do not fire this click if there recently was already a click
                        // this can happen when the button has focus and used the enter
                        // key to click the button. However, both the click handler and
                        // this keyup event will fire, so only allow one of them to go.
                        console.debug('alert, enter button');
                        var button = this.d.buttons[this.d.buttons.length - 1];
                        this.btnClick(button);
                    }
                } else if (ev.keyCode === Key.ESCAPE) {
                    console.debug('alert, escape button');
                    this.bdClick();
                }
            }
        }
    }, {
        key: "ionViewDidEnter",
        value: function ionViewDidEnter() {
            var activeElement = document.activeElement;
            if (document.activeElement) {
                activeElement.blur();
            }
            var focusableEle = this._elementRef.nativeElement.querySelector('input,button');
            if (focusableEle) {
                focusableEle.focus();
            }
            this.enabled = true;
        }
    }, {
        key: "btnClick",
        value: function btnClick(button, dismissDelay) {
            var _this2 = this;

            if (!this.enabled) {
                return;
            }
            // keep the time of the most recent button click
            this.lastClick = Date.now();
            var shouldDismiss = true;
            if (button.handler) {
                // a handler has been provided, execute it
                // pass the handler the values from the inputs
                if (button.handler(this.getValues()) === false) {
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
        key: "rbClick",
        value: function rbClick(checkedInput) {
            if (this.enabled) {
                this.d.inputs.forEach(function (input) {
                    input.checked = checkedInput === input;
                });
                this.activeId = checkedInput.id;
            }
        }
    }, {
        key: "cbClick",
        value: function cbClick(checkedInput) {
            if (this.enabled) {
                checkedInput.checked = !checkedInput.checked;
            }
        }
    }, {
        key: "bdClick",
        value: function bdClick() {
            if (this.enabled && this.d.enableBackdropDismiss) {
                var cancelBtn = this.d.buttons.find(function (b) {
                    return b.role === 'cancel';
                });
                if (cancelBtn) {
                    this.btnClick(cancelBtn, 1);
                } else {
                    this.dismiss('backdrop');
                }
            }
        }
    }, {
        key: "dismiss",
        value: function dismiss(role) {
            return this._viewCtrl.dismiss(this.getValues(), role);
        }
    }, {
        key: "getValues",
        value: function getValues() {
            if (this.inputType === 'radio') {
                // this is an alert with radio buttons (single value select)
                // return the one value which is checked, otherwise undefined
                var checkedInput = this.d.inputs.find(function (i) {
                    return i.checked;
                });
                return checkedInput ? checkedInput.value : undefined;
            }
            if (this.inputType === 'checkbox') {
                // this is an alert with checkboxes (multiple value select)
                // return an array of all the checked values
                return this.d.inputs.filter(function (i) {
                    return i.checked;
                }).map(function (i) {
                    return i.value;
                });
            }
            // this is an alert with text inputs
            // return an object of all the values with the input name as the key
            var values = {};
            this.d.inputs.forEach(function (i) {
                values[i.name] = i.value;
            });
            return values;
        }
    }]);

    return AlertCmp;
}();
__decorate([HostListener('body:keyup', ['$event']), __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], AlertCmp.prototype, "_keyUp", null);
AlertCmp = __decorate([Component({
    selector: 'ion-alert',
    template: "\n    <ion-backdrop (click)=\"bdClick()\"></ion-backdrop>\n    <div class=\"alert-wrapper\">\n      <div class=\"alert-head\">\n        <h2 id=\"{{hdrId}}\" class=\"alert-title\" *ngIf=\"d.title\" [innerHTML]=\"d.title\"></h2>\n        <h3 id=\"{{subHdrId}}\" class=\"alert-sub-title\" *ngIf=\"d.subTitle\" [innerHTML]=\"d.subTitle\"></h3>\n      </div>\n      <div id=\"{{msgId}}\" class=\"alert-message\" [innerHTML]=\"d.message\"></div>\n      <div *ngIf=\"d.inputs.length\" [ngSwitch]=\"inputType\">\n\n        <template ngSwitchCase=\"radio\">\n          <div class=\"alert-radio-group\" role=\"radiogroup\" [attr.aria-labelledby]=\"hdrId\" [attr.aria-activedescendant]=\"activeId\">\n            <button category=\"alert-radio-button\" *ngFor=\"let i of d.inputs\" (click)=\"rbClick(i)\" [attr.aria-checked]=\"i.checked\" [disabled]=\"i.disabled\" [attr.id]=\"i.id\" class=\"alert-tappable alert-radio\" role=\"radio\">\n              <div class=\"alert-radio-icon\"><div class=\"alert-radio-inner\"></div></div>\n              <div class=\"alert-radio-label\">\n                {{i.label}}\n              </div>\n            </button>\n          </div>\n        </template>\n\n        <template ngSwitchCase=\"checkbox\">\n          <div class=\"alert-checkbox-group\">\n            <button category=\"alert-checkbox-button\" *ngFor=\"let i of d.inputs\" (click)=\"cbClick(i)\" [attr.aria-checked]=\"i.checked\" [disabled]=\"i.disabled\" class=\"alert-tappable alert-checkbox\" role=\"checkbox\">\n              <div class=\"alert-checkbox-icon\"><div class=\"alert-checkbox-inner\"></div></div>\n              <div class=\"alert-checkbox-label\">\n                {{i.label}}\n              </div>\n            </button>\n          </div>\n        </template>\n\n        <template ngSwitchDefault>\n          <div class=\"alert-input-group\">\n            <div *ngFor=\"let i of d.inputs\" class=\"alert-input-wrapper\">\n              <input [placeholder]=\"i.placeholder\" [(ngModel)]=\"i.value\" [type]=\"i.type\" class=\"alert-input\">\n            </div>\n          </div>\n        </template>\n\n      </div>\n      <div class=\"alert-button-group\" [ngClass]=\"{vertical: d.buttons.length>2}\">\n        <button category=\"alert-button\" *ngFor=\"let b of d.buttons\" (click)=\"btnClick(b)\" [ngClass]=\"b.cssClass\">\n          {{b.text}}\n        </button>\n      </div>\n    </div>\n    ",
    directives: [Backdrop, NgClass, NgFor, NgIf, NgModel, NgSwitch, NgSwitchCase, NgSwitchDefault],
    host: {
        'role': 'dialog',
        '[attr.aria-labelledby]': 'hdrId',
        '[attr.aria-describedby]': 'descId'
    },
    encapsulation: ViewEncapsulation.None
}), __metadata('design:paramtypes', [typeof (_a = typeof ViewController !== 'undefined' && ViewController) === 'function' && _a || Object, typeof (_b = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _b || Object, typeof (_c = typeof Config !== 'undefined' && Config) === 'function' && _c || Object, typeof (_d = typeof NavParams !== 'undefined' && NavParams) === 'function' && _d || Object, typeof (_e = typeof Renderer !== 'undefined' && Renderer) === 'function' && _e || Object])], AlertCmp);
/**
 * Animations for alerts
 */

var AlertPopIn = function (_Transition) {
    _inherits(AlertPopIn, _Transition);

    function AlertPopIn(enteringView, leavingView, opts) {
        _classCallCheck(this, AlertPopIn);

        var _this3 = _possibleConstructorReturn(this, (AlertPopIn.__proto__ || Object.getPrototypeOf(AlertPopIn)).call(this, enteringView, leavingView, opts));

        var ele = enteringView.pageRef().nativeElement;
        var backdrop = new Animation(ele.querySelector('ion-backdrop'));
        var wrapper = new Animation(ele.querySelector('.alert-wrapper'));
        wrapper.fromTo('opacity', 0.01, 1).fromTo('scale', 1.1, 1);
        backdrop.fromTo('opacity', 0.01, 0.3);
        _this3.easing('ease-in-out').duration(200).add(backdrop).add(wrapper);
        return _this3;
    }

    return AlertPopIn;
}(Transition);

Transition.register('alert-pop-in', AlertPopIn);

var AlertPopOut = function (_Transition2) {
    _inherits(AlertPopOut, _Transition2);

    function AlertPopOut(enteringView, leavingView, opts) {
        _classCallCheck(this, AlertPopOut);

        var _this4 = _possibleConstructorReturn(this, (AlertPopOut.__proto__ || Object.getPrototypeOf(AlertPopOut)).call(this, enteringView, leavingView, opts));

        var ele = leavingView.pageRef().nativeElement;
        var backdrop = new Animation(ele.querySelector('ion-backdrop'));
        var wrapper = new Animation(ele.querySelector('.alert-wrapper'));
        wrapper.fromTo('opacity', 0.99, 0).fromTo('scale', 1, 0.9);
        backdrop.fromTo('opacity', 0.3, 0);
        _this4.easing('ease-in-out').duration(200).add(backdrop).add(wrapper);
        return _this4;
    }

    return AlertPopOut;
}(Transition);

Transition.register('alert-pop-out', AlertPopOut);

var AlertMdPopIn = function (_Transition3) {
    _inherits(AlertMdPopIn, _Transition3);

    function AlertMdPopIn(enteringView, leavingView, opts) {
        _classCallCheck(this, AlertMdPopIn);

        var _this5 = _possibleConstructorReturn(this, (AlertMdPopIn.__proto__ || Object.getPrototypeOf(AlertMdPopIn)).call(this, enteringView, leavingView, opts));

        var ele = enteringView.pageRef().nativeElement;
        var backdrop = new Animation(ele.querySelector('ion-backdrop'));
        var wrapper = new Animation(ele.querySelector('.alert-wrapper'));
        wrapper.fromTo('opacity', 0.01, 1).fromTo('scale', 1.1, 1);
        backdrop.fromTo('opacity', 0.01, 0.5);
        _this5.easing('ease-in-out').duration(200).add(backdrop).add(wrapper);
        return _this5;
    }

    return AlertMdPopIn;
}(Transition);

Transition.register('alert-md-pop-in', AlertMdPopIn);

var AlertMdPopOut = function (_Transition4) {
    _inherits(AlertMdPopOut, _Transition4);

    function AlertMdPopOut(enteringView, leavingView, opts) {
        _classCallCheck(this, AlertMdPopOut);

        var _this6 = _possibleConstructorReturn(this, (AlertMdPopOut.__proto__ || Object.getPrototypeOf(AlertMdPopOut)).call(this, enteringView, leavingView, opts));

        var ele = leavingView.pageRef().nativeElement;
        var backdrop = new Animation(ele.querySelector('ion-backdrop'));
        var wrapper = new Animation(ele.querySelector('.alert-wrapper'));
        wrapper.fromTo('opacity', 0.99, 0).fromTo('scale', 1, 0.9);
        backdrop.fromTo('opacity', 0.5, 0);
        _this6.easing('ease-in-out').duration(200).add(backdrop).add(wrapper);
        return _this6;
    }

    return AlertMdPopOut;
}(Transition);

Transition.register('alert-md-pop-out', AlertMdPopOut);

var AlertWpPopIn = function (_Transition5) {
    _inherits(AlertWpPopIn, _Transition5);

    function AlertWpPopIn(enteringView, leavingView, opts) {
        _classCallCheck(this, AlertWpPopIn);

        var _this7 = _possibleConstructorReturn(this, (AlertWpPopIn.__proto__ || Object.getPrototypeOf(AlertWpPopIn)).call(this, enteringView, leavingView, opts));

        var ele = enteringView.pageRef().nativeElement;
        var backdrop = new Animation(ele.querySelector('ion-backdrop'));
        var wrapper = new Animation(ele.querySelector('.alert-wrapper'));
        wrapper.fromTo('opacity', 0.01, 1).fromTo('scale', 1.3, 1);
        backdrop.fromTo('opacity', 0.01, 0.5);
        _this7.easing('cubic-bezier(0,0 0.05,1)').duration(200).add(backdrop).add(wrapper);
        return _this7;
    }

    return AlertWpPopIn;
}(Transition);

Transition.register('alert-wp-pop-in', AlertWpPopIn);

var AlertWpPopOut = function (_Transition6) {
    _inherits(AlertWpPopOut, _Transition6);

    function AlertWpPopOut(enteringView, leavingView, opts) {
        _classCallCheck(this, AlertWpPopOut);

        var _this8 = _possibleConstructorReturn(this, (AlertWpPopOut.__proto__ || Object.getPrototypeOf(AlertWpPopOut)).call(this, enteringView, leavingView, opts));

        var ele = leavingView.pageRef().nativeElement;
        var backdrop = new Animation(ele.querySelector('ion-backdrop'));
        var wrapper = new Animation(ele.querySelector('.alert-wrapper'));
        wrapper.fromTo('opacity', 0.99, 0).fromTo('scale', 1, 1.3);
        backdrop.fromTo('opacity', 0.5, 0);
        _this8.easing('ease-out').duration(150).add(backdrop).add(wrapper);
        return _this8;
    }

    return AlertWpPopOut;
}(Transition);

Transition.register('alert-wp-pop-out', AlertWpPopOut);
var alertIds = -1;
var _a, _b, _c, _d, _e;