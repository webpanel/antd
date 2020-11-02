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
import { Layout as AntdLayout, Dropdown, Menu } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { resolveOptionalThunk } from "ts-thunk";
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Header.prototype.render = function () {
        var menu = (React.createElement(Menu, { onClick: this.props.onMenuSelect },
            React.createElement(Menu.Item, { key: "logout" },
                React.createElement(LogoutOutlined, null),
                "Logout")));
        return (React.createElement(AntdLayout.Header, null,
            this.props.children,
            React.createElement("div", { className: "antd-header-content" },
                resolveOptionalThunk(this.props.items),
                React.createElement(Dropdown, { overlay: menu },
                    React.createElement("span", { className: "antd-header-content-item" },
                        React.createElement(UserOutlined, { style: { padding: "0 8px 0 0" } }),
                        this.props.username || "Me")))));
    };
    return Header;
}(React.Component));
export { Header };
//# sourceMappingURL=Header.js.map