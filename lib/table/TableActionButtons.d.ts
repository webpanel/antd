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
    deleteResource: (id: import("../../../../../../../../Users/jakubknejzlik/Projects/github/webpanel/antd/node_modules/csstype").AnimationIterationCountProperty) => void;
    render(): JSX.Element;
}
export {};
