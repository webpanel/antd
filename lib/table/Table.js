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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import { Table as AntdTable } from 'antd';
// import { TablePaginationConfig } from 'antd/lib/pagination';
// import { toJS } from 'mobx';
import { observer } from 'mobx-react';
// import { Subscriber, Broadcast } from 'react-broadcast';
// import './Table.css';
// interface TableColumn<T> extends ColumnProps<T> {
//   content?: string;
//   width: string | number;
// }
// interface TableConfig<T> {
//   resource: string;
//   size?: 'default' | 'middle' | 'small';
//   columns?: TableColumn<T>[];
//   pagination?: TablePaginationConfig;
//   bordered?: boolean;
//   title?: any;
// }
// interface TableRow {
//   [index: string]: any;
//   id: string;
// }
// interface TableSortedInfo {
//   columnKey?: string;
//   order?: 'ascend' | 'descend' | boolean;
// }
// interface TableState {
//   sortedInfo: TableSortedInfo;
//   selectedRowKeys: any[];
// }
// type TableProps = RendererComponentProps<TableConfig<TableRow>> &
//   ContextObserver<any>;
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
        // getCollection(): ResourceCollection | undefined {
        //   return this.props.context.resources[this.props.config.resource];
        // }
        _this.onSelectChange = function (selectedRowKeys) {
            // console.log('selectedRowKeys changed: ', selectedRowKeys);
            _this.setState({ selectedRowKeys: selectedRowKeys });
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
        // const config = this.props.config;
        // const { sortedInfo } = this.state;
        // const { context } = this.props;
        // const columns = (config.columns || []).map(col => {
        //   if (col.content) {
        //     col.render = (text: any, record: Object, index: number) => {
        //       // const props = { record };
        //       const ctx = Object.assign({}, context, { record });
        //       return (
        //         <Broadcast channel="context" value={ctx}>
        //           <Renderer content={col.content} />
        //         </Broadcast>
        //       );
        //     };
        //   }
        //   const columnKey = col.key;
        //   col.dataIndex =
        //     col.dataIndex ||
        //     (typeof columnKey === 'number' ? columnKey.toString() : columnKey);
        //   if (typeof columnKey === 'string') {
        //     col.sorter = columnSorter(columnKey);
        //   }
        //   col.sortOrder = sortedInfo.columnKey === col.key && sortedInfo.order;
        //   return col;
        // });
        // const rowSelection = {
        //   selectedRowKeys: this.state.selectedRowKeys,
        //   onChange: this.onSelectChange
        // };
        var rowSelection = undefined;
        // let data = this.props.dataSource;
        // const resource = this.getCollection();
        // if (resource) {
        //   data = toJS(resource.data && resource.data.items) || [];
        // }
        // const title = config.title
        //   ? () => <Renderer content={config.title} />
        //   : undefined;
        var data = this.props.dataSource;
        if (this.props.resourceCollection) {
            data = this.props.resourceCollection.data || undefined;
        }
        return (React.createElement(AntdTable, { rowKey: function (record) { return record.id; }, rowSelection: rowSelection, loading: this.props.resourceCollection
                ? this.props.resourceCollection.loading
                : false, dataSource: data, columns: this.props.columns }));
    };
    Table = __decorate([
        observer
    ], Table);
    return Table;
}(React.Component));
export { Table };
// export class Table extends React.Component<TableProps> {
//   render() {
//     return (
//       <Subscriber channel="context">
//         {ctx => <TableComponent {...this.props} context={ctx} />}
//       </Subscriber>
//     );
//   }
// }
//# sourceMappingURL=Table.js.map