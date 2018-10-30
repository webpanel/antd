import * as React from 'react';
import { TableProps as ATableProps, ColumnProps, SorterResult } from 'antd/lib/table';
import { PaginationConfig } from 'antd/lib/pagination';
import { ResourceCollection } from 'webpanel-data';
import { ResourceTablePropsActionButton } from './ResourceTableActionButtons';
import '../../styles/Table.css';
export interface ResourceTableProps extends ATableProps<any> {
    resourceCollection: ResourceCollection;
    actionButtons?: ResourceTablePropsActionButton[] | null;
    actionButtonsTitle?: React.ReactNode;
    detailButtonText?: React.ReactNode;
    customDetailURL?: ((referenceID: string) => string);
}
interface ResourceTableState {
    selectedRowKeys: any[];
}
export declare class ResourceTable extends React.Component<ResourceTableProps, ResourceTableState> {
    state: ResourceTableState;
    handleChange: (pagination: PaginationConfig, filters: Record<any, string[]>, sorter: SorterResult<any>) => void;
    onSelectChange: (selectedRowKeys: any[]) => void;
    reloadData: () => void;
    getRecordKey: (record: any, index: number) => any;
    getColumns: () => ColumnProps<any>[];
    render(): JSX.Element;
}
export {};
