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
import * as React from "react";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
var Breadcrumbs = /** @class */ (function (_super) {
    __extends(Breadcrumbs, _super);
    function Breadcrumbs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Breadcrumbs.prototype.render = function () {
        var items = this.props.items;
        var breadcrumbsLinks = items.slice(0, items.length - 1);
        var currentBreadcrumb = items[items.length - 1];
        return (React.createElement(Breadcrumb, { style: { margin: "16px 0" } },
            React.createElement(Breadcrumb.Item, null,
                React.createElement(Link, { to: "/" },
                    React.createElement(HomeOutlined, null))),
            breadcrumbsLinks.map(function (i, index) { return (React.createElement(Breadcrumb.Item, { key: i.href || index },
                React.createElement(Link, { to: i.href + "/" }, i.title))); }),
            currentBreadcrumb ? (React.createElement(Breadcrumb.Item, { key: currentBreadcrumb.href }, currentBreadcrumb.title)) : null));
    };
    return Breadcrumbs;
}(React.Component));
export { Breadcrumbs };
//# sourceMappingURL=Breadcrumbs.js.map