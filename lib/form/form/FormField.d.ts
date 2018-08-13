import * as React from 'react';
import { FormContext } from './Form';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { ColProps } from 'antd/lib/col';
export interface FormFieldProps extends GetFieldDecoratorOptions {
    className?: string;
    label?: React.ReactNode;
    labelCol?: ColProps;
    wrapperCol?: ColProps;
    extra?: React.ReactNode;
    style?: React.CSSProperties;
    colon?: boolean;
    hasFeedback?: boolean;
    name: string;
    formContext: FormContext;
}
export declare class FormField extends React.Component<FormFieldProps> {
    decoratedChildren: (context: FormContext) => React.ReactNode;
    render(): JSX.Element;
}
