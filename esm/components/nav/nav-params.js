var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @name NavParams
 * @description
 * NavParams are an object that exists on a page and can contain data for that particular view.
 * Similar to how data was pass to a view in V1 with `$stateParams`, NavParams offer a much more flexible
 * option with a simple `get` method.
 *
 * @usage
 * ```ts
 * export class MyClass{
 *  constructor(public params: NavParams){
 *    // userParams is an object we have in our nav-parameters
 *    this.params.get('userParams');
 *  }
 * }
 * ```
 * @demo /docs/v2/demos/nav-params/
 * @see {@link /docs/v2/components#navigation Navigation Component Docs}
 * @see {@link ../NavController/ NavController API Docs}
 * @see {@link ../Nav/ Nav API Docs}
 * @see {@link ../NavPush/ NavPush API Docs}
 */
export var NavParams = function () {
  /**
   * @private
   * @param {TODO} data  TODO
   */
  function NavParams() {
    var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, NavParams);

    this.data = data;
  }
  /**
   * Get the value of a nav-parameter for the current view
   *
   * ```ts
   * export class MyClass{
   *  constructor(public params: NavParams){
   *    // userParams is an object we have in our nav-parameters
   *    this.params.get('userParams');
   *  }
   * }
   * ```
   *
   *
   * @param {string} parameter Which param you want to look up
   */


  _createClass(NavParams, [{
    key: "get",
    value: function get(param) {
      return this.data[param];
    }
  }]);

  return NavParams;
}();