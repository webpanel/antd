import { resolve } from 'url';
export var searchChildrenWithType = function (children, type) {
    var child = Array.isArray(children) ? children.slice() : [children];
    return child.filter(function (comp) {
        return comp && comp.type === type;
    });
};
export var appendStringPath = function (currentPath, appendPath) {
    if (appendPath[0] === '/') {
        appendPath = appendPath.substr(1);
    }
    if (currentPath.substr(-1) !== '/') {
        currentPath += '/';
    }
    var resolvedPath = resolve(currentPath, appendPath);
    if (resolvedPath.substr(-1) !== '/') {
        resolvedPath += '/';
    }
    if (resolvedPath[0] !== '/') {
        resolvedPath = '/' + resolvedPath;
    }
    return resolvedPath;
};
//# sourceMappingURL=utils.js.map