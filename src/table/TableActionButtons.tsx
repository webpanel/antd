import * as React from 'react';
import { Button, Modal } from 'antd';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import { ResourceCollection } from 'webpanel-data';

export type TablePropsActionButton =
  | 'detail'
  | 'delete'
  | React.ReactNode
  | ((
      id: string | number,
      values: { [key: string]: any },
      resourceCollection: ResourceCollection
    ) => React.ReactNode);

interface TableActionButtonsProps {
  resourceCollection: ResourceCollection;
  id: string | number;
  values: { [key: string]: any };
  onDelete: ((id: string | number) => void);
  buttons: TablePropsActionButton[];
  detailButtonText?: string;
}

@observer
export class TableActionButtons extends React.Component<
  TableActionButtonsProps
> {
  state = {
    sortedInfo: { columnKey: undefined, order: undefined },
    selectedRowKeys: []
  };

  deleteResource = (id: string | number) => {
    Modal.confirm({
      title: 'Are you sure?',
      content: 'Do you want to delete this item?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: async () => {
        const resource = this.props.resourceCollection;
        if (resource) {
          try {
            await resource.delete(id);
            this.props.onDelete(id);
          } catch (err) {
            console.log(err);
          }
        }
      }
    });
  };

  getButton(
    id: string | number,
    values: { [key: string]: string },
    resourceCollection: ResourceCollection,
    type: TablePropsActionButton
  ) {
    if (typeof type === 'string') {
      switch (type) {
        case 'detail':
          const { detailButtonText } = this.props;
          return (
            <Link key="edit-button-action" to={id.toString()}>
              <Button>{detailButtonText || 'Detail'}</Button>
            </Link>
          );
        case 'delete':
          return (
            <Button
              key="delete-button-action"
              onClick={() => this.deleteResource(id)}
              type="danger"
            >
              Delete
            </Button>
          );
        default:
      }
    } else if (typeof type === 'function') {
      return type(id, values, resourceCollection);
    }
    return type;
  }

  render() {
    const { id, values, resourceCollection, buttons } = this.props;
    return (
      <div>
        {buttons.map(button => {
          return this.getButton(id, values, resourceCollection, button);
        })}
      </div>
    );
  }
}
