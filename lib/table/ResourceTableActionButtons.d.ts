import * as React from "react";
import { ResourceCollection, ResourceID } from "webpanel-data";
import { ButtonSize } from "antd/lib/button";
export declare type ResourceTablePropsActionButton<T extends {
    id: ResourceID;
}> = "detail" | "delete" | React.ReactNode | ((props: ActionButtonProps<T>) => React.ReactNode);
interface ResourceTableActionButtonsProps<T extends {
    id: ResourceID;
}> {
    resourceCollection: ResourceCollection<T>;
    id: string | number;
    values: {
        [key: string]: any;
    };
    onDelete: (id: ResourceID) => void;
    buttons: ResourceTablePropsActionButton<T>[];
    detailButtonText?: React.ReactNode;
    customDetailURL?: (referenceID: string) => string;
    size?: ButtonSize;
}
export interface ActionButtonProps<T extends {
    id: ResourceID;
}> {
    resourceID: string | number;
    values: {
        [key: string]: any;
    };
    resourceCollection: ResourceCollection<T>;
    type: ResourceTablePropsActionButton<T>;
    customDetailURL?: (referenceID: string) => string;
}
export declare class ResourceTableActionButtons<T extends {
    id: ResourceID;
} = any> extends React.Component<ResourceTableActionButtonsProps<T>> {
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
