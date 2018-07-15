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
import { TableActionButtons } from './TableActionButtons';
import '../../styles/Table.css';
var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    function Table() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            sortedInfo: undefined,
            selectedRowKeys: []
        };
        _this.handleChange = function (pagination, filters, sorter) {
            console.log('table change', pagination, filters, sorter);
            _this.setState({ sortedInfo: sorter });
            var resource = _this.props.resourceCollection;
            if (resource) {
                resource.updateSorting([sorter]);
                // resource.updateFilter(filters)
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
        // componentDidMount() {
        //   this.reloadData();
        // }
        _this.getRecordKey = function (record, index) {
            var rowKey = _this.props.rowKey;
            var recordKey = typeof rowKey === 'function'
                ? rowKey(record, index)
                : record[rowKey];
            return recordKey === undefined ? index : recordKey;
        };
        return _this;
    }
    Table.prototype.render = function () {
        var _this = this;
        var _a = this.props, rowKey = _a.rowKey, dataSource = _a.dataSource, resourceCollection = _a.resourceCollection, columns = _a.columns, actionButtons = _a.actionButtons, restProps = __rest(_a, ["rowKey", "dataSource", "resourceCollection", "columns", "actionButtons"]);
        var rowSelection = undefined;
        var data = dataSource;
        if (resourceCollection) {
            data = resourceCollection.data || undefined;
        }
        var _columns = (columns || []).concat([
            {
                className: 'schrink',
                title: 'Actions',
                // fixed: 'right',
                render: function (value, record, index) {
                    return (React.createElement(TableActionButtons, { resourceCollection: resourceCollection, id: _this.getRecordKey(record, index), onDelete: _this.reloadData, buttons: actionButtons || ['edit', 'delete'] }));
                }
            }
        ]).map(function (c) {
            c.dataIndex = (c.dataIndex || c.key || '').toString();
            var sortedInfo = _this.state.sortedInfo;
            c.sortOrder =
                sortedInfo && c.dataIndex === sortedInfo.columnKey
                    ? sortedInfo.order
                    : undefined;
            // c.sorter = true; // (x, y) => (x > y ? -1 : 1);
            // console.log(c);
            return c;
        });
        return (React.createElement(AntdTable, __assign({ rowKey: rowKey ? rowKey : function (record) { return record.id; }, rowSelection: rowSelection, loading: this.props.resourceCollection
                ? this.props.resourceCollection.loading
                : false, columns: _columns, dataSource: data, onChange: this.handleChange }, restProps)));
    };
    Table = __decorate([
        observer
    ], Table);
    return Table;
}(React.Component));
export { Table };
//# sourceMappingURL=Table.js.map