import * as React from "react";
import { Thunk } from "ts-thunk";
import { PageHeaderProps } from "antd/lib/page-header";
import { RouteComponentProps } from "react-router";
export declare type StructureItemContent = Thunk<React.ReactNode, Partial<RouteComponentProps>>;
export declare type StructureHeaderProps = Thunk<PageHeaderProps, Partial<RouteComponentProps>>;
export interface StructureItemProps extends Partial<RouteComponentProps>, React.PropsWithChildren<any> {
    name: React.ReactNode;
    content?: StructureItemContent;
    header?: Partial<StructureHeaderProps>;
}
export interface ContentProps {
    items?: React.ReactElement<StructureItemProps>[];
}
export interface ContentState {
    error: Error | null;
}
export declare class StructureItem extends React.Component<StructureItemProps> {
    render(): any;
}
export declare class Structure extends React.Component<ContentProps, ContentState> {
    state: ContentState;
    componentDidCatch(error: Error | null, info: object): void;
    getRoutes(items: React.ReactElement<StructureItemProps>[], routes?: JSX.Element[] | null, parentPath?: string): JSX.Element[];
    render(): JSX.Element;
}
