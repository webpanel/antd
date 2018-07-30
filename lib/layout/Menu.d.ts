import * as React from 'react';
import { match as Match } from 'react-router-dom';
export interface MenuItemProps {
    icon?: string;
    title: string;
    subitems?: React.ReactElement<MenuItemProps>[];
}
interface MenuItemComponentProps extends MenuItemProps {
    path: string;
}
export interface MenuProps {
    items: React.ReactElement<MenuItemProps>[];
}
export declare class MenuItem extends React.Component<MenuItemProps> {
}
export declare class MenuItemComponent extends React.Component<MenuItemComponentProps> {
    render(): any;
}
export declare class Menu extends React.Component<MenuProps> {
    renderItems(items: React.ReactElement<MenuItemProps>[]): JSX.Element[];
    defaultSelectedKeys(match: Match<any>): string[];
    defaultOpenKeys(match: Match<any>): string[];
    render(): JSX.Element;
}
export {};
