import * as React from 'react';
import { Table as AntdTable } from 'antd';
import { TableProps } from 'antd/lib/table';
// import { TablePaginationConfig } from 'antd/lib/pagination';
// import { toJS } from 'mobx';
import { observer } from 'mobx-react';

import { ResourceCollection } from 'webpanel-data';

// import { Subscriber, Broadcast } from 'react-broadcast';

import '../../styles/Table.css';

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

@observer
export class Table extends React.Component<
  TableProps<any> & { resourceCollection?: ResourceCollection }
> {
  state = {
    sortedInfo: { columnKey: undefined, order: undefined },
    selectedRowKeys: []
  };

  handleChange = (
    // pagination: TablePaginationConfig | boolean,
    filters: string[],
    sorter: Object
  ) => {
    // console.log(pagination, filters, sorter);
    // this.setState({ sortedInfo: sorter as TableSortedInfo });
  };

  // getCollection(): ResourceCollection | undefined {
  //   return this.props.context.resources[this.props.config.resource];
  // }

  onSelectChange = (selectedRowKeys: any[]) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  componentDidMount() {
    if (this.props.resourceCollection) {
      this.props.resourceCollection.get().then(() => {
        this.forceUpdate();
      });
    }
  }

  render() {
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

    // let data = this.props.dataSource;
    // const resource = this.getCollection();
    // if (resource) {
    //   data = toJS(resource.data && resource.data.items) || [];
    // }

    // const title = config.title
    //   ? () => <Renderer content={config.title} />
    //   : undefined;

    const { rowKey, dataSource, resourceCollection, ...restProps } = this.props;
    const rowSelection = undefined;

    let data = dataSource;
    if (resourceCollection) {
      data = resourceCollection.data || undefined;
    }

    return (
      <AntdTable
        rowKey={rowKey ? rowKey : record => record.id}
        rowSelection={rowSelection}
        loading={
          this.props.resourceCollection
            ? this.props.resourceCollection.loading
            : false
        }
        dataSource={data}
        {...restProps}
        // onChange={this.handleChange}
        // title={title}
        // bordered={config.bordered}
        // pagination={config.pagination}
        // size={config.size}
        // columns={columns}
      />
    );
  }
}

// export class Table extends React.Component<TableProps> {
//   render() {
//     return (
//       <Subscriber channel="context">
//         {ctx => <TableComponent {...this.props} context={ctx} />}
//       </Subscriber>
//     );
//   }
// }
