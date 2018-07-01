import * as React from 'react';
import { ResourceCollection } from 'webpanel-data';
interface TableActionButtonsProps {
    resourceCollection?: ResourceCollection;
    id: string | number;
    onDelete: ((id: string | number) => void);
}
export declare class TableActionButtons extends React.Component<TableActionButtonsProps> {
    state: {
        sortedInfo: {
            columnKey: undefined;
            order: undefined;
        };
        selectedRowKeys: never[];
    };
    deleteResource: (id: string | number) => void;
    render(): JSX.Element;
}
export {};
