/// <reference types="react" />
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
export interface PageProps {
    content: React.ReactNode;
    router: RouteComponentProps<any>;
}
export declare class Page extends React.Component<PageProps> {
    render(): JSX.Element;
}
