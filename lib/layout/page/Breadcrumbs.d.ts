import * as React from "react";
export interface BreadcrumbItem {
    title: React.ReactNode;
    href?: string;
}
export interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}
export declare class Breadcrumbs extends React.Component<BreadcrumbsProps> {
    render(): JSX.Element;
}
