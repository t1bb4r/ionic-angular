"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var config_1 = require('../../config/config');
var picker_1 = require('../picker/picker');
var form_1 = require('../../util/form');
var item_1 = require('../item/item');
var util_1 = require('../../util/util');
var datetime_util_1 = require('../../util/datetime-util');
exports.DATETIME_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, { useExisting: core_1.forwardRef(function () { return DateTime; }), multi: true });
/**
 * @name DateTime
 * @description
 * The DateTime component is used to present an interface which makes it easy for
 * users to select dates and times. Tapping on `<ion-datetime>` will display a picker
 * interface that slides up from the bottom of the page. The picker then displays
 * scrollable columns that can be used to individually select years, months, days,
 * hours and minute values. The DateTime component is similar to the native
 * `<input type="datetime-local">` element, however, Ionic's DateTime component makes
 * it easy to display the date and time in a preferred format, and manage the datetime
 * values.
 *
 * ```html
 * <ion-item>
 *   <ion-label>Date</ion-label>
 *   <ion-datetime displayFormat="MM/DD/YYYY" [(ngModel)]="myDate"></ion-datetime>
 * </ion-item>
 * ```
 *
 *
 * ## Display and Picker Formats
 *
 * The DateTime component displays the values in two places: in the `<ion-datetime>`
 * component, and in the interface that is presented from the bottom of the screen.
 * The following chart lists all of the formats that can be used.
 *
 * | Format  | Description                    | Example                 |
 * |---------|--------------------------------|-------------------------|
 * | `YYYY`  | Year, 4 digits                 | `2018`                  |
 * | `YY`    | Year, 2 digits                 | `18`                    |
 * | `M`     | Month                          | `1` ... `12`            |
 * | `MM`    | Month, leading zero            | `01` ... `12`           |
 * | `MMM`   | Month, short name              | `Jan`                   |
 * | `MMMM`  | Month, full name               | `January`               |
 * | `D`     | Day                            | `1` ... `31`            |
 * | `DD`    | Day, leading zero              | `01` ... `31`           |
 * | `DDD`   | Day, short name                | `Fri`                   |
 * | `DDDD`  | Day, full name                 | `Friday`                |
 * | `H`     | Hour, 24-hour                  | `0` ... `23`            |
 * | `HH`    | Hour, 24-hour, leading zero    | `00` ... `23`           |
 * | `h`     | Hour, 12-hour                  | `1` ... `12`            |
 * | `hh`    | Hour, 12-hour, leading zero    | `01` ... `12`           |
 * | `a`     | 12-hour time period, lowercase | `am` `pm`               |
 * | `A`     | 12-hour time period, uppercase | `AM` `PM`               |
 * | `m`     | Minute                         | `1` ... `59`            |
 * | `mm`    | Minute, leading zero           | `01` ... `59`           |
 * | `s`     | Second                         | `1` ... `59`            |
 * | `ss`    | Second, leading zero           | `01` ... `59`           |
 * | `Z`     | UTC Timezone Offset            | `Z or +HH:mm or -HH:mm` |
 *
 * **Important**: See the [Month Names and Day of the Week Names](#month-names-and-day-of-the-week-names)
 * section below on how to use different names for the month and day.
 *
 * ### Display Format
 *
 * The `displayFormat` input property specifies how a datetime's value should be
 * printed, as formatted text, within the `ion-datetime` component.
 *
 * In the following example, the display in the `<ion-datetime>` will use the
 * month's short name, the numerical day with a leading zero, a comma and the
 * four-digit year. In addition to the date, it will display the time with the hours
 * in the 24-hour format and the minutes. Any character can be used as a separator.
 * An example display using this format is: `Jun 17, 2005 11:06`.
 *
 * ```html
 * <ion-item>
 *   <ion-label>Date</ion-label>
 *   <ion-datetime displayFormat="MMM DD, YYYY HH:mm" [(ngModel)]="myDate"></ion-datetime>
 * </ion-item>
 * ```
 *
 * ### Picker Format
 *
 * The `pickerFormat` input property determines which columns should be shown in the
 * interface, the order of the columns, and which format to use within each column.
 * If the `pickerFormat` input is not provided then it will default to the `displayFormat`.
 *
 * In the following example, the display in the `<ion-datetime>` will use the
 * `MM/YYYY` format, such as `06/2020`. However, the picker interface
 * will display two columns with the month's long name, and the four-digit year.
 *
 * ```html
 * <ion-item>
 *   <ion-label>Date</ion-label>
 *   <ion-datetime displayFormat="MM/YYYY" pickerFormat="MMMM YYYY" [(ngModel)]="myDate"></ion-datetime>
 * </ion-item>
 * ```
 *
 * ### Datetime Data
 *
 * Historically, handling datetime values within JavaScript, or even within HTML
 * inputs, has always been a challenge. Specifically, JavaScript's `Date` object is
 * notoriously difficult to correctly parse apart datetime strings or to format
 * datetime values. Even worse is how different browsers and JavaScript versions
 * parse various datetime strings differently, especially per locale.
 *
 * But no worries, all is not lost! Ionic's datetime input has been designed so
 * developers can avoid the common pitfalls, allowing developers to easily format
 * datetime values within the input, and give the user a simple datetime picker for a
 * great user experience.
 *
 * ##### ISO 8601 Datetime Format: YYYY-MM-DDTHH:mmZ
 *
 * Ionic uses the [ISO 8601 datetime format](https://www.w3.org/TR/NOTE-datetime)
 * for its value. The value is simply a string, rather than using JavaScript's `Date`
 * object. Additionally, when using the ISO datetime format, it makes it easier
 * to serialize and pass within JSON objects, and sending databases a standardized
 * format which it can be easily parsed if need be.
 *
 * An ISO format can be used as a simple year, or just the hour and minute, or get more
 * detailed down to the millisecond and timezone. Any of the ISO formats below can be used,
 * and after a user selects a new value, Ionic will continue to use the same ISO format
 * which datetime value was originally given as.
 *
 * | Description          | Format                 | Datetime Value Example       |
 * |----------------------|------------------------|------------------------------|
 * | Year                 | YYYY                   | 1994                         |
 * | Year and Month       | YYYY-MM                | 1994-12                      |
 * | Complete Date        | YYYY-MM-DD             | 1994-12-15                   |
 * | Date and Time        | YYYY-MM-DDTHH:mm       | 1994-12-15T13:47             |
 * | UTC Timezone         | YYYY-MM-DDTHH:mm:ssTZD | 1994-12-15T13:47:20.789Z     |
 * | Timezone Offset      | YYYY-MM-DDTHH:mm:ssTZD | 1994-12-15T13:47:20.789+5:00 |
 * | Hour and Minute      | HH:mm                  | 13:47                        |
 * | Hour, Minute, Second | HH:mm:ss               | 13:47:20                     |
 *
 * Note that the year is always four-digits, milliseconds (if it's added) is always
 * three-digits, and all others are always two-digits. So the number representing
 * January always has a leading zero, such as `01`. Additionally, the hour is always
 * in the 24-hour format, so `00` is `12am` on a 12-hour clock, `13` means `1pm`,
 * and `23` means `11pm`.
 *
 * It's also important to note that neither the `displayFormat` or `pickerFormat` can
 * set the datetime value's output, which is the value that is set by the component's
 * `ngModel`. The format's are merely for displaying the value as text and the picker's
 * interface, but the datetime's value is always persisted as a valid ISO 8601 datetime
 * string.
 *
 *
 * ## Min and Max Datetimes
 *
 * Dates are infinite in either direction, so for a user's selection there should be at
 * least some form of restricting the dates that can be selected. Be default, the maximum
 * date is to the end of the current year, and the minimum date is from the beginning
 * of the year that was 100 years ago.
 *
 * To customize the minimum and maximum datetime values, the `min` and `max` component
 * inputs can be provided which may make more sense for the app's use-case, rather
 * than the default of the last 100 years. Following the same IS0 8601 format listed
 * in the table above, each component can restrict which dates can be selected by the
 * user. Below is an example of restricting the date selection between the beginning
 * of 2016, and October 31st of 2020:
 *
 * ```html
 * <ion-item>
 *   <ion-label>Date</ion-label>
 *   <ion-datetime displayFormat="MMMM YYYY" min="2016" max="2020-10-31" [(ngModel)]="myDate">
 *   </ion-datetime>
 * </ion-item>
 * ```
 *
 *
 * ## Month Names and Day of the Week Names
 *
 * At this time, there is no one-size-fits-all standard to automatically choose the correct
 * language/spelling for a month name, or day of the week name, depending on the language
 * or locale. Good news is that there is an
 * [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat)
 * standard which *most* browsers have adopted. However, at this time the standard has not
 * been fully implemented by all popular browsers so Ionic is unavailable to take advantage
 * of it *yet*. Additionally, Angular also provides an internationalization service, but it
 * is still under heavy development so Ionic does not depend on it at this time.
 *
 * All things considered, the by far easiest solution is to just provide an array of names
 * if the app needs to use names other than the default English version of month and day
 * names. The month names and day names can be either configured at the app level, or
 * individual `ion-datetime` level.
 *
 * ### App Config Level
 *
 * ```ts
 * import { ionicBootstrap } from 'ionic-angular';
 *
 * ionicBootstrap(MyApp, customProviders, {
 *   monthNames: ['janeiro', 'fevereiro', 'mar\u00e7o', ... ],
 *   monthShortNames: ['jan', 'fev', 'mar', ... ],
 *   dayNames: ['domingo', 'segunda-feira', 'ter\u00e7a-feira', ... ],
 *   dayShortNames: ['dom', 'seg', 'ter', ... ],
 * });
 * ```
 *
 * ### Component Input Level
 *
 * ```html
 * <ion-item>
 *   <ion-label>Período</ion-label>
 *   <ion-datetime displayFormat="DDDD MMM D, YYYY" [(ngModel)]="myDate"
 *     monthNames="janeiro, fevereiro, mar\u00e7o, ..."
 *     monthShortNames="jan, fev, mar, ..."
 *     dayNames="domingo, segunda-feira, ter\u00e7a-feira, ..."
 *     dayShortNames="dom, seg, ter, ..."></ion-datetime>
 * </ion-item>
 * ```
 *
 *
 * ### Advanced Datetime Validation and Manipulation
 *
 * The datetime picker provides the simplicity of selecting an exact format, and persists
 * the datetime values as a string using the standardized
 * [ISO 8601 datetime format](https://www.w3.org/TR/NOTE-datetime).
 * However, it's important to note that `ion-datetime` does not attempt to solve all
 * situtations when validating and manipulating datetime values. If datetime values need
 * to be parsed from a certain format, or manipulated (such as adding 5 days to a date,
 * subtracting 30 minutes, etc.), or even formatting data to a specific locale, then we highly
 * recommend using [moment.js](http://momentjs.com/) to "Parse, validate, manipulate, and
 * display dates in JavaScript". [Moment.js](http://momentjs.com/) has quickly become
 * our goto standard when dealing with datetimes within JavaScript, but Ionic does not
 * prepackage this dependency since most apps will not require it, and its locale
 * configuration should be decided by the end-developer.
 *
 *
 * @usage
 * ```html
 * <ion-item>
 *   <ion-label>Date</ion-label>
 *   <ion-datetime displayFormat="MM/DD/YYYY" [(ngModel)]="myDate">
 *   </ion-datetime>
 * </ion-item>
 * ```
 *
 *
 * @demo /docs/v2/demos/datetime/
 */
