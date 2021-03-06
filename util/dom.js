"use strict";
// RequestAnimationFrame Polyfill (Android 4.3 and below)
/*! @author Paul Irish */
/*! @source https://gist.github.com/paulirish/1579671 */
(function () {
    var rafLastTime = 0;
    var win = window;
    if (!win.requestAnimationFrame) {
        win.requestAnimationFrame = function (callback) {
            var currTime = Date.now();
            var timeToCall = Math.max(0, 16 - (currTime - rafLastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            rafLastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!win.cancelAnimationFrame) {
        win.cancelAnimationFrame = function (id) { clearTimeout(id); };
    }
})();
// use native raf rather than the zone wrapped one
var originalRaf = (window[window['Zone']['__symbol__']('requestAnimationFrame')] || window[window['Zone']['__symbol__']('webkitRequestAnimationFrame')]);
// if the originalRaf from the Zone symbol is not available, we need to provide the polyfilled version
exports.nativeRaf = originalRaf !== undefined ? originalRaf['bind'](window) : window.requestAnimationFrame.bind(window);
// zone wrapped raf
exports.raf = window.requestAnimationFrame.bind(window);
exports.cancelRaf = window.cancelAnimationFrame.bind(window);
exports.nativeTimeout = window[window['Zone']['__symbol__']('setTimeout')]['bind'](window);
exports.clearNativeTimeout = window[window['Zone']['__symbol__']('clearTimeout')]['bind'](window);
function rafFrames(framesToWait, callback) {
    framesToWait = Math.ceil(framesToWait);
    if (framesToWait < 2) {
        exports.nativeRaf(callback);
    }
    else {
        exports.nativeTimeout(function () {
            exports.nativeRaf(callback);
        }, (framesToWait - 1) * 16.6667);
    }
}
exports.rafFrames = rafFrames;
exports.CSS = {};
(function () {
    // transform
    var i;
    var keys = ['webkitTransform', 'transform', '-webkit-transform', 'webkit-transform',
        '-moz-transform', 'moz-transform', 'MozTransform', 'mozTransform', 'msTransform'];
    for (i = 0; i < keys.length; i++) {
        if (document.documentElement.style[keys[i]] !== undefined) {
            exports.CSS.transform = keys[i];
            break;
        }
    }
    // transition
    keys = ['webkitTransition', 'mozTransition', 'msTransition', 'transition'];
    for (i = 0; i < keys.length; i++) {
        if (document.documentElement.style[keys[i]] !== undefined) {
            exports.CSS.transition = keys[i];
            break;
        }
    }
    // The only prefix we care about is webkit for transitions.
    var isWebkit = exports.CSS.transition.indexOf('webkit') > -1;
    // transition duration
    exports.CSS.transitionDuration = (isWebkit ? '-webkit-' : '') + 'transition-duration';
    // transition timing function
    exports.CSS.transitionTimingFn = (isWebkit ? '-webkit-' : '') + 'transition-timing-function';
    // transition delay
    exports.CSS.transitionDelay = (isWebkit ? '-webkit-' : '') + 'transition-delay';
    // To be sure transitionend works everywhere, include *both* the webkit and non-webkit events
    exports.CSS.transitionEnd = (isWebkit ? 'webkitTransitionEnd ' : '') + 'transitionend';
    // transform origin
    exports.CSS.transformOrigin = (isWebkit ? '-webkit-' : '') + 'transform-origin';
})();
function transitionEnd(el, callback) {
    if (el) {
        exports.CSS.transitionEnd.split(' ').forEach(function (eventName) {
            el.addEventListener(eventName, onEvent);
        });
        return unregister;
    }
    function unregister() {
        exports.CSS.transitionEnd.split(' ').forEach(function (eventName) {
            el.removeEventListener(eventName, onEvent);
        });
    }
    function onEvent(ev) {
        if (el === ev.target) {
            unregister();
            callback(ev);
        }
    }
}
exports.transitionEnd = transitionEnd;
function ready(callback) {
    var promise = null;
    if (!callback) {
        // a callback wasn't provided, so let's return a promise instead
        promise = new Promise(function (resolve) { callback = resolve; });
    }
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        callback();
    }
    else {
        document.addEventListener('DOMContentLoaded', completed, false);
        window.addEventListener('load', completed, false);
    }
    return promise;
    function completed() {
        document.removeEventListener('DOMContentLoaded', completed, false);
        window.removeEventListener('load', completed, false);
        callback();
    }
}
exports.ready = ready;
function windowLoad(callback) {
    var promise = null;
    if (!callback) {
        // a callback wasn't provided, so let's return a promise instead
        promise = new Promise(function (resolve) { callback = resolve; });
    }
    if (document.readyState === 'complete') {
        callback();
    }
    else {
        window.addEventListener('load', completed, false);
    }
    return promise;
    function completed() {
        window.removeEventListener('load', completed, false);
        callback();
    }
}
exports.windowLoad = windowLoad;
function pointerCoord(ev) {
    // get coordinates for either a mouse click
    // or a touch depending on the given event
    var c = { x: 0, y: 0 };
    if (ev) {
        var touches = ev.touches && ev.touches.length ? ev.touches : [ev];
        var e = (ev.changedTouches && ev.changedTouches[0]) || touches[0];
        if (e) {
            c.x = e.clientX || e.pageX || 0;
            c.y = e.clientY || e.pageY || 0;
        }
    }
    return c;
}
exports.pointerCoord = pointerCoord;
function hasPointerMoved(threshold, startCoord, endCoord) {
    var deltaX = (startCoord.x - endCoord.x);
    var deltaY = (startCoord.y - endCoord.y);
    var distance = deltaX * deltaX + deltaY * deltaY;
    return distance > (threshold * threshold);
}
exports.hasPointerMoved = hasPointerMoved;
function isActive(ele) {
    return !!(ele && (document.activeElement === ele));
}
exports.isActive = isActive;
function hasFocus(ele) {
    return isActive(ele) && (ele.parentElement.querySelector(':focus') === ele);
}
exports.hasFocus = hasFocus;
function isTextInput(ele) {
    return !!ele &&
        (ele.tagName === 'TEXTAREA' ||
            ele.contentEditable === 'true' ||
            (ele.tagName === 'INPUT' && !(/^(radio|checkbox|range|file|submit|reset|color|image|button)$/i).test(ele.type)));
}
exports.isTextInput = isTextInput;
function hasFocusedTextInput() {
    var ele = document.activeElement;
    if (isTextInput(ele)) {
        return (ele.parentElement.querySelector(':focus') === ele);
    }
    return false;
}
exports.hasFocusedTextInput = hasFocusedTextInput;
var skipInputAttrsReg = /^(value|checked|disabled|type|class|style|id|autofocus|autocomplete|autocorrect)$/i;
function copyInputAttributes(srcElement, destElement) {
    // copy attributes from one element to another
    // however, skip over a few of them as they're already
    // handled in the angular world
    var attrs = srcElement.attributes;
    for (var i = 0; i < attrs.length; i++) {
        var attr = attrs[i];
        if (!skipInputAttrsReg.test(attr.name)) {
            destElement.setAttribute(attr.name, attr.value);
        }
    }
}
exports.copyInputAttributes = copyInputAttributes;
var matchesFn;
var matchesMethods = ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector'];
matchesMethods.some(function (fn) {
    if (typeof document.documentElement[fn] === 'function') {
        matchesFn = fn;
        return true;
    }
});
function closest(ele, selector, checkSelf) {
    if (ele && matchesFn) {
        // traverse parents
        ele = (checkSelf ? ele : ele.parentElement);
        while (ele !== null) {
            if (ele[matchesFn](selector)) {
                return ele;
            }
            ele = ele.parentElement;
        }
    }
    return null;
}
exports.closest = closest;
/**
 * Get the element offsetWidth and offsetHeight. Values are cached
 * to reduce DOM reads. Cache is cleared on a window resize.
 */
function getDimensions(ele, id) {
    var dimensions = dimensionCache[id];
    if (!dimensions) {
        // make sure we got good values before caching
        if (ele.offsetWidth && ele.offsetHeight) {
            dimensions = dimensionCache[id] = {
                width: ele.offsetWidth,
                height: ele.offsetHeight,
                left: ele.offsetLeft,
                top: ele.offsetTop
            };
        }
        else {
            // do not cache bad values
            return { width: 0, height: 0, left: 0, top: 0 };
        }
    }
    return dimensions;
}
exports.getDimensions = getDimensions;
function clearDimensions(id) {
    delete dimensionCache[id];
}
exports.clearDimensions = clearDimensions;
function windowDimensions() {
    if (!dimensionCache.win) {
        // make sure we got good values before caching
        if (window.innerWidth && window.innerHeight) {
            dimensionCache.win = {
                width: window.innerWidth,
                height: window.innerHeight
            };
        }
        else {
            // do not cache bad values
            return { width: 0, height: 0 };
        }
    }
    return dimensionCache.win;
}
exports.windowDimensions = windowDimensions;
function flushDimensionCache() {
    dimensionCache = {};
}
exports.flushDimensionCache = flushDimensionCache;
var dimensionCache = {};
