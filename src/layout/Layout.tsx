import "../../styles/Layout.css";

import * as React from "react";

import { Structure, StructureItem } from "./Structure";

import { BrowserRouter } from "react-router-dom";
import { ClickParam } from "antd/lib/menu";
import { CollapseType } from "antd/lib/layout/Sider";
import { Header } from "./Header";
import { HeaderConfig } from "./Header";
import { Layout as LayoutComponent } from "antd";
import { Menu } from "./Menu";
import { MenuItem } from "./Menu";
import { observer } from "mobx-react";
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
    collapsed: false,
  };

  onCollapse(collapsed: boolean, type: CollapseType) {
    this.setState({ collapsed });
  }

  handleMenuClick(param: ClickParam) {
    switch (param.key) {
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

    const menus = searchChildrenWithType(this.props.children, Menu);
    const structures = searchChildrenWithType(this.props.children, Structure);

    return (
      <BrowserRouter>
        <LayoutComponent className="full-height">
          {menus.length > 0 && (
            <Sider
              theme="dark"
              // collapsible={true}
              // collapsed={this.state.collapsed}
              breakpoint="md"
              collapsedWidth="0"
              // onCollapse={(collapsed, type) => {
              //   this.onCollapse(collapsed, type);
              // }}
              style={{
                overflow: "auto",
                height: "100vh",
              }}
            >
              <div
                className="logo"
                style={{
                  backgroundImage: logoURL ? `url(${logoURL})` : undefined,
                  backgroundColor: logoURL ? "transparent" : undefined,
                  maxWidth: "168px",
                  maxHeight: "32px",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              />
              {menus}
            </Sider>
          )}
          <LayoutComponent>
            <Header
              onMenuSelect={(param) => this.handleMenuClick(param)}
              username={this.props.userName}
              {...this.props.header}
            />
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
