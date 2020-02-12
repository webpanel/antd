import * as React from "react";
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
export declare class ResourceSearchInput<T extends {
    id: ResourceID;
} = any> extends React.Component<ResourceSearchInputProps<T>, ResourceSearchInputState> {
    private cancelHandler;
    static getDerivedStateFromProps(nextProps: ResourceSearchInputProps<any>, prevState: ResourceSearchInputState): {
        value: string | undefined;
    };
    updateSearch: () => void;
    handleChange: (value: string) => void;
    render(): JSX.Element;
}
