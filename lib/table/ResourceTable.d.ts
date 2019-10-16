import '../../styles/Table.css';
import * as React from 'react';
import { TableProps as ATableProps, ColumnProps, SorterResult } from 'antd/lib/table';
import { ResourceCollection } from 'webpanel-data';
import { ResourceTablePropsActionButton } from './ResourceTableActionButtons';
import { PaginationConfig } from 'antd/lib/pagination';
export interface ResourceTableColumn extends ColumnProps<any> {
    sortColumns?: string[];
    filterNormalize?: (values: any[]) => {
        [key: string]: any;
    };
    filterDenormalize?: (values: {
        [key: string]: any;
    }) => any[];
}
export interface ResourceTableProps extends ATableProps<any> {
    resourceCollection: ResourceCollection;
    actionButtons?: ResourceTablePropsActionButton[] | null;
    actionButtonsTitle?: React.ReactNode;
    actionButtonsFixed?: boolean;
    detailButtonText?: React.ReactNode;
    customDetailURL?: (referenceID: string) => string;
    columns?: ResourceTableColumn[];
}
export declare class ResourceTable extends React.Component<ResourceTableProps> {
    handleChange: (pagination: PaginationConfig, filters: Record<any, string[]>, sorter: SorterResult<any>) => void;
    reloadData: () => void;
    getRecordKey: (record: any, index: number) => any;
    getColumns: () => ColumnProps<any>[];
    errorReportContent(error: Error): React.ReactNode;
    render(): {} | null | undefined;
}
