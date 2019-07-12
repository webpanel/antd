var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
import { Menu as AntdMenu, Icon } from 'antd';
import { Link, Route } from 'react-router-dom';
import { appendStringPath, searchChildrenWithType } from '../utils';
var MenuItem = /** @class */ (function (_super) {
    __extends(MenuItem, _super);
    function MenuItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MenuItem;
}(React.Component));
export { MenuItem };
var MenuItemComponent = /** @class */ (function (_super) {
    __extends(MenuItemComponent, _super);
    function MenuItemComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuItemComponent.prototype.render = function () {
        var item = __rest(this.props, []);
        return (React.createElement(Link, { to: item.path, key: item.path },
            item.icon ? React.createElement(Icon, { type: item.icon }) : null,
            React.createElement("span", { className: "nav-text" }, item.title)));
    };
    return MenuItemComponent;
}(React.Component));
export { MenuItemComponent };
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Menu.prototype.renderItems = function (items, parentPath) {
        var _this = this;
        return items.map(function (item) {
            var subitems = item.props.subitems ||
                searchChildrenWithType(item.props.children, MenuItem);
            var key = item.key;
            if (!key) {
                return React.createElement(MenuItemComponent, __assign({}, item.props, { path: "#" }));
            }
            var resolvedPath = appendStringPath(parentPath, key.toString());
            if (subitems && subitems.length > 0) {
                return (React.createElement(AntdMenu.SubMenu, { key: 'sub_' + resolvedPath, title: React.createElement("span", null,
                        React.createElement(Icon, { type: item.props.icon || 'folder' }),
                        React.createElement("span", null, item.props.title)) }, _this.renderItems(subitems, resolvedPath)));
            }
            return (React.createElement(AntdMenu.Item, { key: resolvedPath },
                React.createElement(MenuItemComponent, __assign({}, item.props, { path: resolvedPath }))));
        });
    };
    Menu.prototype.defaultSelectedKeys = function (match) {
        if (match === null) {
            return [];
        }
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
        if (match === null) {
            return [];
        }
        var items = searchChildrenWithType(this.props.children, MenuItem);
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            var subitems = searchChildrenWithType(item.props.children, MenuItem);
            for (var _a = 0, subitems_1 = subitems; _a < subitems_1.length; _a++) {
                var subitem = subitems_1[_a];
                if (item.key && subitem.key) {
                    var resolvedPath = appendStringPath(item.key.toString(), subitem.key.toString());
                    if (resolvedPath === match.url) {
                        var parentPath = appendStringPath(item.key.toString(), '');
                        return ['sub_' + parentPath];
                    }
                }
            }
        }
        return [];
    };
    Menu.prototype.render = function () {
        var _this = this;
        var items = searchChildrenWithType(this.props.children, MenuItem);
        if (items.length === 0) {
            return null;
        }
        return (React.createElement(Route, { path: "*", exact: true, children: function (_a) {
                var match = _a.match;
                return (React.createElement(AntdMenu, __assign({ theme: "dark", mode: "inline", selectedKeys: _this.defaultSelectedKeys(match), defaultOpenKeys: _this.defaultOpenKeys(match) }, _this.props), _this.renderItems(items, '/')));
            } }));
    };
    return Menu;
}(React.Component));
export { Menu };
//# sourceMappingURL=Menu.js.map