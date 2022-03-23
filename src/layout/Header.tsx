import * as React from "react";

import { Layout as AntdLayout, Dropdown, Menu } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Thunk, resolveOptionalThunk } from "ts-thunk";

import { MenuClickEventHandler } from "rc-menu/lib/interface";
import { useTranslation } from "react-i18next";

// import { AuthSession } from '../../../../webana';
// import { Subscriber } from 'react-broadcast';

export interface HeaderProps {
  onMenuSelect: MenuClickEventHandler;
}

export interface HeaderConfig {
  username?: string;
  items?: Thunk<React.ReactNode>;
}

export const Header = (
  props: React.PropsWithChildren<HeaderProps & HeaderConfig>
) => {
  const { t } = useTranslation("webpanel-antd");
  const menu = (
    <Menu onClick={props.onMenuSelect}>
      {/* <Menu.Divider /> */}
      <Menu.Item key="logout">
        <LogoutOutlined />
        {t("logout")}
      </Menu.Item>
    </Menu>
  );

  return (
    <AntdLayout.Header>
      {props.children}
      <div className="antd-header-content">
        {resolveOptionalThunk(props.items)}
        <Dropdown overlay={menu}>
          <span className="antd-header-content-item">
            <UserOutlined style={{ padding: "0 8px 0 0" }} />
            {props.username || "Me"}
          </span>
        </Dropdown>
      </div>
    </AntdLayout.Header>
  );
};
