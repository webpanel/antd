import * as React from 'react';
import { Button, Modal } from 'antd';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import { ResourceCollection } from 'webpanel-data';

export type ResourceTablePropsActionButton =
  | 'detail'
  | 'delete'
  | React.ReactNode
  | ((props: ActionButtonProps) => React.ReactNode);

interface ResourceTableActionButtonsProps {
  resourceCollection: ResourceCollection;
  id: string | number;
  values: { [key: string]: any };
  onDelete: ((id: string | number) => void);
  buttons: ResourceTablePropsActionButton[];
  detailButtonText?: string;
}

export interface ActionButtonProps {
  resourceID: string | number;
  values: { [key: string]: any };
  resourceCollection: ResourceCollection;
  type: ResourceTablePropsActionButton;
}

@observer
export class ResourceTableActionButtons extends React.Component<
  ResourceTableActionButtonsProps
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

  getButton(props: ActionButtonProps) {
    if (typeof props.type === 'string') {
      switch (props.type) {
        case 'detail':
          const { detailButtonText } = this.props;
          return (
            <Link key="edit-button-action" to={props.resourceID.toString()}>
              <Button>{detailButtonText || 'Detail'}</Button>
            </Link>
          );
        case 'delete':
          return (
            <Button
              key="delete-button-action"
              onClick={() => this.deleteResource(props.resourceID)}
              type="danger"
            >
              Delete
            </Button>
          );
        default:
      }
    } else if (typeof props.type === 'function') {
      return props.type(props);
    }
    return props.type;
  }

  render() {
    const { id, values, resourceCollection, buttons } = this.props;
    return (
      <div>
        {buttons.map(button => {
          return this.getButton({
            resourceID: id,
            values,
            resourceCollection,
            type: button
          });
        })}
      </div>
    );
  }
}
