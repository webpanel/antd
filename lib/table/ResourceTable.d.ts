import '../../styles/Table.css';
import * as React from 'react';
import { TableProps as ATableProps, ColumnProps, SorterResult } from 'antd/lib/table';
import { ResourceCollection } from 'webpanel-data';
import { ResourceTablePropsActionButton } from './ResourceTableActionButtons';
import { PaginationConfig } from 'antd/lib/pagination';
export declare type ResourceTableFilterNormalizer = (values: any[]) => {
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
export interface ResourceTableProps<T> extends ATableProps<any> {
    resourceCollection: ResourceCollection<T>;
    actionButtons?: ResourceTablePropsActionButton<T>[] | null;
    actionButtonsTitle?: React.ReactNode;
    actionButtonsFixed?: boolean;
    detailButtonText?: React.ReactNode;
    customDetailURL?: (referenceID: string) => string;
    columns?: ResourceTableColumn[];
}
export declare class ResourceTable<T = any> extends React.Component<ResourceTableProps<T>> {
    handleChange: (pagination: PaginationConfig, filters: Record<any, string[]>, sorter: SorterResult<any>) => void;
    reloadData: () => void;
    getRecordKey: (record: any, index: number) => any;
    getColumns: () => ColumnProps<any>[];
    errorReportContent(error: Error): React.ReactNode;
    render(): {} | null | undefined;
}
