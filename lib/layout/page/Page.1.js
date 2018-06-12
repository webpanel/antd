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
import { Link } from 'react-router-dom';
import { Breadcrumb, Icon } from 'antd';
var Page = /** @class */ (function (_super) {
    __extends(Page, _super);
    function Page() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Page.prototype.render = function () {
        var breadcrumbs = this.props.breadcrumbs;
        var breadcrumbsLinks = breadcrumbs.slice(0, breadcrumbs.length - 1);
        var currentBreadcrumb = breadcrumbs[breadcrumbs.length - 1];
        return (React.createElement("div", null,
            React.createElement(Breadcrumb, { style: { margin: '16px 0' } },
                React.createElement(Breadcrumb.Item, null,
                    React.createElement(Link, { to: "/" },
                        React.createElement(Icon, { type: "home" }))),
                breadcrumbsLinks.map(function (i) { return (React.createElement(Breadcrumb.Item, { key: i.path },
                    React.createElement(Link, { to: i.path }, i.name))); }),
                currentBreadcrumb ? (React.createElement(Breadcrumb.Item, { key: currentBreadcrumb.path }, currentBreadcrumb.name)) : null)));
    };
    return Page;
}(React.Component));
export { Page };
//# sourceMappingURL=Page.1.js.map