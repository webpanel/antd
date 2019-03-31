import * as React from 'react';
import { ResourceCollection } from 'webpanel-data';
import { SearchProps } from 'antd/lib/input/Search';
export interface ResourceSearchInputProps extends SearchProps {
    resourceCollection: ResourceCollection;
}
export interface ResourceSearchInputState extends SearchProps {
    value?: string;
}
export declare class ResourceSearchInput extends React.Component<ResourceSearchInputProps, ResourceSearchInputState> {
    private cancelHandler;
    static getDerivedStateFromProps(nextProps: ResourceSearchInputProps, prevState: ResourceSearchInputState): {
        value: string | undefined;
    };
    updateSearch: () => void;
    handleChange: (value: string) => void;
    render(): JSX.Element;
}
