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
import "../../styles/Table.css";
import * as React from "react";
import { Alert, Table as AntdTable, Button } from "antd";
import { SortInfoOrder } from "webpanel-data";
import { ResourceTableActionButtons, } from "./ResourceTableActionButtons";
import { resolveOptionalThunk } from "ts-thunk";
var ResourceTable = /** @class */ (function (_super) {
    __extends(ResourceTable, _super);
    function ResourceTable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleChange = function (pagination, filters, sorter) {
            var _a, _b, _c;
            var resource = _this.props.resourceCollection;
            if (resource) {
                if (sorter.columnKey && sorter.column && sorter.column.dataIndex) {
                    var c = sorter.column;
                    var sortColumnKey = (c.sortColumns && c.sortColumns.join(",")) || c.dataIndex;
                    if (sortColumnKey) {
                        resource.updateSorting([
                            {
                                columnKey: sortColumnKey.toString(),
                                order: SortInfoOrder[sorter.order || "ascend"],
                            },
                        ], false);
                    }
                }
                else {
                    resource.updateSorting([], false);
                }
                if (pagination.pageSize) {
                    resource.updateLimit(pagination.pageSize, false);
                    if (pagination.current) {
                        resource.updateOffset((pagination.current - 1) * pagination.pageSize, false);
                    }
                }
                var _filters = {};
                for (var _i = 0, _d = _this.props.columns || []; _i < _d.length; _i++) {
                    var column = _d[_i];
                    var columnKey = (_a = (column.dataIndex || column.key)) === null || _a === void 0 ? void 0 : _a.toString();
                    if (!columnKey) {
                        continue;
                    }
                    var value = filters[columnKey];
                    if (typeof value !== "undefined") {
                        if (column.filterNormalize) {
                            var normalizedValue = column.filterNormalize(value);
                            for (var _e = 0, _f = Object.keys(normalizedValue); _e < _f.length; _e++) {
                                var key = _f[_e];
                                _filters[key] = normalizedValue[key];
                            }
                        }
                        else if (((_b = value) === null || _b === void 0 ? void 0 : _b.length) === 1) {
                            _filters[columnKey] = value[0];
                        }
                        else if (((_c = value) === null || _c === void 0 ? void 0 : _c.length) === 2) {
                            _filters[columnKey + "_gte"] = value[0];
                            _filters[columnKey + "_lte"] = value[1];
                        }
                    }
                }
                if (Object.keys(_filters).length === 0) {
                    _filters = undefined;
                }
                resource.updateNamedFilters("table", _filters, false);
                resource.reload();
            }
        };
        _this.reloadData = function () {
            if (_this.props.resourceCollection) {
                _this.props.resourceCollection.get();
            }
        };
        _this.getRecordKey = function (record, index) {
            var rowKey = _this.props.rowKey || "id";
            var recordKey = typeof rowKey === "function"
                ? rowKey(record, index)
                : record[rowKey];
            return recordKey === undefined ? index : recordKey;
        };
        _this.getColumns = function () {
            var _a = _this.props, resourceCollection = _a.resourceCollection, columns = _a.columns, actionButtons = _a.actionButtons, actionButtonsTitle = _a.actionButtonsTitle, actionButtonsFixed = _a.actionButtonsFixed, detailButtonText = _a.detailButtonText, customDetailURL = _a.customDetailURL;
            var sortedInfo = resourceCollection.sorting &&
                resourceCollection.sorting.length > 0 &&
                resourceCollection.sorting[0];
            var filters = resourceCollection.namedFilter("table") || {};
            var _columns = __spreadArrays((columns || []));
            if (actionButtons !== null) {
                var actionsColumn = {
                    className: "schrink",
                    title: actionButtonsTitle || null,
                    fixed: actionButtonsFixed ? "right" : undefined,
                    render: function (value, record, index) {
                        return (React.createElement(ResourceTableActionButtons, { resourceCollection: resourceCollection, id: _this.getRecordKey(record, index), values: record, onDelete: _this.reloadData, buttons: resolveOptionalThunk(actionButtons, record) || [
                                "detail",
                                "delete",
                            ], detailButtonText: detailButtonText, customDetailURL: customDetailURL, size: _this.props.size === "small" ? "small" : undefined }));
                    },
                };
                _columns.push(actionsColumn);
            }
            return _columns.map(function (c) {
                var column = __assign({}, c);
                var dataIndex = (column.dataIndex || column.key || "").toString();
                column.dataIndex = dataIndex;
                if (filters) {
                    if (column.filterDenormalize) {
                        column.filteredValue = column.filterDenormalize(filters);
                    }
                    else if (filters[dataIndex + "_gte"] && filters[dataIndex + "_lte"]) {
                        column.filteredValue = [
                            (filters[dataIndex + "_gte"] || "").toString(),
                            (filters[dataIndex + "_lte"] || "").toString(),
                        ];
                    }
                    else if (filters[dataIndex]) {
                        column.filteredValue = [(filters[dataIndex] || "").toString()];
                    }
                }
                if (sortedInfo) {
                    var sortColumnKey = (column.sortColumns && column.sortColumns.join(",")) ||
                        column.dataIndex;
                    column.sortOrder =
                        sortedInfo && sortColumnKey === sortedInfo.columnKey
                            ? sortedInfo.order
                            : undefined;
                }
                else {
                    column.sortOrder = undefined;
                }
                // // if (column.aggregations) {
                // const children: ColumnProps<T> = {
                //   ...column,
                //   title: () => {
                //     return "aa";
                //   },
                // };
                // children.sortOrder = undefined;
                // column = { ...column, children: [children] as any };
                // // }
                return column;
            });
        };
        return _this;
    }
    ResourceTable.prototype.errorReportContent = function (error) {
        var _this = this;
        return (React.createElement(Alert, { type: "error", closable: false, message: React.createElement("div", null,
                "Failed to load resource",
                " ",
                React.createElement(Button, { size: "small", onClick: function () { return _this.reloadData(); } }, "retry")) }));
    };
    ResourceTable.prototype.render = function () {
        var _a = this.props, rowKey = _a.rowKey, dataSource = _a.dataSource, resourceCollection = _a.resourceCollection, columns = _a.columns, actionButtons = _a.actionButtons, detailButtonText = _a.detailButtonText, pagination = _a.pagination, restProps = __rest(_a, ["rowKey", "dataSource", "resourceCollection", "columns", "actionButtons", "detailButtonText", "pagination"]);
        var rowSelection = undefined;
        var data = dataSource;
        if (resourceCollection) {
            data = resourceCollection.data || undefined;
        }
        if (pagination) {
            pagination.pageSize = resourceCollection.limit || 30;
            pagination.current = resourceCollection.page + 1;
        }
        return resourceCollection.error ? (this.errorReportContent(resourceCollection.error)) : (React.createElement(AntdTable, __assign({ rowKey: rowKey || "id", rowSelection: rowSelection, loading: this.props.resourceCollection
                ? this.props.resourceCollection.loading &&
                    !this.props.resourceCollection.polling
                : false, columns: this.getColumns(), dataSource: data, onChange: this.handleChange, size: this.props.size === "small" ? "small" : undefined, pagination: __assign({ total: resourceCollection.count }, pagination) }, restProps)));
    };
    return ResourceTable;
}(React.Component));
export { ResourceTable };
//# sourceMappingURL=ResourceTable.js.map