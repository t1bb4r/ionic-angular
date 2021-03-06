"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var config_1 = require('../../config/config');
var infinite_scroll_1 = require('./infinite-scroll');
var spinner_1 = require('../spinner/spinner');
/**
 * @private
 */
var InfiniteScrollContent = (function () {
    function InfiniteScrollContent(inf, _config) {
        this.inf = inf;
        this._config = _config;
    }
    /**
     * @private
     */
    InfiniteScrollContent.prototype.ngOnInit = function () {
        if (!this.loadingSpinner) {
            this.loadingSpinner = this._config.get('infiniteLoadingSpinner', this._config.get('spinner', 'ios'));
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], InfiniteScrollContent.prototype, "loadingSpinner", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], InfiniteScrollContent.prototype, "loadingText", void 0);
    InfiniteScrollContent = __decorate([
        core_1.Component({
            selector: 'ion-infinite-scroll-content',
            template: '<div class="infinite-loading">' +
                '<div class="infinite-loading-spinner" *ngIf="loadingSpinner">' +
                '<ion-spinner [name]="loadingSpinner"></ion-spinner>' +
                '</div>' +
                '<div class="infinite-loading-text" [innerHTML]="loadingText" *ngIf="loadingText"></div>' +
                '</div>',
            directives: [common_1.NgIf, spinner_1.Spinner],
            host: {
                '[attr.state]': 'inf.state'
            },
            encapsulation: core_1.ViewEncapsulation.None,
        }), 
        __metadata('design:paramtypes', [infinite_scroll_1.InfiniteScroll, config_1.Config])
    ], InfiniteScrollContent);
    return InfiniteScrollContent;
}());
exports.InfiniteScrollContent = InfiniteScrollContent;
