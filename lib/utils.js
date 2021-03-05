var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { resolve } from "url";
export var searchChildrenWithType = function (children, type) {
    var child = Array.isArray(children) ? __spreadArrays(children) : [children];
    return child.filter(function (comp) {
        return comp && comp.type === type;
    });
};
export var appendStringPath = function (currentPath, appendPath) {
    if (appendPath[0] === "/") {
        appendPath = appendPath.substr(1);
    }
    if (currentPath.substr(-1) !== "/") {
        currentPath += "/";
    }
    var resolvedPath = resolve(currentPath, appendPath);
    if (resolvedPath.substr(-1) !== "/") {
        resolvedPath += "/";
    }
    if (resolvedPath[0] !== "/") {
        resolvedPath = "/" + resolvedPath;
    }
    return resolvedPath;
};
//# sourceMappingURL=utils.js.map