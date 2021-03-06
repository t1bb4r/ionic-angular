var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { Animation } from '../../animations/animation';
import { MenuController } from './menu-controller';
/**
 * @private
 * Menu Type
 * Base class which is extended by the various types. Each
 * type will provide their own animations for open and close
 * and registers itself with Menu.
 */
export var MenuType = function () {
    function MenuType() {
        _classCallCheck(this, MenuType);

        this.ani = new Animation();
    }

    _createClass(MenuType, [{
        key: 'setOpen',
        value: function setOpen(shouldOpen, animated, done) {
            var ani = this.ani.onFinish(done, true).reverse(!shouldOpen);
            if (animated) {
                ani.play();
            } else {
                ani.play({ duration: 0 });
            }
        }
    }, {
        key: 'setProgressStart',
        value: function setProgressStart(isOpen) {
            this.isOpening = !isOpen;
            // the cloned animation should not use an easing curve during seek
            this.ani.reverse(isOpen).progressStart();
        }
    }, {
        key: 'setProgessStep',
        value: function setProgessStep(stepValue) {
            // adjust progress value depending if it opening or closing
            this.ani.progressStep(stepValue);
        }
    }, {
        key: 'setProgressEnd',
        value: function setProgressEnd(shouldComplete, currentStepValue, done) {
            var _this = this;

            var isOpen = this.isOpening && shouldComplete;
            if (!this.isOpening && !shouldComplete) {
                isOpen = true;
            }
            this.ani.onFinish(function () {
                _this.isOpening = false;
                done(isOpen);
            }, true);
            this.ani.progressEnd(shouldComplete, currentStepValue);
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.ani && this.ani.destroy();
        }
    }]);

    return MenuType;
}();
/**
 * @private
 * Menu Reveal Type
 * The content slides over to reveal the menu underneath.
 * The menu itself, which is under the content, does not move.
 */

var MenuRevealType = function (_MenuType) {
    _inherits(MenuRevealType, _MenuType);

    function MenuRevealType(menu, platform) {
        _classCallCheck(this, MenuRevealType);

        var _this2 = _possibleConstructorReturn(this, (MenuRevealType.__proto__ || Object.getPrototypeOf(MenuRevealType)).call(this));

        var openedX = menu.width() * (menu.side === 'right' ? -1 : 1) + 'px';
        _this2.ani.easing('ease').duration(250);
        var contentOpen = new Animation(menu.getContentElement());
        contentOpen.fromTo('translateX', '0px', openedX);
        _this2.ani.add(contentOpen);
        return _this2;
    }

    return MenuRevealType;
}(MenuType);

MenuController.registerType('reveal', MenuRevealType);
/**
 * @private
 * Menu Push Type
 * The content slides over to reveal the menu underneath.
 * The menu itself also slides over to reveal its bad self.
 */

var MenuPushType = function (_MenuType2) {
    _inherits(MenuPushType, _MenuType2);

    function MenuPushType(menu, platform) {
        _classCallCheck(this, MenuPushType);

        var _this3 = _possibleConstructorReturn(this, (MenuPushType.__proto__ || Object.getPrototypeOf(MenuPushType)).call(this));

        _this3.ani.easing('ease').duration(250);
        var contentOpenedX = void 0,
            menuClosedX = void 0,
            menuOpenedX = void 0;
        if (menu.side === 'right') {
            // right side
            contentOpenedX = -menu.width() + 'px';
            menuClosedX = menu.width() + 'px';
            menuOpenedX = '0px';
        } else {
            contentOpenedX = menu.width() + 'px';
            menuOpenedX = '0px';
            menuClosedX = -menu.width() + 'px';
        }
        var menuAni = new Animation(menu.getMenuElement());
        menuAni.fromTo('translateX', menuClosedX, menuOpenedX);
        _this3.ani.add(menuAni);
        var contentApi = new Animation(menu.getContentElement());
        contentApi.fromTo('translateX', '0px', contentOpenedX);
        _this3.ani.add(contentApi);
        return _this3;
    }

    return MenuPushType;
}(MenuType);

MenuController.registerType('push', MenuPushType);
/**
 * @private
 * Menu Overlay Type
 * The menu slides over the content. The content
 * itself, which is under the menu, does not move.
 */

var MenuOverlayType = function (_MenuType3) {
    _inherits(MenuOverlayType, _MenuType3);

    function MenuOverlayType(menu, platform) {
        _classCallCheck(this, MenuOverlayType);

        var _this4 = _possibleConstructorReturn(this, (MenuOverlayType.__proto__ || Object.getPrototypeOf(MenuOverlayType)).call(this));

        _this4.ani.easing('ease').duration(250);
        var closedX = void 0,
            openedX = void 0;
        if (menu.side === 'right') {
            // right side
            closedX = 8 + menu.width() + 'px';
            openedX = '0px';
        } else {
            // left side
            closedX = -(8 + menu.width()) + 'px';
            openedX = '0px';
        }
        var menuAni = new Animation(menu.getMenuElement());
        menuAni.fromTo('translateX', closedX, openedX);
        _this4.ani.add(menuAni);
        var backdropApi = new Animation(menu.getBackdropElement());
        backdropApi.fromTo('opacity', 0.01, 0.35);
        _this4.ani.add(backdropApi);
        return _this4;
    }

    return MenuOverlayType;
}(MenuType);

MenuController.registerType('overlay', MenuOverlayType);