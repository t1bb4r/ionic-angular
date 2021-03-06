var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { CSS, rafFrames, transitionEnd, nativeTimeout } from '../util/dom';
import { assign, isDefined } from '../util/util';
/**
 * @private
 *
 * - play
 * - Add before classes - DOM WRITE
 * - Remove before classes - DOM WRITE
 * - Add before inline styles - DOM WRITE
 * - set inline FROM styles - DOM WRITE
 * - RAF
 * - run before functions that have dom reads - DOM READ
 * - run before functions that have dom writes - DOM WRITE
 * - set css transition duration/easing - DOM WRITE
 * - RAF
 * - set inline TO styles - DOM WRITE
 */
export var Animation = function () {
    function Animation(ele) {
        var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, Animation);

        this._c = [];
        this._el = [];
        this._fx = {};
        this._dur = null;
        this._easing = null;
        this._bfSty = {};
        this._bfAdd = [];
        this._bfRmv = [];
        this._afSty = {};
        this._afAdd = [];
        this._afRmv = [];
        this._bfReadFns = [];
        this._bfWriteFns = [];
        this._fFns = [];
        this._fOnceFns = [];
        this._rv = false;
        this._lastUpd = 0;
        this.isPlaying = false;
        this.hasTween = false;
        this.hasCompleted = false;
        this.element(ele);
        this._opts = assign({
            renderDelay: 24
        }, opts);
    }
    /**
     * NO DOM
     */


    _createClass(Animation, [{
        key: '_reset',
        value: function _reset() {
            this._fx = {};
            this._bfSty = {};
            this._afSty = {};
            this._el.length = this._c.length = this._bfAdd.length = this._bfRmv.length = this._afAdd.length = this._afRmv.length = this._fFns.length = this._bfReadFns.length = this._bfWriteFns.length = this._fOnceFns.length = 0;
            this._easing = this._dur = null;
        }
    }, {
        key: 'element',
        value: function element(ele) {
            var i;
            if (ele) {
                if (typeof ele === 'string') {
                    ele = document.querySelectorAll(ele);
                    for (i = 0; i < ele.length; i++) {
                        this._addEle(ele[i]);
                    }
                } else if (ele.length) {
                    for (i = 0; i < ele.length; i++) {
                        this._addEle(ele[i]);
                    }
                } else {
                    this._addEle(ele);
                }
            }
            return this;
        }
        /**
         * NO DOM
         */

    }, {
        key: '_addEle',
        value: function _addEle(ele) {
            if (ele.nativeElement) {
                ele = ele.nativeElement;
            }
            if (ele.nodeType === 1) {
                this._el.push(ele);
            }
        }
        /**
         * NO DOM
         */

    }, {
        key: 'parent',
        value: function parent(parentAnimation) {
            this._parent = parentAnimation;
            return this;
        }
        /**
         * NO DOM
         */

    }, {
        key: 'add',
        value: function add(childAnimation) {
            childAnimation.parent(this);
            this._c.push(childAnimation);
            return this;
        }
        /**
         * NO DOM
         */

    }, {
        key: 'getDuration',
        value: function getDuration() {
            return this._dur !== null ? this._dur : this._parent && this._parent.getDuration() || 0;
        }
        /**
         * NO DOM
         */

    }, {
        key: 'duration',
        value: function duration(milliseconds) {
            this._dur = milliseconds;
            return this;
        }
        /**
         * NO DOM
         */

    }, {
        key: 'getEasing',
        value: function getEasing() {
            return this._easing !== null ? this._easing : this._parent && this._parent.getEasing() || null;
        }
        /**
         * NO DOM
         */

    }, {
        key: 'easing',
        value: function easing(name) {
            this._easing = name;
            return this;
        }
        /**
         * NO DOM
         */

    }, {
        key: 'from',
        value: function from(prop, val) {
            this._addProp('from', prop, val);
            return this;
        }
        /**
         * NO DOM
         */

    }, {
        key: 'to',
        value: function to(prop, val, clearProperyAfterTransition) {
            var fx = this._addProp('to', prop, val);
            if (clearProperyAfterTransition) {
                // if this effect is a transform then clear the transform effect
                // otherwise just clear the actual property
                this.after.clearStyles([fx.trans ? CSS.transform : prop]);
            }
            return this;
        }
        /**
         * NO DOM
         */

    }, {
        key: 'fromTo',
        value: function fromTo(prop, fromVal, toVal, clearProperyAfterTransition) {
            return this.from(prop, fromVal).to(prop, toVal, clearProperyAfterTransition);
        }
        /**
         * NO DOM
         */

    }, {
        key: '_addProp',
        value: function _addProp(state, prop, val) {
            var fxProp = this._fx[prop];
            if (!fxProp) {
                // first time we've see this EffectProperty
                fxProp = this._fx[prop] = {
                    trans: typeof TRANSFORMS[prop] !== 'undefined',
                    wc: ''
                };
                // add the will-change property for transforms or opacity
                if (fxProp.trans) {
                    fxProp.wc = CSS.transform;
                } else if (prop === 'opacity') {
                    fxProp.wc = prop;
                }
            }
            // add from/to EffectState to the EffectProperty
            var fxState = fxProp[state] = {
                val: val,
                num: null,
                unit: ''
            };
            if (typeof val === 'string' && val.indexOf(' ') < 0) {
                var r = val.match(CSS_VALUE_REGEX);
                var num = parseFloat(r[1]);
                if (!isNaN(num)) {
                    fxState.num = num;
                }
                fxState.unit = r[0] !== r[2] ? r[2] : '';
            } else if (typeof val === 'number') {
                fxState.num = val;
            }
            return fxProp;
        }
        /**
         * NO DOM
         */

    }, {
        key: 'play',

        /**
         * DOM WRITE
         */
        value: function play() {
            var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var self = this;
            var i;
            var dur = this._dur;
            if (isDefined(opts.duration)) {
                dur = opts.duration;
            }
            console.debug('Animation, play, duration', dur, 'easing', this._easing);
            // always default that an animation does not tween
            // a tween requires that an Animation class has an element
            // and that it has at least one FROM/TO effect
            // and that the FROM/TO effect can tween numeric values
            self.hasTween = false;
            self.hasCompleted = false;
            self.isPlaying = true;
            // this is the top level animation and is in full control
            // of when the async play() should actually kick off
            // if there is no duration then it'll set the TO property immediately
            // if there is a duration, then it'll stage all animations at the
            // FROM property and transition duration, wait a few frames, then
            // kick off the animation by setting the TO property for each animation
            // ensure all past transition end events have been cleared
            self._clearAsync();
            if (dur > 30) {
                // this animation has a duration, so it should animate
                // place all the elements with their FROM properties
                // set the FROM properties
                // ******** DOM WRITE ****************
                self._progress(0);
                // add the will-change or translateZ properties when applicable
                // ******** DOM WRITE ****************
                self._willChg(true);
                // set the async TRANSITION END event
                // and run onFinishes when the transition ends
                // ******** DOM WRITE ****************
                self._asyncEnd(dur, true);
                // begin each animation when everything is rendered in their place
                // and the transition duration/easing is ready to go
                rafFrames(self._opts.renderDelay / 16, function () {
                    // there's been a moment and the elements are in place
                    // fire off all the "before" function that have DOM READS in them
                    // elements will be in the DOM, however visibily hidden
                    // so we can read their dimensions if need be
                    // ******** DOM READ ****************
                    self._beforeReadFn();
                    // ******** DOM READS ABOVE / DOM WRITES BELOW ****************
                    // fire off all the "before" function that have DOM WRITES in them
                    // ******** DOM WRITE ****************
                    self._beforeWriteFn();
                    // stage all of the before css classes and inline styles
                    // will recursively stage all child elements
                    // ******** DOM WRITE ****************
                    self._before();
                    // now set the TRANSITION duration/easing
                    // ******** DOM WRITE ****************
                    self._setTrans(self._dur, false);
                    // wait a few moments again to wait for the transition
                    // info to take hold in the DOM
                    rafFrames(2, function () {
                        // browser had some time to render everything in place
                        // and the transition duration/easing is set
                        // now set the TO properties
                        // which will trigger the transition to begin
                        // ******** DOM WRITE ****************
                        self._progress(1);
                    });
                });
            } else {
                // this animation does not have a duration
                // but we still need to apply the styles and wait
                // a frame so we can accurately read the dimensions
                rafFrames(self._opts.renderDelay / 16, function () {
                    // fire off all the "before" function that have DOM READS in them
                    // elements will be in the DOM, however visibily hidden
                    // so we can read their dimensions if need be
                    // ******** DOM READ ****************
                    self._beforeReadFn();
                    // ******** DOM READS ABOVE / DOM WRITES BELOW ****************
                    // fire off all the "before" function that have DOM WRITES in them
                    // ******** DOM WRITE ****************
                    self._beforeWriteFn();
                    // ensure before css has ran
                    // ******** DOM WRITE ****************
                    self._before();
                    // this animation does not have a duration, so it should not animate
                    // just go straight to the TO properties and call it done
                    // ******** DOM WRITE ****************
                    self._progress(1);
                    // since there was no animation, immediately run the after
                    // ******** DOM WRITE ****************
                    self._after();
                    // since there was no animation, it's done
                    // fire off all the onFinishes
                    // and now you know
                    self._didFinish(true);
                });
            }
        }
        /**
         * DOM WRITE
         */

    }, {
        key: 'stop',
        value: function stop() {
            var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var self = this;
            var duration = isDefined(opts.duration) ? opts.duration : 0;
            var stepValue = isDefined(opts.stepValue) ? opts.stepValue : 1;
            // ensure all past transition end events have been cleared
            this._clearAsync();
            // set the TO properties
            // ******** DOM WRITE ****************
            self._progress(stepValue);
            if (duration > 30) {
                // this animation has a duration, so it should animate
                // place all the elements with their TO properties
                // now set the TRANSITION duration
                // ******** DOM WRITE ****************
                self._setTrans(duration, true);
                // set the async TRANSITION END event
                // and run onFinishes when the transition ends
                // ******** DOM WRITE ****************
                self._asyncEnd(duration, false);
            } else {
                // this animation does not have a duration, so it should not animate
                // just go straight to the TO properties and call it done
                // ******** DOM WRITE ****************
                self._after();
                // since there was no animation, it's done
                // fire off all the onFinishes
                self._didFinish(false);
            }
        }
        /**
         * DOM WRITE
         */

    }, {
        key: '_asyncEnd',
        value: function _asyncEnd(duration, shouldComplete) {
            var self = this;
            function onTransitionEnd(ev) {
                console.debug('Animation onTransitionEnd', ev.target.nodeName, ev.propertyName);
                // ensure transition end events and timeouts have been cleared
                self._clearAsync();
                // set the after styles
                // ******** DOM WRITE ****************
                self._after();
                // remove will change properties
                // ******** DOM WRITE ****************
                self._willChg(false);
                // transition finished
                self._didFinish(shouldComplete);
            }
            function onTransitionFallback() {
                console.debug('Animation onTransitionFallback');
                // oh noz! the transition end event didn't fire in time!
                // instead the fallback timer when first
                // clear the other async end events from firing
                self._tmr = 0;
                self._clearAsync();
                // too late to have a smooth animation, just finish it
                // ******** DOM WRITE ****************
                self._setTrans(0, true);
                // ensure the ending progress step gets rendered
                // ******** DOM WRITE ****************
                self._progress(1);
                // set the after styles
                // ******** DOM WRITE ****************
                self._after();
                // remove will change properties
                // ******** DOM WRITE ****************
                self._willChg(false);
                // transition finished
                self._didFinish(shouldComplete);
            }
            // set the TRANSITION END event on one of the transition elements
            self._unregTrans = transitionEnd(self._transEl(), onTransitionEnd);
            // set a fallback timeout if the transition end event never fires, or is too slow
            // transition end fallback: (animation duration + XXms)
            self._tmr = nativeTimeout(onTransitionFallback, duration + 400);
        }
        /**
         * NO DOM
         */

    }, {
        key: '_clearAsync',
        value: function _clearAsync() {
            this._unregTrans && this._unregTrans();
            if (this._tmr) {
                clearTimeout(this._tmr);
                this._tmr = 0;
            }
        }
        /**
         * DOM WRITE
         */

    }, {
        key: '_progress',
        value: function _progress(stepValue) {
            // bread 'n butter
            var i;
            var prop;
            var fx;
            var val;
            var transforms;
            var tweenEffect;
            for (i = 0; i < this._c.length; i++) {
                // ******** DOM WRITE ****************
                this._c[i]._progress(stepValue);
            }
            if (this._el.length) {
                // flip the number if we're going in reverse
                if (this._rv) {
                    stepValue = stepValue * -1 + 1;
                }
                transforms = [];
                for (prop in this._fx) {
                    fx = this._fx[prop];
                    if (fx.from && fx.to) {
                        tweenEffect = fx.from.num !== fx.to.num;
                        if (tweenEffect) {
                            this.hasTween = true;
                        }
                        if (stepValue === 0) {
                            // FROM
                            val = fx.from.val;
                        } else if (stepValue === 1) {
                            // TO
                            val = fx.to.val;
                        } else if (tweenEffect) {
                            // EVERYTHING IN BETWEEN
                            val = (fx.to.num - fx.from.num) * stepValue + fx.from.num + fx.to.unit;
                        } else {
                            val = null;
                        }
                        if (val !== null) {
                            if (fx.trans) {
                                transforms.push(prop + '(' + val + ')');
                            } else {
                                for (i = 0; i < this._el.length; i++) {
                                    // ******** DOM WRITE ****************
                                    this._el[i].style[prop] = val;
                                }
                            }
                        }
                    }
                }
                // place all transforms on the same property
                if (transforms.length) {
                    if (!SUPPORTS_WILL_CHANGE) {
                        // if the element doesn't support will-change
                        // then auto add translateZ for transform properties
                        transforms.push('translateZ(0px)');
                    }
                    for (i = 0; i < this._el.length; i++) {
                        // ******** DOM WRITE ****************
                        this._el[i].style[CSS.transform] = transforms.join(' ');
                    }
                }
            }
        }
        /**
         * DOM WRITE
         */

    }, {
        key: '_setTrans',
        value: function _setTrans(duration, forcedLinearEasing) {
            var i;
            var easing;
            // set the TRANSITION properties inline on the element
            for (i = 0; i < this._c.length; i++) {
                // ******** DOM WRITE ****************
                this._c[i]._setTrans(duration, forcedLinearEasing);
            }
            if (Object.keys(this._fx).length) {
                easing = forcedLinearEasing ? 'linear' : this.getEasing();
                for (i = 0; i < this._el.length; i++) {
                    if (duration > 0) {
                        // all parent/child animations should have the same duration
                        // ******** DOM WRITE ****************
                        this._el[i].style[CSS.transition] = '';
                        this._el[i].style[CSS.transitionDuration] = duration + 'ms';
                        // each animation can have a different easing
                        if (easing) {
                            // ******** DOM WRITE ****************
                            this._el[i].style[CSS.transitionTimingFn] = easing;
                        }
                    } else {
                        this._el[i].style[CSS.transition] = 'none';
                    }
                }
            }
        }
        /**
         * DOM WRITE
         */

    }, {
        key: '_willChg',
        value: function _willChg(addWillChange) {
            var i;
            var wc;
            var prop;
            for (i = 0; i < this._c.length; i++) {
                // ******** DOM WRITE ****************
                this._c[i]._willChg(addWillChange);
            }
            if (SUPPORTS_WILL_CHANGE) {
                wc = [];
                if (addWillChange) {
                    for (prop in this._fx) {
                        if (this._fx[prop].wc !== '') {
                            if (this._fx[prop].wc === 'webkitTransform') {
                                wc.push('transform', '-webkit-transform');
                            } else {
                                wc.push(this._fx[prop].wc);
                            }
                        }
                    }
                }
                for (i = 0; i < this._el.length; i++) {
                    // ******** DOM WRITE ****************
                    this._el[i].style['willChange'] = wc.join(',');
                }
            }
        }
        /**
         * DOM WRITE
         */

    }, {
        key: '_before',
        value: function _before() {
            // before the RENDER_DELAY
            // before the animations have started
            var i;
            var j;
            var prop;
            var ele;
            // stage all of the child animations
            for (i = 0; i < this._c.length; i++) {
                // ******** DOM WRITE ****************
                this._c[i]._before();
            }
            if (!this._rv) {
                for (i = 0; i < this._el.length; i++) {
                    ele = this._el[i];
                    // css classes to add before the animation
                    for (j = 0; j < this._bfAdd.length; j++) {
                        // ******** DOM WRITE ****************
                        ele.classList.add(this._bfAdd[j]);
                    }
                    // css classes to remove before the animation
                    for (j = 0; j < this._bfRmv.length; j++) {
                        // ******** DOM WRITE ****************
                        ele.classList.remove(this._bfRmv[j]);
                    }
                    // inline styles to add before the animation
                    for (prop in this._bfSty) {
                        // ******** DOM WRITE ****************
                        ele.style[prop] = this._bfSty[prop];
                    }
                }
            }
        }
        /**
         * DOM READ
         */

    }, {
        key: '_beforeReadFn',
        value: function _beforeReadFn() {
            var i;
            for (i = 0; i < this._c.length; i++) {
                // ******** DOM READ ****************
                this._c[i]._beforeReadFn();
            }
            for (i = 0; i < this._bfReadFns.length; i++) {
                // ******** DOM READ ****************
                this._bfReadFns[i]();
            }
        }
        /**
         * DOM WRITE
         */

    }, {
        key: '_beforeWriteFn',
        value: function _beforeWriteFn() {
            var i;
            for (i = 0; i < this._c.length; i++) {
                // ******** DOM WRITE ****************
                this._c[i]._beforeWriteFn();
            }
            for (i = 0; i < this._bfReadFns.length; i++) {
                // ******** DOM WRITE ****************
                this._bfWriteFns[i]();
            }
        }
        /**
         * DOM WRITE
         */

    }, {
        key: '_after',
        value: function _after() {
            // after the animations have finished
            var i;
            var j;
            var prop;
            var ele;
            for (i = 0; i < this._c.length; i++) {
                // ******** DOM WRITE ****************
                this._c[i]._after();
            }
            for (i = 0; i < this._el.length; i++) {
                ele = this._el[i];
                // remove the transition duration/easing
                // ******** DOM WRITE ****************
                ele.style[CSS.transitionDuration] = '';
                // ******** DOM WRITE ****************
                ele.style[CSS.transitionTimingFn] = '';
                if (this._rv) {
                    // finished in reverse direction
                    // css classes that were added before the animation should be removed
                    for (j = 0; j < this._bfAdd.length; j++) {
                        // ******** DOM WRITE ****************
                        ele.classList.remove(this._bfAdd[j]);
                    }
                    // css classes that were removed before the animation should be added
                    for (j = 0; j < this._bfRmv.length; j++) {
                        // ******** DOM WRITE ****************
                        ele.classList.add(this._bfRmv[j]);
                    }
                    // inline styles that were added before the animation should be removed
                    for (prop in this._bfSty) {
                        // ******** DOM WRITE ****************
                        ele.style[prop] = '';
                    }
                } else {
                    // finished in forward direction
                    // css classes to add after the animation
                    for (j = 0; j < this._afAdd.length; j++) {
                        // ******** DOM WRITE ****************
                        ele.classList.add(this._afAdd[j]);
                    }
                    // css classes to remove after the animation
                    for (j = 0; j < this._afRmv.length; j++) {
                        // ******** DOM WRITE ****************
                        ele.classList.remove(this._afRmv[j]);
                    }
                    // inline styles to add after the animation
                    for (prop in this._afSty) {
                        // ******** DOM WRITE ****************
                        ele.style[prop] = this._afSty[prop];
                    }
                }
            }
        }
        /**
         * DOM WRITE
         */

    }, {
        key: 'progressStart',
        value: function progressStart() {
            for (var i = 0; i < this._c.length; i++) {
                // ******** DOM WRITE ****************
                this._c[i].progressStart();
            }
            // ******** DOM WRITE ****************
            this._willChg(true);
            // ******** DOM WRITE ****************
            this._before();
            // force no duration, linear easing
            // ******** DOM WRITE ****************
            this._setTrans(0, true);
        }
        /**
         * DOM WRITE
         */

    }, {
        key: 'progressStep',
        value: function progressStep(stepValue) {
            var now = Date.now();
            // only update if the last update was more than 16ms ago
            if (now - 16 > this._lastUpd) {
                this._lastUpd = now;
                stepValue = Math.min(1, Math.max(0, stepValue));
                for (var i = 0; i < this._c.length; i++) {
                    // ******** DOM WRITE ****************
                    this._c[i].progressStep(stepValue);
                }
                if (this._rv) {
                    // if the animation is going in reverse then
                    // flip the step value: 0 becomes 1, 1 becomes 0
                    stepValue = stepValue * -1 + 1;
                }
                // ******** DOM WRITE ****************
                this._progress(stepValue);
            }
        }
        /**
         * DOM WRITE
         */

    }, {
        key: 'progressEnd',
        value: function progressEnd(shouldComplete, currentStepValue) {
            console.debug('Animation, progressEnd, shouldComplete', shouldComplete, 'currentStepValue', currentStepValue);
            for (var i = 0; i < this._c.length; i++) {
                // ******** DOM WRITE ****************
                this._c[i].progressEnd(shouldComplete, currentStepValue);
            }
            // set all the animations to their final position
            // ******** DOM WRITE ****************
            this._progress(shouldComplete ? 1 : 0);
            // if it's already at the final position, or close, then it's done
            // otherwise we need to add a transition end event listener
            if (currentStepValue < 0.05 || currentStepValue > 0.95) {
                // the progress was already left off at the point that is finished
                // for example, the left menu was dragged all the way open already
                // ******** DOM WRITE ****************
                this._after();
                // ******** DOM WRITE ****************
                this._willChg(false);
                this._didFinish(shouldComplete);
            } else {
                // the stepValue was left off at a point when it needs to finish transition still
                // for example, the left menu was opened 75% and needs to finish opening
                // ******** DOM WRITE ****************
                this._asyncEnd(64, shouldComplete);
                // force quick duration, linear easing
                // ******** DOM WRITE ****************
                this._setTrans(64, true);
            }
        }
        /**
         * POSSIBLE DOM READ/WRITE
         */

    }, {
        key: 'onFinish',
        value: function onFinish(callback) {
            var onceTimeCallback = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
            var clearOnFinishCallacks = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

            if (clearOnFinishCallacks) {
                this._fFns = [];
                this._fOnceFns = [];
            }
            if (onceTimeCallback) {
                this._fOnceFns.push(callback);
            } else {
                this._fFns.push(callback);
            }
            return this;
        }
        /**
         * POSSIBLE DOM READ/WRITE
         */

    }, {
        key: '_didFinish',
        value: function _didFinish(hasCompleted) {
            this.isPlaying = false;
            this.hasCompleted = hasCompleted;
            var i;
            for (i = 0; i < this._fFns.length; i++) {
                this._fFns[i](this);
            }
            for (i = 0; i < this._fOnceFns.length; i++) {
                this._fOnceFns[i](this);
            }
            this._fOnceFns = [];
        }
        /**
         * NO DOM
         */

    }, {
        key: 'reverse',
        value: function reverse() {
            var shouldReverse = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

            for (var i = 0; i < this._c.length; i++) {
                this._c[i].reverse(shouldReverse);
            }
            this._rv = shouldReverse;
            return this;
        }
        /**
         * DOM WRITE
         */

    }, {
        key: 'destroy',
        value: function destroy(removeElement) {
            var i;
            var ele;
            for (i = 0; i < this._c.length; i++) {
                // ******** DOM WRITE ****************
                this._c[i].destroy(removeElement);
            }
            if (removeElement) {
                for (i = 0; i < this._el.length; i++) {
                    ele = this._el[i];
                    // ******** DOM WRITE ****************
                    ele.parentNode && ele.parentNode.removeChild(ele);
                }
            }
            this._clearAsync();
            this._reset();
        }
        /**
         * NO DOM
         */

    }, {
        key: '_transEl',
        value: function _transEl() {
            // get the lowest level element that has an Animation
            var i;
            var targetEl;
            for (i = 0; i < this._c.length; i++) {
                targetEl = this._c[i]._transEl();
                if (targetEl) {
                    return targetEl;
                }
            }
            return this.hasTween && this._el.length ? this._el[0] : null;
        }
        // ***** STATIC CLASSES *********

    }, {
        key: 'before',
        get: function get() {
            var _this = this;

            return {
                addClass: function addClass(className) {
                    _this._bfAdd.push(className);
                    return _this;
                },
                removeClass: function removeClass(className) {
                    _this._bfRmv.push(className);
                    return _this;
                },
                setStyles: function setStyles(styles) {
                    _this._bfSty = styles;
                    return _this;
                },
                clearStyles: function clearStyles(propertyNames) {
                    for (var i = 0; i < propertyNames.length; i++) {
                        _this._bfSty[propertyNames[i]] = '';
                    }
                    return _this;
                },
                addDomReadFn: function addDomReadFn(domReadFn) {
                    _this._bfReadFns.push(domReadFn);
                    return _this;
                },
                addDomWriteFn: function addDomWriteFn(domWriteFn) {
                    _this._bfWriteFns.push(domWriteFn);
                    return _this;
                }
            };
        }
        /**
         * NO DOM
         */

    }, {
        key: 'after',
        get: function get() {
            var _this2 = this;

            return {
                addClass: function addClass(className) {
                    _this2._afAdd.push(className);
                    return _this2;
                },
                removeClass: function removeClass(className) {
                    _this2._afRmv.push(className);
                    return _this2;
                },
                setStyles: function setStyles(styles) {
                    _this2._afSty = styles;
                    return _this2;
                },
                clearStyles: function clearStyles(propertyNames) {
                    for (var i = 0; i < propertyNames.length; i++) {
                        _this2._afSty[propertyNames[i]] = '';
                    }
                    return _this2;
                }
            };
        }
    }], [{
        key: 'create',
        value: function create(name) {
            var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            var AnimationClass = AnimationRegistry[name];
            if (!AnimationClass) {
                // couldn't find an animation by the given name
                // fallback to just the base Animation class
                AnimationClass = Animation;
            }
            return new AnimationClass(null, opts);
        }
    }, {
        key: 'register',
        value: function register(name, AnimationClass) {
            AnimationRegistry[name] = AnimationClass;
        }
    }]);

    return Animation;
}();
var TRANSFORMS = {
    'translateX': 1, 'translateY': 1, 'translateZ': 1,
    'scale': 1, 'scaleX': 1, 'scaleY': 1, 'scaleZ': 1,
    'rotate': 1, 'rotateX': 1, 'rotateY': 1, 'rotateZ': 1,
    'skewX': 1, 'skewY': 1, 'perspective': 1
};
var CSS_VALUE_REGEX = /(^-?\d*\.?\d*)(.*)/;
var SUPPORTS_WILL_CHANGE = typeof document.documentElement.style['willChange'] !== 'undefined';
var AnimationRegistry = {};