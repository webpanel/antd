import * as React from 'react';
import { Layout as LayoutComponent } from 'antd';
const { Footer, Sider } = LayoutComponent;
import { ClickParam } from 'antd/lib/menu';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react';

import locale from 'antd/lib/locale-provider/cs_CZ';
import { LocaleProvider } from 'antd';

import 'antd/dist/antd.css';
import '../../styles/Layout.css';

import { Menu, MenuItemProps } from './Menu';
import { Header } from './Header';
import { HeaderConfig } from './Header';
import { Structure, StructureItem } from './Structure';
import { MenuItem } from './Menu';
export interface FooterConfig {
  title: string | React.ReactNode;
}

export interface LayoutProps {
  footer?: FooterConfig;
  header?: HeaderConfig;
  menu?: React.ReactElement<MenuItemProps>[];
  structure?: { [key: string]: StructureItem };
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
  static MenuItem = MenuItem;
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

    return (
      <LocaleProvider locale={locale}>
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
              <Menu items={this.props.menu || []} />
            </Sider>
            <LayoutComponent>
              <Header
                onMenuSelect={param => this.handleMenuClick(param)}
                username={this.props.userName}
              />
              <Structure items={this.props.structure} />
              <Footer style={{ textAlign: 'center' }}>
                {this.props.footer && this.props.footer.title}
              </Footer>
            </LayoutComponent>
          </LayoutComponent>
        </BrowserRouter>
      </LocaleProvider>
    );
  }
}
