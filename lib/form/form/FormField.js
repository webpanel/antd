var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import { get } from 'lodash';
import FormItem from 'antd/lib/form/FormItem';
import { ResourceSelect } from '../../resource-select/ResourceSelect';
var FormField = /** @class */ (function (_super) {
    __extends(FormField, _super);
    function FormField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.decoratedChildren = function (context) {
            if (!_this.props.children) {
                return undefined;
            }
            var form = context.form, initialValues = context.initialValues;
            var namePath = _this.props.name
                .replace(/\]\[/g, '.')
                .replace(']', '.')
                .replace('[', '.');
            var props = Object.assign({}, __assign({}, _this.props));
            props.initialValue = props.initialValue || get(initialValues, namePath);
            var children = Array.isArray(_this.props.children)
                ? _this.props.children
                : [_this.props.children];
            return children
                .filter(function (x) { return x; })
                .map(function (elm) {
                // nasty hack to handle crashes when select mode is for multiple values
                // but the form value is undefined (we provide empty array)
                if (elm) {
                    var element = elm;
                    if (element.type === ResourceSelect &&
                        element.props.mode !== 'default') {
                        props.initialValue = props.initialValue || [];
                    }
                }
                return form.getFieldDecorator(_this.props.name, props)(elm);
            });
        };
        return _this;
    }
    FormField.prototype.render = function () {
        var _a = this.props, className = _a.className, label = _a.label, labelCol = _a.labelCol, wrapperCol = _a.wrapperCol, extra = _a.extra, style = _a.style, colon = _a.colon, hasFeedback = _a.hasFeedback;
        return (React.createElement(FormItem, { className: className, label: label, labelCol: labelCol, wrapperCol: wrapperCol, extra: extra, style: style, colon: colon, hasFeedback: hasFeedback }, this.decoratedChildren(this.props.formContext)));
    };
    return FormField;
}(React.Component));
export { FormField };
//# sourceMappingURL=FormField.js.map