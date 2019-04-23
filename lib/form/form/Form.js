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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
import * as moment from 'moment';
import { Form as AForm } from 'antd';
import { observer } from 'mobx-react';
var FormComponent = /** @class */ (function (_super) {
    __extends(FormComponent, _super);
    function FormComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isForceUpdated = false;
        _this.resetFields = function () {
            var form = _this.props.form;
            if (form) {
                form.resetFields();
            }
        };
        _this.submit = function (e) { return __awaiter(_this, void 0, void 0, function () {
            var _a, form, initialValues, formContext;
            var _this = this;
            return __generator(this, function (_b) {
                if (e) {
                    e.preventDefault();
                }
                _a = this.props, form = _a.form, initialValues = _a.initialValues;
                formContext = {
                    form: form,
                    formComponent: this,
                    initialValues: initialValues || {}
                };
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (typeof form === 'undefined') {
                            return resolve();
                        }
                        form.validateFields(function (err, values) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        values = this.sanitizeValues(values);
                                        if (!err) return [3 /*break*/, 1];
                                        if (this.props.onValidationError) {
                                            this.props.onValidationError(err, formContext);
                                        }
                                        reject(err);
                                        return [3 /*break*/, 4];
                                    case 1:
                                        form.setFieldsValue(values);
                                        if (!this.props.onSave) return [3 /*break*/, 3];
                                        return [4 /*yield*/, this.props.onSave(values, formContext)];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3:
                                        resolve();
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                    })];
            });
        }); };
        return _this;
    }
    FormComponent.prototype.sanitizeValues = function (values) {
        var _values = {};
        for (var _i = 0, _a = Object.keys(values); _i < _a.length; _i++) {
            var key = _a[_i];
            var value = values[key];
            if (value === null) {
                _values[key] = null;
            }
            else if (value instanceof Date ||
                (typeof value === 'string' &&
                    moment(value, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]', true).isValid())) {
                // we need to remove milliseconds as it's not possible to store them in some database engines (MySQL)
                // we are also checking by moment because form return dates as strings
                _values[key] =
                    moment(value)
                        .toISOString()
                        .split('.')[0] + '.000Z';
            }
            else if (value instanceof Array) {
                _values[key] = value;
            }
            else if (typeof value === 'object') {
                _values[key] = this.sanitizeValues(value);
            }
            else {
                _values[key] = value;
            }
        }
        return _values;
    };
    FormComponent.prototype.updateFieldValues = function (values) {
        var form = this.props.form;
        if (typeof form === 'undefined') {
            return;
        }
        var keys = Object.keys(form.getFieldsValue());
        var newValues = {};
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            newValues[key] = values[key];
        }
        form.setFieldsValue(newValues);
    };
    FormComponent.prototype.render = function () {
        var _a = this.props, form = _a.form, initialValues = _a.initialValues, onSave = _a.onSave, onValidationError = _a.onValidationError, render = _a.render, formProps = __rest(_a, ["form", "initialValues", "onSave", "onValidationError", "render"]);
        // const formItemLayout =
        //   this.props.layout === 'horizontal'
        //     ? {
        //         labelCol: { span: 4 },
        //         wrapperCol: { span: 14 }
        //       }
        //     : null;
        // const buttonItemLayout = formLayout === 'horizontal' ? {
        //   wrapperCol: { span: 14, offset: 4 },
        // } : null;
        var formContext = {
            form: form,
            formComponent: this,
            initialValues: initialValues || {}
        };
        return (React.createElement(AForm, __assign({ onSubmit: this.submit }, formProps), render(formContext)));
    };
    FormComponent = __decorate([
        observer
    ], FormComponent);
    return FormComponent;
}(React.Component));
export { FormComponent };
export var Form = AForm.create()(FormComponent);
//# sourceMappingURL=Form.js.map