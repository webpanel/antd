import * as React from 'react';
import { ClickParam } from 'antd/lib/menu';
import 'antd/dist/antd.css';
import '../../styles/Layout.css';
import { MenuItem } from './Menu';
import { HeaderConfig } from './Header';
import { StructureItem } from './Structure';
export interface FooterConfig {
    title: string | React.ReactNode;
}
export interface LayoutProps {
    footer?: FooterConfig;
    header?: HeaderConfig;
    menu?: MenuItem[];
    structure?: {
        [key: string]: StructureItem;
    };
    logout: () => void;
    userName?: string;
}
export interface LayoutState {
    collapsed: boolean;
}
export declare class Layout extends React.Component<LayoutProps, LayoutState> {
    state: {
        collapsed: boolean;
    };
    onCollapse(collapsed: boolean): void;
    handleMenuClick(param: ClickParam): void;
    render(): JSX.Element;
}
