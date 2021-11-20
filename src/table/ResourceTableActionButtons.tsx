import * as React from "react";

import { Button, Modal, message } from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { ResourceCollection, ResourceID } from "webpanel-data";

import { ButtonSize } from "antd/lib/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export type ResourceTablePropsActionButton<T extends { id: ResourceID }> =
  | "detail"
  | "delete"
  | React.ReactNode
  | ((props: ActionButtonProps<T>) => React.ReactNode);

interface ResourceTableActionButtonsProps<T extends { id: ResourceID }> {
  resourceCollection: ResourceCollection<T>;
  id: string | number;
  values: { [key: string]: any };
  onDelete: (id: ResourceID) => void;
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

export const ResourceTableActionButtons = <T extends { id: ResourceID } = any>(
  props: ResourceTableActionButtonsProps<T>
) => {
  const { t } = useTranslation("webpanel-antd");

  const deleteResource = (id: ResourceID) => {
    Modal.confirm({
      title: t("confirmDeleteTitle"),
      content: t("confirmDeleteContent"),
      okText: t("yes"),
      cancelText: t("no"),
      onOk: async () => {
        const resource = props.resourceCollection;
        if (resource) {
          try {
            await new Promise((resolve: any) => {
              setTimeout(resolve, 2000);
            });
            await resource.delete(id);
            props.onDelete(id);
          } catch (err) {
            message.error(err.message);
          }
        }
      },
    });
  };

  const getButton = (_props: ActionButtonProps<T>) => {
    const { size } = props;

    if (typeof _props.type === "string") {
      switch (_props.type) {
        case "detail":
          const { detailButtonText } = props;
          return (
            <Link
              key="edit-button-action"
              to={
                props.customDetailURL
                  ? props.customDetailURL(_props.resourceID.toString())
                  : _props.resourceID.toString()
              }
            >
              <Button size={size}>
                {detailButtonText || <SearchOutlined />}
              </Button>
            </Link>
          );
        case "delete":
          return (
            <Button
              key="delete-button-action"
              onClick={() => deleteResource(_props.resourceID)}
              danger={true}
              size={size}
              icon={<DeleteOutlined />}
            />
          );
        default:
      }
    } else if (typeof _props.type === "function") {
      return _props.type(_props);
    }
    return _props.type;
  };

  const { id, values, resourceCollection, buttons, customDetailURL } = props;
  return (
    <div>
      {buttons.map((button) => {
        return getButton({
          resourceID: id,
          values,
          resourceCollection,
          type: button,
          customDetailURL,
        });
      })}
    </div>
  );
};
