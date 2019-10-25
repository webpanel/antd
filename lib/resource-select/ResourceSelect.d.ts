import * as React from 'react';
import { Resource, ResourceCollection } from 'webpanel-data';
import { SelectProps } from 'antd/lib/select';
declare type ResourceSelectKey = string | ((value: any) => string);
export interface ResourceSelectProps<T> {
    resourceCollection: ResourceCollection<T>;
    valueKey?: ResourceSelectKey;
    labelKey: ResourceSelectKey;
    groupKey?: string;
}
interface ResourceSelectState {
    search?: string;
    currentItem?: Resource;
}
export declare class ResourceSelect<T = any> extends React.Component<SelectProps & ResourceSelectProps<T>, ResourceSelectState> {
    state: ResourceSelectState;
    private latestResourceData?;
    private optionsCache?;
    private optionsIds?;
    getValueForKey: (item: any, key: ResourceSelectKey) => string | null;
    componentDidUpdate(): Promise<void>;
    render(): JSX.Element;
}
export {};
