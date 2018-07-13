import * as React from 'react';
import { ResourceCollection } from 'webpanel-data';
export declare type TablePropsActionButton =
  | 'edit'
  | 'delete'
  | React.ReactNode;
interface TableActionButtonsProps {
  resourceCollection?: ResourceCollection;
  id: string | number;
  onDelete: ((id: string | number) => void);
  buttons: TablePropsActionButton[];
}
export declare class TableActionButtons extends React.Component<
  TableActionButtonsProps
> {
  state: {
    sortedInfo: {
      columnKey: undefined;
      order: undefined;
    };
    selectedRowKeys: never[];
  };
  deleteResource: (id: React.ReactText) => void;
  getButton(
    id: string | number,
    type: TablePropsActionButton
  ): {} | null | undefined;
  render(): JSX.Element;
}
export {};
