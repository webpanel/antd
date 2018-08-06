import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { BreadcrumbItem } from './page';
export declare type StructureItemContent = string | React.ReactNode | ((props: RouteComponentProps<any>) => React.ReactNode);
export interface StructureItemProps extends React.Props<any> {
    name: string;
    breadcrumbs?: BreadcrumbItem[];
    content?: StructureItemContent;
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
    state: {
        error: null;
    };
    componentDidCatch(error: Error | null, info: object): void;
    getRoutes(items: React.ReactElement<StructureItemProps>[], routes?: JSX.Element[] | null, parentPath?: string, breadcrumbs?: BreadcrumbItem[]): JSX.Element[];
    render(): JSX.Element;
}
