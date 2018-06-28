import * as React from 'react';
import { BreadcrumbItem } from './page';
export declare type StructureItemContent = string | React.ReactNode | ((props: any) => React.ReactNode);
export interface StructureItem {
    name: string;
    content?: StructureItemContent;
    subitems?: {
        [key: string]: StructureItem;
    };
}
export interface ContentProps {
    items?: {
        [key: string]: StructureItem;
    };
}
export interface ContentState {
    error: Error | null;
}
export declare class Structure extends React.Component<ContentProps, ContentState> {
    state: {
        error: null;
    };
    componentDidCatch(error: Error | null, info: object): void;
    renderContent(content: StructureItemContent, props: any): React.ReactNode;
    getRoutes(items: {
        [key: string]: StructureItem;
    }, routes?: JSX.Element[] | null, parentPath?: string, breadcrumbs?: BreadcrumbItem[]): JSX.Element[];
    render(): JSX.Element;
}
