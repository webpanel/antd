import * as React from 'react';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { FormContext } from './Form';
export interface FormElementProps extends GetFieldDecoratorOptions {
    name: string;
}
export declare class FormElementBase<P> extends React.Component<P & FormElementProps> {
    render(): JSX.Element;
    getElement(): React.ReactNode;
}
export declare class FormElementComponent extends React.Component<FormElementProps & {
    formContext?: FormContext;
    renderElement: React.ReactNode;
}> {
    wrapInFieldDecorator: (elm: React.ReactNode) => React.ReactNode;
    render(): React.ReactNode;
}
