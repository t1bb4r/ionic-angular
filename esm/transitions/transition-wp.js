function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Animation } from '../animations/animation';
import { PageTransition } from './page-transition';
var SHOW_BACK_BTN_CSS = 'show-back-button';
var SCALE_SMALL = .95;

var WPTransition = function (_PageTransition) {
    _inherits(WPTransition, _PageTransition);

    function WPTransition(enteringView, leavingView, opts) {
        _classCallCheck(this, WPTransition);

        // what direction is the transition going
        var _this = _possibleConstructorReturn(this, (WPTransition.__proto__ || Object.getPrototypeOf(WPTransition)).call(this, enteringView, leavingView, opts));

        var backDirection = opts.direction === 'back';
        // do they have navbars?
        var enteringHasNavbar = enteringView.hasNavbar();
        var leavingHasNavbar = leavingView && leavingView.hasNavbar();
        if (backDirection) {
            _this.duration(opts.duration || 120).easing('cubic-bezier(0.47,0,0.745,0.715)');
            _this.enteringPage.before.clearStyles(['scale']);
        } else {
            _this.duration(opts.duration || 280).easing('cubic-bezier(0,0 0.05,1)');
            _this.enteringPage.fromTo('scale', SCALE_SMALL, 1, true).fromTo('opacity', 0.01, 1, true);
        }
        if (enteringHasNavbar) {
            var enteringNavBar = new Animation(enteringView.navbarRef());
            enteringNavBar.before.addClass('show-navbar');
            _this.add(enteringNavBar);
            var enteringBackButton = new Animation(enteringView.backBtnRef());
            _this.add(enteringBackButton);
            if (enteringView.enableBack()) {
                enteringBackButton.before.addClass(SHOW_BACK_BTN_CSS);
            } else {
                enteringBackButton.before.removeClass(SHOW_BACK_BTN_CSS);
            }
        }
        // setup leaving view
        if (leavingView && backDirection) {
            // leaving content
            _this.duration(opts.duration || 200).easing('cubic-bezier(0.47,0,0.745,0.715)');
            var leavingPage = new Animation(leavingView.pageRef());
            _this.add(leavingPage.fromTo('scale', 1, SCALE_SMALL).fromTo('opacity', 0.99, 0));
        }
        return _this;
    }

    return WPTransition;
}(PageTransition);

PageTransition.register('wp-transition', WPTransition);