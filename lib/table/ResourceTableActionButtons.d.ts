import * as React from 'react';
import { ResourceCollection } from 'webpanel-data';
import { ButtonSize } from 'antd/lib/button';
export declare type ResourceTablePropsActionButton = 'detail' | 'delete' | React.ReactNode | ((props: ActionButtonProps) => React.ReactNode);
interface ResourceTableActionButtonsProps {
    resourceCollection: ResourceCollection;
    id: string | number;
    values: {
        [key: string]: any;
    };
    onDelete: ((id: string | number) => void);
    buttons: ResourceTablePropsActionButton[];
    detailButtonText?: React.ReactNode;
    customDetailURL?: ((referenceID: string) => string);
    size?: ButtonSize;
}
export interface ActionButtonProps {
    resourceID: string | number;
    values: {
        [key: string]: any;
    };
    resourceCollection: ResourceCollection;
    type: ResourceTablePropsActionButton;
    customDetailURL?: ((referenceID: string) => string);
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
    getButton(props: ActionButtonProps): any;
    render(): JSX.Element;
}
export {};
