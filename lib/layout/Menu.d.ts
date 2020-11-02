import * as React from "react";
import { match as Match } from "react-router-dom";
import { MenuTheme } from "antd/lib/menu/MenuContext";
export interface MenuItemProps extends React.Props<any> {
    icon?: React.ReactNode;
    title: React.ReactNode;
    subitems?: React.ReactElement<MenuItemProps>[];
}
interface MenuItemComponentProps extends MenuItemProps {
    path: string;
}
export interface MenuConfig {
    theme?: MenuTheme;
}
export interface MenuProps extends MenuConfig {
}
export declare class MenuItem extends React.Component<MenuItemProps> {
}
export declare class MenuItemComponent extends React.Component<MenuItemComponentProps> {
    render(): any;
}
export declare class Menu extends React.Component<MenuProps> {
    renderItems(items: React.ReactElement<MenuItemProps>[], parentPath: string): JSX.Element[];
    defaultSelectedKeys(match: Match<any> | null): string[];
    defaultOpenKeys(match: Match<any> | null): string[];
    render(): JSX.Element | null;
}
export {};
