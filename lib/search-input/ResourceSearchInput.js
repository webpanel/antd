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
import * as React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { debounce } from "lodash";
export var ResourceSearchInput = function (props) {
    var resourceCollection = props.resourceCollection, rest = __rest(props, ["resourceCollection"]);
    var _a = React.useState(resourceCollection.search || ""), value = _a[0], setValue = _a[1];
    var updateSearch = debounce(function (s) {
        if (s === "") {
            resourceCollection.updateSearch(undefined);
        }
        else {
            resourceCollection.updateSearch(s);
        }
    }, 500);
    var onChange = function (s) {
        setValue(s);
        updateSearch(s);
    };
    return (React.createElement(Input.Search, __assign({ value: value }, rest, { onChange: function (_a) {
            var target = _a.target;
            onChange(target.value);
        }, enterButton: React.createElement("a", { onClick: function () {
                onChange("");
            } },
            React.createElement(CloseOutlined, null)) })));
};
//# sourceMappingURL=ResourceSearchInput.js.map