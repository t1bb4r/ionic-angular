export declare function noop(): void;
/**
 * Given a min and max, restrict the given number
 * to the range.
 * @param min the minimum
 * @param n the value
 * @param max the maximum
 */
export declare function clamp(min: number, n: number, max: number): number;
/**
 * The assign() method is used to copy the values of all enumerable own
 * properties from one or more source objects to a target object. It will
 * return the target object. When available, this method will use
 * `Object.assign()` under-the-hood.
 * @param target  The target object
 * @param source(s)  The source object
 */
export declare function assign(...args: any[]): any;
/**
 * Do a deep extend (merge).
 * @param dst the destination
 * @param ... the param objects
 */
export declare function merge(dst: any, ...args: any[]): any;
export declare function debounce(fn: Function, wait: number, immediate?: boolean): any;
/**
 * Apply default arguments if they don't exist in
 * the first object.
 * @param the destination to apply defaults to.
 */
export declare function defaults(dest: any, ...args: any[]): any;
export declare const isBoolean: (val: any) => boolean;
export declare const isString: (val: any) => boolean;
export declare const isNumber: (val: any) => boolean;
export declare const isFunction: (val: any) => boolean;
export declare const isDefined: (val: any) => boolean;
export declare const isUndefined: (val: any) => boolean;
export declare const isPresent: (val: any) => boolean;
export declare const isBlank: (val: any) => boolean;
export declare const isObject: (val: any) => boolean;
export declare const isArray: (arg: any) => arg is any[];
export declare const isPrimitive: (val: any) => boolean;
export declare const isTrueProperty: (val: any) => boolean;
export declare const isCheckedProperty: (a: any, b: any) => boolean;
/**
 * Convert a string in the format thisIsAString to a slug format this-is-a-string
 */
export declare function pascalCaseToDashCase(val?: string): string;
export declare function nextUid(): number;
/**
 * Grab all query strings keys and values.
 * @param url
 */
export declare function getQuerystring(url: string): any;
/**
 * @private
 */
export declare function reorderArray(array: any[], indexes: {
    from: number;
    to: number;
}): any[];
