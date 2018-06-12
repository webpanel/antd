/// <reference types="react" />
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
export interface BreadcrumbItem {
    name: string;
    path: string;
}
export interface PageProps {
    content: Object;
    router: RouteComponentProps<any>;
    breadcrumbs: BreadcrumbItem[];
}
export declare class Page extends React.Component<PageProps> {
    render(): JSX.Element;
}
