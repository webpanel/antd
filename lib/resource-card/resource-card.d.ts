import * as React from 'react';
import { Resource, ResourceCollection } from 'webpanel-data';
import { CardProps } from 'antd/lib/card';
export interface ResourceCardProps extends CardProps {
    observedResource: ResourceCollection | Resource;
}
export declare class ResourceCard extends React.Component<ResourceCardProps> {
    render(): JSX.Element;
}
