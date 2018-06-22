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
import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import { Menu as AntdMenu, Icon } from 'antd';
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Menu.prototype.renderItem = function (item) {
        var _this = this;
        if (item.subitems) {
            return (React.createElement(AntdMenu.SubMenu, { key: 'sub_' + item.path, title: React.createElement("span", null,
                    React.createElement(Icon, { type: item.icon || 'folder' }),
                    React.createElement("span", null, item.title)) }, item.subitems.map(function (x) { return _this.renderItem(x); })));
        }
        else {
            return (React.createElement(AntdMenu.Item, { key: item.path },
                React.createElement(Link, { to: item.path },
                    React.createElement(Icon, { type: item.icon || 'folder' }),
                    React.createElement("span", { className: "nav-text" }, item.title))));
        }
    };
    Menu.prototype.defaultSelectedKeys = function (match) {
        var res = [match.url];
        var buff = '/';
        match.url
            .split('/')
            .filter(function (x) { return x; })
            .forEach(function (name) {
            buff += name;
            res.push(buff);
            buff += '/';
        });
        return res;
    };
    Menu.prototype.defaultOpenKeys = function (match) {
        for (var _i = 0, _a = this.props.items; _i < _a.length; _i++) {
            var item = _a[_i];
            for (var _b = 0, _c = item.subitems || []; _b < _c.length; _b++) {
                var subitem = _c[_b];
                if (subitem.path === match.url) {
                    return ['sub_' + item.path];
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
                return (React.createElement(AntdMenu, { theme: "dark", mode: "inline", selectedKeys: _this.defaultSelectedKeys(match), defaultOpenKeys: _this.defaultOpenKeys(match) }, items.map(function (x) { return _this.renderItem(x); })));
            } }));
    };
    return Menu;
}(React.Component));
export { Menu };
//# sourceMappingURL=Menu.js.map