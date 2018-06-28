import * as React from 'react';
import { InputProps as AInputProps } from 'antd/lib/input/Input';
import { FormContext } from '../form/Form';
export interface InputProps extends AInputProps {
    name: string;
    initialValue?: string;
}
export declare class InputComponent extends React.Component<InputProps & {
    formContext?: FormContext;
}> {
    wrapInFieldDecorator: (elm: JSX.Element) => React.ReactNode;
    render(): React.ReactNode;
}
export declare class Input extends React.Component<InputProps> {
    render(): JSX.Element;
}
