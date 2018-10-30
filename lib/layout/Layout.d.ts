import * as React from 'react';
import { ClickParam } from 'antd/lib/menu';
import '../../styles/Layout.css';
import { Menu, MenuItemProps } from './Menu';
import { HeaderConfig } from './Header';
import { StructureItemProps, StructureItem, Structure } from './Structure';
import { MenuItem } from './Menu';
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
export declare class Layout extends React.Component<LayoutProps, LayoutState> {
    static Menu: typeof Menu;
    static MenuItem: typeof MenuItem;
    static Structure: typeof Structure;
    static StructureItem: typeof StructureItem;
    state: {
        collapsed: boolean;
    };
    onCollapse(collapsed: boolean): void;
    handleMenuClick(param: ClickParam): void;
    render(): JSX.Element;
}
