var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @name Events
 * @description
 * Events is a publish-subscribe style event system for sending and responding to application-level
 * events across your app.
 *
 * @usage
 * ```ts
 * import { Events } from 'ionic-angular';
 *
 * constructor(public events: Events) {}
 *
 * // first page (publish an event when a user is created)
 * function createUser(user) {
 *   console.log('User created!')
 *   events.publish('user:created', user);
 * }
 *
 * // second page (listen for the user created event)
 * events.subscribe('user:created', (userEventData) => {
 *   // userEventData is an array of parameters, so grab our first and only arg
 *   console.log('Welcome', userEventData[0]);
 * });
 *
 * ```
 * @demo /docs/v2/demos/events/
 */
export var Events = function () {
    function Events() {
        _classCallCheck(this, Events);

        this._channels = [];
    }
    /**
     * Subscribe to an event topic. Events that get posted to that topic will trigger the provided handler.
     *
     * @param {string} topic the topic to subscribe to
     * @param {function} handler the event handler
     */


    _createClass(Events, [{
        key: "subscribe",
        value: function subscribe(topic) {
            var _this = this;

            if (!this._channels[topic]) {
                this._channels[topic] = [];
            }

            for (var _len = arguments.length, handlers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                handlers[_key - 1] = arguments[_key];
            }

            handlers.forEach(function (handler) {
                _this._channels[topic].push(handler);
            });
        }
        /**
         * Unsubscribe from the given topic. Your handler will no longer receive events published to this topic.
         *
         * @param {string} topic the topic to unsubscribe from
         * @param {function} handler the event handler
         *
         * @return true if a handler was removed
         */

    }, {
        key: "unsubscribe",
        value: function unsubscribe(topic, handler) {
            var t = this._channels[topic];
            if (!t) {
                // Wasn't found, wasn't removed
                return false;
            }
            if (!handler) {
                // Remove all handlers for this topic
                delete this._channels[topic];
                return true;
            }
            // We need to find and remove a specific handler
            var i = t.indexOf(handler);
            if (i < 0) {
                // Wasn't found, wasn't removed
                return false;
            }
            t.splice(i, 1);
            // If the channel is empty now, remove it from the channel map
            if (!t.length) {
                delete this._channels[topic];
            }
            return true;
        }
        /**
         * Publish an event to the given topic.
         *
         * @param {string} topic the topic to publish to
         * @param {any} eventData the data to send as the event
         */

    }, {
        key: "publish",
        value: function publish(topic) {
            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
            }

            var t = this._channels[topic];
            if (!t) {
                return null;
            }
            var responses = [];
            t.forEach(function (handler) {
                responses.push(handler(args));
            });
            return responses;
        }
    }]);

    return Events;
}();