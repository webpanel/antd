import * as React from 'react';
import { FormContext } from './Form';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
export interface FormFieldDecoratorProps extends GetFieldDecoratorOptions {
    name: string;
}
export declare class FormFieldDecorator<P> extends React.Component<P & FormFieldDecoratorProps> {
    render(): JSX.Element;
    getElement(): React.ReactNode;
}
export declare class FormElementComponent extends React.Component<FormFieldDecoratorProps & {
    formContext?: FormContext;
    renderElement: React.ReactNode;
}> {
    wrapInFieldDecorator: (elm: React.ReactNode) => React.ReactNode;
    render(): React.ReactNode;
}
