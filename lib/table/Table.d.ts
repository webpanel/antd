import * as React from 'react';
import { TableProps } from 'antd/lib/table';
import { ResourceCollection } from 'webpanel-data';
import '../../styles/Table.css';
export declare class Table extends React.Component<TableProps<any> & {
    resourceCollection?: ResourceCollection;
}> {
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
