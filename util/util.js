"use strict";
function noop() { }
exports.noop = noop;
/**
 * Given a min and max, restrict the given number
 * to the range.
 * @param min the minimum
 * @param n the value
 * @param max the maximum
 */
function clamp(min, n, max) {
    return Math.max(min, Math.min(n, max));
}
exports.clamp = clamp;
/**
 * The assign() method is used to copy the values of all enumerable own
 * properties from one or more source objects to a target object. It will
 * return the target object. When available, this method will use
 * `Object.assign()` under-the-hood.
 * @param target  The target object
 * @param source(s)  The source object
 */
function assign() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    if (typeof Object.assign !== 'function') {
        // use the old-school shallow extend method
        return _baseExtend(args[0], [].slice.call(args, 1), false);
    }
    // use the built in ES6 Object.assign method
    return Object.assign.apply(null, args);
}
exports.assign = assign;
/**
 * Do a deep extend (merge).
 * @param dst the destination
 * @param ... the param objects
 */
function merge(dst) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return _baseExtend(dst, [].slice.call(arguments, 1), true);
}
exports.merge = merge;
function _baseExtend(dst, objs, deep) {
    for (var i = 0, ii = objs.length; i < ii; ++i) {
        var obj = objs[i];
        if (!obj || !exports.isObject(obj) && !exports.isFunction(obj))
            continue;
        var keys = Object.keys(obj);
        for (var j = 0, jj = keys.length; j < jj; j++) {
            var key = keys[j];
            var src = obj[key];
            if (deep && exports.isObject(src)) {
                if (!exports.isObject(dst[key]))
                    dst[key] = exports.isArray(src) ? [] : {};
                _baseExtend(dst[key], [src], true);
            }
            else {
                dst[key] = src;
            }
        }
    }
    return dst;
}
function debounce(fn, wait, immediate) {
    if (immediate === void 0) { immediate = false; }
    var timeout, args, context, timestamp, result;
    return function () {
        context = this;
        args = arguments;
        timestamp = Date.now();
        var later = function () {
            var last = Date.now() - timestamp;
            if (last < wait) {
                timeout = setTimeout(later, wait - last);
            }
            else {
                timeout = null;
                if (!immediate)
                    result = fn.apply(context, args);
            }
        };
        var callNow = immediate && !timeout;
        if (!timeout) {
            timeout = setTimeout(later, wait);
        }
        if (callNow)
            result = fn.apply(context, args);
        return result;
    };
}
exports.debounce = debounce;
/**
 * Apply default arguments if they don't exist in
 * the first object.
 * @param the destination to apply defaults to.
 */
function defaults(dest) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    for (var i = arguments.length - 1; i >= 1; i--) {
        var source = arguments[i] || {};
        for (var key in source) {
            if (source.hasOwnProperty(key) && !dest.hasOwnProperty(key)) {
                dest[key] = source[key];
            }
        }
    }
    return dest;
}
exports.defaults = defaults;
exports.isBoolean = function (val) { return typeof val === 'boolean'; };
exports.isString = function (val) { return typeof val === 'string'; };
exports.isNumber = function (val) { return typeof val === 'number'; };
exports.isFunction = function (val) { return typeof val === 'function'; };
exports.isDefined = function (val) { return typeof val !== 'undefined'; };
exports.isUndefined = function (val) { return typeof val === 'undefined'; };
exports.isPresent = function (val) { return val !== undefined && val !== null; };
exports.isBlank = function (val) { return val === undefined || val === null; };
exports.isObject = function (val) { return typeof val === 'object'; };
exports.isArray = Array.isArray;
exports.isPrimitive = function (val) {
    return exports.isString(val) || exports.isBoolean(val) || (exports.isNumber(val) && !isNaN(val));
};
exports.isTrueProperty = function (val) {
    if (typeof val === 'string') {
        val = val.toLowerCase().trim();
        return (val === 'true' || val === 'on' || val === '');
    }
    return !!val;
};
exports.isCheckedProperty = function (a, b) {
    if (a === undefined || a === null || a === '') {
        return (b === undefined || b === null || b === '');
    }
    else if (a === true || a === 'true') {
        return (b === true || b === 'true');
    }
    else if (a === false || a === 'false') {
        return (b === false || b === 'false');
    }
    else if (a === 0 || a === '0') {
        return (b === 0 || b === '0');
    }
    // not using strict comparison on purpose
    /* tslint:disable */
    return (a == b);
    /* tslint:enable */
};
/**
 * Convert a string in the format thisIsAString to a slug format this-is-a-string
 */
function pascalCaseToDashCase(val) {
    if (val === void 0) { val = ''; }
    return val.charAt(0).toLowerCase() + val.substring(1).replace(/[A-Z]/g, function (match) {
        return '-' + match.toLowerCase();
    });
}
exports.pascalCaseToDashCase = pascalCaseToDashCase;
var uid = 0;
function nextUid() {
    return ++uid;
}
exports.nextUid = nextUid;
/**
 * Grab all query strings keys and values.
 * @param url
 */
function getQuerystring(url) {
    var queryParams = {};
    if (url) {
        var startIndex = url.indexOf('?');
        if (startIndex !== -1) {
            var queries = url.slice(startIndex + 1).split('&');
            for (var i = 0; i < queries.length; i++) {
                if (queries[i].indexOf('=') > 0) {
                    var split = queries[i].split('=');
                    if (split.length > 1) {
                        queryParams[split[0].toLowerCase()] = split[1].split('#')[0];
                    }
                }
            }
        }
    }
    return queryParams;
}
exports.getQuerystring = getQuerystring;
/**
 * @private
 */
function reorderArray(array, indexes) {
    var element = array[indexes.from];
    array.splice(indexes.from, 1);
    array.splice(indexes.to, 0, element);
    return array;
}
exports.reorderArray = reorderArray;
