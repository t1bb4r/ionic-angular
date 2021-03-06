"use strict";
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var menu_1 = require('../components/menu/menu');
var menu_toggle_1 = require('../components/menu/menu-toggle');
var menu_close_1 = require('../components/menu/menu-close');
var backdrop_1 = require('../components/backdrop/backdrop');
var badge_1 = require('../components/badge/badge');
var button_1 = require('../components/button/button');
var content_1 = require('../components/content/content');
var img_1 = require('../components/img/img');
var scroll_1 = require('../components/scroll/scroll');
var infinite_scroll_1 = require('../components/infinite-scroll/infinite-scroll');
var infinite_scroll_content_1 = require('../components/infinite-scroll/infinite-scroll-content');
var refresher_1 = require('../components/refresher/refresher');
var refresher_content_1 = require('../components/refresher/refresher-content');
var slides_1 = require('../components/slides/slides');
var tabs_1 = require('../components/tabs/tabs');
var tab_1 = require('../components/tabs/tab');
var list_1 = require('../components/list/list');
var item_1 = require('../components/item/item');
var item_reorder_1 = require('../components/item/item-reorder');
var item_sliding_1 = require('../components/item/item-sliding');
var virtual_scroll_1 = require('../components/virtual-scroll/virtual-scroll');
var virtual_item_1 = require('../components/virtual-scroll/virtual-item');
var toolbar_1 = require('../components/toolbar/toolbar');
var toolbar_item_1 = require('../components/toolbar/toolbar-item');
var toolbar_title_1 = require('../components/toolbar/toolbar-title');
var icon_1 = require('../components/icon/icon');
var spinner_1 = require('../components/spinner/spinner');
var checkbox_1 = require('../components/checkbox/checkbox');
var select_1 = require('../components/select/select');
var option_1 = require('../components/option/option');
var datetime_1 = require('../components/datetime/datetime');
var toggle_1 = require('../components/toggle/toggle');
var input_1 = require('../components/input/input');
var label_1 = require('../components/label/label');
var segment_1 = require('../components/segment/segment');
var radio_button_1 = require('../components/radio/radio-button');
var radio_group_1 = require('../components/radio/radio-group');
var range_1 = require('../components/range/range');
var searchbar_1 = require('../components/searchbar/searchbar');
var nav_1 = require('../components/nav/nav');
var nav_pop_1 = require('../components/nav/nav-pop');
var nav_push_1 = require('../components/nav/nav-push');
var navbar_1 = require('../components/navbar/navbar');
var show_hide_when_1 = require('../components/show-hide-when/show-hide-when');
/**
 * @private
 * @name IONIC_DIRECTIVES
 * @description
 * The core Ionic directives as well as Angular's `CORE_DIRECTIVES` and `FORM_DIRECTIVES` are
 * available automatically when you bootstrap your app with the `ionicBootstrap`. This means
 * if you are using custom components you do not need to import `IONIC_DIRECTIVES` as they
 * are part of the app's default directives.
 *
 *
 * #### Angular
 * - CORE_DIRECTIVES
 * - FORM_DIRECTIVES
 *
 * #### Ionic
 * - Menu
 * - MenuToggle
 * - MenuClose
 * - Badge
 * - Button
 * - Content
 * - Scroll
 * - InfiniteScroll
 * - InfiniteScrollContent
 * - Refresher
 * - RefresherContent
 * - Img
 * - List
 * - ListHeader
 * - Item
 * - ItemContent
 * - ItemSliding
 * - VirtualScroll
 * - VirtualItem
 * - VirtualHeader
 * - VirtualFooter
 * - Slides
 * - Slide
 * - SlideLazy
 * - Tabs
 * - Tab
 * - Header
 * - Footer
 * - Toolbar
 * - ToolbarTitle
 * - ToolbarItem
 * - Icon
 * - Spinner
 * - Searchbar
 * - Segment
 * - SegmentButton
 * - Checkbox
 * - RadioGroup
 * - RadioButton
 * - Select
 * - Option
 * - DateTime
 * - Toggle
 * - TextArea
 * - TextInput
 * - Label
 * - Nav
 * - NavbarTemplate
 * - Navbar
 * - NavPush
 * - NavPop
 * - IdRef
 * - ShowWhen
 * - HideWhen
 */
exports.IONIC_DIRECTIVES = [
    // Angular
    common_1.CORE_DIRECTIVES,
    forms_1.REACTIVE_FORM_DIRECTIVES,
    // Content
    menu_1.Menu,
    menu_toggle_1.MenuToggle,
    menu_close_1.MenuClose,
    backdrop_1.Backdrop,
    badge_1.Badge,
    button_1.Button,
    content_1.Content,
    scroll_1.Scroll,
    infinite_scroll_1.InfiniteScroll,
    infinite_scroll_content_1.InfiniteScrollContent,
    refresher_1.Refresher,
    refresher_content_1.RefresherContent,
    img_1.Img,
    // Lists
    list_1.List,
    list_1.ListHeader,
    item_1.Item,
    item_1.ItemContent,
    item_sliding_1.ItemSliding,
    item_sliding_1.ItemOptions,
    item_reorder_1.ItemReorder,
    virtual_scroll_1.VirtualScroll,
    virtual_item_1.VirtualItem,
    virtual_item_1.VirtualHeader,
    virtual_item_1.VirtualFooter,
    // Slides
    slides_1.Slides,
    slides_1.Slide,
    slides_1.SlideLazy,
    // Tabs
    tabs_1.Tabs,
    tab_1.Tab,
    // Toolbar
    toolbar_1.Header,
    toolbar_1.Footer,
    toolbar_1.Toolbar,
    toolbar_title_1.ToolbarTitle,
    toolbar_item_1.ToolbarItem,
    // Media
    icon_1.Icon,
    spinner_1.Spinner,
    // Forms
    searchbar_1.Searchbar,
    segment_1.Segment,
    segment_1.SegmentButton,
    checkbox_1.Checkbox,
    radio_group_1.RadioGroup,
    radio_button_1.RadioButton,
    range_1.Range,
    select_1.Select,
    option_1.Option,
    datetime_1.DateTime,
    toggle_1.Toggle,
    input_1.TextArea,
    input_1.TextInput,
    label_1.Label,
    // Nav
    nav_1.Nav,
    navbar_1.NavbarTemplate,
    navbar_1.Navbar,
    nav_push_1.NavPush,
    nav_pop_1.NavPop,
    show_hide_when_1.ShowWhen,
    show_hide_when_1.HideWhen
];
