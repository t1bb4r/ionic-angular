var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

export function noop() {}
/**
 * Given a min and max, restrict the given number
 * to the range.
 * @param min the minimum
 * @param n the value
 * @param max the maximum
 */
export function clamp(min, n, max) {
    return Math.max(min, Math.min(n, max));
}
/**
 * The assign() method is used to copy the values of all enumerable own
 * properties from one or more source objects to a target object. It will
 * return the target object. When available, this method will use
 * `Object.assign()` under-the-hood.
 * @param target  The target object
 * @param source(s)  The source object
 */
export function assign() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    if (typeof Object.assign !== 'function') {
        // use the old-school shallow extend method
        return _baseExtend(args[0], [].slice.call(args, 1), false);
    }
    // use the built in ES6 Object.assign method
    return Object.assign.apply(null, args);
}
/**
 * Do a deep extend (merge).
 * @param dst the destination
 * @param ... the param objects
 */
export function merge(dst) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
    }

    return _baseExtend(dst, [].slice.call(arguments, 1), true);
}
function _baseExtend(dst, objs, deep) {
    for (var i = 0, ii = objs.length; i < ii; ++i) {
        var obj = objs[i];
        if (!obj || !isObject(obj) && !isFunction(obj)) continue;
        var keys = Object.keys(obj);
        for (var j = 0, jj = keys.length; j < jj; j++) {
            var key = keys[j];
            var src = obj[key];
            if (deep && isObject(src)) {
                if (!isObject(dst[key])) dst[key] = isArray(src) ? [] : {};
                _baseExtend(dst[key], [src], true);
            } else {
                dst[key] = src;
            }
        }
    }
    return dst;
}
export function debounce(fn, wait) {
    var immediate = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

    var timeout, args, context, timestamp, result;
    return function () {
        context = this;
        args = arguments;
        timestamp = Date.now();
        var later = function later() {
            var last = Date.now() - timestamp;
            if (last < wait) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) result = fn.apply(context, args);
            }
        };
        var callNow = immediate && !timeout;
        if (!timeout) {
            timeout = setTimeout(later, wait);
        }
        if (callNow) result = fn.apply(context, args);
        return result;
    };
}
/**
 * Apply default arguments if they don't exist in
 * the first object.
 * @param the destination to apply defaults to.
 */
export function defaults(dest) {
    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
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
export var isBoolean = function isBoolean(val) {
    return typeof val === 'boolean';
};
export var isString = function isString(val) {
    return typeof val === 'string';
};
export var isNumber = function isNumber(val) {
    return typeof val === 'number';
};
export var isFunction = function isFunction(val) {
    return typeof val === 'function';
};
export var isDefined = function isDefined(val) {
    return typeof val !== 'undefined';
};
export var isUndefined = function isUndefined(val) {
    return typeof val === 'undefined';
};
export var isPresent = function isPresent(val) {
    return val !== undefined && val !== null;
};
export var isBlank = function isBlank(val) {
    return val === undefined || val === null;
};
export var isObject = function isObject(val) {
    return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object';
};
export var isArray = Array.isArray;
export var isPrimitive = function isPrimitive(val) {
    return isString(val) || isBoolean(val) || isNumber(val) && !isNaN(val);
};
export var isTrueProperty = function isTrueProperty(val) {
    if (typeof val === 'string') {
        val = val.toLowerCase().trim();
        return val === 'true' || val === 'on' || val === '';
    }
    return !!val;
};
export var isCheckedProperty = function isCheckedProperty(a, b) {
    if (a === undefined || a === null || a === '') {
        return b === undefined || b === null || b === '';
    } else if (a === true || a === 'true') {
        return b === true || b === 'true';
    } else if (a === false || a === 'false') {
        return b === false || b === 'false';
    } else if (a === 0 || a === '0') {
        return b === 0 || b === '0';
    }
    // not using strict comparison on purpose
    /* tslint:disable */
    return a == b;
    /* tslint:enable */
};
/**
 * Convert a string in the format thisIsAString to a slug format this-is-a-string
 */
export function pascalCaseToDashCase() {
    var val = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

    return val.charAt(0).toLowerCase() + val.substring(1).replace(/[A-Z]/g, function (match) {
        return '-' + match.toLowerCase();
    });
}
var uid = 0;
export function nextUid() {
    return ++uid;
}
/**
 * Grab all query strings keys and values.
 * @param url
 */
export function getQuerystring(url) {
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
/**
 * @private
 */
export function reorderArray(array, indexes) {
    var element = array[indexes.from];
    array.splice(indexes.from, 1);
    array.splice(indexes.to, 0, element);
    return array;
}