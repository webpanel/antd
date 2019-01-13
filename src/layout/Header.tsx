import * as React from 'react';
import { Layout as AntdLayout, Menu, Icon, Dropdown } from 'antd';
import { ClickParam } from 'antd/lib/menu';
// import { AuthSession } from '../../../../webana';
// import { Subscriber } from 'react-broadcast';

export interface HeaderProps {
  onMenuSelect: (param: ClickParam) => void;
}

export interface HeaderConfig {
  username?: string;
  items?: React.ReactNode;
}

export class Header extends React.Component<HeaderProps & HeaderConfig> {
  handleMenuClick = (param: ClickParam) => {
    this.props.onMenuSelect(param);
  };

  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        {/* <Menu.Divider /> */}
        <Menu.Item key="logout">
          <Icon type="logout" />
          Logout
        </Menu.Item>
      </Menu>
    );

    return (
      <AntdLayout.Header>
        <div className="antd-header-content">
          {this.props.items}
          <Dropdown overlay={menu}>
            <span className="antd-header-content-item">
              <Icon type="user" style={{ padding: '0 8px 0 0' }} />
              {this.props.username || 'Me'}
            </span>
          </Dropdown>
        </div>
      </AntdLayout.Header>
    );
  }
}