var DateTime = (function () {
    function DateTime(_form, _config, _item, _pickerCtrl) {
        this._form = _form;
        this._config = _config;
        this._item = _item;
        this._pickerCtrl = _pickerCtrl;
        this._disabled = false;
        this._text = '';
        this._isOpen = false;
        this._value = {};
        this._locale = {};
        /**
         * @input {string} The display format of the date and time as text that shows
         * within the item. When the `pickerFormat` input is not used, then the
         * `displayFormat` is used for both display the formatted text, and determining
         * the datetime picker's columns. See the `pickerFormat` input description for
         * more info. Defaults to `MMM D, YYYY`.
         */
        this.displayFormat = 'MMM D, YYYY';
        /**
         * @input {string} The text to display on the picker's cancel button. Default: `Cancel`.
         */
        this.cancelText = 'Cancel';
        /**
         * @input {string} The text to display on the picker's "Done" button. Default: `Done`.
         */
        this.doneText = 'Done';
        /**
         * @input {any} Any additional options that the picker interface can accept.
         * See the [Picker API docs](../../picker/Picker) for the picker options.
         */
        this.pickerOptions = {};
        /**
         * @output {any} Any expression to evaluate when the datetime selection has changed.
         */
        this.ionChange = new core_1.EventEmitter();
        /**
         * @output {any} Any expression to evaluate when the datetime selection was cancelled.
         */
        this.ionCancel = new core_1.EventEmitter();
        this._form.register(this);
        if (_item) {
            this.id = 'dt-' + _item.registerInput('datetime');
            this._labelId = 'lbl-' + _item.id;
            this._item.setCssClass('item-datetime', true);
        }
    }
    DateTime.prototype._click = function (ev) {
        if (ev.detail === 0) {
            // do not continue if the click event came from a form submit
            return;
        }
        ev.preventDefault();
        ev.stopPropagation();
        this.open();
    };
    DateTime.prototype._keyup = function () {
        if (!this._isOpen) {
            this.open();
        }
    };
    /**
     * @private
     */
    DateTime.prototype.open = function () {
        var _this = this;
        if (this._disabled) {
            return;
        }
        void 0;
        // the user may have assigned some options specifically for the alert
        var pickerOptions = util_1.merge({}, this.pickerOptions);
        var picker = this._pickerCtrl.create(pickerOptions);
        pickerOptions.buttons = [
            {
                text: this.cancelText,
                role: 'cancel',
                handler: function () {
                    _this.ionCancel.emit(null);
                }
            },
            {
                text: this.doneText,
                handler: function (data) {
                    void 0;
                    _this.onChange(data);
                    _this.ionChange.emit(data);
                }
            }
        ];
        this.generate(picker);
        this.validate(picker);
        picker.ionChange.subscribe(function () {
            _this.validate(picker);
        });
        picker.present(pickerOptions);
        this._isOpen = true;
        picker.onDidDismiss(function () {
            _this._isOpen = false;
        });
    };
    /**
     * @private
     */
    DateTime.prototype.generate = function (picker) {
        var _this = this;
        // if a picker format wasn't provided, then fallback
        // to use the display format
        var template = this.pickerFormat || this.displayFormat;
        if (util_1.isPresent(template)) {
            // make sure we've got up to date sizing information
            this.calcMinMax();
            // does not support selecting by day name
            // automaticallly remove any day name formats
            template = template.replace('DDDD', '{~}').replace('DDD', '{~}');
            if (template.indexOf('D') === -1) {
                // there is not a day in the template
                // replace the day name with a numeric one if it exists
                template = template.replace('{~}', 'D');
            }
            // make sure no day name replacer is left in the string
            template = template.replace(/{~}/g, '');
            // parse apart the given template into an array of "formats"
            datetime_util_1.parseTemplate(template).forEach(function (format) {
                // loop through each format in the template
                // create a new picker column to build up with data
                var key = datetime_util_1.convertFormatToKey(format);
                var values;
                // first see if they have exact values to use for this input
                if (util_1.isPresent(_this[key + 'Values'])) {
                    // user provide exact values for this date part
                    values = convertToArrayOfNumbers(_this[key + 'Values'], key);
                }
                else {
                    // use the default date part values
                    values = datetime_util_1.dateValueRange(format, _this._min, _this._max);
                }
                var column = {
                    name: key,
                    options: values.map(function (val) {
                        return {
                            value: val,
                            text: datetime_util_1.renderTextFormat(format, val, null, _this._locale),
                        };
                    })
                };
                if (column.options.length) {
                    // cool, we've loaded up the columns with options
                    // preselect the option for this column
                    var selected = column.options.find(function (opt) { return opt.value === datetime_util_1.getValueFromFormat(_this._value, format); });
                    if (selected) {
                        // set the select index for this column's options
                        column.selectedIndex = column.options.indexOf(selected);
                    }
                    // add our newly created column to the picker
                    picker.addColumn(column);
                }
            });
            this.divyColumns(picker);
        }
    };
    /**
     * @private
     */
    DateTime.prototype.validate = function (picker) {
        var i;
        var today = new Date();
        var columns = picker.getColumns();
        // find the columns used
        var yearCol = columns.find(function (col) { return col.name === 'year'; });
        var monthCol = columns.find(function (col) { return col.name === 'month'; });
        var dayCol = columns.find(function (col) { return col.name === 'day'; });
        var yearOpt;
        var monthOpt;
        var dayOpt;
        // default to assuming today's year
        var selectedYear = today.getFullYear();
        if (yearCol) {
            yearOpt = yearCol.options[yearCol.selectedIndex];
            if (yearOpt) {
                // they have a selected year value
                selectedYear = yearOpt.value;
            }
        }
        // default to assuming this month has 31 days
        var numDaysInMonth = 31;
        var selectedMonth;
        if (monthCol) {
            monthOpt = monthCol.options[monthCol.selectedIndex];
            if (monthOpt) {
                // they have a selected month value
                selectedMonth = monthOpt.value;
                // calculate how many days are in this month
                numDaysInMonth = datetime_util_1.daysInMonth(selectedMonth, selectedYear);
            }
        }
        // create sort values for the min/max datetimes
        var minCompareVal = datetime_util_1.dateDataSortValue(this._min);
        var maxCompareVal = datetime_util_1.dateDataSortValue(this._max);
        if (monthCol) {
            // enable/disable which months are valid
            // to show within the min/max date range
            for (i = 0; i < monthCol.options.length; i++) {
                monthOpt = monthCol.options[i];
                // loop through each month and see if it
                // is within the min/max date range
                monthOpt.disabled = (datetime_util_1.dateSortValue(selectedYear, monthOpt.value, 31) < minCompareVal ||
                    datetime_util_1.dateSortValue(selectedYear, monthOpt.value, 1) > maxCompareVal);
            }
        }
        if (dayCol) {
            if (util_1.isPresent(selectedMonth)) {
                // enable/disable which days are valid
                // to show within the min/max date range
                for (i = 0; i < 31; i++) {
                    dayOpt = dayCol.options[i];
                    // loop through each day and see if it
                    // is within the min/max date range
                    var compareVal = datetime_util_1.dateSortValue(selectedYear, selectedMonth, dayOpt.value);
                    dayOpt.disabled = (compareVal < minCompareVal ||
                        compareVal > maxCompareVal ||
                        numDaysInMonth <= i);
                }
            }
            else {
                // enable/disable which numbers of days to show in this month
                for (i = 0; i < 31; i++) {
                    dayCol.options[i].disabled = (numDaysInMonth <= i);
                }
            }
        }
        picker.refresh();
    };
    /**
     * @private
     */
    DateTime.prototype.divyColumns = function (picker) {
        var pickerColumns = picker.getColumns();
        var columns = [];
        pickerColumns.forEach(function (col, i) {
            columns.push(0);
            col.options.forEach(function (opt) {
                if (opt.text.length > columns[i]) {
                    columns[i] = opt.text.length;
                }
            });
        });
        if (columns.length === 2) {
            var width = Math.max(columns[0], columns[1]);
            pickerColumns[0].columnWidth = pickerColumns[1].columnWidth = width * 16 + "px";
        }
        else if (columns.length === 3) {
            var width = Math.max(columns[0], columns[2]);
            pickerColumns[1].columnWidth = columns[1] * 16 + "px";
            pickerColumns[0].columnWidth = pickerColumns[2].columnWidth = width * 16 + "px";
        }
        else if (columns.length > 3) {
            columns.forEach(function (col, i) {
                pickerColumns[i].columnWidth = col * 12 + "px";
            });
        }
    };
    /**
     * @private
     */
    DateTime.prototype.setValue = function (newData) {
        datetime_util_1.updateDate(this._value, newData);
    };
    /**
     * @private
     */
    DateTime.prototype.getValue = function () {
        return this._value;
    };
    /**
     * @private
     */
    DateTime.prototype.checkHasValue = function (inputValue) {
        if (this._item) {
            this._item.setCssClass('input-has-value', !!(inputValue && inputValue !== ''));
        }
    };
    /**
     * @private
     */
    DateTime.prototype.updateText = function () {
        // create the text of the formatted data
        this._text = datetime_util_1.renderDateTime(this.displayFormat, this._value, this._locale);
    };
    /**
     * @private
     */
    DateTime.prototype.calcMinMax = function () {
        var todaysYear = new Date().getFullYear();
        if (util_1.isBlank(this.min)) {
            if (util_1.isPresent(this.yearValues)) {
                this.min = Math.min.apply(Math, convertToArrayOfNumbers(this.yearValues, 'year'));
            }
            else {
                this.min = (todaysYear - 100).toString();
            }
        }
        if (util_1.isBlank(this.max)) {
            if (util_1.isPresent(this.yearValues)) {
                this.max = Math.max.apply(Math, convertToArrayOfNumbers(this.yearValues, 'year'));
            }
            else {
                this.max = todaysYear.toString();
            }
        }
        var min = this._min = datetime_util_1.parseDate(this.min);
        var max = this._max = datetime_util_1.parseDate(this.max);
        min.month = min.month || 1;
        min.day = min.day || 1;
        min.hour = min.hour || 0;
        min.minute = min.minute || 0;
        min.second = min.second || 0;
        max.month = max.month || 12;
        max.day = max.day || 31;
        max.hour = max.hour || 23;
        max.minute = max.minute || 59;
        max.second = max.second || 59;
    };
    Object.defineProperty(DateTime.prototype, "disabled", {
        /**
         * @input {boolean} Whether or not the datetime component is disabled. Default `false`.
         */
        get: function () {
            return this._disabled;
        },
        set: function (val) {
            this._disabled = util_1.isTrueProperty(val);
            this._item && this._item.setCssClass('item-datetime-disabled', this._disabled);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    DateTime.prototype.writeValue = function (val) {
        void 0;
        this.setValue(val);
        this.updateText();
        this.checkHasValue(val);
    };
    /**
     * @private
     */
    DateTime.prototype.ngAfterContentInit = function () {
        var _this = this;
        // first see if locale names were provided in the inputs
        // then check to see if they're in the config
        // if neither were provided then it will use default English names
        ['monthNames', 'monthShortNames', 'dayNames', 'dayShortNames'].forEach(function (type) {
            _this._locale[type] = convertToArrayOfStrings(util_1.isPresent(_this[type]) ? _this[type] : _this._config.get(type), type);
        });
        // update how the datetime value is displayed as formatted text
        this.updateText();
    };
    /**
     * @private
     */
    DateTime.prototype.registerOnChange = function (fn) {
        var _this = this;
        this._fn = fn;
        this.onChange = function (val) {
            void 0;
            _this.setValue(val);
            _this.updateText();
            _this.checkHasValue(val);
            // convert DateTimeData value to iso datetime format
            fn(datetime_util_1.convertDataToISO(_this._value));
            _this.onTouched();
        };
    };
    /**
     * @private
     */
    DateTime.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    /**
     * @private
     */
    DateTime.prototype.onChange = function (val) {
        // onChange used when there is not an formControlName
        void 0;
        this.setValue(val);
        this.updateText();
        this.onTouched();
    };
    /**
     * @private
     */
    DateTime.prototype.onTouched = function () { };
    /**
     * @private
     */
    DateTime.prototype.ngOnDestroy = function () {
        this._form.deregister(this);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DateTime.prototype, "min", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DateTime.prototype, "max", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DateTime.prototype, "displayFormat", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DateTime.prototype, "pickerFormat", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DateTime.prototype, "cancelText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DateTime.prototype, "doneText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DateTime.prototype, "yearValues", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DateTime.prototype, "monthValues", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DateTime.prototype, "dayValues", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DateTime.prototype, "hourValues", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DateTime.prototype, "minuteValues", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DateTime.prototype, "monthNames", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DateTime.prototype, "monthShortNames", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DateTime.prototype, "dayNames", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DateTime.prototype, "dayShortNames", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DateTime.prototype, "pickerOptions", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DateTime.prototype, "ionChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DateTime.prototype, "ionCancel", void 0);
    __decorate([
        core_1.HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [UIEvent]), 
        __metadata('design:returntype', void 0)
    ], DateTime.prototype, "_click", null);
    __decorate([
        core_1.HostListener('keyup.space'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], DateTime.prototype, "_keyup", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DateTime.prototype, "disabled", null);
    DateTime = __decorate([
        core_1.Component({
            selector: 'ion-datetime',
            template: "\n    <div class=\"datetime-text\">{{_text}}</div>\n    <button aria-haspopup=\"true\"\n            type=\"button\"\n            [id]=\"id\"\n            category=\"item-cover\"\n            [attr.aria-labelledby]=\"_labelId\"\n            [attr.aria-disabled]=\"_disabled\"\n            class=\"item-cover\">\n    </button>\n  ",
            host: {
                '[class.datetime-disabled]': '_disabled'
            },
            providers: [exports.DATETIME_VALUE_ACCESSOR],
            encapsulation: core_1.ViewEncapsulation.None,
        }),
        __param(2, core_1.Optional()),
        __param(3, core_1.Optional()), 
        __metadata('design:paramtypes', [form_1.Form, config_1.Config, item_1.Item, picker_1.PickerController])
    ], DateTime);
    return DateTime;
}());
exports.DateTime = DateTime;
/**
 * @private
 * Use to convert a string of comma separated numbers or
 * an array of numbers, and clean up any user input
 */
function convertToArrayOfNumbers(input, type) {
    var values = [];
    if (util_1.isString(input)) {
        // convert the string to an array of strings
        // auto remove any whitespace and [] characters
        input = input.replace(/\[|\]|\s/g, '').split(',');
    }
    if (util_1.isArray(input)) {
        // ensure each value is an actual number in the returned array
        input.forEach(function (num) {
            num = parseInt(num, 10);
            if (!isNaN(num)) {
                values.push(num);
            }
        });
    }
    if (!values.length) {
        void 0;
    }
    return values;
}
/**
 * @private
 * Use to convert a string of comma separated strings or
 * an array of strings, and clean up any user input
 */
function convertToArrayOfStrings(input, type) {
    if (util_1.isPresent(input)) {
        var values = [];
        if (util_1.isString(input)) {
            // convert the string to an array of strings
            // auto remove any [] characters
            input = input.replace(/\[|\]/g, '').split(',');
        }
        if (util_1.isArray(input)) {
            // trim up each string value
            input.forEach(function (val) {
                val = val.trim();
                if (val) {
                    values.push(val);
                }
            });
        }
        if (!values.length) {
            void 0;
        }
        return values;
    }
}
