/// <reference types="react" />
import * as React from 'react';
import { BreadcrumbItem } from './page';
export interface StructureItem {
    name: string;
    content?: any;
    subitems?: {
        [key: string]: StructureItem;
    };
}
export interface ContentProps {
    structure?: {
        [key: string]: StructureItem;
    };
}
export interface ContentState {
    error: Error | null;
}
export declare class Content extends React.Component<ContentProps, ContentState> {
    state: {
        error: null;
    };
    componentDidCatch(error: Error | null, info: object): void;
    getRoutes(items: {
        [key: string]: StructureItem;
    }, routes?: JSX.Element[] | null, parentPath?: string, breadcrumbs?: BreadcrumbItem[]): JSX.Element[];
    render(): JSX.Element;
}
