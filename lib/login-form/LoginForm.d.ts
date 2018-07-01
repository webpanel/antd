import * as React from 'react';
import 'ant-design-pro/dist/ant-design-pro.css';
export interface LoginFormAuthorizationInfo {
    authorize: (username: string, password: string) => void;
    isAuthorizing: boolean;
    authorizationError?: Error;
}
export interface LoginFormProps {
    authorizationInfo: LoginFormAuthorizationInfo;
}
export declare class LoginForm extends React.Component<LoginFormProps> {
    state: {
        notice: string;
        type: string;
        autoLogin: boolean;
    };
    onSubmit: (err: any, values: {
        username: string;
        password: string;
    }) => Promise<void>;
    onTabChange: (key: any) => void;
    changeAutoLogin: (e: any) => void;
    render(): JSX.Element;
}
