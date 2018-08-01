import * as React from 'react';
import { ResourceCollection } from 'webpanel-data';
export declare type ResourceTablePropsActionButton = 'detail' | 'delete' | React.ReactNode | ((props: ActionButtonProps) => React.ReactNode);
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
export interface ActionButtonProps {
    resourceID: string | number;
    values: {
        [key: string]: any;
    };
    resourceCollection: ResourceCollection;
    type: ResourceTablePropsActionButton;
}
export declare class ResourceTableActionButtons extends React.Component<ResourceTableActionButtonsProps> {
    state: {
        sortedInfo: {
            columnKey: undefined;
            order: undefined;
        };
        selectedRowKeys: never[];
    };
    deleteResource: (id: import("../../../../../../../../Users/jakubknejzlik/Projects/github/webpanel/antd/node_modules/csstype").AnimationIterationCountProperty) => void;
    getButton(props: ActionButtonProps): {} | null | undefined;
    render(): JSX.Element;
}
export {};
