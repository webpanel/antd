import * as React from "react";
import { ResourceID } from "webpanel-data";
import { ResourceCollectionConfig } from "webpanel-data/lib/ResourceCollection";
import { SelectProps } from "antd/lib/select";
declare type ResourceSelectKey = string | ((value: any) => string);
declare type ResourceLabelKey = React.ReactNode | ((value: any) => React.ReactNode);
export interface ResourceSelectProps<T extends {
    id: ResourceID;
}> {
    resource: ResourceCollectionConfig<T>;
    valueKey?: ResourceSelectKey;
    labelKey: ResourceLabelKey;
    groupKey?: string;
}
export declare const ResourceSelect: <T extends {
    id: React.ReactText;
} = any>(props: SelectProps<any> & ResourceSelectProps<T>) => JSX.Element;
export {};
