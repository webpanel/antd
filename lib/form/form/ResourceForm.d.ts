import * as React from 'react';
import { FormProps } from 'antd/lib/form/Form';
import { Resource } from 'webpanel-data';
import { FormContext } from './Form';
export interface ResourceFormProps extends FormProps {
    formResource: Resource;
    render: (context: FormContext) => React.ReactNode;
    onSuccess?: (context: FormContext) => void;
    onFailure?: (err: Error, context: FormContext) => void;
}
export declare class ResourceForm extends React.Component<ResourceFormProps> {
    onSave: (values: any, context: FormContext) => Promise<void>;
    onValidationError: (err: Error, context: FormContext) => Promise<void>;
    displaySuccess: (context: FormContext) => void;
    displayError: (err: Error, context: FormContext) => void;
    render(): JSX.Element;
}
