import * as React from 'react';
import { TableProps as ATableProps } from 'antd/lib/table';
import { ResourceCollection } from 'webpanel-data';
import { TablePropsActionButton } from './TableActionButtons';
import '../../styles/Table.css';
export interface TableProps extends ATableProps<any> {
    resourceCollection?: ResourceCollection;
    actionButtons?: TablePropsActionButton[];
}
export declare class Table extends React.Component<TableProps> {
    state: {
        sortedInfo: {
            columnKey: undefined;
            order: undefined;
        };
        selectedRowKeys: never[];
    };
    handleChange: (filters: string[], sorter: Object) => void;
    onSelectChange: (selectedRowKeys: any[]) => void;
    reloadData: () => void;
    getRecordKey: (record: any, index: number) => any;
    render(): JSX.Element;
}
