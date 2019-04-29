import * as React from 'react';
import { FormContext } from './Form';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
export interface FormFieldDecoratorProps extends GetFieldDecoratorOptions {
    formContext: FormContext;
    name: string;
}
export declare class FormFieldDecorator extends React.Component<FormFieldDecoratorProps> {
    wrapInFieldDecorator: (elm: React.ReactNode) => React.ReactNode;
    render(): React.ReactNode;
}
