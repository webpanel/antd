import * as React from "react";
import { Thunk } from "ts-thunk";
import { MenuClickEventHandler } from "rc-menu/lib/interface";
export interface HeaderProps {
    onMenuSelect: MenuClickEventHandler;
}
export interface HeaderConfig {
    username?: string;
    items?: Thunk<React.ReactNode>;
}
export declare class Header extends React.Component<HeaderProps & HeaderConfig> {
    render(): JSX.Element;
}
