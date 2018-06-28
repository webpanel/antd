import * as React from 'react';
import { ClickParam } from 'antd/lib/menu';
export interface HeaderProps {
    onMenuSelect: (param: ClickParam) => void;
}
export interface HeaderConfig {
    username: string | null;
}
export declare class Header extends React.Component<HeaderProps & HeaderConfig> {
    handleMenuClick(param: ClickParam): void;
    render(): JSX.Element;
}
