import * as React from "react";

import { Alert, Card, Spin } from "antd";
import { Resource, ResourceCollection } from "webpanel-data";

import { CardProps } from "antd/lib/card";

export interface ResourceCardProps extends CardProps {
  observedResource: ResourceCollection<any> | Resource;
}

export const ResourceCard = (props: ResourceCardProps) => {
  const { observedResource, ...cardProps } = props;
  const loading = observedResource.loading;
  const error = observedResource.error;
  const emptyData = !observedResource.getData();
  return (
    <Spin spinning={loading}>
      <Card loading={loading && emptyData} {...cardProps}>
        {error ? (
          <Alert type="error" message={`Error: ${error}`} />
        ) : (
          props.children
        )}
      </Card>
    </Spin>
  );
};
