import "../../styles/Table.css";
import * as React from "react";
import { TableProps as ATableProps, ColumnProps, TablePaginationConfig } from "antd/lib/table";
import { SorterResult } from "antd/lib/table/interface";
import { ResourceCollection, ResourceID } from "webpanel-data";
import { ResourceTablePropsActionButton } from "./ResourceTableActionButtons";
import { Thunk } from "ts-thunk";
export declare type ResourceTableFilterNormalizer = (values: any[] | null) => {
    [key: string]: any;
};
export declare type ResourceTableFilterDenormalizer = (values: {
    [key: string]: any;
}) => any[];
export interface ResourceTableColumn extends ColumnProps<any> {
    sortColumns?: string[];
    filterNormalize?: ResourceTableFilterNormalizer;
    filterDenormalize?: ResourceTableFilterDenormalizer;
}
export interface ResourceTableProps<T extends {
    id: ResourceID;
}> extends ATableProps<any> {
    resourceCollection: ResourceCollection<T>;
    actionButtons?: Thunk<ResourceTablePropsActionButton<T>[] | null, T>;
    actionButtonsTitle?: React.ReactNode;
    actionButtonsFixed?: boolean;
    detailButtonText?: React.ReactNode;
    customDetailURL?: (referenceID: string) => string;
    columns?: ResourceTableColumn[];
}
export declare class ResourceTable<T extends {
    id: ResourceID;
} = any> extends React.Component<ResourceTableProps<T>> {
    handleChange: (pagination: TablePaginationConfig, filters: Record<any, React.ReactText[] | null>, sorter: SorterResult<any>) => void;
    reloadData: () => void;
    getRecordKey: (record: any, index: number) => any;
    getColumns: () => ColumnProps<any>[];
    errorReportContent(error: Error): React.ReactNode;
    render(): {} | null | undefined;
}
