import * as React from 'react';
import { ClickParam } from 'antd/lib/menu';
import { Thunk } from 'ts-thunk';
export interface HeaderProps {
    onMenuSelect: (param: ClickParam) => void;
}
export interface HeaderConfig {
    username?: string;
    items?: Thunk<React.ReactNode>;
}
export declare class Header extends React.Component<HeaderProps & HeaderConfig> {
    handleMenuClick: (param: ClickParam) => void;
    render(): JSX.Element;
}
