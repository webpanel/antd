import * as React from 'react';
import { Table as AntdTable } from 'antd';
import {
  TableProps as ATableProps,
  ColumnProps,
  SorterResult
} from 'antd/lib/table';
import { PaginationConfig } from 'antd/lib/pagination';
import { observer } from 'mobx-react';

import { ResourceCollection, SortInfoOrder } from 'webpanel-data';

import {
  ResourceTableActionButtons,
  ResourceTablePropsActionButton
} from './ResourceTableActionButtons';

import '../../styles/Table.css';

export interface ResourceTableProps extends ATableProps<any> {
  resourceCollection: ResourceCollection;
  actionButtons?: ResourceTablePropsActionButton[] | null;
  actionButtonsTitle?: React.ReactNode;
  detailButtonText?: React.ReactNode;
  customDetailURL?: ((referenceID: string) => string);
  condensed?: boolean;
}

interface ResourceTableState {
  selectedRowKeys: any[];
}

@observer
export class ResourceTable extends React.Component<
  ResourceTableProps,
  ResourceTableState
> {
  state: ResourceTableState = {
    selectedRowKeys: []
  };

  handleChange = (
    pagination: PaginationConfig,
    filters: Record<any, string[]>,
    sorter: SorterResult<any>
  ) => {
    const resource = this.props.resourceCollection;
    if (resource) {
      global.console.log('??', sorter.columnKey, [
        { columnKey: sorter.columnKey, order: SortInfoOrder[sorter.order] }
      ]);
      if (sorter.columnKey) {
        resource.updateSorting(
          [{ columnKey: sorter.columnKey, order: SortInfoOrder[sorter.order] }],
          false
        );
      } else {
        resource.updateSorting([], false);
      }
      resource.updateFilters(filters, false);
      resource.get();
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
    const rowKey = this.props.rowKey || 'id';
    const recordKey =
      typeof rowKey === 'function'
        ? rowKey(record, index)
        : (record as any)[rowKey as string];
    return recordKey === undefined ? index : recordKey;
  };

  getColumns = (): ColumnProps<any>[] => {
    const {
      resourceCollection,
      columns,
      actionButtons,
      actionButtonsTitle,
      detailButtonText,
      customDetailURL
    } = this.props;

    const sortedInfo =
      resourceCollection.sorting &&
      resourceCollection.sorting.length > 0 &&
      resourceCollection.sorting[0];

    let _columns: ColumnProps<any>[] = [...(columns || [])];

    if (actionButtons !== null) {
      const actionsColumn: ColumnProps<any> = {
        className: 'schrink',
        title: actionButtonsTitle || null,
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
              customDetailURL={customDetailURL}
              size={this.props.condensed ? 'small' : undefined}
            />
          );
        }
      };
      _columns.push(actionsColumn);
    }

    return _columns.map((c: ColumnProps<any>) => {
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

    return (
      <AntdTable
        rowKey={rowKey || 'id'}
        rowSelection={rowSelection}
        loading={
          this.props.resourceCollection
            ? this.props.resourceCollection.loading
            : false
        }
        columns={this.getColumns()}
        dataSource={data}
        onChange={this.handleChange}
        size={this.props.condensed ? 'small' : undefined}
        {...restProps}
      />
    );
  }
}
