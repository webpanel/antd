import * as React from 'react';
import { SelectProps } from 'antd/lib/select';
import { ResourceCollection, Resource } from 'webpanel-data';
declare type ResourceSelectKey = string | ((value: any) => string);
export interface ResourceSelectProps {
    resourceCollection: ResourceCollection;
    valueKey?: ResourceSelectKey;
    labelKey: ResourceSelectKey;
    groupKey?: string;
}
interface ResourceSelectState {
    search?: string;
    currentItem?: Resource;
}
export declare class ResourceSelect extends React.Component<SelectProps & ResourceSelectProps, ResourceSelectState> {
    state: ResourceSelectState;
    private latestResourceData?;
    private optionsCache?;
    private optionsIds?;
    getValueForKey: (item: any, key: ResourceSelectKey) => string | null;
    componentDidUpdate(): Promise<void>;
    render(): JSX.Element;
}
export {};
