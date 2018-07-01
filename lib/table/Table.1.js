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
// import { TablePaginationConfig } from 'antd/lib/pagination';
import { observer } from 'mobx-react';
import { TableActionButtons } from './TableActionButtons';
import '../../styles/Table.css';
// const columnSorter = (columnKey: string) => (a: any, b: any) => {
//   if (a[columnKey] && a[columnKey].localeCompare) {
//     return a[columnKey].localeCompare(b[columnKey]);
//   }
//   return a[columnKey] - b[columnKey];
// };
var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    function Table() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            sortedInfo: { columnKey: undefined, order: undefined },
            selectedRowKeys: []
        };
        _this.handleChange = function (
        // pagination: TablePaginationConfig | boolean,
        filters, sorter) {
            // console.log(pagination, filters, sorter);
            // this.setState({ sortedInfo: sorter as TableSortedInfo });
        };
        _this.onSelectChange = function (selectedRowKeys) {
            // console.log('selectedRowKeys changed: ', selectedRowKeys);
            _this.setState({ selectedRowKeys: selectedRowKeys });
        };
        _this.getRecordKey = function (record, index) {
            var rowKey = _this.props.rowKey;
            var recordKey = typeof rowKey === 'function'
                ? rowKey(record, index)
                : record[rowKey];
            return recordKey === undefined ? index : recordKey;
        };
        return _this;
    }
    Table.prototype.componentDidMount = function () {
        var _this = this;
        if (this.props.resourceCollection) {
            this.props.resourceCollection.get().then(function () {
                _this.forceUpdate();
            });
        }
    };
    Table.prototype.render = function () {
        var _this = this;
        var _a = this.props, rowKey = _a.rowKey, dataSource = _a.dataSource, resourceCollection = _a.resourceCollection, columns = _a.columns, restProps = __rest(_a, ["rowKey", "dataSource", "resourceCollection", "columns"]);
        var rowSelection = undefined;
        var data = dataSource;
        if (resourceCollection) {
            data = resourceCollection.data || undefined;
        }
        var _columns = (columns || []).concat([
            {
                className: 'schrink',
                title: 'Actions',
                render: function (value, record, index) {
                    return (React.createElement(TableActionButtons, { resourceCollection: resourceCollection, id: _this.getRecordKey(record, index) }));
                }
            }
        ]);
        return (React.createElement(AntdTable, __assign({ rowKey: rowKey ? rowKey : function (record) { return record.id; }, rowSelection: rowSelection, loading: this.props.resourceCollection
                ? this.props.resourceCollection.loading
                : false, columns: _columns, dataSource: data }, restProps)));
    };
    Table = __decorate([
        observer
    ], Table);
    return Table;
}(React.Component));
export { Table };
//# sourceMappingURL=Table.1.js.map