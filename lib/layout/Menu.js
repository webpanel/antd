var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import { Menu as AntdMenu, Icon } from 'antd';
var MenuItem = /** @class */ (function (_super) {
    __extends(MenuItem, _super);
    function MenuItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuItem.prototype.render = function () {
        var item = __rest(this.props, []);
        return (React.createElement(Link, { to: item.path, key: item.path },
            item.icon ? React.createElement(Icon, { type: item.icon }) : null,
            React.createElement("span", { className: "nav-text" }, item.title)));
    };
    return MenuItem;
}(React.Component));
export { MenuItem };
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Menu.prototype.renderItems = function (items) {
        var _this = this;
        return items.map(function (item) {
            if (item.props.subitems) {
                return (React.createElement(AntdMenu.SubMenu, { key: 'sub_' + item.props.path, title: React.createElement("span", null,
                        React.createElement(Icon, { type: item.props.icon || 'folder' }),
                        React.createElement("span", null, item.props.title)) }, _this.renderItems(item.props.subitems)));
            }
            return (React.createElement(AntdMenu.Item, { key: item.props.path },
                React.createElement(MenuItem, __assign({}, item.props))));
        });
    };
    Menu.prototype.defaultSelectedKeys = function (match) {
        var res = [];
        var buff = '/';
        if (match.url === '/') {
            res.push('/');
        }
        else {
            match.url
                .split('/')
                .filter(function (x) { return x; })
                .forEach(function (name) {
                buff += name;
                res.push(buff + '/');
                buff += '/';
            });
        }
        return res;
    };
    Menu.prototype.defaultOpenKeys = function (match) {
        for (var _i = 0, _a = this.props.items; _i < _a.length; _i++) {
            var item = _a[_i];
            for (var _b = 0, _c = item.props.subitems || []; _b < _c.length; _b++) {
                var subitem = _c[_b];
                if (subitem.props.path === match.url) {
                    return ['sub_' + item.props.path];
                }
            }
        }
        return [];
    };
    Menu.prototype.render = function () {
        var _this = this;
        var items = this.props.items;
        return (React.createElement(Route, { path: "*", exact: true, children: function (_a) {
                var match = _a.match;
                return (React.createElement(AntdMenu, { theme: "dark", mode: "inline", selectedKeys: _this.defaultSelectedKeys(match), defaultOpenKeys: _this.defaultOpenKeys(match) }, _this.renderItems(items)));
            } }));
    };
    return Menu;
}(React.Component));
export { Menu };
//# sourceMappingURL=Menu.js.map