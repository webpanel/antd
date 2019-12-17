var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import Login from 'ant-design-pro/lib/Login';
import { Alert, Modal, Checkbox } from 'antd';
import { ForgotPassword } from './ForgotPassword';
var Tab = Login.Tab, UserName = Login.UserName, Password = Login.Password, Submit = Login.Submit;
import 'ant-design-pro/dist/ant-design-pro.css';
var LoginForm = /** @class */ (function (_super) {
    __extends(LoginForm, _super);
    function LoginForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            notice: '',
            type: 'tab1',
            autoLogin: true,
            forgotPasswordVisible: false
        };
        _this.onSubmit = function (err, values) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.authorizationInfo.authorize(values.username, values.password)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
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
        _this.showForgotPassword = function () {
            _this.setState({ forgotPasswordVisible: true });
        };
        _this.hideForgotPassword = function () {
            _this.setState({ forgotPasswordVisible: false });
        };
        return _this;
    }
    LoginForm.prototype.render = function () {
        var _this = this;
        var onForgotPasswordSend = this.props.onForgotPasswordSend;
        return (React.createElement("div", { style: { width: '368px', margin: '0 auto' } },
            React.createElement(Login, { defaultActiveKey: this.state.type, onTabChange: this.onTabChange, onSubmit: this.onSubmit },
                React.createElement(Tab, { key: "tab1", tab: "" },
                    this.props.authorizationInfo.authorizationError && (React.createElement(Alert, { style: { marginBottom: 24 }, message: this.props.authorizationInfo.authorizationError.message, type: "error", showIcon: true, closable: true, onClose: function () { return _this.setState({ notice: '' }); } })),
                    React.createElement(UserName, { name: "username" }),
                    React.createElement(Password, { name: "password" })),
                React.createElement("div", null,
                    React.createElement(Checkbox, { checked: this.state.autoLogin, onChange: this.changeAutoLogin, style: { visibility: 'hidden' } }, "Keep me logged in"),
                    onForgotPasswordSend && (React.createElement("a", { style: { float: 'right' }, onClick: this.showForgotPassword, href: "#" }, "Forgot password"))),
                React.createElement(Submit, { htmlType: "submit", loading: this.props.authorizationInfo.isAuthorizing }, "Login")),
            onForgotPasswordSend && (React.createElement(Modal, { title: "Forgot password", visible: this.state.forgotPasswordVisible, maskClosable: true, onCancel: this.hideForgotPassword, footer: null },
                React.createElement(ForgotPassword, { defaultEmail: "???", onSend: function (email) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, onForgotPasswordSend(email)];
                                case 1:
                                    _a.sent();
                                    this.hideForgotPassword();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, onSuccess: this.props.onForgotPasswordSuccess, onError: this.props.onForgotPasswordError })))));
    };
    return LoginForm;
}(React.Component));
export { LoginForm };
//# sourceMappingURL=LoginForm.js.map