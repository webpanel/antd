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
import * as React from 'react';
import { Layout as AntdLayout, Menu, Icon } from 'antd';
var SubMenu = Menu.SubMenu;
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // tokenPayload: any = null;
    Header.prototype.handleMenuClick = function (param) {
        this.props.onMenuSelect(param);
    };
    // componentWillMount() {
    //   this.tokenPayload = AuthSession.current().getTokenPayload();
    // }
    Header.prototype.render = function () {
        var _this = this;
        return (React.createElement(AntdLayout.Header, { style: { background: '#fff' } },
            React.createElement("div", { className: "antd-header-content" },
                React.createElement(Menu, { theme: "light", mode: "horizontal", defaultSelectedKeys: [], style: { lineHeight: '64px' }, onSelect: function (param) {
                        _this.handleMenuClick(param);
                    } },
                    React.createElement(SubMenu, { title: React.createElement("span", null,
                            React.createElement(Icon, { type: "user" }),
                            this.props.username || 'Me'), style: { float: 'right' } },
                        React.createElement(Menu.Item, { key: "logout" },
                            React.createElement(Icon, { type: "logout" }),
                            "Logout"))))));
    };
    return Header;
}(React.Component));
export { Header };
//# sourceMappingURL=Header.js.map