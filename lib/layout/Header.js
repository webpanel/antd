import * as React from "react";
import { Layout as AntdLayout, Dropdown, Menu } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { resolveOptionalThunk } from "ts-thunk";
import { useTranslation } from "react-i18next";
export var Header = function (props) {
    var t = useTranslation("webpanel-antd").t;
    var menu = (React.createElement(Menu, { onClick: props.onMenuSelect },
        React.createElement(Menu.Item, { key: "logout" },
            React.createElement(LogoutOutlined, null),
            t("logout"))));
    return (React.createElement(AntdLayout.Header, null,
        props.children,
        React.createElement("div", { className: "antd-header-content" },
            resolveOptionalThunk(props.items),
            React.createElement(Dropdown, { overlay: menu },
                React.createElement("span", { className: "antd-header-content-item" },
                    React.createElement(UserOutlined, { style: { padding: "0 8px 0 0" } }),
                    props.username || "Me")))));
};
//# sourceMappingURL=Header.js.map