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
import * as React from 'react';
import { Button, Popconfirm, Form } from 'antd';
var ResourceFormButtons = /** @class */ (function (_super) {
    __extends(ResourceFormButtons, _super);
    function ResourceFormButtons() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceFormButtons.prototype.render = function () {
        var formContext = this.props.formContext;
        var hasChanges = formContext.form.isFieldsTouched();
        return (React.createElement(Form.Item, { wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 16, offset: 8 }
            } },
            React.createElement(Button, { disabled: !hasChanges, type: "primary", htmlType: "submit" }, "Send"),
            React.createElement(Popconfirm, { title: "Reset?", cancelText: "No", okText: "Yes", onConfirm: function () { return formContext.form.resetFields(); } },
                React.createElement(Button, { disabled: !hasChanges, style: { marginLeft: 8 } }, "Reset"))));
    };
    return ResourceFormButtons;
}(React.Component));
export { ResourceFormButtons };
//# sourceMappingURL=ResourceFormButtons.js.map