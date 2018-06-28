import * as React from 'react';
import { TextAreaProps, HTMLTextareaProps } from 'antd/lib/input/TextArea';
import { FormContext } from '../form/Form';
export interface InputTextAreaProps extends TextAreaProps, HTMLTextareaProps {
    name: string;
    initialValue?: string;
}
export declare class InputTextAreaComponent extends React.Component<InputTextAreaProps & {
    formContext?: FormContext;
}> {
    wrapInFieldDecorator: (elm: JSX.Element) => React.ReactNode;
    render(): React.ReactNode;
}
export declare class InputTextArea extends React.Component<InputTextAreaProps> {
    render(): JSX.Element;
}
