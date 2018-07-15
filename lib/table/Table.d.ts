import * as React from 'react';
import { TableProps as ATableProps, SorterResult } from 'antd/lib/table';
import { PaginationConfig } from 'antd/lib/pagination';
import { ResourceCollection } from 'webpanel-data';
import { TablePropsActionButton } from './TableActionButtons';
import '../../styles/Table.css';
export interface TableProps extends ATableProps<any> {
    resourceCollection?: ResourceCollection;
    actionButtons?: TablePropsActionButton[];
}
interface TableState {
    sortedInfo: SorterResult<any> | undefined;
    selectedRowKeys: any[];
}
export declare class Table extends React.Component<TableProps, TableState> {
    state: TableState;
    handleChange: (pagination: PaginationConfig, filters: Record<any, string[]>, sorter: SorterResult<any>) => void;
    onSelectChange: (selectedRowKeys: any[]) => void;
    reloadData: () => void;
    getRecordKey: (record: any, index: number) => any;
    render(): JSX.Element;
}
export {};
