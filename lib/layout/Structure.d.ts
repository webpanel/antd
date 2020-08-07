import * as React from "react";
import { BreadcrumbItem } from "./page";
import { PageHeaderProps } from "antd/lib/page-header";
import { RouteComponentProps } from "react-router";
export declare type StructureItemContent = React.ReactNode | ((props: RouteComponentProps<any>) => React.ReactNode);
export declare type StructureHeaderProps = PageHeaderProps | ((props: RouteComponentProps<any>) => PageHeaderProps);
export interface StructureItemProps extends React.Props<any> {
    name: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    content?: StructureItemContent;
    header?: StructureHeaderProps;
}
export interface ContentProps {
    items?: React.ReactElement<StructureItemProps>[];
}
export interface ContentState {
    error: Error | null;
}
export declare class StructureItem extends React.Component<StructureItemProps> {
    renderContent(content: StructureItemContent, props: any): React.ReactNode;
    render(): any;
}
export declare class Structure extends React.Component<ContentProps, ContentState> {
    state: ContentState;
    componentDidCatch(error: Error | null, info: object): void;
    getRoutes(items: React.ReactElement<StructureItemProps>[], routes?: JSX.Element[] | null, parentPath?: string, breadcrumbs?: BreadcrumbItem[]): JSX.Element[];
    render(): JSX.Element;
}
