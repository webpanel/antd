import * as React from 'react';
import { Layout as LayoutComponent } from 'antd';
const { Footer, Sider } = LayoutComponent;
import { ClickParam } from 'antd/lib/menu';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react';

import '../../styles/Layout.css';

import { Menu, MenuItemProps } from './Menu';
import { Header } from './Header';
import { HeaderConfig } from './Header';
import { StructureItemProps, StructureItem, Structure } from './Structure';
import { MenuItem } from './Menu';
import { searchChildrenWithType } from '../utils';

export interface FooterConfig {
  title: string | React.ReactNode;
}

export interface LayoutProps {
  footer?: FooterConfig;
  header?: HeaderConfig;
  menu?: React.ReactElement<MenuItemProps>[];
  structure?: React.ReactElement<StructureItemProps>[];
  logout: () => void;
  userName?: string;
  logoURL?: string;
  logoCollapsedURL?: string;
}

export interface LayoutState {
  collapsed: boolean;
}

@observer
export class Layout extends React.Component<LayoutProps, LayoutState> {
  static Menu = Menu;
  static MenuItem = MenuItem;
  static Structure = Structure;
  static StructureItem = StructureItem;
  state = {
    collapsed: false
  };

  onCollapse(collapsed: boolean) {
    this.setState({ collapsed });
  }

  handleMenuClick(param: ClickParam) {
    switch (param.key) {
      case 'logout':
        this.props.logout();
        return;
      default:
        return;
    }
  }

  render() {
    const logoURL = this.state.collapsed
      ? this.props.logoCollapsedURL
      : this.props.logoURL;

    const menus = searchChildrenWithType(this.props.children, Menu);
    const structures = searchChildrenWithType(this.props.children, Structure);

    return (
      <BrowserRouter>
        <LayoutComponent className="full-height">
          <Sider
            collapsible={true}
            collapsed={this.state.collapsed}
            onCollapse={collapsed => {
              this.onCollapse(collapsed);
            }}
          >
            <div
              className="logo"
              style={{
                backgroundImage: logoURL ? `url(${logoURL})` : undefined,
                backgroundColor: logoURL ? 'transparent' : undefined,
                maxWidth: '168px',
                maxHeight: '32px',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}
            />
            {menus}
          </Sider>
          <LayoutComponent>
            <Header
              onMenuSelect={param => this.handleMenuClick(param)}
              username={this.props.userName}
              {...this.props.header}
            />
            {structures}
            <Footer style={{ textAlign: 'center' }}>
              {this.props.footer && this.props.footer.title}
            </Footer>
          </LayoutComponent>
        </LayoutComponent>
      </BrowserRouter>
    );
  }
}
