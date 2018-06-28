import * as React from 'react';
import { FormComponentProps, WrappedFormUtils } from 'antd/lib/form/Form';
interface FormProps extends FormComponentProps {
    render: (context: FormContext) => React.ReactNode;
    initialValues?: {
        [key: string]: any;
    };
    onSave?: (values: any) => Promise<void>;
    onError?: (err: Error) => Promise<void>;
}
interface FormState {
}
export interface FormContext {
    form: WrappedFormUtils;
    initialValues: {
        [key: string]: any;
    };
}
export declare class FormComponent extends React.Component<FormProps, FormState> {
    isForceUpdated: boolean;
    resetFields: () => void;
    sanitizeValues(values: {
        [key: string]: any;
    }): {
        [key: string]: any;
    };
    submit: (e: React.FormEvent<HTMLFormElement>) => void;
    updateFieldValues(values: any): void;
    render(): JSX.Element;
}
export declare const Form: React.ComponentClass<import("../../../../../../../../../Users/jakubknejzlik/Projects/github/webpanel/antd/node_modules/antd/lib/form/Form").RcBaseFormProps & Pick<FormProps, "onError" | "render" | "initialValues" | "onSave">>;
export {};
