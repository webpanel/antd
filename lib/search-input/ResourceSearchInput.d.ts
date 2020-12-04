/// <reference types="react" />
import { ResourceCollection, ResourceID } from "webpanel-data";
import { SearchProps } from "antd/lib/input/Search";
export interface ResourceSearchInputProps<T extends {
    id: ResourceID;
}> extends SearchProps {
    resourceCollection: ResourceCollection<T>;
}
export interface ResourceSearchInputState extends SearchProps {
    value?: string;
}
export declare const ResourceSearchInputComponent: (props: ResourceSearchInputProps<any>) => JSX.Element;
export declare const ResourceSearchInput: (props: ResourceSearchInputProps<any>) => JSX.Element;
