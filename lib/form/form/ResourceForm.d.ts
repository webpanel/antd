import * as React from 'react';
import { FormProps } from 'antd/lib/form/Form';
import { Resource } from 'webpanel-data';
export interface ResourceFormProps extends FormProps {
    formResource: Resource;
    onSuccess?: () => void;
    onFailure?: (err: Error) => void;
}
export declare class ResourceForm extends React.Component<ResourceFormProps> {
    onSave: (values: any) => Promise<void>;
    displaySuccess: () => void;
    displayError: (err: Error) => void;
    render(): JSX.Element;
}
