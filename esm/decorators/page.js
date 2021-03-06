import { Component } from '@angular/core';
var _reflect = Reflect;
/**
 * @private
 */
export function Page(config) {
    return function (cls) {
        // deprecated warning: added beta.8 2016-05-27
        console.warn('@Page decorator has been deprecated. Please use Angular\'s @Component instead.\nimport { Component} from \'@angular/core\';');
        config.selector = 'ion-page';
        config.host = config.host || {};
        config.host['[hidden]'] = '_hidden';
        config.host['[class.tab-subpage]'] = '_tabSubPage';
        var annotations = _reflect.getMetadata('annotations', cls) || [];
        annotations.push(new Component(config));
        _reflect.defineMetadata('annotations', annotations, cls);
        return cls;
    };
}