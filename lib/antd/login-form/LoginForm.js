var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import Login from 'ant-design-pro/lib/Login';
import { Alert } from 'antd';
var Tab = Login.Tab, UserName = Login.UserName, Password = Login.Password, Submit = Login.Submit;
import 'ant-design-pro/dist/ant-design-pro.css';
var LoginForm = /** @class */ (function (_super) {
    __extends(LoginForm, _super);
    function LoginForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            notice: '',
            type: 'tab1',
            autoLogin: true
        };
        _this.onSubmit = function (err, values) {
            // console.log(err, values);
            _this.props.authorizationInfo.authorize(values.username, values.password);
        };
        _this.onTabChange = function (key) {
            _this.setState({
                type: key
            });
        };
        _this.changeAutoLogin = function (e) {
            _this.setState({
                autoLogin: e.target.checked
            });
        };
        return _this;
    }
    LoginForm.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { style: { width: '368px', margin: '0 auto' } },
            React.createElement(Login, { defaultActiveKey: this.state.type, onTabChange: this.onTabChange, onSubmit: this.onSubmit },
                React.createElement(Tab, { key: "tab1", tab: "" },
                    this.props.authorizationInfo.authorizationError && (React.createElement(Alert, { style: { marginBottom: 24 }, message: this.props.authorizationInfo.authorizationError.message, type: "error", showIcon: true, closable: true, onClose: function () { return _this.setState({ notice: '' }); } })),
                    React.createElement(UserName, { name: "username" }),
                    React.createElement(Password, { name: "password" })),
                React.createElement("div", null),
                React.createElement(Submit, { loading: this.props.authorizationInfo.isAuthorizing }, "Login"))));
    };
    return LoginForm;
}(React.Component));
export { LoginForm };
//# sourceMappingURL=LoginForm.js.map