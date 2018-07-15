import * as React from 'react';
import { Table as AntdTable } from 'antd';
import {
  TableProps as ATableProps,
  ColumnProps,
  SorterResult
} from 'antd/lib/table';
import { PaginationConfig } from 'antd/lib/pagination';
import { observer } from 'mobx-react';

import { ResourceCollection } from 'webpanel-data';

import {
  TableActionButtons,
  TablePropsActionButton
} from './TableActionButtons';

import '../../styles/Table.css';

// const columnSorter = (columnKey: string) => (a: any, b: any) => {
//   if (a[columnKey] && a[columnKey].localeCompare) {
//     return a[columnKey].localeCompare(b[columnKey]);
//   }
//   return a[columnKey] - b[columnKey];
// };

export interface TableProps extends ATableProps<any> {
  resourceCollection?: ResourceCollection;
  actionButtons?: TablePropsActionButton[];
}

// interface TableSortedInfo {
//   columnKey?: string;
//   order?: 'ascend' | 'descend' | boolean;
// }
interface TableState {
  sortedInfo: SorterResult<any> | undefined;
  selectedRowKeys: any[];
}

@observer
export class Table extends React.Component<TableProps, TableState> {
  state: TableState = {
    sortedInfo: undefined,
    selectedRowKeys: []
  };

  handleChange = (
    pagination: PaginationConfig,
    filters: Record<any, string[]>,
    sorter: SorterResult<any>
  ) => {
    console.log('table change', pagination, filters, sorter);
    this.setState({ sortedInfo: sorter });

    const resource = this.props.resourceCollection;
    if (resource) {
      resource.updateSorting([sorter]);
      // resource.updateFilter(filters)
    }
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
      actionButtons,
      ...restProps
    } = this.props;
    const rowSelection = undefined;

    let data = dataSource;
    if (resourceCollection) {
      data = resourceCollection.data || undefined;
    }

    const _columns: ColumnProps<any>[] = [
      ...(columns || []),
      {
        className: 'schrink',
        title: 'Actions',
        // fixed: 'right',
        render: (value: any, record: any, index: number) => {
          return (
            <TableActionButtons
              resourceCollection={resourceCollection}
              id={this.getRecordKey(record, index)}
              onDelete={this.reloadData}
              buttons={actionButtons || ['edit', 'delete']}
            />
          );
        }
      }
    ].map((c: ColumnProps<any>) => {
      c.dataIndex = (c.dataIndex || c.key || '').toString();

      const sortedInfo = this.state.sortedInfo;
      c.sortOrder =
        sortedInfo && c.dataIndex === sortedInfo.columnKey
          ? sortedInfo.order
          : undefined;
      // c.sorter = true; // (x, y) => (x > y ? -1 : 1);
      // console.log(c);
      return c;
    });

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
        onChange={this.handleChange}
        {...restProps}
        // title={title}
        // bordered={config.bordered}
        // pagination={config.pagination}
        // size={config.size}
        // columns={columns}
      />
    );
  }
}
