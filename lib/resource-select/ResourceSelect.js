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
import { Select } from 'antd';
import { observer } from 'mobx-react';
import { FormElement } from '../form/form/FormElement';
var ResourceSelect = /** @class */ (function (_super) {
    __extends(ResourceSelect, _super);
    function ResourceSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.latestResourceData = undefined;
        _this.optionsCache = undefined;
        // onSearch = (value: string) => this.setState({ value });
        _this.getValueForKey = function (item, key) {
            if (typeof key === 'string') {
                return item[key];
            }
            else if (typeof key === 'function') {
                return key(item);
            }
            return null;
        };
        return _this;
    }
    ResourceSelect.prototype.getElement = function () {
        var _this = this;
        var _a = this.props, labelKey = _a.labelKey, valueKey = _a.valueKey, resourceCollection = _a.resourceCollection, props = __rest(_a, ["labelKey", "valueKey", "resourceCollection"]);
        if (this.latestResourceData !== resourceCollection.data) {
            this.optionsCache = undefined;
        }
        if (!this.optionsCache && resourceCollection.data) {
            this.optionsCache = resourceCollection.data.map(function (item, index) {
                var id = _this.getValueForKey(item, valueKey || 'id') || index;
                return (React.createElement(Select.Option, { key: id, value: id }, _this.getValueForKey(item, labelKey)));
            });
            this.latestResourceData = resourceCollection.data;
        }
        var options = this.optionsCache || [];
        return (React.createElement(Select
        // onSearch={this.onSearch}
        , __assign({ 
            // onSearch={this.onSearch}
            showSearch: true }, props), options));
    };
    ResourceSelect = __decorate([
        observer
    ], ResourceSelect);
    return ResourceSelect;
}(FormElement));
export { ResourceSelect };
//# sourceMappingURL=ResourceSelect.js.map