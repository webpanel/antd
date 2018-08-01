/// <reference types="react" />
import { SelectProps } from 'antd/lib/select';
import { ResourceCollection } from 'webpanel-data';
import { FormElement } from '../form/form/FormElement';
declare type ResourceSelectKey = string | ((value: any) => string);
export interface ResourceSelectProps {
    resourceCollection: ResourceCollection;
    valueKey?: ResourceSelectKey;
    labelKey: ResourceSelectKey;
}
export declare class ResourceSelect extends FormElement<SelectProps & ResourceSelectProps> {
    private latestResourceData?;
    private optionsCache?;
    getValueForKey: (item: any, key: ResourceSelectKey) => string | null;
    getElement(): JSX.Element;
}
export {};
