var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { StorageEngine } from './storage';
import { defaults, assign } from '../../util/util';
var DB_NAME = '__ionicstorage';
var win = window;
/**
 * SqlStorage is a wrapper that uses SQLite when running natively (if available)
 * to store data in a persistent SQL store on the filesystem
 * or uses WebSQL when serving the app to the browser.
 *
 * This is the preferred storage engine, as data will be stored in appropriate
 * app storage, unlike Local Storage which is treated differently by the OS.
 *
 * For convenience, the engine supports key/value storage for simple get/set and blob
 * storage. The full SQL engine is exposed underneath through the `query` method.
 *
 * @usage
 ```js
 * let storage = new Storage(SqlStorage, options);
 * storage.set('name', 'Max');
 * storage.get('name').then((name) => {
 * });
 *
 * // Sql storage also exposes the full engine underneath
 * storage.query('insert into projects(name, data) values("Cool Project", "blah")');
 * storage.query('select * from projects').then((resp) => {})
 * ```
 *
 * The `SqlStorage` service supports these options:
 * {
 *   name: the name of the database (__ionicstorage by default)
 *   backupFlag: // where to store the file, default is BACKUP_LOCAL which DOES NOT store to iCloud. Other options: BACKUP_LIBRARY, BACKUP_DOCUMENTS
 *   existingDatabase: whether to load this as an existing database (default is false)
 * }
 *
 */

var SqlStorage = function (_StorageEngine) {
    _inherits(SqlStorage, _StorageEngine);

    function SqlStorage() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, SqlStorage);

        var _this = _possibleConstructorReturn(this, (SqlStorage.__proto__ || Object.getPrototypeOf(SqlStorage)).call(this));

        var dbOptions = defaults(options, {
            name: DB_NAME,
            backupFlag: SqlStorage.BACKUP_LOCAL,
            existingDatabase: false
        });
        if (win.sqlitePlugin) {
            var location = _this._getBackupLocation(dbOptions.backupFlag);
            _this._db = win.sqlitePlugin.openDatabase(assign({
                name: dbOptions.name,
                location: location,
                createFromLocation: dbOptions.existingDatabase ? 1 : 0
            }, dbOptions));
        } else {
            console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');
            _this._db = win.openDatabase(dbOptions.name, '1.0', 'database', 5 * 1024 * 1024);
        }
        _this._tryInit();
        return _this;
    }

    _createClass(SqlStorage, [{
        key: '_getBackupLocation',
        value: function _getBackupLocation(dbFlag) {
            switch (dbFlag) {
                case SqlStorage.BACKUP_LOCAL:
                    return 2;
                case SqlStorage.BACKUP_LIBRARY:
                    return 1;
                case SqlStorage.BACKUP_DOCUMENTS:
                    return 0;
                default:
                    throw Error('Invalid backup flag: ' + dbFlag);
            }
        }
        // Initialize the DB with our required tables

    }, {
        key: '_tryInit',
        value: function _tryInit() {
            this.query('CREATE TABLE IF NOT EXISTS kv (key text primary key, value text)').catch(function (err) {
                console.error('Storage: Unable to create initial storage tables', err.tx, err.err);
            });
        }
        /**
         * Perform an arbitrary SQL operation on the database. Use this method
         * to have full control over the underlying database through SQL operations
         * like SELECT, INSERT, and UPDATE.
         *
         * @param {string} query the query to run
         * @param {array} params the additional params to use for query placeholders
         * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
         */

    }, {
        key: 'query',
        value: function query(_query) {
            var _this2 = this;

            var params = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

            return new Promise(function (resolve, reject) {
                try {
                    _this2._db.transaction(function (tx) {
                        tx.executeSql(_query, params, function (tx, res) {
                            return resolve({ tx: tx, res: res });
                        }, function (tx, err) {
                            return reject({ tx: tx, err: err });
                        });
                    }, function (err) {
                        return reject({ err: err });
                    });
                } catch (err) {
                    reject({ err: err });
                }
            });
        }
        /**
         * Get the value in the database identified by the given key.
         * @param {string} key the key
         * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
         */

    }, {
        key: 'get',
        value: function get(key) {
            return this.query('select key, value from kv where key = ? limit 1', [key]).then(function (data) {
                if (data.res.rows.length > 0) {
                    return data.res.rows.item(0).value;
                }
            });
        }
        /**
        * Set the value in the database for the given key. Existing values will be overwritten.
        * @param {string} key the key
        * @param {string} value The value (as a string)
        * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
        */

    }, {
        key: 'set',
        value: function set(key, value) {
            return this.query('insert or replace into kv(key, value) values (?, ?)', [key, value]);
        }
        /**
        * Remove the value in the database for the given key.
        * @param {string} key the key
        * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
        */

    }, {
        key: 'remove',
        value: function remove(key) {
            return this.query('delete from kv where key = ?', [key]);
        }
        /**
        * Clear all keys/values of your database.
        * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
        */

    }, {
        key: 'clear',
        value: function clear() {
            return this.query('delete from kv');
        }
    }]);

    return SqlStorage;
}(StorageEngine);

export { SqlStorage };

SqlStorage.BACKUP_LOCAL = 2;
SqlStorage.BACKUP_LIBRARY = 1;
SqlStorage.BACKUP_DOCUMENTS = 0;