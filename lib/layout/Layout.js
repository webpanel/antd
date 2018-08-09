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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import { Layout as LayoutComponent } from 'antd';
var Footer = LayoutComponent.Footer, Sider = LayoutComponent.Sider;
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import 'antd/dist/antd.css';
import '../../styles/Layout.css';
import { Menu } from './Menu';
import { Header } from './Header';
import { StructureItem, Structure } from './Structure';
import { MenuItem } from './Menu';
import { searchChildrenWithType } from '../utils';
var Layout = /** @class */ (function (_super) {
    __extends(Layout, _super);
    function Layout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            collapsed: false
        };
        return _this;
    }
    Layout.prototype.onCollapse = function (collapsed) {
        this.setState({ collapsed: collapsed });
    };
    Layout.prototype.handleMenuClick = function (param) {
        switch (param.key) {
            case 'logout':
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
                React.createElement(Sider, { collapsible: true, collapsed: this.state.collapsed, onCollapse: function (collapsed) {
                        _this.onCollapse(collapsed);
                    } },
                    React.createElement("div", { className: "logo", style: {
                            backgroundImage: logoURL ? "url(" + logoURL + ")" : undefined,
                            backgroundColor: logoURL ? 'transparent' : undefined,
                            maxWidth: '168px',
                            maxHeight: '32px',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center'
                        } }),
                    menus),
                React.createElement(LayoutComponent, null,
                    React.createElement(Header, { onMenuSelect: function (param) { return _this.handleMenuClick(param); }, username: this.props.userName }),
                    structures,
                    React.createElement(Footer, { style: { textAlign: 'center' } }, this.props.footer && this.props.footer.title)))));
    };
    Layout.Menu = Menu;
    Layout.MenuItem = MenuItem;
    Layout.Structure = Structure;
    Layout.StructureItem = StructureItem;
    Layout = __decorate([
        observer
    ], Layout);
    return Layout;
}(React.Component));
export { Layout };
//# sourceMappingURL=Layout.js.map