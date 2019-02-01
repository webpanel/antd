import * as React from 'react';
import { match as Match } from 'react-router-dom';
import { MenuTheme } from 'antd/lib/menu';
export interface MenuItemProps extends React.Props<any> {
    icon?: string;
    title: string;
    subitems?: React.ReactElement<MenuItemProps>[];
}
interface MenuItemComponentProps extends MenuItemProps {
    path: string;
}
export interface MenuProps {
    items?: React.ReactElement<MenuItemProps>[];
    theme?: MenuTheme;
}
export declare class MenuItem extends React.Component<MenuItemProps> {
}
export declare class MenuItemComponent extends React.Component<MenuItemComponentProps> {
    render(): any;
}
export declare class Menu extends React.Component<MenuProps> {
    renderItems(items: React.ReactElement<MenuItemProps>[], parentPath: string): JSX.Element[];
    defaultSelectedKeys(match: Match<any>): string[];
    defaultOpenKeys(match: Match<any>): string[];
    render(): JSX.Element;
}
export {};
