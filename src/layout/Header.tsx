import * as React from "react";

import { Layout as AntdLayout, Dropdown, Menu } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Thunk, resolveOptionalThunk } from "ts-thunk";

import { MenuClickEventHandler } from "rc-menu/lib/interface";

// import { AuthSession } from '../../../../webana';
// import { Subscriber } from 'react-broadcast';

export interface HeaderProps {
  onMenuSelect: MenuClickEventHandler;
}

export interface HeaderConfig {
  username?: string;
  items?: Thunk<React.ReactNode>;
}

export class Header extends React.Component<HeaderProps & HeaderConfig> {
  render() {
    const menu = (
      <Menu onClick={this.props.onMenuSelect}>
        {/* <Menu.Divider /> */}
        <Menu.Item key="logout">
          <LogoutOutlined />
          Logout
        </Menu.Item>
      </Menu>
    );

    return (
      <AntdLayout.Header>
        {this.props.children}
        <div className="antd-header-content">
          {resolveOptionalThunk(this.props.items)}
          <Dropdown overlay={menu}>
            <span className="antd-header-content-item">
              <UserOutlined style={{ padding: "0 8px 0 0" }} />
              {this.props.username || "Me"}
            </span>
          </Dropdown>
        </div>
      </AntdLayout.Header>
    );
  }
}
