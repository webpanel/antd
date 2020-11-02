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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { observer } from "mobx-react";
var ResourceSearchInput = /** @class */ (function (_super) {
    __extends(ResourceSearchInput, _super);
    function ResourceSearchInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cancelHandler = null;
        _this.updateSearch = function () {
            var resourceCollection = _this.props.resourceCollection;
            var _value = _this.state.value;
            if (_value === "") {
                _value = undefined;
            }
            resourceCollection.updateSearch(_value);
        };
        _this.handleChange = function (value) {
            _this.setState({ value: value });
            if (_this.cancelHandler) {
                clearInterval(_this.cancelHandler);
            }
            _this.cancelHandler = setTimeout(function () {
                _this.updateSearch();
            }, 300);
        };
        return _this;
    }
    ResourceSearchInput.getDerivedStateFromProps = function (nextProps, prevState) {
        return {
            value: prevState ? prevState.value : nextProps.resourceCollection.search,
        };
    };
    ResourceSearchInput.prototype.render = function () {
        var _this = this;
        var _a = this.props, resourceCollection = _a.resourceCollection, props = __rest(_a, ["resourceCollection"]);
        var value = this.state.value;
        return (React.createElement(Input.Search, __assign({ value: value }, props, { 
            // onSearch={this.handleSearch}
            onChange: function (_a) {
                var target = _a.target;
                _this.handleChange(target.value);
            }, enterButton: React.createElement("a", { onClick: function () {
                    _this.handleChange("");
                } },
                React.createElement(CloseOutlined, null)) })));
    };
    ResourceSearchInput = __decorate([
        observer
    ], ResourceSearchInput);
    return ResourceSearchInput;
}(React.Component));
export { ResourceSearchInput };
//# sourceMappingURL=ResourceSearchInput.js.map