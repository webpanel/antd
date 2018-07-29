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
import { Table as AntdTable } from 'antd';
import { observer } from 'mobx-react';
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
            // console.log('table change', pagination, filters, sorter);
            var resource = _this.props.resourceCollection;
            if (resource) {
                if (sorter.columnKey) {
                    resource.updateSorting([{ columnKey: sorter.columnKey, order: sorter.order }], false);
                }
                else {
                    resource.updateSorting([], false);
                }
                resource.updateFilters(filters, false);
                resource.get();
            }
        };
        _this.onSelectChange = function (selectedRowKeys) {
            // console.log('selectedRowKeys changed: ', selectedRowKeys);
            _this.setState({ selectedRowKeys: selectedRowKeys });
        };
        _this.reloadData = function () {
            if (_this.props.resourceCollection) {
                _this.props.resourceCollection.get();
            }
        };
        _this.getRecordKey = function (record, index) {
            var rowKey = _this.props.rowKey;
            var recordKey = typeof rowKey === 'function'
                ? rowKey(record, index)
                : record[rowKey];
            return recordKey === undefined ? index : recordKey;
        };
        _this.getColumns = function () {
            var _a = _this.props, resourceCollection = _a.resourceCollection, columns = _a.columns, actionButtons = _a.actionButtons, detailButtonText = _a.detailButtonText;
            var sortedInfo = resourceCollection.sorting &&
                resourceCollection.sorting.length > 0 &&
                resourceCollection.sorting[0];
            var _columns = (columns || []).slice();
            if (actionButtons !== null) {
                var actionsColumn = {
                    className: 'schrink',
                    title: 'Actions',
                    // fixed: 'right',
                    render: function (value, record, index) {
                        return (React.createElement(ResourceTableActionButtons, { resourceCollection: resourceCollection, id: _this.getRecordKey(record, index), values: record, onDelete: _this.reloadData, buttons: actionButtons || ['detail', 'delete'], detailButtonText: detailButtonText }));
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
        return _this;
    }
    ResourceTable.prototype.render = function () {
        var _a = this.props, rowKey = _a.rowKey, dataSource = _a.dataSource, resourceCollection = _a.resourceCollection, columns = _a.columns, actionButtons = _a.actionButtons, detailButtonText = _a.detailButtonText, restProps = __rest(_a, ["rowKey", "dataSource", "resourceCollection", "columns", "actionButtons", "detailButtonText"]);
        var rowSelection = undefined;
        var data = dataSource;
        if (resourceCollection) {
            data = resourceCollection.data || undefined;
        }
        return (React.createElement(AntdTable, __assign({ rowKey: rowKey ? rowKey : function (record) { return record.id; }, rowSelection: rowSelection, loading: this.props.resourceCollection
                ? this.props.resourceCollection.loading
                : false, columns: this.getColumns(), dataSource: data, onChange: this.handleChange }, restProps)));
    };
    ResourceTable = __decorate([
        observer
    ], ResourceTable);
    return ResourceTable;
}(React.Component));
export { ResourceTable };
//# sourceMappingURL=ResourceTable.js.map