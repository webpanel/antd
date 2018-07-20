import * as React from 'react';
import { ClickParam } from 'antd/lib/menu';
import 'antd/dist/antd.css';
import '../../styles/Layout.css';
import { MenuItemProps } from './Menu';
import { HeaderConfig } from './Header';
import { StructureItem } from './Structure';
import { MenuItem } from './Menu';
export interface FooterConfig {
    title: string | React.ReactNode;
}
export interface LayoutProps {
    footer?: FooterConfig;
    header?: HeaderConfig;
    menu?: React.ReactElement<MenuItemProps>[];
    structure?: {
        [key: string]: StructureItem;
    };
    logout: () => void;
    userName?: string;
    logoURL?: string;
    logoCollapsedURL?: string;
}
export interface LayoutState {
    collapsed: boolean;
}
export declare class Layout extends React.Component<LayoutProps, LayoutState> {
    static MenuItem: typeof MenuItem;
    state: {
        collapsed: boolean;
    };
    onCollapse(collapsed: boolean): void;
    handleMenuClick(param: ClickParam): void;
    render(): JSX.Element;
}
