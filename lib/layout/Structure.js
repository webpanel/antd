var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
import { Link, Route, Switch } from 'react-router-dom';
import { Layout, Icon, Button } from 'antd';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import Exception from 'ant-design-pro/lib/Exception';
// import { Breadcrumbs } from './page/Breadcrumbs';
import { searchChildrenWithType, appendStringPath } from '../utils';
var StructureItem = /** @class */ (function (_super) {
    __extends(StructureItem, _super);
    function StructureItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StructureItem.prototype.renderContent = function (content, props) {
        return typeof content === 'function' ? content(props) : content;
    };
    StructureItem.prototype.render = function () {
        var _a = this.props, header = _a.header, item = __rest(_a, ["header"]);
        var _header = typeof header === 'function' ? header(this.props) : header;
        var breadcrumps = [
            { title: React.createElement(Icon, { type: "home" }), href: '/' }
        ].concat((item.breadcrumbs || []));
        breadcrumps[breadcrumps.length - 1].href = undefined;
        return (React.createElement("div", null,
            React.createElement("div", { style: { margin: '-24px -24px 16px' } },
                React.createElement(PageHeader, __assign({ breadcrumbList: breadcrumps }, _header))),
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
            if (!path) {
                return "continue";
            }
            var itemBreadcrumbs = breadcrumbs.concat([{ title: item.props.name, href: path.toString() }]);
            var resolvedPath = appendStringPath(parentPath, path.toString());
            var route = (React.createElement(Route, { key: resolvedPath, exact: true, path: resolvedPath, render: function (renderProps) { return (React.createElement(StructureItem, __assign({ breadcrumbs: itemBreadcrumbs }, item.props, renderProps))); } }));
            routes.push(route);
            var subitems = searchChildrenWithType(item.props.children, StructureItem);
            if (subitems && subitems.length > 0) {
                this_1.getRoutes(subitems, routes, resolvedPath, itemBreadcrumbs);
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
            React.createElement(Exception, { type: "404", title: "Page not found", desc: "Check page address or contact tech assistance", actions: React.createElement(Link, { to: "/" },
                    React.createElement(Button, { type: "primary" }, "Home")) })));
        var items = searchChildrenWithType(this.props.children, StructureItem);
        return (React.createElement(Layout.Content, { style: { margin: '24px 16px 0', overflow: 'initial' } },
            React.createElement(Switch, null,
                this.getRoutes(items),
                pageNotFound)));
    };
    return Structure;
}(React.Component));
export { Structure };
//# sourceMappingURL=Structure.js.map