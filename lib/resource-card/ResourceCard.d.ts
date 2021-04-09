/// <reference types="react" />
import { Resource, ResourceCollection } from "webpanel-data";
import { CardProps } from "antd/lib/card";
export interface ResourceCardProps extends CardProps {
    observedResource: ResourceCollection<any> | Resource;
}
export declare const ResourceCard: (props: ResourceCardProps) => JSX.Element;
