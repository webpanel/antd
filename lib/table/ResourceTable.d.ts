import * as React from 'react';
import { TableProps as ATableProps, SorterResult } from 'antd/lib/table';
import { PaginationConfig } from 'antd/lib/pagination';
import { ResourceCollection } from 'webpanel-data';
import { ResourceTablePropsActionButton } from './ResourceTableActionButtons';
import '../../styles/Table.css';
export interface ResourceTableProps extends ATableProps<any> {
    resourceCollection: ResourceCollection;
    actionButtons?: ResourceTablePropsActionButton[];
    detailButtonText?: string;
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
    render(): JSX.Element;
}
export {};
