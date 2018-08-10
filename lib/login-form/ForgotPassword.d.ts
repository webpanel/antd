import * as React from 'react';
export declare type ForgotPasswordHandler = ((email: string) => Promise<void>);
export interface ForgotPasswordProps {
    defaultEmail?: string;
    onSend: ForgotPasswordHandler;
    onSuccess?: () => void;
    onError?: (err: Error) => void;
}
export interface ForgotPasswordState {
    loading: boolean;
}
export declare class ForgotPassword extends React.Component<ForgotPasswordProps> {
    state: {
        loading: boolean;
    };
    onSubmit: (values: any) => Promise<void>;
    render(): JSX.Element;
}
