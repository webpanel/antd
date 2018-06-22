import * as React from 'react';
import { BreadcrumbItem } from './page';
export interface StructureItem {
    name: string;
    content?: React.ReactNode | string;
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
    getRoutes(items: {
        [key: string]: StructureItem;
    }, routes?: JSX.Element[] | null, parentPath?: string, breadcrumbs?: BreadcrumbItem[]): JSX.Element[];
    render(): JSX.Element;
}
