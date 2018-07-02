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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import { get } from 'lodash';
import { Input as AntdInput } from 'antd';
import { Subscriber } from 'react-broadcast';
import { observer } from 'mobx-react';
var InputComponent = /** @class */ (function (_super) {
    __extends(InputComponent, _super);
    function InputComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.wrapInFieldDecorator = function (elm) {
            if (!_this.props.formContext) {
                return elm;
            }
            var _a = _this.props.formContext, form = _a.form, initialValues = _a.initialValues;
            var namePath = _this.props.name
                .replace(/\]\[/g, '.')
                .replace(']', '.')
                .replace('[', '.');
            var initialValue = _this.props.initialValue || get(initialValues, namePath);
            return form.getFieldDecorator(_this.props.name, {
                initialValue: initialValue
            })(elm);
        };
        return _this;
    }
    InputComponent.prototype.render = function () {
        var _a = this.props, formContext = _a.formContext, props = __rest(_a, ["formContext"]);
        return this.wrapInFieldDecorator(React.createElement(AntdInput, __assign({}, props)));
    };
    InputComponent = __decorate([
        observer
    ], InputComponent);
    return InputComponent;
}(React.Component));
export { InputComponent };
var Input = /** @class */ (function (_super) {
    __extends(Input, _super);
    function Input() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Input.prototype.render = function () {
        var _this = this;
        return (React.createElement(Subscriber, { channel: "form-context" }, function (context) { return (React.createElement(InputComponent, __assign({}, _this.props, { formContext: context }))); }));
    };
    return Input;
}(React.Component));
export { Input };
//# sourceMappingURL=Input.js.map