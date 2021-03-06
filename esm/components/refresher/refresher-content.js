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
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NgIf } from '@angular/common';
import { Config } from '../../config/config';
import { Icon } from '../icon/icon';
import { Refresher } from './refresher';
import { Spinner } from '../spinner/spinner';
/**
 * @private
 */
export var RefresherContent = function () {
    function RefresherContent(r, _config) {
        _classCallCheck(this, RefresherContent);

        this.r = r;
        this._config = _config;
    }
    /**
     * @private
     */


    _createClass(RefresherContent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
            if (!this.pullingIcon) {
                this.pullingIcon = this._config.get('ionPullIcon', 'arrow-down');
            }
            if (!this.refreshingSpinner) {
                this.refreshingSpinner = this._config.get('ionRefreshingSpinner', this._config.get('spinner', 'ios'));
            }
        }
    }]);

    return RefresherContent;
}();
__decorate([Input(), __metadata('design:type', String)], RefresherContent.prototype, "pullingIcon", void 0);
__decorate([Input(), __metadata('design:type', String)], RefresherContent.prototype, "pullingText", void 0);
__decorate([Input(), __metadata('design:type', String)], RefresherContent.prototype, "refreshingSpinner", void 0);
__decorate([Input(), __metadata('design:type', String)], RefresherContent.prototype, "refreshingText", void 0);
RefresherContent = __decorate([Component({
    selector: 'ion-refresher-content',
    template: "\n    <div class=\"refresher-pulling\">\n      <div class=\"refresher-pulling-icon\" *ngIf=\"pullingIcon\">\n        <ion-icon [name]=\"pullingIcon\"></ion-icon>\n      </div>\n      <div class=\"refresher-pulling-text\" [innerHTML]=\"pullingText\" *ngIf=\"pullingText\"></div>\n    </div>\n    <div class=\"refresher-refreshing\">\n      <div class=\"refresher-refreshing-icon\">\n        <ion-spinner [name]=\"refreshingSpinner\"></ion-spinner>\n      </div>\n      <div class=\"refresher-refreshing-text\" [innerHTML]=\"refreshingText\" *ngIf=\"refreshingText\"></div>\n    </div>\n  ",
    directives: [Icon, NgIf, Spinner],
    host: {
        '[attr.state]': 'r.state'
    },
    encapsulation: ViewEncapsulation.None
}), __metadata('design:paramtypes', [typeof (_a = typeof Refresher !== 'undefined' && Refresher) === 'function' && _a || Object, typeof (_b = typeof Config !== 'undefined' && Config) === 'function' && _b || Object])], RefresherContent);
var _a, _b;