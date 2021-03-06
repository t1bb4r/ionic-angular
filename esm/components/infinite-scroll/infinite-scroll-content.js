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
import { InfiniteScroll } from './infinite-scroll';
import { Spinner } from '../spinner/spinner';
/**
 * @private
 */
export var InfiniteScrollContent = function () {
    function InfiniteScrollContent(inf, _config) {
        _classCallCheck(this, InfiniteScrollContent);

        this.inf = inf;
        this._config = _config;
    }
    /**
     * @private
     */


    _createClass(InfiniteScrollContent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
            if (!this.loadingSpinner) {
                this.loadingSpinner = this._config.get('infiniteLoadingSpinner', this._config.get('spinner', 'ios'));
            }
        }
    }]);

    return InfiniteScrollContent;
}();
__decorate([Input(), __metadata('design:type', String)], InfiniteScrollContent.prototype, "loadingSpinner", void 0);
__decorate([Input(), __metadata('design:type', String)], InfiniteScrollContent.prototype, "loadingText", void 0);
InfiniteScrollContent = __decorate([Component({
    selector: 'ion-infinite-scroll-content',
    template: '<div class="infinite-loading">' + '<div class="infinite-loading-spinner" *ngIf="loadingSpinner">' + '<ion-spinner [name]="loadingSpinner"></ion-spinner>' + '</div>' + '<div class="infinite-loading-text" [innerHTML]="loadingText" *ngIf="loadingText"></div>' + '</div>',
    directives: [NgIf, Spinner],
    host: {
        '[attr.state]': 'inf.state'
    },
    encapsulation: ViewEncapsulation.None
}), __metadata('design:paramtypes', [typeof (_a = typeof InfiniteScroll !== 'undefined' && InfiniteScroll) === 'function' && _a || Object, typeof (_b = typeof Config !== 'undefined' && Config) === 'function' && _b || Object])], InfiniteScrollContent);
var _a, _b;