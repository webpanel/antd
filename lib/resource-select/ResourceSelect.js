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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import * as React from "react";
import { useResourceCollection } from "webpanel-data";
import { Select, Spin } from "antd";
import debounce from "lodash/debounce";
import { observer } from "mobx-react";
// interface ResourceSelectState {
//   search?: string;
//   currentItem?: Resource;
// }
export var ResourceSelectComponent = function (props) {
    var _a;
    var onChange = props.onChange, value = props.value, resource = props.resource, valueKey = props.valueKey, labelKey = props.labelKey, rest = __rest(props, ["onChange", "value", "resource", "valueKey", "labelKey"]);
    var _b = React.useState(), search = _b[0], setSearch = _b[1];
    var _c = React.useState(false), hasFocus = _c[0], setHasFocus = _c[1];
    var _d = React.useState(30), limit = _d[0], setLimit = _d[1];
    var drobdownResourceCollection = useResourceCollection(__assign(__assign({}, resource), { initialSearch: search, disabled: !hasFocus, initialLimit: limit }));
    var ids = value ? (Array.isArray(value) ? value : [value]) : [];
    var valuesResourceCollection = useResourceCollection(__assign(__assign({}, resource), { initialFilters: { id_in: ids }, disabled: ids.length === 0 }));
    var getValueForKey = function (item, key) {
        if (typeof key === "string") {
            return item[key];
        }
        else if (typeof key === "function") {
            return key(item);
        }
        return null;
    };
    var onSearch = debounce(function (s) {
        // resourceCollection.updateSearch(search);
        setSearch(s);
    }, 500);
    var data = {};
    var allValues = __spreadArrays((((_a = drobdownResourceCollection) === null || _a === void 0 ? void 0 : _a.data) || []), ((!search && valuesResourceCollection.data) || []));
    for (var _i = 0, allValues_1 = allValues; _i < allValues_1.length; _i++) {
        var item = allValues_1[_i];
        var val = getValueForKey(item, valueKey);
        if (val) {
            data[val] = getValueForKey(item, labelKey);
        }
    }
    return (React.createElement(Select, __assign({ value: value, loading: drobdownResourceCollection.loading || valuesResourceCollection.loading, onSearch: function (s) { return onSearch(s); }, onChange: function (val, option) {
            if (typeof val === "undefined") {
                val = null;
            }
            if (onChange) {
                onChange(val, option);
            }
        }, onBlur: function () {
            setHasFocus(false);
            setSearch(undefined);
        }, filterOption: false, autoClearSearchValue: false, allowClear: true, optionFilterProp: "children", dropdownStyle: { position: "relative" }, onFocus: function () { return setHasFocus(true); }, notFoundContent: drobdownResourceCollection.loading ? React.createElement(Spin, { size: "small" }) : null, onPopupScroll: function (e) {
            var target = e.target;
            if (!drobdownResourceCollection.loading &&
                target.scrollTop + target.offsetHeight > target.scrollHeight - 50) {
                if (limit < (drobdownResourceCollection.count || 0)) {
                    setLimit(limit + 30);
                }
            }
        } }, rest), Object.keys(data).map(function (key) { return (React.createElement(Select.Option, { value: key }, data[key])); })));
};
// <T extends { id: ResourceID } = any>
export var ResourceSelect = observer(function (props) { return (React.createElement(ResourceSelectComponent, __assign({}, props))); });
//# sourceMappingURL=ResourceSelect.js.map