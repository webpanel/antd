"use strict";
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
exports.__esModule = true;
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var antd_1 = require("antd");
var Breadcrumbs = /** @class */ (function (_super) {
    __extends(Breadcrumbs, _super);
    function Breadcrumbs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Breadcrumbs.prototype.render = function () {
        var items = this.props.items;
        var breadcrumbsLinks = items.slice(0, items.length - 1);
        var currentBreadcrumb = items[items.length - 1];
        return (React.createElement(antd_1.Breadcrumb, { style: { margin: '16px 0' } },
            React.createElement(antd_1.Breadcrumb.Item, null,
                React.createElement(react_router_dom_1.Link, { to: "/" },
                    React.createElement(antd_1.Icon, { type: "home" }))),
            breadcrumbsLinks.map(function (i) { return (React.createElement(antd_1.Breadcrumb.Item, { key: i.path },
                React.createElement(react_router_dom_1.Link, { to: i.path }, i.name))); }),
            currentBreadcrumb ? (React.createElement(antd_1.Breadcrumb.Item, { key: currentBreadcrumb.path }, currentBreadcrumb.name)) : null));
    };
    return Breadcrumbs;
}(React.Component));
exports.Breadcrumbs = Breadcrumbs;
