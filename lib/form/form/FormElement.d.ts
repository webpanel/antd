import * as React from 'react';
import { InputProps } from 'antd/lib/input/Input';
export interface FormElementProps extends InputProps {
    name: string;
    initialValue?: string;
}
export declare class FormElement<P> extends React.Component<P & FormElementProps> {
    render(): JSX.Element;
    getElement(): React.ReactNode;
}
