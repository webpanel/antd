import * as React from 'react';
import { ButtonSize } from 'antd/lib/button';
import { ResourceCollection } from 'webpanel-data';
export declare type ResourceTablePropsActionButton<T> = 'detail' | 'delete' | React.ReactNode | ((props: ActionButtonProps<T>) => React.ReactNode);
interface ResourceTableActionButtonsProps<T> {
    resourceCollection: ResourceCollection<T>;
    id: string | number;
    values: {
        [key: string]: any;
    };
    onDelete: (id: string | number) => void;
    buttons: ResourceTablePropsActionButton<T>[];
    detailButtonText?: React.ReactNode;
    customDetailURL?: (referenceID: string) => string;
    size?: ButtonSize;
}
export interface ActionButtonProps<T> {
    resourceID: string | number;
    values: {
        [key: string]: any;
    };
    resourceCollection: ResourceCollection<T>;
    type: ResourceTablePropsActionButton<T>;
    customDetailURL?: (referenceID: string) => string;
}
export declare class ResourceTableActionButtons<T = any> extends React.Component<ResourceTableActionButtonsProps<T>> {
    state: {
        sortedInfo: {
            columnKey: undefined;
            order: undefined;
        };
        selectedRowKeys: never[];
    };
    deleteResource: (id: React.ReactText) => void;
    getButton(props: ActionButtonProps<T>): any;
    render(): JSX.Element;
}
export {};
