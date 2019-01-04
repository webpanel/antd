var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import { Table as AntdTable, Alert, Button } from 'antd';
import { observer } from 'mobx-react';
import { SortInfoOrder } from 'webpanel-data';
import { ResourceTableActionButtons } from './ResourceTableActionButtons';
import '../../styles/Table.css';
var ResourceTable = /** @class */ (function (_super) {
    __extends(ResourceTable, _super);
    function ResourceTable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            selectedRowKeys: []
        };
        _this.handleChange = function (pagination, filters, sorter) {
            var resource = _this.props.resourceCollection;
            global.console.log('?!!!', sorter);
            if (resource) {
                global.console.log('updating sorting', sorter);
                if (sorter.columnKey) {
                    resource.updateSorting([{ columnKey: sorter.columnKey, order: SortInfoOrder[sorter.order] }], false);
                }
                else {
                    resource.updateSorting([], false);
                    global.console.log('updated sorting', resource);
                }
                if (pagination.pageSize) {
                    resource.updateLimit(pagination.pageSize, false);
                    if (pagination.current) {
                        resource.updateOffset((pagination.current - 1) * pagination.pageSize, false);
                    }
                }
                var _filters = {};
                for (var _i = 0, _a = _this.props.columns || []; _i < _a.length; _i++) {
                    var column = _a[_i];
                    var columnKey = column.dataIndex || column.key;
                    if (!columnKey) {
                        continue;
                    }
                    var value = filters[columnKey];
                    if (typeof value !== 'undefined') {
                        if (column.filterFormatter) {
                            var formattedValue = column.filterFormatter(value);
                            for (var _b = 0, _c = Object.keys(formattedValue); _b < _c.length; _b++) {
                                var key = _c[_b];
                                _filters[key] = formattedValue[key];
                            }
                        }
                        else if (value.length === 1) {
                            _filters[columnKey] = value[0];
                        }
                        else if (value.length === 2) {
                            _filters[columnKey + '_gte'] = value[0];
                            _filters[columnKey + '_lte'] = value[1];
                        }
                    }
                }
                resource.updateFilters(_filters, false);
                resource.get();
            }
        };
        _this.reloadData = function () {
            if (_this.props.resourceCollection) {
                _this.props.resourceCollection.get();
            }
        };
        _this.getRecordKey = function (record, index) {
            var rowKey = _this.props.rowKey || 'id';
            var recordKey = typeof rowKey === 'function'
                ? rowKey(record, index)
                : record[rowKey];
            return recordKey === undefined ? index : recordKey;
        };
        _this.getColumns = function () {
            var _a = _this.props, resourceCollection = _a.resourceCollection, columns = _a.columns, actionButtons = _a.actionButtons, actionButtonsTitle = _a.actionButtonsTitle, detailButtonText = _a.detailButtonText, customDetailURL = _a.customDetailURL;
            var sortedInfo = resourceCollection.sorting &&
                resourceCollection.sorting.length > 0 &&
                resourceCollection.sorting[0];
            var _columns = (columns || []).slice();
            if (actionButtons !== null) {
                var actionsColumn = {
                    className: 'schrink',
                    title: actionButtonsTitle || null,
                    // fixed: 'right',
                    render: function (value, record, index) {
                        return (React.createElement(ResourceTableActionButtons, { resourceCollection: resourceCollection, id: _this.getRecordKey(record, index), values: record, onDelete: _this.reloadData, buttons: actionButtons || ['detail', 'delete'], detailButtonText: detailButtonText, customDetailURL: customDetailURL, size: _this.props.condensed ? 'small' : undefined }));
                    }
                };
                _columns.push(actionsColumn);
            }
            return _columns.map(function (c) {
                c.dataIndex = (c.dataIndex || c.key || '').toString();
                if (sortedInfo) {
                    c.sortOrder =
                        sortedInfo && c.key === sortedInfo.columnKey
                            ? sortedInfo.order
                            : undefined;
                }
                return c;
            });
        };
        _this.onSelectChange = function (selectedRowKeys) {
            _this.setState({ selectedRowKeys: selectedRowKeys });
        };
        return _this;
    }
    ResourceTable.prototype.errorReportContent = function (error) {
        var _this = this;
        return (React.createElement(Alert, { type: "error", closable: false, message: React.createElement("div", null,
                "Failed to load resource",
                ' ',
                React.createElement(Button, { size: "small", onClick: function () { return _this.reloadData(); } }, "retry")) }));
    };
    ResourceTable.prototype.render = function () {
        var _a = this.props, rowKey = _a.rowKey, dataSource = _a.dataSource, resourceCollection = _a.resourceCollection, columns = _a.columns, actionButtons = _a.actionButtons, detailButtonText = _a.detailButtonText, pagination = _a.pagination, restProps = __rest(_a, ["rowKey", "dataSource", "resourceCollection", "columns", "actionButtons", "detailButtonText", "pagination"]);
        // const { selectedRowKeys } = this.state;
        // const rowSelection = {
        //   selectedRowKeys,
        //   onChange: this.onSelectChange
        // };
        var data = dataSource;
        if (resourceCollection) {
            data = resourceCollection.data || undefined;
        }
        return resourceCollection.error ? (this.errorReportContent(resourceCollection.error)) : (React.createElement(AntdTable, __assign({ rowKey: rowKey || 'id', 
            // rowSelection={rowSelection}
            loading: this.props.resourceCollection
                ? this.props.resourceCollection.loading
                : false, columns: this.getColumns(), dataSource: data, onChange: this.handleChange, size: this.props.condensed ? 'small' : undefined, pagination: __assign({ total: resourceCollection.count }, pagination) }, restProps)));
    };
    ResourceTable = __decorate([
        observer
    ], ResourceTable);
    return ResourceTable;
}(React.Component));
export { ResourceTable };
//# sourceMappingURL=ResourceTable.js.map