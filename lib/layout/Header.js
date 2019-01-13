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
import { Layout as AntdLayout, Menu, Icon, Dropdown } from 'antd';
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleMenuClick = function (param) {
            _this.props.onMenuSelect(param);
        };
        return _this;
    }
    Header.prototype.render = function () {
        var menu = (React.createElement(Menu, { onClick: this.handleMenuClick },
            React.createElement(Menu.Item, { key: "logout" },
                React.createElement(Icon, { type: "logout" }),
                "Logout")));
        return (React.createElement(AntdLayout.Header, null,
            React.createElement("div", { className: "antd-header-content" },
                this.props.items,
                React.createElement(Dropdown, { overlay: menu },
                    React.createElement("span", { className: "antd-header-content-item" },
                        React.createElement(Icon, { type: "user", style: { padding: '0 8px 0 0' } }),
                        this.props.username || 'Me')))));
    };
    return Header;
}(React.Component));
export { Header };
//# sourceMappingURL=Header.js.map