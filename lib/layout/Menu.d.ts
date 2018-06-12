/// <reference types="react" />
import * as React from 'react';
import { match as Match } from 'react-router-dom';
export interface MenuItem {
    icon: string;
    title: string;
    path: string;
    subitems?: MenuItem[];
}
export interface MenuProps {
    items: MenuItem[];
}
export declare class Menu extends React.Component<MenuProps> {
    renderItem(item: MenuItem): JSX.Element;
    defaultSelectedKeys(match: Match<any>): string[];
    defaultOpenKeys(match: Match<any>): string[];
    render(): JSX.Element;
}
