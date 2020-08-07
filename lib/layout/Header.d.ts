import * as React from "react";
import { Thunk } from "ts-thunk";
import { ClickParam } from "antd/lib/menu";
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
