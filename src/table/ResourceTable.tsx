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
  ResourceTableActionButtons,
  ResourceTablePropsActionButton
} from './ResourceTableActionButtons';

import '../../styles/Table.css';

export interface ResourceTableProps extends ATableProps<any> {
  resourceCollection: ResourceCollection;
  actionButtons?: ResourceTablePropsActionButton[];
  detailButtonText?: string;
}

interface ResourceTableState {
  sortedInfo: SorterResult<any> | undefined;
  selectedRowKeys: any[];
}

@observer
export class ResourceTable extends React.Component<
  ResourceTableProps,
  ResourceTableState
> {
  state: ResourceTableState = {
    sortedInfo: undefined,
    selectedRowKeys: []
  };

  handleChange = (
    pagination: PaginationConfig,
    filters: Record<any, string[]>,
    sorter: SorterResult<any>
  ) => {
    // console.log('table change', pagination, filters, sorter);
    this.setState({ sortedInfo: sorter });

    const resource = this.props.resourceCollection;
    if (resource) {
      if (sorter.columnKey) {
        resource.updateSorting([sorter]);
      } else {
        resource.updateSorting([]);
      }
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
      detailButtonText,
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
            <ResourceTableActionButtons
              resourceCollection={resourceCollection}
              id={this.getRecordKey(record, index)}
              values={record}
              onDelete={this.reloadData}
              buttons={actionButtons || ['detail', 'delete']}
              detailButtonText={detailButtonText}
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
