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
import "../../styles/Layout.css";
import * as React from "react";
import { Structure, StructureItem } from "./Structure";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./Header";
import { Layout as LayoutComponent } from "antd";
import { Menu } from "./Menu";
import { MenuItem } from "./Menu";
import { searchChildrenWithType } from "../utils";
var Footer = LayoutComponent.Footer, Sider = LayoutComponent.Sider;
var Layout = /** @class */ (function (_super) {
    __extends(Layout, _super);
    function Layout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            collapsed: false,
        };
        return _this;
    }
    Layout.prototype.onCollapse = function (collapsed, type) {
        this.setState({ collapsed: collapsed });
    };
    Layout.prototype.toggle = function () {
        this.setState({ collapsed: !this.state.collapsed });
    };
    Layout.prototype.handleMenuClick = function (key) {
        switch (key) {
            case "logout":
                this.props.logout();
                return;
            default:
                return;
        }
    };
    Layout.prototype.render = function () {
        var _this = this;
        var logoURL = this.state.collapsed
            ? this.props.logoCollapsedURL
            : this.props.logoURL;
        var menus = searchChildrenWithType(this.props.children, Menu);
        var structures = searchChildrenWithType(this.props.children, Structure);
        return (React.createElement(BrowserRouter, null,
            React.createElement(LayoutComponent, { className: "full-height" },
                menus.length > 0 && (React.createElement(Sider, { theme: "dark", collapsible: true, collapsed: this.state.collapsed, breakpoint: "md", collapsedWidth: "0", onCollapse: function (collapsed, type) {
                        _this.onCollapse(collapsed, type);
                    } },
                    React.createElement("div", { className: "logo", style: {
                            backgroundImage: logoURL ? "url(" + logoURL + ")" : undefined,
                            backgroundColor: logoURL ? "transparent" : undefined,
                            maxWidth: "168px",
                            maxHeight: "64px",
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                        } }),
                    menus)),
                React.createElement(LayoutComponent, { style: { overflowX: "hidden" } },
                    React.createElement(Header, __assign({ onMenuSelect: function (info) { return _this.handleMenuClick(info.key); }, username: this.props.userName }, this.props.header)),
                    structures,
                    React.createElement(Footer, { style: { textAlign: "center" } }, this.props.footer && this.props.footer.title)))));
    };
    Layout.Menu = Menu;
    Layout.MenuItem = MenuItem;
    Layout.Structure = Structure;
    Layout.StructureItem = StructureItem;
    return Layout;
}(React.Component));
export { Layout };
//# sourceMappingURL=Layout.js.map