import * as React from 'react';
import { ResourceCollection } from 'webpanel-data';
export declare type ResourceTablePropsActionButton = 'detail' | 'delete' | React.ReactNode | ((id: string | number, values: {
    [key: string]: any;
}, resourceCollection: ResourceCollection) => React.ReactNode);
interface ResourceTableActionButtonsProps {
    resourceCollection: ResourceCollection;
    id: string | number;
    values: {
        [key: string]: any;
    };
    onDelete: ((id: string | number) => void);
    buttons: ResourceTablePropsActionButton[];
    detailButtonText?: string;
}
export declare class ResourceTableActionButtons extends React.Component<ResourceTableActionButtonsProps> {
    state: {
        sortedInfo: {
            columnKey: undefined;
            order: undefined;
        };
        selectedRowKeys: never[];
    };
    deleteResource: (id: React.ReactText) => void;
    getButton(id: string | number, values: {
        [key: string]: string;
    }, resourceCollection: ResourceCollection, type: ResourceTablePropsActionButton): {} | null | undefined;
    render(): JSX.Element;
}
export {};
