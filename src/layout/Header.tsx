import * as React from 'react';
import { Layout as LayoutComponent, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
import { ClickParam } from 'antd/lib/menu';
// import { AuthSession } from '../../../../webana';
// import { Subscriber } from 'react-broadcast';

export interface HeaderProps {
  onMenuSelect: (param: ClickParam) => void;
}

export interface HeaderConfig {
  username?: string;
}

export class Header extends React.Component<HeaderProps & HeaderConfig> {
  // tokenPayload: any = null;

  handleMenuClick(param: ClickParam) {
    this.props.onMenuSelect(param);
  }

  // componentWillMount() {
  //   this.tokenPayload = AuthSession.current().getTokenPayload();
  // }

  render() {
    return (
      <LayoutComponent.Header style={{ background: '#fff' }}>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={[]}
          style={{ lineHeight: '64px' }}
          onSelect={param => {
            this.handleMenuClick(param);
          }}
        >
          {/* <Menu.Item key="1">nav 1</Menu.Item>
      <Menu.Item key="2">nav 2</Menu.Item> */}
          <SubMenu
            title={
              <span>
                <Icon type="user" />
                {this.props.username || 'Me'}
              </span>
            }
            style={{ float: 'right' }}
          >
            <Menu.Item key="logout">
              <Icon type="logout" />Logout
            </Menu.Item>
          </SubMenu>
        </Menu>
        {/* <Icon
      className="trigger"
      type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
      onClick={this.toggle}
    /> */}
      </LayoutComponent.Header>
    );
  }
}
