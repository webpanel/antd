import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { BreadcrumbItem } from './page';
import { StructureItemProps } from './Structure';
export declare type StructureItemContent = string | React.ReactNode | ((props: RouteComponentProps<any>) => React.ReactNode);
export interface StructureItemProps {
    name: string;
    breadcrumbs?: BreadcrumbItem[],
    content?: StructureItemContent;
    subitems?: {
        [key: string]: React.ReactElement<StructureItemProps>;
    };
}
export interface ContentProps {
    items?: {
        [key: string]: React.ReactElement<StructureItemProps>;
    };
}
export interface ContentState {
    error: Error | null;
}
export declare class StructureItem extends React.Component<StructureItemProps> {
    renderContent(content: StructureItemContent, props: any): any;
    render(): any;
}
export declare class Structure extends React.Component<ContentProps, ContentState> {
    state: {
        error: null;
    };
    componentDidCatch(error: Error | null, info: object): void;
    renderContent(content: StructureItemContent, props: any): React.ReactNode;
    getRoutes(items: {
        [key: string]: React.ReactElement<StructureItemProps>;
    }, routes?: JSX.Element[] | null, parentPath?: string, breadcrumbs?: BreadcrumbItem[]): JSX.Element[];
    render(): JSX.Element;
}
