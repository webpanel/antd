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
import { Subscriber } from 'react-broadcast';
import { Observer } from 'mobx-react';
var FormElementComponent = /** @class */ (function (_super) {
    __extends(FormElementComponent, _super);
    function FormElementComponent() {
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
    FormElementComponent.prototype.render = function () {
        // const { formContext, ...props } = this.props;
        // return this.props.renderElement;
        return this.wrapInFieldDecorator(this.props.renderElement);
    };
    return FormElementComponent;
}(React.Component));
var FormElement = /** @class */ (function (_super) {
    __extends(FormElement, _super);
    function FormElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormElement.prototype.render = function () {
        var _this = this;
        return (React.createElement(Subscriber, { channel: "form-context" }, function (context) {
            return (React.createElement(Observer, null, function () { return (React.createElement(FormElementComponent, __assign({}, _this.props, { formContext: context, renderElement: _this.getElement() }))); }));
        }));
    };
    FormElement.prototype.getElement = function () {
        return React.createElement("div", null);
    };
    return FormElement;
}(React.Component));
export { FormElement };
//# sourceMappingURL=FormElement.js.map