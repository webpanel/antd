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
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import { Breadcrumbs } from './page/Breadcrumbs';
var StructureItem = /** @class */ (function (_super) {
    __extends(StructureItem, _super);
    function StructureItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StructureItem.prototype.renderContent = function (content, props) {
        if (typeof content === 'function') {
            return content(props);
        }
        return content;
    };
    StructureItem.prototype.render = function () {
        var item = __rest(this.props, []);
        return (React.createElement("div", null,
            item.breadcrumbs && React.createElement(Breadcrumbs, { items: item.breadcrumbs }),
            this.renderContent(item.content, this.props)));
    };
    return StructureItem;
}(React.Component));
export { StructureItem };
var Structure = /** @class */ (function (_super) {
    __extends(Structure, _super);
    function Structure() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { error: null };
        return _this;
    }
    Structure.prototype.componentDidCatch = function (error, info) {
        this.setState({ error: error || new Error("empty error") });
    };
    Structure.prototype.getRoutes = function (items, routes, parentPath, breadcrumbs) {
        if (routes === void 0) { routes = null; }
        if (parentPath === void 0) { parentPath = ''; }
        if (breadcrumbs === void 0) { breadcrumbs = []; }
        routes = routes || [];
        var _loop_1 = function (item) {
            var path = item.key;
            if (!path)
                return "continue";
            var itemBreadcrumbs = Array.prototype.concat(breadcrumbs, [
                Object.assign({}, item.props, { path: path })
            ]);
            var route = (React.createElement(Route, { key: parentPath + path, exact: true, path: parentPath + path, render: function (renderProps) {
                    return React.createElement(StructureItem, __assign({ breadcrumbs: itemBreadcrumbs }, item.props, renderProps));
                } }));
            routes.push(route);
            if (item.props.children && Object.keys(item.props.children).length > 0) {
                this_1.getRoutes(item.props.children, routes, parentPath + path, itemBreadcrumbs);
            }
        };
        var this_1 = this;
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            _loop_1(item);
        }
        return routes;
    };
    Structure.prototype.render = function () {
        var error = this.state.error;
        if (error !== null) {
            var _error = error;
            return (React.createElement(Layout.Content, { style: { margin: '24px 16px 0', overflow: 'initial' } },
                React.createElement("div", { style: { padding: 24, background: '#fff', textAlign: 'center' } },
                    "error ",
                    _error.message)));
        }
        var pageNotFound = (React.createElement(Route, { path: "*" },
            React.createElement("div", null,
                React.createElement("h1", null, "Page not found"),
                React.createElement("i", null, "Check page address or contact tech assistance"))));
        var children = Array.isArray(this.props.children) ? this.props.children.slice() :
            [this.props.children];
        var items = children.filter(function (comp) { return comp.type.name === 'StructureItem'; });
        return (React.createElement(Layout.Content, { style: { margin: '24px 16px 0', overflow: 'initial' } },
            React.createElement(Switch, null,
                this.getRoutes(items),
                pageNotFound)));
    };
    return Structure;
}(React.Component));
export { Structure };
//# sourceMappingURL=Structure.js.map