var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = this && this.__param || function (paramIndex, decorator) {
    return function (target, key) {
        decorator(target, key, paramIndex);
    };
};
import { ChangeDetectionStrategy, Component, Directive, ElementRef, EventEmitter, Input, Host, Output, Renderer, ViewEncapsulation } from '@angular/core';
import { Animation } from '../../animations/animation';
import { Gesture } from '../../gestures/gesture';
import { CSS } from '../../util/dom';
import { debounce, defaults, isTrueProperty, isPresent } from '../../util/util';
import { dom } from '../../util';
import { Ion } from '../ion';
import { Swiper } from './swiper-widget';
/**
 * @name Slides
 * @description
 * The Slides component is a multi-section container. Each section can be swiped
 * or dragged between. It contains any number of [Slide](../Slide) components.
 *
 *
 * ### Creating
 * You should use a template to create slides and listen to slide events. The template
 * should contain the slide container, an `<ion-slides>` element, and any number of
 * [Slide](../Slide) components, written as `<ion-slide>`. Any configuration of the
 * slides should be passed in the `options` property of the `<ion-slides>` element.
 * You can listen to events such as the slide changing by placing the event on the
 * `<ion-slides>` element. See [Usage](#usage) below for more information on
 * creating slides.
 *
 *
 * ### Configuring
 * There are several configuration options that can be passed to Slides. These should
 * be passed in the `options` property of the `<ion-slides>` element upon creation.
 * You can allow the slides to loop around from the last to the first, set autoplay
 * on the slides so it will automatically switch between them, and more.
 *
 * Properties to pass in options:
 *
 * | Property              | Type      | Default        | Description                                                                                |
 * |-----------------------|-----------|----------------|--------------------------------------------------------------------------------------------|
 * | autoplay              | `number`  | -              | Delay between transitions (in ms). If this parameter is not passed, autoplay is disabled.  |
 * | direction             | `string`  | 'horizontal'   | Swipe direction: 'horizontal' or 'vertical'.                                               |
 * | initialSlide          | `number`  | 0              | Index number of initial slide                                                              |
 * | loop                  | `boolean` | false          | Whether to continuously loop from the last slide to the first slide.                       |
 * | pager                 | `boolean` | false          | Show the pagination bullets.                                                               |
 * | speed                 | `number`  | 300            | Duration of transition between slides (in ms).                                             |
 *
 * See [Usage](#usage) below for more information on configuring slides.
 *
 *
 * ### Navigating
 * After creating and configuring the slides, you can navigate between them
 * by swiping or calling methods on the `Slides` instance. You can call `slideTo()` to
 * navigate to a specific slide, or `slideNext()` to change to the slide that follows
 * the active slide. All of the [methods](#instance-members) provided by the `Slides`
 * instance are listed below. See [Usage](#usage) below for more information on
 * navigating between slides.
 *
 *
 * ### Limitations
 * The Slides component wraps the [Swiper](http://www.idangero.us/swiper/) component
 * built by iDangero.us. This means that all of the Swiper API isn't exposed on the
 * Slides component. See the [`getSlider()`](#getSlider) method for information on
 * getting the `Swiper` instance and using its methods directly.
 *
 *
 * @usage
 *
 * You can add slides to a `@Component` using the following template:
 *
 * ```html
 * <ion-slides>
 *   <ion-slide>
 *     <h1>Slide 1</h1>
 *   </ion-slide>
 *   <ion-slide>
 *     <h1>Slide 2</h1>
 *   </ion-slide>
 *   <ion-slide>
 *     <h1>Slide 3</h1>
 *   </ion-slide>
 * </ion-slides>
 * ```
 *
 * To add [options](#configuring), we will define them in `mySlideOptions` in our class `MyPage`:
 *
 * ```ts
 * import { Component } from '@angular/core';
 * import { Slides } from 'ionic-angular';
 *
 * @Component({
 *   templateUrl: 'my-page.html'
 * })
 * class MyPage {
 *   mySlideOptions = {
 *     initialSlide: 1,
 *     loop: true
 *   };
 * }
 * ```
 *
 * This is setting the second slide as the initial slide on load, since
 * the `initialSlide` begins at `0`. We are also setting `loop` to true which
 * allows us to swipe from the last slide to the first continuously. Then,
 * we will pass `mySlideOptions` in the `options` property of the `<ion-slides>`
 * element. We are using [property binding](https://angular.io/docs/ts/latest/guide/template-syntax.html#!#property-binding)
 * on `options` because `mySlideOptions` is an expression:
 *
 * ```html
 * <ion-slides [options]="mySlideOptions">
 * ```
 *
 * To grab a reference to the Slides, we will add a [local template variable](https://angular.io/docs/ts/latest/guide/template-syntax.html#!#local-vars)
 * to `<ion-slides>` called `mySlider`:
 *
 * ```html
 * <ion-slides #mySlider [options]="mySlideOptions">
 * ```
 *
 * Next, we can use `ViewChild` to assign the Slides instance to `slider`:
 *
 * ```ts
 * import { ViewChild } from '@angular/core';
 *
 * class MyPage {
 *   @ViewChild('mySlider') slider: Slides;
 *
 *   ...
 * }
 * ```
 *
 * Now we can call any of the `Slider` [methods](#instance-members),
 * for example we can use the Slider's `slideTo()` method in order to
 * navigate to a specific slide on a button click. Below we call the
 * `goToSlide()` method and it navigates to the 3rd slide:
 *
 * ```ts
 * class MyPage {
 *   ...
 *
 *   goToSlide() {
 *     this.slider.slideTo(2, 500);
 *   }
 * }
 * ```
 *
 * We can also add events to listen to on the `<ion-slides>` element.
 * Let's add the `ionDidChange` event and call a method when the slide changes:
 *
 * ```html
 * <ion-slides #mySlider (ionDidChange)="onSlideChanged()" [options]="mySlideOptions">
 * ```
 *
 * In our class, we add the `onSlideChanged()` method which gets the active
 * index and prints it:
 *
 * ```ts
 * class MyPage {
 *   ...
 *
 *   onSlideChanged() {
 *     let currentIndex = this.slider.getActiveIndex();
 *     console.log("Current index is", currentIndex);
 *   }
 * }
 * ```
 *
 * For all of the methods you can call on the `Slider` instance, see the
 * [Instance Members](#instance-members).
 *
 * @demo /docs/v2/demos/slides/
 * @see {@link /docs/v2/components#slides Slides Component Docs}
 *
 * Swiper.js:
 * The most modern mobile touch slider and framework with hardware accelerated transitions
 *
 * http://www.idangero.us/swiper/
 *
 * Copyright 2015, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under MIT
 */
