import {Icon} from "antd/lib/index";

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
import {Link, Route, Switch} from 'react-router-dom';
import { Layout } from 'antd';
import { Breadcrumbs } from './page/Breadcrumbs';
import { StructureItemContent } from './Structure';
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
        return (React.createElement('div', null,
            item.breadcrumbs ? React.createElement(Breadcrumbs, {items: item.breadcrumbs}) : null,
            this.renderContent(item.content, this.props)));
    };
    return StructureItem;
})(React.Component);
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
    Structure.prototype.renderContent = function (content, props) {
        if (typeof content === 'function') {
            return content(props);
        }
        return content;
    };
    Structure.prototype.getRoutes = function (items, routes, parentPath, breadcrumbs) {
        var _this = this;
        if (routes === void 0) { routes = null; }
        if (parentPath === void 0) { parentPath = ''; }
        if (breadcrumbs === void 0) { breadcrumbs = []; }
        routes = routes || [];
        var _loop_1 = function (path) {
            var item = items[path];
            var itemBreadcrumbs = Array.prototype.concat(breadcrumbs, [
                Object.assign({}, item.props, { path: path })
            ]);
            var route = (React.createElement(Route, { key: parentPath + path, exact: true, path: parentPath + path, render: renderProps =>
              React.createElement(StructureItem, Object.assign({}, item.props, { breadcrumbs: itemBreadcrumbs}, renderProps))},));
            routes.push(route);
            if (item.props.subitems && Object.keys(item.props.subitems).length > 0) {
                this_1.getRoutes(item.props.subitems, routes, parentPath + path, itemBreadcrumbs);
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = Object.keys(items); _i < _a.length; _i++) {
            var path = _a[_i];
            _loop_1(path);
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
        return (React.createElement(Layout.Content, { style: { margin: '24px 16px 0', overflow: 'initial' } },
            React.createElement(Switch, null, this.props.items ? this.getRoutes(this.props.items) : null)));
    };
    return Structure;
}(React.Component));
export { Structure };
//# sourceMappingURL=Structure.js.map
