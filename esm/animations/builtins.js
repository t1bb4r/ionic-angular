function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Animation } from './animation';

var SlideIn = function (_Animation) {
    _inherits(SlideIn, _Animation);

    function SlideIn(element) {
        _classCallCheck(this, SlideIn);

        var _this = _possibleConstructorReturn(this, (SlideIn.__proto__ || Object.getPrototypeOf(SlideIn)).call(this, element));

        _this.easing('cubic-bezier(0.1,0.7,0.1,1)').duration(400).fromTo('translateY', '100%', '0%');
        return _this;
    }

    return SlideIn;
}(Animation);

Animation.register('slide-in', SlideIn);

var SlideOut = function (_Animation2) {
    _inherits(SlideOut, _Animation2);

    function SlideOut(element) {
        _classCallCheck(this, SlideOut);

        var _this2 = _possibleConstructorReturn(this, (SlideOut.__proto__ || Object.getPrototypeOf(SlideOut)).call(this, element));

        _this2.easing('ease-out').duration(250).fromTo('translateY', '0%', '100%');
        return _this2;
    }

    return SlideOut;
}(Animation);

Animation.register('slide-out', SlideOut);

var FadeIn = function (_Animation3) {
    _inherits(FadeIn, _Animation3);

    function FadeIn(element) {
        _classCallCheck(this, FadeIn);

        var _this3 = _possibleConstructorReturn(this, (FadeIn.__proto__ || Object.getPrototypeOf(FadeIn)).call(this, element));

        _this3.easing('ease-in').duration(400).fromTo('opacity', 0.001, 1, true);
        return _this3;
    }

    return FadeIn;
}(Animation);

Animation.register('fade-in', FadeIn);

var FadeOut = function (_Animation4) {
    _inherits(FadeOut, _Animation4);

    function FadeOut(element) {
        _classCallCheck(this, FadeOut);

        var _this4 = _possibleConstructorReturn(this, (FadeOut.__proto__ || Object.getPrototypeOf(FadeOut)).call(this, element));

        _this4.easing('ease-out').duration(250).fromTo('opacity', 0.999, 0);
        return _this4;
    }

    return FadeOut;
}(Animation);

Animation.register('fade-out', FadeOut);