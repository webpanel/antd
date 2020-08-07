import "../../styles/Layout.css";
import * as React from "react";
import { Structure, StructureItem } from "./Structure";
import { ClickParam } from "antd/lib/menu";
import { CollapseType } from "antd/lib/layout/Sider";
import { HeaderConfig } from "./Header";
import { Menu } from "./Menu";
import { MenuItem } from "./Menu";
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
export declare class Layout extends React.Component<LayoutProps, LayoutState> {
    static Menu: typeof Menu;
    static MenuItem: typeof MenuItem;
    static Structure: typeof Structure;
    static StructureItem: typeof StructureItem;
    state: {
        collapsed: boolean;
    };
    onCollapse(collapsed: boolean, type: CollapseType): void;
    toggle(): void;
    handleMenuClick(param: ClickParam): void;
    render(): JSX.Element;
}
