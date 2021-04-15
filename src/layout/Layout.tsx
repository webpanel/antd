import "../../styles/Layout.css";

import * as React from "react";

import { Structure, StructureItem } from "./Structure";

import { BrowserRouter } from "react-router-dom";
import { CollapseType } from "antd/lib/layout/Sider";
import { Header } from "./Header";
import { HeaderConfig } from "./Header";
import { Layout as LayoutComponent } from "antd";
import { Menu } from "./Menu";
import { MenuItem } from "./Menu";
import { searchChildrenWithType } from "../utils";

const { Footer, Sider } = LayoutComponent;

export interface FooterConfig {
  title: string | React.ReactNode;
}

export interface LayoutProps {
  footer?: FooterConfig;
  header?: HeaderConfig;
  logout: () => void;
  userName?: string;
  logo?: React.ReactNode;
  logoCollapsed?: React.ReactNode;
  logoURL?: string;
  logoCollapsedURL?: string;
}

export interface LayoutState {
  collapsed: boolean;
}
export class Layout extends React.Component<LayoutProps, LayoutState> {
  static Menu = Menu;
  static MenuItem = MenuItem;
  static Structure = Structure;
  static StructureItem = StructureItem;
  state = {
    collapsed: false,
  };

  onCollapse(collapsed: boolean, type: CollapseType) {
    this.setState({ collapsed });
  }
  toggle() {
    this.setState({ collapsed: !this.state.collapsed });
  }
  handleMenuClick(key: React.ReactText) {
    switch (key) {
      case "logout":
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
    const logo = this.state.collapsed
      ? this.props.logoCollapsed
      : this.props.logo;

    const menus = searchChildrenWithType(this.props.children, Menu);
    const structures = searchChildrenWithType(this.props.children, Structure);

    return (
      <BrowserRouter>
        <LayoutComponent className="full-height">
          {menus.length > 0 && (
            <Sider
              theme="dark"
              collapsible={true}
              collapsed={this.state.collapsed}
              breakpoint="md"
              collapsedWidth="0"
              onCollapse={(collapsed, type) => {
                this.onCollapse(collapsed, type);
              }}
            >
              {logo ? (
                <div
                  className="logo"
                  style={{
                    backgroundColor: "transparent",
                    maxWidth: "168px",
                    maxHeight: "64px",
                  }}
                >
                  {logo}
                </div>
              ) : (
                <div
                  className="logo"
                  style={{
                    backgroundImage: logoURL ? `url(${logoURL})` : undefined,
                    backgroundColor: logoURL ? "transparent" : undefined,
                    maxWidth: "168px",
                    maxHeight: "64px",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                />
              )}
              {menus}
            </Sider>
          )}
          <LayoutComponent style={{ overflowX: "hidden" }}>
            <Header
              onMenuSelect={(info) => this.handleMenuClick(info.key)}
              username={this.props.userName}
              {...this.props.header}
            >
              {/* <Icon
                className="trigger"
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={() => this.toggle()}
              /> */}
            </Header>
            {structures}
            <Footer style={{ textAlign: "center" }}>
              {this.props.footer && this.props.footer.title}
            </Footer>
          </LayoutComponent>
        </LayoutComponent>
      </BrowserRouter>
    );
  }
}
