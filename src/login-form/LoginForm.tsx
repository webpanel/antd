import * as React from 'react';
import Login from 'ant-design-pro/lib/Login';
import { Alert, Modal, Checkbox } from 'antd';

import { ForgotPassword, ForgotPasswordHandler } from './ForgotPassword';

const { Tab, UserName, Password, Submit } = Login;

import 'ant-design-pro/dist/ant-design-pro.css';

export interface LoginFormAuthorizationInfo {
  authorize: (username: string, password: string) => void;
  isAuthorizing: boolean;
  authorizationError?: Error;
}

export interface LoginFormProps {
  authorizationInfo: LoginFormAuthorizationInfo;
  onForgotPasswordSend?: ForgotPasswordHandler;
  onForgotPasswordSuccess?: () => void;
  onForgotPasswordError?: (err: Error) => void;
}

interface LoginFormState {
  notice: string;
  type: string;
  autoLogin: boolean;
  forgotPasswordVisible: boolean;
}

export class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
  state = {
    notice: '',
    type: 'tab1',
    autoLogin: true,
    forgotPasswordVisible: false
  };

  onSubmit = async (
    err: any,
    values: { username: string; password: string }
  ) => {
    await this.props.authorizationInfo.authorize(
      values.username,
      values.password
    );
  };
  onTabChange = (key: any) => {
    this.setState({
      type: key
    });
  };
  changeAutoLogin = (e: any) => {
    this.setState({
      autoLogin: e.target.checked
    });
  };
  showForgotPassword = () => {
    this.setState({ forgotPasswordVisible: true });
  };
  hideForgotPassword = () => {
    this.setState({ forgotPasswordVisible: false });
  };
  render() {
    const { onForgotPasswordSend } = this.props;

    return (
      <div style={{ width: '368px', margin: '0 auto' }}>
        <Login
          defaultActiveKey={this.state.type}
          onTabChange={this.onTabChange}
          onSubmit={this.onSubmit}
        >
          <Tab key="tab1" tab="">
            {this.props.authorizationInfo.authorizationError && (
              <Alert
                style={{ marginBottom: 24 }}
                message={
                  this.props.authorizationInfo.authorizationError.message
                }
                type="error"
                showIcon={true}
                closable={true}
                onClose={() => this.setState({ notice: '' })}
              />
            )}
            <UserName name="username" />
            <Password name="password" />
          </Tab>
          <div>
            <Checkbox
              checked={this.state.autoLogin}
              onChange={this.changeAutoLogin}
              style={{ visibility: 'hidden' }}
            >
              Keep me logged in
            </Checkbox>
            {onForgotPasswordSend && (
              <a
                style={{ float: 'right' }}
                onClick={this.showForgotPassword}
                href="#"
              >
                Forgot password
              </a>
            )}
          </div>
          <Submit loading={this.props.authorizationInfo.isAuthorizing}>
            Login
          </Submit>
          {/* <div>
            Other login methods
            <span className="icon icon-alipay" />
            <span className="icon icon-taobao" />
            <span className="icon icon-weibo" />
            <a style={{ float: 'right' }} href="">
              Register
            </a>
          </div> */}
        </Login>

        {onForgotPasswordSend && (
          <Modal
            title="Forgot password"
            visible={this.state.forgotPasswordVisible}
            maskClosable={true}
            onCancel={this.hideForgotPassword}
            footer={null}
          >
            <ForgotPassword
              defaultEmail="???"
              onSend={async (email: string) => {
                await onForgotPasswordSend(email);
                this.hideForgotPassword();
              }}
              onSuccess={this.props.onForgotPasswordSuccess}
              onError={this.props.onForgotPasswordError}
            />
          </Modal>
        )}
      </div>
    );
  }
}
