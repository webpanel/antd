import * as React from 'react';
import { ForgotPasswordHandler } from './ForgotPassword';
import 'ant-design-pro/dist/ant-design-pro.css';
export interface LoginFormAuthorizationInfo {
    authorize: (username: string, password: string) => void;
    isAuthorizing: boolean;
    authorizationError?: Error;
}
export interface LoginFormProps {
    authorizationInfo: LoginFormAuthorizationInfo;
    onForgotPasswordSend?: ForgotPasswordHandler;
}
interface LoginFormState {
    notice: string;
    type: string;
    autoLogin: boolean;
    forgotPasswordVisible: boolean;
}
export declare class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
    state: {
        notice: string;
        type: string;
        autoLogin: boolean;
        forgotPasswordVisible: boolean;
    };
    onSubmit: (err: any, values: {
        username: string;
        password: string;
    }) => Promise<void>;
    onTabChange: (key: any) => void;
    changeAutoLogin: (e: any) => void;
    showForgotPassword: () => void;
    hideForgotPassword: () => void;
    render(): JSX.Element;
}
export {};
