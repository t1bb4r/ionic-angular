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
import { Injectable } from '@angular/core';
/**
 * @private
 */
export var Form = function () {
    function Form() {
        _classCallCheck(this, Form);

        this._focused = null;
        this._ids = -1;
        this._inputs = [];
    }

    _createClass(Form, [{
        key: "register",
        value: function register(input) {
            this._inputs.push(input);
        }
    }, {
        key: "deregister",
        value: function deregister(input) {
            var index = this._inputs.indexOf(input);
            if (index > -1) {
                this._inputs.splice(index, 1);
            }
            if (input === this._focused) {
                this._focused = null;
            }
        }
    }, {
        key: "focusOut",
        value: function focusOut() {
            var activeElement = document.activeElement;
            activeElement && activeElement.blur && activeElement.blur();
        }
    }, {
        key: "setAsFocused",
        value: function setAsFocused(input) {
            this._focused = input;
        }
        /**
         * Focuses the next input element, if it exists.
         */

    }, {
        key: "tabFocus",
        value: function tabFocus(currentInput) {
            var index = this._inputs.indexOf(currentInput);
            if (index > -1 && index + 1 < this._inputs.length) {
                var nextInput = this._inputs[index + 1];
                if (nextInput !== this._focused) {
                    console.debug('tabFocus, next');
                    return nextInput.initFocus();
                }
            }
            index = this._inputs.indexOf(this._focused);
            if (index > 0) {
                var previousInput = this._inputs[index - 1];
                if (previousInput) {
                    console.debug('tabFocus, previous');
                    previousInput.initFocus();
                }
            }
        }
    }, {
        key: "nextId",
        value: function nextId() {
            return ++this._ids;
        }
    }]);

    return Form;
}();
Form = __decorate([Injectable(), __metadata('design:paramtypes', [])], Form);