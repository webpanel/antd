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

import { Menu, MenuItem } from './Menu';
import { Header } from './Header';
import { HeaderConfig } from './Header';
import { Structure, StructureItem } from './Structure';

export interface FooterConfig {
  title: string | React.ReactNode;
}

export interface LayoutProps {
  footer?: FooterConfig;
  header?: HeaderConfig;
  menu?: MenuItem[];
  structure?: { [key: string]: StructureItem };
  logout: () => void;
}

export interface LayoutState {
  collapsed: boolean;
}

@observer
export class Layout extends React.Component<LayoutProps, LayoutState> {
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
              <div className="logo" />
              <Menu items={this.props.menu || []} />
            </Sider>
            <LayoutComponent>
              <Header
                onMenuSelect={param => this.handleMenuClick(param)}
                username={'john doe'}
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
