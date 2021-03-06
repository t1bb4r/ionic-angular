var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { EventEmitter, provide, ReflectiveInjector } from '@angular/core';
import { addSelector } from '../../config/bootstrap';
import { Ion } from '../ion';
import { isBlank, isPresent, pascalCaseToDashCase } from '../../util/util';
import { NavController } from './nav-controller';
import { DIRECTION_BACK } from './nav-interfaces';
import { NavParams } from './nav-params';
import { SwipeBackGesture } from './swipe-back';
import { Transition } from '../../transitions/transition';
import { ViewController } from './view-controller';
/**
 * This class is for internal use only. It is not exported publicly.
 */

var NavControllerBase = function (_Ion) {
    _inherits(NavControllerBase, _Ion);

    function NavControllerBase(parent, _app, config, _keyboard, elementRef, _zone, _renderer, _compiler, _gestureCtrl) {
        _classCallCheck(this, NavControllerBase);

        var _this = _possibleConstructorReturn(this, (NavControllerBase.__proto__ || Object.getPrototypeOf(NavControllerBase)).call(this, elementRef));

        _this._app = _app;
        _this._keyboard = _keyboard;
        _this._zone = _zone;
        _this._renderer = _renderer;
        _this._compiler = _compiler;
        _this._gestureCtrl = _gestureCtrl;
        _this._transIds = 0;
        _this._init = false;
        _this._children = [];
        _this._ids = -1;
        _this._views = [];
        _this.trnsTime = 0;
        _this.parent = parent;
        _this.config = config;
        _this._trnsDelay = config.get('pageTransitionDelay');
        _this._sbEnabled = config.getBoolean('swipeBackEnabled');
        _this._sbThreshold = config.getNumber('swipeBackThreshold', 40);
        _this.id = 'n' + ++ctrlIds;
        _this.viewDidLoad = new EventEmitter();
        _this.viewWillEnter = new EventEmitter();
        _this.viewDidEnter = new EventEmitter();
        _this.viewWillLeave = new EventEmitter();
        _this.viewDidLeave = new EventEmitter();
        _this.viewWillUnload = new EventEmitter();
        _this.viewDidUnload = new EventEmitter();
        return _this;
    }

    _createClass(NavControllerBase, [{
        key: 'setViewport',
        value: function setViewport(val) {
            this._viewport = val;
        }
    }, {
        key: 'setRoot',
        value: function setRoot(page, params, opts) {
            return this.setPages([{ page: page, params: params }], opts);
        }
    }, {
        key: 'setPages',
        value: function setPages(pages, opts) {
            if (!pages || !pages.length) {
                return Promise.resolve(false);
            }
            if (isBlank(opts)) {
                opts = {};
            }
            // remove existing views
            var leavingView = this._remove(0, this._views.length);
            // create view controllers out of the pages and insert the new views
            var views = pages.map(function (p) {
                return new ViewController(p.page, p.params);
            });
            var enteringView = this._insert(0, views);
            // if animation wasn't set to true then default it to NOT animate
            if (opts.animate !== true) {
                opts.animate = false;
            }
            // set the nav direction to "back" if it wasn't set
            opts.direction = opts.direction || DIRECTION_BACK;
            var resolve = void 0;
            var promise = new Promise(function (res) {
                resolve = res;
            });
            // start the transition, fire resolve when done...
            this._transition(enteringView, leavingView, opts, function (hasCompleted) {
                // transition has completed!!
                resolve(hasCompleted);
            });
            return promise;
        }
    }, {
        key: 'push',
        value: function push(page, params, opts, done) {
            return this.insertPages(-1, [{ page: page, params: params }], opts, done);
        }
        /**
         * DEPRECATED: Please use inject the overlays controller and use the present method on the instance instead.
         */

    }, {
        key: 'present',
        value: function present(enteringView, opts) {
            // deprecated warning: added beta.11 2016-06-27
            console.warn('nav.present() has been deprecated.\n' + 'Please inject the overlay\'s controller and use the present method on the instance instead.');
            return Promise.resolve();
        }
    }, {
        key: 'insert',
        value: function insert(insertIndex, page, params, opts, done) {
            return this.insertPages(insertIndex, [{ page: page, params: params }], opts, done);
        }
    }, {
        key: 'insertPages',
        value: function insertPages(insertIndex, _insertPages, opts, done) {
            var views = _insertPages.map(function (p) {
                return new ViewController(p.page, p.params);
            });
            return this.insertViews(insertIndex, views, opts, done);
        }
    }, {
        key: 'insertViews',
        value: function insertViews(insertIndex, _insertViews) {
            var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
            var done = arguments[3];

            var promise = void 0;
            if (!done) {
                // only create a promise if a done callback wasn't provided
                promise = new Promise(function (res) {
                    done = res;
                });
            }
            if (!_insertViews || !_insertViews.length) {
                done(false);
                return promise;
            }
            if (isBlank(opts)) {
                opts = {};
            }
            // insert the new page into the stack
            // returns the newly created entering view
            var enteringView = this._insert(insertIndex, _insertViews);
            // manually set the new view's id if an id was passed in the options
            if (isPresent(opts.id)) {
                enteringView.id = opts.id;
            }
            // set the nav direction to "forward" if it wasn't set
            opts.direction = opts.direction || 'forward';
            // set which animation it should use if it wasn't set yet
            if (!opts.animation) {
                opts.animation = enteringView.getTransitionName(opts.direction);
            }
            // it's possible that the newly added view doesn't need to
            // transition in, but was simply inserted somewhere in the stack
            // go backwards through the stack and find the first active view
            // which could be active or one ready to enter
            for (var i = this._views.length - 1; i >= 0; i--) {
                if (this._views[i].state === STATE_ACTIVE || this._views[i].state === STATE_INIT_ENTER) {
                    // found the view at the end of the stack that's either
                    // already active or it is about to enter
                    if (this._views[i] === enteringView) {
                        // cool, so the last valid view is also our entering view!!
                        // this means we should animate that bad boy in so it's the active view
                        // return a promise and resolve when the transition has completed
                        // get the leaving view which the _insert() already set
                        var leavingView = this.getByState(STATE_INIT_LEAVE);
                        if (!leavingView && this._isPortal) {
                            // if we didn't find an active view, and this is a portal
                            var activeNav = this._app.getActiveNav();
                            if (activeNav) {
                                leavingView = activeNav.getByState(STATE_INIT_LEAVE);
                            }
                        }
                        // start the transition, fire resolve when done...
                        this._transition(enteringView, leavingView, opts, done);
                        return promise;
                    }
                    break;
                }
            }
            // the page was not pushed onto the end of the stack
            // but rather inserted somewhere in the middle or beginning
            // Since there are views after this new one, don't transition in
            // auto resolve cuz there was is no need for an animation
            done(enteringView);
            return promise;
        }
    }, {
        key: '_insert',
        value: function _insert(insertIndex, insertViews) {
            var _this2 = this;

            // when this is done, there should only be at most
            // 1 STATE_INIT_ENTER and 1 STATE_INIT_LEAVE
            // there should not be any that are STATE_ACTIVE after this is done
            // allow -1 to be passed in to auto push it on the end
            // and clean up the index if it's larger then the size of the stack
            if (insertIndex < 0 || insertIndex > this._views.length) {
                insertIndex = this._views.length;
            }
            // first see if there's an active view
            var view = this.getActive();
            if (!view && this._isPortal) {
                // if we didn't find an active view, and this is a portal
                var activeNav = this._app.getActiveNav();
                if (activeNav) {
                    view = activeNav.getActive();
                }
            }
            if (view) {
                // there's an active view, set that it's initialized to leave
                view.state = STATE_INIT_LEAVE;
            } else if (view = this.getByState(STATE_INIT_ENTER)) {
                // oh no, there's already a transition initalized ready to enter!
                // but it actually hasn't entered yet at all so lets
                // just keep it in the array, but not render or animate it in
                view.state = STATE_INACTIVE;
            }
            // insert each of the views in the pages array
            var insertView = null;
            insertViews.forEach(function (view, i) {
                insertView = view;
                // create the new entering view
                view.setNav(_this2);
                view.state = STATE_INACTIVE;
                // give this inserted view an ID
                view.id = _this2.id + '-' + ++_this2._ids;
                // insert the entering view into the correct index in the stack
                _this2._views.splice(insertIndex + i, 0, view);
            });
            if (insertView) {
                insertView.state = STATE_INIT_ENTER;
            }
            return insertView;
        }
    }, {
        key: 'pop',
        value: function pop(opts, done) {
            // get the index of the active view
            // which will become the view to be leaving
            var activeView = this.getByState(STATE_TRANS_ENTER) || this.getByState(STATE_INIT_ENTER) || this.getActive();
            return this.remove(this.indexOf(activeView), 1, opts, done);
        }
    }, {
        key: 'popToRoot',
        value: function popToRoot(opts, done) {
            return this.popTo(this.first(), opts, done);
        }
    }, {
        key: 'popTo',
        value: function popTo(view, opts, done) {
            var startIndex = this.indexOf(view);
            if (startIndex < 0) {
                return Promise.reject('View not found to pop to');
            }
            var activeView = this.getByState(STATE_TRANS_ENTER) || this.getByState(STATE_INIT_ENTER) || this.getActive();
            var removeCount = this.indexOf(activeView) - startIndex;
            return this.remove(startIndex + 1, removeCount, opts, done);
        }
    }, {
        key: 'remove',
        value: function remove() {
            var startIndex = arguments.length <= 0 || arguments[0] === undefined ? -1 : arguments[0];
            var removeCount = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

            var _this3 = this;

            var opts = arguments[2];
            var done = arguments[3];

            var promise = void 0;
            if (!done) {
                promise = new Promise(function (resolve) {
                    done = resolve;
                });
            }
            if (startIndex === -1) {
                startIndex = this._views.length - 1;
            } else if (startIndex < 0 || startIndex >= this._views.length) {
                console.error('index out of range removing view from nav');
                done(false);
                return promise;
            }
            if (isBlank(opts)) {
                opts = {};
            }
            // if not set, by default climb up the nav controllers if
            // there isn't a previous view in this nav controller
            if (isBlank(opts.climbNav)) {
                opts.climbNav = true;
            }
            // default the direction to "back"
            opts.direction = opts.direction || DIRECTION_BACK;
            // figure out the states of each view in the stack
            var leavingView = this._remove(startIndex, removeCount);
            if (!leavingView) {
                var forcedActive = this.getByState(STATE_FORCE_ACTIVE);
                if (forcedActive) {
                    // this scenario happens when a remove is going on
                    // during a transition
                    if (this._trans) {
                        this._trans.stop();
                        this._trans.destroy();
                        this._trans = null;
                        this._cleanup();
                    }
                    done(false);
                    return promise;
                }
            }
            if (leavingView) {
                // there is a view ready to leave, meaning that a transition needs
                // to happen and the previously active view is going to animate out
                // get the view thats ready to enter
                var enteringView = this.getByState(STATE_INIT_ENTER);
                if (!enteringView && this._isPortal) {
                    // if we didn't find an active view, and this is a portal
                    var activeNav = this._app.getActiveNav();
                    if (activeNav) {
                        enteringView = activeNav.last();
                        if (enteringView) {
                            enteringView.state = STATE_INIT_ENTER;
                        }
                    }
                }
                if (!enteringView && !this._isPortal) {
                    // oh nos! no entering view to go to!
                    // if there is no previous view that would enter in this nav stack
                    // and the option is set to climb up the nav parent looking
                    // for the next nav we could transition to instead
                    if (opts.climbNav) {
                        var parentNav = this.parent;
                        while (parentNav) {
                            if (!isTabs(parentNav)) {
                                // Tabs can be a parent, but it is not a collection of views
                                // only we're looking for an actual NavController w/ stack of views
                                leavingView.fireWillLeave();
                                this.viewWillLeave.emit(leavingView);
                                this._app.viewWillLeave.emit(leavingView);
                                return parentNav.pop(opts).then(function (rtnVal) {
                                    leavingView.fireDidLeave();
                                    _this3.viewDidLeave.emit(leavingView);
                                    _this3._app.viewDidLeave.emit(leavingView);
                                    return rtnVal;
                                });
                            }
                            parentNav = parentNav.parent;
                        }
                    }
                    // there's no previous view and there's no valid parent nav
                    // to climb to so this shouldn't actually remove the leaving
                    // view because there's nothing that would enter, eww
                    leavingView.state = STATE_ACTIVE;
                    done(false);
                    return promise;
                }
                if (!opts.animation) {
                    opts.animation = leavingView.getTransitionName(opts.direction);
                }
                // start the transition, fire resolve when done...
                this._transition(enteringView, leavingView, opts, done);
                return promise;
            }
            // no need to transition when the active view isn't being removed
            // there's still an active view after _remove() figured out states
            // so this means views that were only removed before the active
            // view, so auto-resolve since no transition needs to happen
            done(false);
            return promise;
        }
        /**
         * @private
         */

    }, {
        key: '_remove',
        value: function _remove(startIndex, removeCount) {
            var _this4 = this;

            // when this is done, there should only be at most
            // 1 STATE_INIT_ENTER and 1 STATE_INIT_LEAVE
            // there should not be any that are STATE_ACTIVE after this is done
            var view = null;
            // loop through each view that is set to be removed
            for (var i = startIndex, ii = removeCount + startIndex; i < ii; i++) {
                view = this.getByIndex(i);
                if (!view) break;
                if (view.state === STATE_TRANS_ENTER || view.state === STATE_TRANS_LEAVE) {
                    // oh no!!! this view should be removed, but it's
                    // actively transitioning in at the moment!!
                    // since it's viewable right now, let's just set that
                    // it should be removed after the transition
                    view.state = STATE_REMOVE_AFTER_TRANS;
                } else if (view.state === STATE_INIT_ENTER) {
                    // asked to be removed before it even entered!
                    view.state = STATE_CANCEL_ENTER;
                } else {
                    // if this view is already leaving then no need to immediately
                    // remove it, otherwise set the remove state
                    // this is useful if the view being removed isn't going to
                    // animate out, but just removed from the stack, no transition
                    view.state = STATE_REMOVE;
                }
            }
            if (view = this.getByState(STATE_INIT_LEAVE)) {
                // looks like there's already an active leaving view
                // reassign previous entering view to just be inactive
                var enteringView = this.getByState(STATE_INIT_ENTER);
                if (enteringView) {
                    enteringView.state = STATE_INACTIVE;
                }
                // from the index of the leaving view, go backwards and
                // find the first view that is inactive
                for (var i = this.indexOf(view) - 1; i >= 0; i--) {
                    if (this._views[i].state === STATE_INACTIVE) {
                        this._views[i].state = STATE_INIT_ENTER;
                        break;
                    }
                }
            } else if (view = this.getByState(STATE_TRANS_LEAVE)) {
                // an active transition is happening, but a new transition
                // still needs to happen force this view to be the active one
                view.state = STATE_FORCE_ACTIVE;
            } else if (view = this.getByState(STATE_REMOVE)) {
                // there is no active transition about to happen
                // find the first view that is supposed to be removed and
                // set that it is the init leaving view
                // the first view to be removed, it should init leave
                view.state = STATE_INIT_LEAVE;
                view.fireWillUnload();
                this.viewWillUnload.emit(view);
                this._app.viewWillUnload.emit(view);
                // from the index of the leaving view, go backwards and
                // find the first view that is inactive so it can be the entering
                for (var i = this.indexOf(view) - 1; i >= 0; i--) {
                    if (this._views[i].state === STATE_INACTIVE) {
                        this._views[i].state = STATE_INIT_ENTER;
                        break;
                    }
                }
            }
            // if there is still an active view, then it wasn't one that was
            // set to be removed, so there actually won't be a transition at all
            view = this.getActive();
            if (view) {
                // the active view remains untouched, so all the removes
                // must have happened before it, so really no need for transition
                view = this.getByState(STATE_INIT_ENTER);
                if (view) {
                    // if it was going to enter, then just make inactive
                    view.state = STATE_INACTIVE;
                }
                view = this.getByState(STATE_INIT_LEAVE);
                if (view) {
                    // this was going to leave, so just remove it completely
                    view.state = STATE_REMOVE;
                }
            }
            // remove views that have been set to be removed, but not
            // apart of any transitions that will eventually happen
            this._views.filter(function (v) {
                return v.state === STATE_REMOVE;
            }).forEach(function (view) {
                view.fireWillLeave();
                view.fireDidLeave();
                _this4._views.splice(_this4.indexOf(view), 1);
                view.destroy();
            });
            return this.getByState(STATE_INIT_LEAVE);
        }
        /**
         * @private
         */

    }, {
        key: '_transition',
        value: function _transition(enteringView, leavingView, opts, done) {
            var _this5 = this;

            var transId = ++this._transIds;
            if (enteringView === leavingView) {
                // if the entering view and leaving view are the same thing don't continue
                this._transFinish(transId, enteringView, leavingView, null, false, false);
                done(false);
                return;
            }
            if (isBlank(opts)) {
                opts = {};
            }
            this._setAnimate(opts);
            if (!leavingView) {
                // if no leaving view then create a bogus one
                leavingView = new ViewController();
            }
            if (!enteringView) {
                // if no entering view then create a bogus one
                enteringView = new ViewController();
                enteringView.fireLoaded();
            }
            /* Async steps to complete a transition
              1. _render: compile the view and render it in the DOM. Load page if it hasn't loaded already. When done call postRender
              2. _postRender: Run willEnter/willLeave, then wait a frame (change detection happens), then call beginTransition
              3. _beforeTrans: Create the transition's animation, play the animation, wait for it to end
              4. _afterTrans: Run didEnter/didLeave, call _transComplete()
              5. _transComplete: Cleanup, remove cache views, then call the final callback
            */
            // begin the multiple async process of transitioning to the entering view
            this._render(transId, enteringView, leavingView, opts, function (hasCompleted) {
                _this5._transFinish(transId, enteringView, leavingView, opts.direction, false, hasCompleted);
                done(hasCompleted);
            });
        }
        /**
         * @private
         */

    }, {
        key: '_setAnimate',
        value: function _setAnimate(opts) {
            if (this._views.length === 1 && !this._init && !this._isPortal || this.config.get('animate') === false) {
                opts.animate = false;
            }
        }
        /**
         * @private
         */

    }, {
        key: '_render',
        value: function _render(transId, enteringView, leavingView, opts, done) {
            var _this6 = this;

            // compile/load the view into the DOM
            if (enteringView.state === STATE_INACTIVE) {
                // this entering view is already set to inactive, so this
                // transition must be canceled, so don't continue
                return done();
            }
            enteringView.state = STATE_INIT_ENTER;
            leavingView.state = STATE_INIT_LEAVE;
            // remember if this nav is already transitioning or not
            var isAlreadyTransitioning = this.isTransitioning();
            if (enteringView.isLoaded()) {
                // already compiled this view, do not load again and continue
                this._postRender(transId, enteringView, leavingView, isAlreadyTransitioning, opts, done);
            } else {
                // view has not been compiled/loaded yet
                // continue once the view has finished compiling
                // DOM WRITE
                this.setTransitioning(true, 500);
                this.loadPage(enteringView, this._viewport, opts, function () {
                    enteringView.fireLoaded();
                    _this6.viewDidLoad.emit(enteringView);
                    _this6._app.viewDidLoad.emit(enteringView);
                    _this6._postRender(transId, enteringView, leavingView, isAlreadyTransitioning, opts, done);
                });
            }
        }
        /**
         * @private
         */

    }, {
        key: '_postRender',
        value: function _postRender(transId, enteringView, leavingView, isAlreadyTransitioning, opts, done) {
            var _this7 = this;

            // called after _render has completed and the view is compiled/loaded
            if (enteringView.state === STATE_INACTIVE) {
                // this entering view is already set to inactive, so this
                // transition must be canceled, so don't continue
                return done();
            }
            if (!opts.preload) {
                // the enteringView will become the active view, and is not being preloaded
                // set the correct zIndex for the entering and leaving views
                // if there's already another trans_enter happening then
                // the zIndex for the entering view should go off of that one
                // DOM WRITE
                var lastestLeavingView = this.getByState(STATE_TRANS_ENTER) || leavingView;
                this._setZIndex(enteringView, lastestLeavingView, opts.direction);
                // make sure the entering and leaving views are showing
                // DOM WRITE
                if (isAlreadyTransitioning) {
                    // the previous transition was still going when this one started
                    // so to be safe, only update showing the entering/leaving
                    // don't hide the others when they could still be transitioning
                    enteringView.domShow(true, this._renderer);
                    leavingView.domShow(true, this._renderer);
                } else {
                    // there are no other transitions happening but this one
                    // only entering/leaving should show, all others hidden
                    // also if a view is an overlay or the previous view is an
                    // overlay then always show the overlay and the view before it
                    this._views.forEach(function (view) {
                        view.domShow(_this7._isPortal || view === enteringView || view === leavingView, _this7._renderer);
                    });
                }
                // call each view's lifecycle events
                if (leavingView.fireOtherLifecycles) {
                    // only fire entering lifecycle if the leaving
                    // view hasn't explicitly set not to
                    enteringView.fireWillEnter();
                    this.viewWillEnter.emit(enteringView);
                    this._app.viewWillEnter.emit(enteringView);
                }
                if (enteringView.fireOtherLifecycles) {
                    // only fire leaving lifecycle if the entering
                    // view hasn't explicitly set not to
                    leavingView.fireWillLeave();
                    this.viewWillLeave.emit(leavingView);
                    this._app.viewWillLeave.emit(leavingView);
                }
            } else {
                // this view is being preloaded, don't call lifecycle events
                // transition does not need to animate
                opts.animate = false;
            }
            this._beforeTrans(enteringView, leavingView, opts, done);
        }
        /**
         * @private
         */

    }, {
        key: '_beforeTrans',
        value: function _beforeTrans(enteringView, leavingView, opts, done) {
            var _this8 = this;

            // called after one raf from postRender()
            // create the transitions animation, play the animation
            // when the transition ends call wait for it to end
            if (enteringView.state === STATE_INACTIVE || enteringView.state === STATE_CANCEL_ENTER) {
                // this entering view is already set to inactive or has been canceled
                // so this transition must not begin, so don't continue
                return done();
            }
            enteringView.state = STATE_TRANS_ENTER;
            leavingView.state = STATE_TRANS_LEAVE;
            // everything during the transition should runOutsideAngular
            this._zone.runOutsideAngular(function () {
                // init the transition animation
                var transitionOpts = {
                    animation: opts.animation,
                    direction: opts.direction,
                    duration: opts.duration,
                    easing: opts.easing,
                    renderDelay: opts.transitionDelay || _this8._trnsDelay,
                    isRTL: _this8.config.platform.isRTL(),
                    ev: opts.ev
                };
                var transAnimation = _this8._createTrans(enteringView, leavingView, transitionOpts);
                _this8._trans && _this8._trans.destroy();
                _this8._trans = transAnimation;
                if (opts.animate === false) {
                    // force it to not animate the elements, just apply the "to" styles
                    transAnimation.duration(0);
                }
                // check if a parent is transitioning and get the time that it ends
                var parentTransitionEndTime = _this8.getLongestTrans(Date.now());
                if (parentTransitionEndTime > 0) {
                    // the parent is already transitioning and has disabled the app
                    // so just update the local transitioning information
                    var duration = parentTransitionEndTime - Date.now();
                    _this8.setTransitioning(true, duration);
                } else {
                    // this is the only active transition (for now), so disable the app
                    var keyboardDurationPadding = 0;
                    if (_this8._keyboard.isOpen()) {
                        // add XXms to the duration the app is disabled when the keyboard is open
                        keyboardDurationPadding = 600;
                    }
                    var _duration = transAnimation.getDuration() + keyboardDurationPadding;
                    var enableApp = _duration < 64;
                    _this8._app.setEnabled(enableApp, _duration);
                    _this8.setTransitioning(!enableApp, _duration);
                }
                // create a callback for when the animation is done
                transAnimation.onFinish(function (trans) {
                    // transition animation has ended
                    // destroy the animation and it's element references
                    trans.destroy();
                    _this8._afterTrans(enteringView, leavingView, opts, trans.hasCompleted, done);
                });
                // cool, let's do this, start the transition
                if (opts.progressAnimation) {
                    // this is a swipe to go back, just get the transition progress ready
                    // kick off the swipe animation start
                    transAnimation.progressStart();
                } else {
                    // this is a normal animation
                    // kick it off and let it play through
                    transAnimation.play();
                }
            });
        }
        /**
         * @private
         */

    }, {
        key: '_afterTrans',
        value: function _afterTrans(enteringView, leavingView, opts, hasCompleted, done) {
            var _this9 = this;

            // transition has completed, update each view's state
            // place back into the zone, run didEnter/didLeave
            // call the final callback when done
            // run inside of the zone again
            this._zone.run(function () {
                if (!opts.preload && hasCompleted) {
                    if (leavingView.fireOtherLifecycles) {
                        // only fire entering lifecycle if the leaving
                        // view hasn't explicitly set not to
                        enteringView.fireDidEnter();
                        _this9.viewDidEnter.emit(enteringView);
                        _this9._app.viewDidEnter.emit(enteringView);
                    }
                    if (enteringView.fireOtherLifecycles && _this9._init) {
                        // only fire leaving lifecycle if the entering
                        // view hasn't explicitly set not to
                        // and after the nav has initialized
                        leavingView.fireDidLeave();
                        _this9.viewDidLeave.emit(leavingView);
                        _this9._app.viewDidLeave.emit(leavingView);
                    }
                }
                if (enteringView.state === STATE_INACTIVE) {
                    // this entering view is already set to inactive, so this
                    // transition must be canceled, so don't continue
                    return done(hasCompleted);
                }
                if (opts.keyboardClose !== false && _this9._keyboard.isOpen()) {
                    // the keyboard is still open!
                    // no problem, let's just close for them
                    _this9._keyboard.close();
                    _this9._keyboard.onClose(function () {
                        // keyboard has finished closing, transition complete
                        done(hasCompleted);
                    }, 32);
                } else {
                    // all good, transition complete
                    done(hasCompleted);
                }
            });
        }
        /**
         * @private
         */

    }, {
        key: '_transFinish',
        value: function _transFinish(transId, enteringView, leavingView, direction, updateUrl, hasCompleted) {
            var _this10 = this;

            // a transition has completed, but not sure if it's the last one or not
            // check if this transition is the most recent one or not
            if (enteringView.state === STATE_CANCEL_ENTER) {
                // this view was told to leave before it finished entering
                this.remove(enteringView.index, 1);
            }
            if (transId === this._transIds) {
                // ok, good news, there were no other transitions that kicked
                // off during the time this transition started and ended
                if (hasCompleted) {
                    // this transition has completed as normal
                    // so the entering one is now the active view
                    // and the leaving view is now just inactive
                    if (enteringView.state !== STATE_REMOVE_AFTER_TRANS) {
                        enteringView.state = STATE_ACTIVE;
                    }
                    if (leavingView.state !== STATE_REMOVE_AFTER_TRANS) {
                        leavingView.state = STATE_INACTIVE;
                    }
                    // only need to do all this clean up if the transition
                    // completed, otherwise nothing actually changed
                    // destroy all of the views that come after the active view
                    this._cleanup();
                    // make sure only this entering view and PREVIOUS view are the
                    // only two views that are not display:none
                    // do not make any changes to the stack's current visibility
                    // if there is an overlay somewhere in the stack
                    leavingView = this.getPrevious(enteringView);
                    if (this._isPortal) {
                        // ensure the entering view is showing
                        enteringView.domShow(true, this._renderer);
                    } else {
                        // only possibly hide a view if there are no overlays in the stack
                        this._views.forEach(function (view) {
                            view.domShow(view === enteringView || view === leavingView, _this10._renderer);
                        });
                    }
                    // this check only needs to happen once, which will add the css
                    // class to the nav when it's finished its first transition
                    this._init = true;
                } else {
                    // this transition has not completed, meaning the
                    // entering view did not end up as the active view
                    // this would happen when swipe to go back started
                    // but the user did not complete the swipe and the
                    // what was the active view stayed as the active view
                    leavingView.state = STATE_ACTIVE;
                    enteringView.state = STATE_INACTIVE;
                }
                // check if there is a parent actively transitioning
                var transitionEndTime = this.getLongestTrans(Date.now());
                // if transitionEndTime is greater than 0, there is a parent transition occurring
                // so delegate enabling the app to the parent.  If it <= 0, go ahead and enable the app
                if (transitionEndTime <= 0) {
                    this._app && this._app.setEnabled(true);
                }
                // update that this nav is not longer actively transitioning
                this.setTransitioning(false);
                // see if we should add the swipe back gesture listeners or not
                this._sbCheck();
            } else {
                // darn, so this wasn't the most recent transition
                // so while this one did end, there's another more recent one
                // still going on. Because a new transition is happening,
                // then this entering view isn't actually going to be the active
                // one, so only update the state to active/inactive if the state
                // wasn't already updated somewhere else during its transition
                if (enteringView.state === STATE_TRANS_ENTER) {
                    enteringView.state = STATE_INACTIVE;
                }
                if (leavingView.state === STATE_TRANS_LEAVE) {
                    leavingView.state = STATE_INACTIVE;
                }
            }
        }
        /**
         *@private
         * This method is just a wrapper to the Transition function of same name
         * to make it easy/possible to mock the method call by overriding the function.
         * In testing we don't want to actually do the animation, we want to return a stub instead
         */

    }, {
        key: '_createTrans',
        value: function _createTrans(enteringView, leavingView, transitionOpts) {
            return Transition.createTransition(enteringView, leavingView, transitionOpts);
        }
    }, {
        key: '_cleanup',
        value: function _cleanup() {
            var _this11 = this;

            // ok, cleanup time!! Destroy all of the views that are
            // INACTIVE and come after the active view
            var activeViewIndex = this.indexOf(this.getActive());
            var destroys = this._views.filter(function (v) {
                return v.state === STATE_REMOVE_AFTER_TRANS;
            });
            for (var i = activeViewIndex + 1; i < this._views.length; i++) {
                if (this._views[i].state === STATE_INACTIVE) {
                    destroys.push(this._views[i]);
                }
            }
            // all pages being destroyed should be removed from the list of
            // pages and completely removed from the dom
            destroys.forEach(function (view) {
                _this11._views.splice(_this11.indexOf(view), 1);
                view.destroy();
                _this11.viewDidUnload.emit(view);
                _this11._app.viewDidUnload.emit(view);
            });
            // if any z-index goes under 0, then reset them all
            var shouldResetZIndex = this._views.some(function (v) {
                return v.zIndex < 0;
            });
            if (shouldResetZIndex) {
                this._views.forEach(function (view) {
                    view.setZIndex(view.zIndex + INIT_ZINDEX + 1, _this11._renderer);
                });
            }
        }
    }, {
        key: 'getActiveChildNav',
        value: function getActiveChildNav() {
            return this._children[this._children.length - 1];
        }
        /**
         * @private
         */

    }, {
        key: 'registerChildNav',
        value: function registerChildNav(nav) {
            this._children.push(nav);
        }
        /**
         * @private
         */

    }, {
        key: 'unregisterChildNav',
        value: function unregisterChildNav(nav) {
            var index = this._children.indexOf(nav);
            if (index > -1) {
                this._children.splice(index, 1);
            }
        }
        /**
         * @private
         */

    }, {
        key: 'ngOnDestroy',
        value: function ngOnDestroy() {
            for (var i = this._views.length - 1; i >= 0; i--) {
                this._views[i].destroy();
            }
            this._views.length = 0;
            if (this.parent && this.parent.unregisterChildNav) {
                this.parent.unregisterChildNav(this);
            }
        }
        /**
         * @private
         */

    }, {
        key: 'loadPage',
        value: function loadPage(view, viewport, opts, done) {
            var _this12 = this;

            if (!viewport || !view.componentType) {
                return;
            }
            // TEMPORARY: automatically set selector w/ dah reflector
            // TODO: use componentFactory.create once fixed
            addSelector(view.componentType, 'ion-page');
            this._compiler.resolveComponent(view.componentType).then(function (componentFactory) {
                if (view.state === STATE_CANCEL_ENTER) {
                    // view may have already been removed from the stack
                    // if so, don't even bother adding it
                    view.destroy();
                    _this12._views.splice(view.index, 1);
                    return;
                }
                // add more providers to just this page
                var componentProviders = ReflectiveInjector.resolve([provide(NavController, { useValue: _this12 }), provide(ViewController, { useValue: view }), provide(NavParams, { useValue: view.getNavParams() })]);
                var childInjector = ReflectiveInjector.fromResolvedProviders(componentProviders, _this12._viewport.parentInjector);
                var componentRef = componentFactory.create(childInjector, null, null);
                viewport.insert(componentRef.hostView, viewport.length);
                // a new ComponentRef has been created
                // set the ComponentRef's instance to its ViewController
                view.setInstance(componentRef.instance);
                // the component has been loaded, so call the view controller's loaded method to load any dependencies into the dom
                view.loaded(function () {
                    // the ElementRef of the actual ion-page created
                    var pageElementRef = componentRef.location;
                    // remember the ChangeDetectorRef for this ViewController
                    view.setChangeDetector(componentRef.changeDetectorRef);
                    // remember the ElementRef to the ion-page elementRef that was just created
                    view.setPageRef(pageElementRef);
                    // auto-add page css className created from component JS class name
                    var cssClassName = pascalCaseToDashCase(view.componentType.name);
                    _this12._renderer.setElementClass(pageElementRef.nativeElement, cssClassName, true);
                    view.onDestroy(function () {
                        // ensure the element is cleaned up for when the view pool reuses this element
                        _this12._renderer.setElementAttribute(pageElementRef.nativeElement, 'class', null);
                        _this12._renderer.setElementAttribute(pageElementRef.nativeElement, 'style', null);
                        componentRef.destroy();
                    });
                    // our job is done here
                    done(view);
                });
            });
        }
        /**
         * @private
         */

    }, {
        key: 'swipeBackStart',
        value: function swipeBackStart() {
            // default the direction to "back"
            var opts = {
                direction: DIRECTION_BACK,
                progressAnimation: true
            };
            // figure out the states of each view in the stack
            var leavingView = this._remove(this._views.length - 1, 1);
            if (leavingView) {
                opts.animation = leavingView.getTransitionName(opts.direction);
                // get the view thats ready to enter
                var enteringView = this.getByState(STATE_INIT_ENTER);
                // start the transition, fire callback when done...
                this._transition(enteringView, leavingView, opts, function (hasCompleted) {
                    // swipe back has finished!!
                    console.debug('swipeBack, hasCompleted', hasCompleted);
                });
            }
        }
        /**
         * @private
         */

    }, {
        key: 'swipeBackProgress',
        value: function swipeBackProgress(stepValue) {
            if (this._trans && this._sbGesture) {
                // continue to disable the app while actively dragging
                this._app.setEnabled(false, 4000);
                this.setTransitioning(true, 4000);
                // set the transition animation's progress
                this._trans.progressStep(stepValue);
            }
        }
        /**
         * @private
         */

    }, {
        key: 'swipeBackEnd',
        value: function swipeBackEnd(shouldComplete, currentStepValue) {
            if (this._trans && this._sbGesture) {
                // the swipe back gesture has ended
                this._trans.progressEnd(shouldComplete, currentStepValue);
            }
        }
        /**
         * @private
         */

    }, {
        key: '_sbCheck',
        value: function _sbCheck() {
            var _this13 = this;

            if (this._sbEnabled) {
                // this nav controller can have swipe to go back
                if (!this._sbGesture) {
                    // create the swipe back gesture if we haven't already
                    var opts = {
                        edge: 'left',
                        threshold: this._sbThreshold
                    };
                    this._sbGesture = new SwipeBackGesture(this.getNativeElement(), opts, this, this._gestureCtrl);
                }
                if (this.canSwipeBack()) {
                    // it is be possible to swipe back
                    if (!this._sbGesture.isListening) {
                        this._zone.runOutsideAngular(function () {
                            // start listening if it's not already
                            console.debug('swipeBack gesture, listen');
                            _this13._sbGesture.listen();
                        });
                    }
                } else if (this._sbGesture.isListening) {
                    // it should not be possible to swipe back
                    // but the gesture is still listening
                    console.debug('swipeBack gesture, unlisten');
                    this._sbGesture.unlisten();
                }
            }
        }
    }, {
        key: 'canSwipeBack',
        value: function canSwipeBack() {
            return this._sbEnabled && !this.isTransitioning() && this._app.isEnabled() && this.canGoBack();
        }
    }, {
        key: 'canGoBack',
        value: function canGoBack() {
            var activeView = this.getActive();
            if (activeView) {
                return activeView.enableBack();
            }
            return false;
        }
    }, {
        key: 'isTransitioning',
        value: function isTransitioning(includeAncestors) {
            var now = Date.now();
            if (includeAncestors && this.getLongestTrans(now) > 0) {
                return true;
            }
            return this.trnsTime > now;
        }
    }, {
        key: 'setTransitioning',
        value: function setTransitioning(isTransitioning) {
            var fallback = arguments.length <= 1 || arguments[1] === undefined ? 700 : arguments[1];

            this.trnsTime = isTransitioning ? Date.now() + fallback : 0;
        }
    }, {
        key: 'getLongestTrans',
        value: function getLongestTrans(now) {
            // traverses parents upwards and looks at the time the
            // transition ends (if it's transitioning) and returns the
            // value that is the furthest into the future thus giving us
            // the longest transition duration
            var parentNav = this.parent;
            var transitionEndTime = -1;
            while (parentNav) {
                if (parentNav.trnsTime > transitionEndTime) {
                    transitionEndTime = parentNav.trnsTime;
                }
                parentNav = parentNav.parent;
            }
            // only check if the transitionTime is greater than the current time once
            return transitionEndTime > 0 && transitionEndTime > now ? transitionEndTime : 0;
        }
    }, {
        key: 'getByState',
        value: function getByState(state) {
            for (var i = this._views.length - 1; i >= 0; i--) {
                if (this._views[i].state === state) {
                    return this._views[i];
                }
            }
            return null;
        }
    }, {
        key: 'getByIndex',
        value: function getByIndex(index) {
            return index < this._views.length && index > -1 ? this._views[index] : null;
        }
    }, {
        key: 'getActive',
        value: function getActive() {
            return this.getByState(STATE_ACTIVE);
        }
    }, {
        key: 'isActive',
        value: function isActive(view) {
            // returns if the given view is the active view or not
            return !!(view && view.state === STATE_ACTIVE);
        }
    }, {
        key: 'getPrevious',
        value: function getPrevious(view) {
            // returns the view controller which is before the given view controller.
            return this.getByIndex(this.indexOf(view) - 1);
        }
    }, {
        key: 'first',
        value: function first() {
            // returns the first view controller in this nav controller's stack.
            return this._views.length ? this._views[0] : null;
        }
    }, {
        key: 'last',
        value: function last() {
            // returns the last page in this nav controller's stack.
            return this._views.length ? this._views[this._views.length - 1] : null;
        }
    }, {
        key: 'indexOf',
        value: function indexOf(view) {
            // returns the index number of the given view controller.
            return this._views.indexOf(view);
        }
    }, {
        key: 'length',
        value: function length() {
            return this._views.length;
        }
    }, {
        key: 'isSwipeBackEnabled',
        value: function isSwipeBackEnabled() {
            return this._sbEnabled;
        }
        /**
         * DEPRECATED: Please use app.getRootNav() instead
         */

    }, {
        key: 'dismissPageChangeViews',

        /**
         * @private
         * Dismiss all pages which have set the `dismissOnPageChange` property.
         */
        value: function dismissPageChangeViews() {
            this._views.forEach(function (view) {
                if (view.data && view.data.dismissOnPageChange) {
                    view.dismiss();
                }
            });
        }
        /**
         * @private
         */

    }, {
        key: '_setZIndex',
        value: function _setZIndex(enteringView, leavingView, direction) {
            if (enteringView) {
                // get the leaving view, which could be in various states
                if (!leavingView || !leavingView.isLoaded()) {
                    // the leavingView is a mocked view, either we're
                    // actively transitioning or it's the initial load
                    var previousView = this.getPrevious(enteringView);
                    if (previousView && previousView.isLoaded()) {
                        // we found a better previous view to reference
                        // use this one instead
                        enteringView.setZIndex(previousView.zIndex + 1, this._renderer);
                    } else {
                        // this is the initial view
                        enteringView.setZIndex(this._isPortal ? PORTAL_ZINDEX : INIT_ZINDEX, this._renderer);
                    }
                } else if (direction === DIRECTION_BACK) {
                    // moving back
                    enteringView.setZIndex(leavingView.zIndex - 1, this._renderer);
                } else {
                    // moving forward
                    enteringView.setZIndex(leavingView.zIndex + 1, this._renderer);
                }
            }
        }
    }, {
        key: 'rootNav',
        get: function get() {
            // deprecated 07-14-2016 beta.11
            console.warn('nav.rootNav() has been deprecated, please use app.getRootNav() instead');
            return this._app.getRootNav();
        }
    }]);

    return NavControllerBase;
}(Ion);

export { NavControllerBase };

export var isTabs = function isTabs(nav) {
    // Tabs (ion-tabs)
    return !!nav.getSelected;
};
export var isTab = function isTab(nav) {
    // Tab (ion-tab)
    return isPresent(nav._tabId);
};
export var isNav = function isNav(nav) {
    // Nav (ion-nav), Tab (ion-tab), Portal (ion-portal)
    return isPresent(nav.push);
};
export var STATE_ACTIVE = 1;
export var STATE_INACTIVE = 2;
export var STATE_INIT_ENTER = 3;
export var STATE_INIT_LEAVE = 4;
export var STATE_TRANS_ENTER = 5;
export var STATE_TRANS_LEAVE = 6;
export var STATE_REMOVE = 7;
export var STATE_REMOVE_AFTER_TRANS = 8;
export var STATE_CANCEL_ENTER = 9;
export var STATE_FORCE_ACTIVE = 10;
var INIT_ZINDEX = 100;
var PORTAL_ZINDEX = 9999;
var ctrlIds = -1;