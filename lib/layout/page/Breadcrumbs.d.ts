/// <reference types="react" />
import * as React from 'react';
export interface BreadcrumbItem {
    name: string;
    path: string;
}
export interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}
export declare class Breadcrumbs extends React.Component<BreadcrumbsProps> {
    render(): JSX.Element;
}
