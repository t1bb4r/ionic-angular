"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var bootstrap_1 = require('./config/bootstrap');
exports.ionicBootstrap = bootstrap_1.ionicBootstrap;
exports.ionicPostBootstrap = bootstrap_1.ionicPostBootstrap;
var config_1 = require('./config/config');
exports.Config = config_1.Config;
var directives_1 = require('./config/directives');
exports.IONIC_DIRECTIVES = directives_1.IONIC_DIRECTIVES;
var providers_1 = require('./config/providers');
exports.ionicProviders = providers_1.ionicProviders;
__export(require('./decorators/page'));
__export(require('./components'));
__export(require('./gestures/drag-gesture'));
__export(require('./gestures/gesture'));
__export(require('./gestures/slide-edge-gesture'));
__export(require('./gestures/slide-gesture'));
__export(require('./gestures/gesture-controller'));
__export(require('./platform/platform'));
__export(require('./platform/storage'));
__export(require('./util/click-block'));
__export(require('./util/events'));
__export(require('./util/keyboard'));
__export(require('./util/form'));
var util_1 = require('./util/util');
exports.reorderArray = util_1.reorderArray;
__export(require('./animations/animation'));
__export(require('./transitions/page-transition'));
__export(require('./transitions/transition'));
__export(require('./translation/translate'));
__export(require('./translation/translate_pipe'));
// these modules don't export anything
require('./config/modes');
require('./platform/registry');
require('./animations/builtins');
require('./transitions/transition-ios');
require('./transitions/transition-md');
require('./transitions/transition-wp');