export var Slides = function (_Ion) {
    _inherits(Slides, _Ion);

    function Slides(elementRef, renderer) {
        _classCallCheck(this, Slides);

        /**
         * @output {any} Expression to evaluate when a slide change starts.
         */
        var _this = _possibleConstructorReturn(this, (Slides.__proto__ || Object.getPrototypeOf(Slides)).call(this, elementRef));

        _this.ionWillChange = new EventEmitter();
        /**
         * @output {any} Expression to evaluate when a slide change ends.
         */
        _this.ionDidChange = new EventEmitter();
        /**
         * @output {any} Expression to evaluate when a slide moves.
         */
        _this.ionDrag = new EventEmitter();
        _this.rapidUpdate = debounce(function () {
            _this.update();
        }, 10);
        _this.id = ++slidesId;
        _this.slideId = 'slides-' + _this.id;
        renderer.setElementClass(elementRef.nativeElement, _this.slideId, true);
        return _this;
    }
    /**
     * @private
     */


    _createClass(Slides, [{
        key: "ngOnInit",
        value: function ngOnInit() {
            var _this2 = this;

            if (!this.options) {
                this.options = {};
            }
            if (isPresent(this.options.pager)) {
                this.showPager = isTrueProperty(this.options.pager);
            }
            var paginationId = '.' + this.slideId + ' .swiper-pagination';
            var options = defaults({
                pagination: paginationId
            }, this.options);
            options.onTap = function (swiper, e) {
                _this2.onTap(swiper, e);
                return _this2.options.onTap && _this2.options.onTap(swiper, e);
            };
            options.onClick = function (swiper, e) {
                _this2.onClick(swiper, e);
                return _this2.options.onClick && _this2.options.onClick(swiper, e);
            };
            options.onDoubleTap = function (swiper, e) {
                _this2.onDoubleTap(swiper, e);
                return _this2.options.onDoubleTap && _this2.options.onDoubleTap(swiper, e);
            };
            options.onTransitionStart = function (swiper, e) {
                _this2.onTransitionStart(swiper, e);
                return _this2.options.onTransitionStart && _this2.options.onTransitionStart(swiper, e);
            };
            options.onTransitionEnd = function (swiper, e) {
                _this2.onTransitionEnd(swiper, e);
                return _this2.options.onTransitionEnd && _this2.options.onTransitionEnd(swiper, e);
            };
            options.onSlideChangeStart = function (swiper) {
                _this2.ionWillChange.emit(swiper);
                return _this2.options.onSlideChangeStart && _this2.options.onSlideChangeStart(swiper);
            };
            options.onSlideChangeEnd = function (swiper) {
                _this2.ionDidChange.emit(swiper);
                return _this2.options.onSlideChangeEnd && _this2.options.onSlideChangeEnd(swiper);
            };
            options.onLazyImageLoad = function (swiper, slide, img) {
                return _this2.options.onLazyImageLoad && _this2.options.onLazyImageLoad(swiper, slide, img);
            };
            options.onLazyImageReady = function (swiper, slide, img) {
                return _this2.options.onLazyImageReady && _this2.options.onLazyImageReady(swiper, slide, img);
            };
            options.onSliderMove = function (swiper, e) {
                _this2.ionDrag.emit(swiper);
                return _this2.options.onSliderMove && _this2.options.onSliderMove(swiper, e);
            };
            setTimeout(function () {
                var swiper = new Swiper(_this2.getNativeElement().children[0], options);
                _this2.slider = swiper;
            }, 300);
            /*
            * TODO: Finish this
            if (isTrueProperty(this.zoom)) {
              this.enableZoom = true;
              setTimeout(() => {
                this.initZoom();
              })
            }
            */
        }
        /**
         * @private
         */

    }, {
        key: "onTap",
        value: function onTap(swiper, e) {}
        /**
         * @private
         */

    }, {
        key: "onClick",
        value: function onClick(swiper, e) {}
        /**
         * @private
         */

    }, {
        key: "onDoubleTap",
        value: function onDoubleTap(swiper, e) {
            this.toggleZoom(swiper, e);
        }
        /**
         * @private
         */

    }, {
        key: "onLazyImageLoad",
        value: function onLazyImageLoad(swiper, slide, img) {}
        /**
         * @private
         */

    }, {
        key: "onLazyImageReady",
        value: function onLazyImageReady(swiper, slide, img) {}
        /*
        nextButton(swiper: any, e: any) {
        }
        prevButton() {
        }
        indexButton() {
        }
        */
        /**
         * @private
         */

    }, {
        key: "initZoom",
        value: function initZoom() {
            var _this3 = this;

            this.zoomDuration = this.zoomDuration || 230;
            this.maxScale = this.zoomMax || 3;
            this.zoomElement = this.getNativeElement().children[0].children[0];
            this.zoomElement && this.zoomElement.classList.add('ion-scroll-zoom');
            this.zoomGesture = new Gesture(this.zoomElement);
            this.zoomGesture.listen();
            this.scale = 1;
            this.zoomLastPosX = 0;
            this.zoomLastPosY = 0;
            var lastScale = void 0,
                startX = void 0,
                startY = void 0,
                posX = 0,
                posY = 0,
                zoomRect = void 0;
            this.viewportWidth = this.getNativeElement().offsetWidth;
            this.viewportHeight = this.getNativeElement().offsetHeight;
            this.zoomElement.addEventListener('touchstart', function (e) {
                _this3.onTouchStart(e);
            });
            this.zoomElement.addEventListener('touchmove', function (e) {
                _this3.onTouchMove(e);
            });
            this.zoomElement.addEventListener('touchend', function (e) {
                _this3.onTouchEnd(e);
            });
            this.zoomGesture.on('pinchstart', function (e) {
                lastScale = _this3.scale;
                console.debug('Last scale', e.scale);
            });
            this.zoomGesture.on('pinch', function (e) {
                _this3.scale = Math.max(1, Math.min(lastScale * e.scale, 10));
                console.debug('Scaling', _this3.scale);
                _this3.zoomElement.style[CSS.transform] = 'scale(' + _this3.scale + ')';
                zoomRect = _this3.zoomElement.getBoundingClientRect();
            });
            this.zoomGesture.on('pinchend', function () {
                // last_scale = Math.max(1, Math.min(last_scale * e.scale, 10));
                if (_this3.scale > _this3.maxScale) {
                    var za = new Animation(_this3.zoomElement).duration(_this3.zoomDuration).easing('linear').from('scale', _this3.scale).to('scale', _this3.maxScale);
                    za.play();
                    _this3.scale = _this3.maxScale;
                }
            });
        }
        /**
         * @private
         */

    }, {
        key: "resetZoom",
        value: function resetZoom() {
            if (this.zoomElement) {
                this.zoomElement.parentElement.style[CSS.transform] = '';
                this.zoomElement.style[CSS.transform] = 'scale(1)';
            }
            this.scale = 1;
            this.zoomLastPosX = 0;
            this.zoomLastPosY = 0;
        }
        /**
         * @private
         */

    }, {
        key: "toggleZoom",
        value: function toggleZoom(swiper, e) {
            console.debug('Try toggle zoom');
            if (!this.enableZoom) {
                return;
            }
            console.debug('Toggling zoom', e);
            /*
            let x = e.pointers[0].clientX;
            let y = e.pointers[0].clientY;
                 let mx = this.viewportWidth / 2;
            let my = this.viewportHeight / 2;
                 let tx, ty;
                 if (x > mx) {
              // Greater than half
              tx = -x;
            } else {
              // Less than or equal to half
              tx = (this.viewportWidth - x);
            }
            if (y > my) {
              ty = -y;
            } else {
              ty = y-my;
            }
                 console.debug(y);
            */
            var zi = new Animation(this.touch.target.children[0]).duration(this.zoomDuration).easing('linear');
            var zw = new Animation(this.touch.target.children[0]).duration(this.zoomDuration).easing('linear');
            var za = new Animation();
            za.add(zi);
            if (this.scale > 1) {
                // zoom out
                // zw.fromTo('translateX', posX + 'px', '0px');
                // zw.fromTo('translateY', posY + 'px', '0px');
                zi.from('scale', this.scale);
                zi.to('scale', 1);
                za.play();
                // posX = 0;
                // posY = 0;
                this.scale = 1;
            } else {
                // zoom in
                // zw.fromTo('translateX', posX + 'px', tx + 'px');
                // zw.fromTo('translateY', posY + 'px', ty + 'px');
                zi.from('scale', this.scale);
                zi.to('scale', this.maxScale);
                za.play();
                // posX = tx;
                // posY = ty;
                this.scale = this.maxScale;
            }
        }
        /**
         * @private
         */

    }, {
        key: "onTransitionStart",
        value: function onTransitionStart(swiper, e) {}
        /**
         * @private
         */

    }, {
        key: "onTransitionEnd",
        value: function onTransitionEnd(swiper, e) {}
        /**
         * @private
         */

    }, {
        key: "onTouchStart",
        value: function onTouchStart(e) {
            console.debug('Touch start', e);
            // TODO: Support mice as well
            var target = dom.closest(e.target, '.slide').children[0].children[0];
            this.touch = {
                x: null,
                y: null,
                startX: e.touches[0].clientX,
                startY: e.touches[0].clientY,
                deltaX: 0,
                deltaY: 0,
                lastX: 0,
                lastY: 0,
                target: target.parentElement,
                zoomable: target,
                zoomableWidth: target.offsetWidth,
                zoomableHeight: target.offsetHeight
            };
            console.debug('Target', this.touch.target);
            // TODO: android prevent default
        }
        /**
         * @private
         */

    }, {
        key: "onTouchMove",
        value: function onTouchMove(e) {
            this.touch.deltaX = e.touches[0].clientX - this.touch.startX;
            this.touch.deltaY = e.touches[0].clientY - this.touch.startY;
            // TODO: Make sure we need to transform (image is bigger than viewport)
            var zoomableScaledWidth = this.touch.zoomableWidth * this.scale;
            var zoomableScaledHeight = this.touch.zoomableHeight * this.scale;
            var x1 = Math.min(this.viewportWidth / 2 - zoomableScaledWidth / 2, 0);
            var x2 = -x1;
            var y1 = Math.min(this.viewportHeight / 2 - zoomableScaledHeight / 2, 0);
            var y2 = -y1;
            console.debug('BOUNDS', x1, x2, y1, y2);
            if (this.scale <= 1) {
                return;
            }
            console.debug('PAN', e);
            // move image
            this.touch.x = this.touch.deltaX + this.touch.lastX;
            this.touch.y = this.touch.deltaY + this.touch.lastY;
            if (this.touch.x < x1) {
                console.debug('OUT ON LEFT');
            }
            if (this.touch.x > x2) {
                console.debug('OUT ON RIGHT');
            }
            if (this.touch.x > this.viewportWidth) {} else if (-this.touch.x > this.viewportWidth) {} else {
                console.debug('TRANSFORM', this.touch.x, this.touch.y, this.touch.target);
                // this.touch.target.style[CSS.transform] = 'translateX(' + this.touch.x + 'px) translateY(' + this.touch.y + 'px)';
                this.touch.target.style[CSS.transform] = 'translateX(' + this.touch.x + 'px) translateY(' + this.touch.y + 'px)';
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }
        /**
         * @private
         */

    }, {
        key: "onTouchEnd",
        value: function onTouchEnd(e) {
            console.debug('PANEND', e);
            if (this.scale > 1) {
                if (Math.abs(this.touch.x) > this.viewportWidth) {
                    // TODO what is posX?
                    var posX = posX > 0 ? this.viewportWidth - 1 : -(this.viewportWidth - 1);
                    console.debug('Setting on posx', this.touch.x);
                }
                /*
                if (posY > this.viewportHeight/2) {
                  let z = new Animation(this.zoomElement.parentElement);
                  z.fromTo('translateY', posY + 'px', Math.min(this.viewportHeight/2 + 30, posY));
                  z.play();
                } else {
                  let z = new Animation(this.zoomElement.parentElement);
                  z.fromTo('translateY', posY + 'px', Math.max(this.viewportHeight/2 - 30, posY));
                  z.play();
                }
                */
                this.touch.lastX = this.touch.x;
                this.touch.lastY = this.touch.y;
            }
        }
        /**
         * @private
         * Update the underlying slider implementation. Call this if you've added or removed
         * child slides.
         */

    }, {
        key: "update",
        value: function update() {
            var _this4 = this;

            setTimeout(function () {
                _this4.slider.update();
                // Don't allow pager to show with > 10 slides
                if (_this4.length() > 10) {
                    _this4.showPager = false;
                }
            }, 300);
        }
        /**
         * Transition to the specified slide.
         *
         * @param {number} index  The index number of the slide.
         * @param {number} [speed]  Transition duration (in ms).
         * @param {boolean} [runCallbacks] Whether or not to emit the `ionWillChange`/`ionDidChange` events. Default true.
         */

    }, {
        key: "slideTo",
        value: function slideTo(index, speed, runCallbacks) {
            this.slider.slideTo(index, speed, runCallbacks);
        }
        /**
         * Transition to the next slide.
         *
         * @param {number} [speed]  Transition duration (in ms).
         * @param {boolean} [runCallbacks]  Whether or not to emit the `ionWillChange`/`ionDidChange` events. Default true.
         */

    }, {
        key: "slideNext",
        value: function slideNext(speed, runCallbacks) {
            this.slider.slideNext(runCallbacks, speed);
        }
        /**
         * Transition to the previous slide.
         *
         * @param {number} [speed]  Transition duration (in ms).
         * @param {boolean} [runCallbacks]  Whether or not to emit the `ionWillChange`/`ionDidChange` events. Default true.
         */

    }, {
        key: "slidePrev",
        value: function slidePrev(speed, runCallbacks) {
            this.slider.slidePrev(runCallbacks, speed);
        }
        /**
         * Get the index of the active slide.
         *
         * @returns {number} The index number of the current slide.
         */

    }, {
        key: "getActiveIndex",
        value: function getActiveIndex() {
            return this.slider.activeIndex;
        }
        /**
         * Get the index of the previous slide.
         *
         * @returns {number} The index number of the previous slide.
         */

    }, {
        key: "getPreviousIndex",
        value: function getPreviousIndex() {
            return this.slider.previousIndex;
        }
        /**
         * Get the total number of slides.
         *
         * @returns {number} The total number of slides.
         */

    }, {
        key: "length",
        value: function length() {
            return this.slider.slides.length;
        }
        /**
         * Get whether or not the current slide is the last slide.
         *
         * @returns {boolean} If the slide is the last slide or not.
         */

    }, {
        key: "isEnd",
        value: function isEnd() {
            return this.slider.isEnd;
        }
        /**
         * Get whether or not the current slide is the first slide.
         *
         * @returns {boolean} If the slide is the first slide or not.
         */

    }, {
        key: "isBeginning",
        value: function isBeginning() {
            return this.slider.isBeginning;
        }
        /**
         * Get the `Swiper` instance.
         *
         * The Slides component wraps the `Swiper` component built by iDangero.us. See the
         * [Swiper API Docs](http://idangero.us/swiper/api/) for information on using
         * the `Swiper` instance directly.
         *
         * @returns {Swiper}
         */

    }, {
        key: "getSlider",
        value: function getSlider() {
            return this.slider;
        }
    }]);

    return Slides;
}(Ion);
__decorate([Input(), __metadata('design:type', Object)], Slides.prototype, "options", void 0);
__decorate([Input(), __metadata('design:type', Object)], Slides.prototype, "pager", void 0);
__decorate([Input(), __metadata('design:type', Object)], Slides.prototype, "zoom", void 0);
__decorate([Input(), __metadata('design:type', Object)], Slides.prototype, "zoomDuration", void 0);
__decorate([Input(), __metadata('design:type', Object)], Slides.prototype, "zoomMax", void 0);
__decorate([Output(), __metadata('design:type', typeof (_a = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _a || Object)], Slides.prototype, "ionWillChange", void 0);
__decorate([Output(), __metadata('design:type', typeof (_b = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _b || Object)], Slides.prototype, "ionDidChange", void 0);
__decorate([Output(), __metadata('design:type', typeof (_c = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _c || Object)], Slides.prototype, "ionDrag", void 0);
Slides = __decorate([Component({
    selector: 'ion-slides',
    template: '<div class="swiper-container">' + '<div class="swiper-wrapper">' + '<ng-content></ng-content>' + '</div>' + '<div [class.hide]="!showPager" class="swiper-pagination"></div>' + '</div>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
}), __metadata('design:paramtypes', [typeof (_d = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _d || Object, typeof (_e = typeof Renderer !== 'undefined' && Renderer) === 'function' && _e || Object])], Slides);
/**
 * @name Slide
 * @description
 * The Slide component is a child component of [Slides](../Slides). The template
 * should be written as `ion-slide`. Any slide content should be written
 * in this component and it should be used in conjunction with [Slides](../Slides).
 *
 * See the [Slides API Docs](../Slides) for more usage information.
 *
 * @demo /docs/v2/demos/slides/
 * @see {@link /docs/v2/api/components/slides/Slides/ Slides API Docs}
 */
export var Slide = function () {
    function Slide(elementRef, slides) {
        _classCallCheck(this, Slide);

        this.slides = slides;
        this.ele = elementRef.nativeElement;
        this.ele.classList.add('swiper-slide');
        slides.rapidUpdate();
    }

    _createClass(Slide, [{
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
            this.slides.rapidUpdate();
        }
    }]);

    return Slide;
}();
__decorate([Input(), __metadata('design:type', Object)], Slide.prototype, "zoom", void 0);
Slide = __decorate([Component({
    selector: 'ion-slide',
    template: '<div class="slide-zoom"><ng-content></ng-content></div>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
}), __param(1, Host()), __metadata('design:paramtypes', [typeof (_f = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _f || Object, Slides])], Slide);
/**
 * @private
 */
export var SlideLazy = function SlideLazy() {
    _classCallCheck(this, SlideLazy);
};
SlideLazy = __decorate([Directive({
    selector: 'slide-lazy',
    host: {
        'class': 'swiper-lazy'
    }
}), __metadata('design:paramtypes', [])], SlideLazy);
var slidesId = -1;
var _a, _b, _c, _d, _e, _f;