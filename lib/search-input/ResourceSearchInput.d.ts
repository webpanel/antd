import * as React from 'react';
import { SearchProps } from 'antd/lib/input/Search';
import { ResourceCollection } from 'webpanel-data';
export interface ResourceSearchInputProps extends SearchProps {
    resourceCollection: ResourceCollection;
}
export declare class ResourceSearchInput extends React.Component<ResourceSearchInputProps> {
    handleSearch: (value: string) => void;
    render(): JSX.Element;
}
