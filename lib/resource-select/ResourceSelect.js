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
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import * as uuid from 'uuid';
import { Select, Spin } from 'antd';
import { observer } from 'mobx-react';
var ResourceSelect = /** @class */ (function (_super) {
    __extends(ResourceSelect, _super);
    function ResourceSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { search: undefined, currentItem: undefined };
        _this.latestResourceData = undefined;
        _this.optionsCache = undefined;
        _this.optionsIds = undefined;
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
    ResourceSelect.prototype.componentDidUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resourceCollection, value, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resourceCollection = this.props.resourceCollection;
                        if (resourceCollection.search !== this.state.search) {
                            resourceCollection.updateSearch(this.state.search);
                        }
                        value = (this.props.value && this.props.value.toString()) || null;
                        if (!value) return [3 /*break*/, 4];
                        if (!(!this.state.currentItem || this.state.currentItem.id !== value)) return [3 /*break*/, 3];
                        return [4 /*yield*/, resourceCollection.getItem({ id: value })];
                    case 1:
                        item = _a.sent();
                        return [4 /*yield*/, item.get()];
                    case 2:
                        _a.sent();
                        this.setState({ currentItem: item });
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        if (this.state.currentItem) {
                            this.setState({ currentItem: undefined });
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ResourceSelect.prototype.render = function () {
        var _this = this;
        var _a = this.props, labelKey = _a.labelKey, valueKey = _a.valueKey, resourceCollection = _a.resourceCollection, props = __rest(_a, ["labelKey", "valueKey", "resourceCollection"]);
        var currentItem = this.state.currentItem;
        if (this.latestResourceData !== resourceCollection.data) {
            this.optionsCache = undefined;
            this.optionsIds = undefined;
        }
        if (!this.optionsCache && resourceCollection.data) {
            var optionsIds_1 = [];
            this.optionsIds = optionsIds_1;
            var groupKey_1 = this.props.groupKey;
            if (groupKey_1) {
                var groups_1 = {};
                resourceCollection.data.forEach(function (item, index) {
                    var label = item[groupKey_1];
                    if (!groups_1[label]) {
                        groups_1[label] = [];
                    }
                    var id = _this.getValueForKey(item, valueKey || 'id') || index;
                    optionsIds_1.push(id.toString());
                    groups_1[label].push(React.createElement(Select.Option, { key: id.toString(), value: id }, _this.getValueForKey(item, labelKey)));
                });
                this.optionsCache = Object.keys(groups_1).map(function (key) { return (React.createElement(Select.OptGroup, { key: key, label: key }, groups_1[key])); });
            }
            else {
                this.optionsCache = resourceCollection.data.map(function (item, index) {
                    var id = _this.getValueForKey(item, valueKey || 'id') || index;
                    optionsIds_1.push(id.toString());
                    return (React.createElement(Select.Option, { key: id.toString(), value: id }, _this.getValueForKey(item, labelKey)));
                });
            }
            this.latestResourceData = resourceCollection.data;
        }
        var className = "resource-select__" + uuid.v4();
        var options = this.optionsCache || [];
        return (React.createElement(Select
        // onSearch={this.onSearch}
        , __assign({ 
            // onSearch={this.onSearch}
            className: className, loading: resourceCollection.loading, notFoundContent: resourceCollection.loading ? React.createElement(Spin, { size: "small" }) : null, showSearch: true, allowClear: true, optionFilterProp: "children", dropdownStyle: { position: 'relative' }, getPopupContainer: function () {
                return document.querySelector("." + className) || document.body;
            }, onSearch: function (value) {
                _this.setState({ search: value });
            }, onFocus: function () {
                resourceCollection.get();
            }, onBlur: function () {
                _this.setState({ search: undefined });
            } }, props),
            this.optionsIds &&
                currentItem &&
                currentItem.id &&
                this.optionsIds.indexOf(currentItem.id.toString()) === -1 &&
                currentItem.data && (React.createElement(Select.Option, { key: currentItem.id.toString(), value: currentItem.id }, this.getValueForKey(currentItem.data, labelKey))),
            options));
    };
    ResourceSelect = __decorate([
        observer
    ], ResourceSelect);
    return ResourceSelect;
}(React.Component));
export { ResourceSelect };
//# sourceMappingURL=ResourceSelect.js.map