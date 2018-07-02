import * as React from 'react';
import { Table as AntdTable } from 'antd';
import { TableProps } from 'antd/lib/table';
// import { TablePaginationConfig } from 'antd/lib/pagination';
import { observer } from 'mobx-react';

import { ResourceCollection } from 'webpanel-data';

import { TableActionButtons } from './TableActionButtons';

import '../../styles/Table.css';

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

  onSelectChange = (selectedRowKeys: any[]) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  reloadData = () => {
    if (this.props.resourceCollection) {
      this.props.resourceCollection.get();
    }
  };

  // componentDidMount() {
  //   this.reloadData();
  // }

  getRecordKey = (record: any, index: number) => {
    const rowKey = this.props.rowKey;
    const recordKey =
      typeof rowKey === 'function'
        ? rowKey(record, index)
        : (record as any)[rowKey as string];
    return recordKey === undefined ? index : recordKey;
  };

  render() {
    const {
      rowKey,
      dataSource,
      resourceCollection,
      columns,
      ...restProps
    } = this.props;
    const rowSelection = undefined;

    let data = dataSource;
    if (resourceCollection) {
      data = resourceCollection.data || undefined;
    }

    const _columns = [
      ...(columns || []),
      {
        className: 'schrink',
        title: 'Actions',
        render: (value: any, record: any, index: number) => {
          return (
            <TableActionButtons
              resourceCollection={resourceCollection}
              id={this.getRecordKey(record, index)}
              onDelete={this.reloadData}
            />
          );
        }
      }
    ];

    return (
      <AntdTable
        rowKey={rowKey ? rowKey : record => record.id}
        rowSelection={rowSelection}
        loading={
          this.props.resourceCollection
            ? this.props.resourceCollection.loading
            : false
        }
        columns={_columns}
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
