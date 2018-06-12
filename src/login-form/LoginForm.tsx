import * as React from 'react';
import Login from 'ant-design-pro/lib/Login';
import { Alert } from 'antd';

const { Tab, UserName, Password, Submit } = Login;

import 'ant-design-pro/dist/ant-design-pro.css';

export interface LoginFormAuthorizationInfo {
  authorize: (username: string, password: string) => void;
  isAuthorizing: boolean;
  authorizationError?: Error;
}

export interface LoginFormProps {
  authorizationInfo: LoginFormAuthorizationInfo;
}

export class LoginForm extends React.Component<LoginFormProps> {
  state = {
    notice: '',
    type: 'tab1',
    autoLogin: true
  };
  onSubmit = (err: any, values: { username: string; password: string }) => {
    // console.log(err, values);
    this.props.authorizationInfo.authorize(values.username, values.password);
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
  render() {
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
            {/* <Checkbox
              checked={this.state.autoLogin}
              onChange={this.changeAutoLogin}
            >
              Keep me logged in
            </Checkbox> */}
            {/* <a style={{ float: 'right' }} href="">
              Zapomenuté heslo
            </a> */}
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
      </div>
    );
  }
}
