import * as React from "react";

import { Button, Icon, Modal, message } from "antd";
import { ResourceCollection, ResourceID } from "webpanel-data";

import { ButtonSize } from "antd/lib/button";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

export type ResourceTablePropsActionButton<T extends { id: ResourceID }> =
  | "detail"
  | "delete"
  | React.ReactNode
  | ((props: ActionButtonProps<T>) => React.ReactNode);

interface ResourceTableActionButtonsProps<T extends { id: ResourceID }> {
  resourceCollection: ResourceCollection<T>;
  id: string | number;
  values: { [key: string]: any };
  onDelete: (id: string | number) => void;
  buttons: ResourceTablePropsActionButton<T>[];
  detailButtonText?: React.ReactNode;
  customDetailURL?: (referenceID: string) => string;
  size?: ButtonSize;
}

export interface ActionButtonProps<T extends { id: ResourceID }> {
  resourceID: string | number;
  values: { [key: string]: any };
  resourceCollection: ResourceCollection<T>;
  type: ResourceTablePropsActionButton<T>;
  customDetailURL?: (referenceID: string) => string;
}

@observer
export class ResourceTableActionButtons<
  T extends { id: ResourceID } = any
> extends React.Component<ResourceTableActionButtonsProps<T>> {
  state = {
    sortedInfo: { columnKey: undefined, order: undefined },
    selectedRowKeys: [],
  };

  deleteResource = (id: string | number) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "Do you want to delete this item?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        const resource = this.props.resourceCollection;
        if (resource) {
          try {
            await new Promise((resolve: any) => {
              setTimeout(resolve, 2000);
            });
            await resource.delete(id);
            this.props.onDelete(id);
          } catch (err) {
            message.error(err.message);
          }
        }
      },
    });
  };

  getButton(props: ActionButtonProps<T>) {
    const { size } = this.props;

    if (typeof props.type === "string") {
      switch (props.type) {
        case "detail":
          const { detailButtonText } = this.props;
          return (
            <Link
              key="edit-button-action"
              to={
                props.customDetailURL
                  ? props.customDetailURL(props.resourceID.toString())
                  : props.resourceID.toString()
              }
            >
              <Button size={size}>
                {detailButtonText || <Icon type="search" />}
              </Button>
            </Link>
          );
        case "delete":
          return (
            <Button
              key="delete-button-action"
              onClick={() => this.deleteResource(props.resourceID)}
              type="danger"
              size={size}
            >
              <Icon type="delete" />
            </Button>
          );
        default:
      }
    } else if (typeof props.type === "function") {
      return props.type(props);
    }
    return props.type;
  }

  render() {
    const {
      id,
      values,
      resourceCollection,
      buttons,
      customDetailURL,
    } = this.props;
    return (
      <div>
        {buttons.map((button) => {
          return this.getButton({
            resourceID: id,
            values,
            resourceCollection,
            type: button,
            customDetailURL,
          });
        })}
      </div>
    );
  }
}
