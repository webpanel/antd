import * as React from 'react';
import { Resource } from 'webpanel-data';
export interface ResourceFormProps {
    resource: Resource;
}
export declare class ResourceForm extends React.Component<ResourceFormProps> {
    onSave: (values: any) => Promise<void>;
    render(): JSX.Element;
}
