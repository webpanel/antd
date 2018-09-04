import * as React from 'react';
import { SelectProps } from 'antd/lib/select';
import { ResourceCollection } from 'webpanel-data';
declare type ResourceSelectKey = string | ((value: any) => string);
export interface ResourceSelectProps {
    resourceCollection: ResourceCollection;
    valueKey?: ResourceSelectKey;
    labelKey: ResourceSelectKey;
    groupKey?: string;
}
export declare class ResourceSelect extends React.Component<SelectProps & ResourceSelectProps> {
    private latestResourceData?;
    private optionsCache?;
    getValueForKey: (item: any, key: ResourceSelectKey) => string | null;
    render(): JSX.Element;
}
export {};
