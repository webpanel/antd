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
import { Alert, Card, Spin } from "antd";
export var ResourceCard = function (props) {
    var observedResource = props.observedResource, cardProps = __rest(props, ["observedResource"]);
    var loading = observedResource.loading;
    var error = observedResource.error;
    var emptyData = !observedResource.getData();
    return (React.createElement(Spin, { spinning: loading },
        React.createElement(Card, __assign({ loading: loading && emptyData }, cardProps), error ? (React.createElement(Alert, { type: "error", message: "Error: " + error })) : (props.children))));
};
//# sourceMappingURL=ResourceCard.js.map