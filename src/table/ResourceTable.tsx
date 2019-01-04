import * as React from 'react';
import { Table as AntdTable, Alert, Button } from 'antd';
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

export interface ResourceTableColumn extends ColumnProps<any> {
  filterFormatter?: (values: any[]) => { [key: string]: any };
}

export interface ResourceTableProps extends ATableProps<any> {
  resourceCollection: ResourceCollection;
  actionButtons?: ResourceTablePropsActionButton[] | null;
  actionButtonsTitle?: React.ReactNode;
  detailButtonText?: React.ReactNode;
  customDetailURL?: ((referenceID: string) => string);
  condensed?: boolean;
  columns?: ResourceTableColumn[];
}

export interface ResourceTableState {
  selectedRowKeys: string[];
}

@observer
export class ResourceTable extends React.Component<
  ResourceTableProps,
  ResourceTableState
> {
  state = {
    selectedRowKeys: []
  };

  handleChange = (
    pagination: PaginationConfig,
    filters: Record<any, string[]>,
    sorter: SorterResult<any>
  ) => {
    const resource = this.props.resourceCollection;
    global.console.log('?!!!', sorter);
    if (resource) {
      global.console.log('updating sorting', sorter);
      if (sorter.columnKey) {
        resource.updateSorting(
          [{ columnKey: sorter.columnKey, order: SortInfoOrder[sorter.order] }],
          false
        );
      } else {
        resource.updateSorting([], false);
        global.console.log('updated sorting', JSON.stringify(resource.sorting));
      }

      if (pagination.pageSize) {
        resource.updateLimit(pagination.pageSize, false);
        if (pagination.current) {
          resource.updateOffset(
            (pagination.current - 1) * pagination.pageSize,
            false
          );
        }
      }

      const _filters = {};
      for (let column of this.props.columns || []) {
        const columnKey = column.dataIndex || column.key;
        if (!columnKey) {
          continue;
        }
        const value = filters[columnKey];
        if (typeof value !== 'undefined') {
          if (column.filterFormatter) {
            const formattedValue = column.filterFormatter(value);
            for (let key of Object.keys(formattedValue)) {
              _filters[key] = formattedValue[key];
            }
          } else if (value.length === 1) {
            _filters[columnKey] = value[0];
          } else if (value.length === 2) {
            _filters[columnKey + '_gte'] = value[0];
            _filters[columnKey + '_lte'] = value[1];
          }
        }
      }

      resource.updateFilters(_filters, false);
      resource.get();
    }
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
      } else {
        c.sortOrder = undefined;
      }
      global.console.log('???', c);
      return c;
    });
  };

  errorReportContent(error: Error): React.ReactNode {
    return (
      <Alert
        type="error"
        closable={false}
        message={
          <div>
            Failed to load resource{' '}
            <Button size="small" onClick={() => this.reloadData()}>
              retry
            </Button>
          </div>
        }
      />
    );
  }

  onSelectChange = (selectedRowKeys: string[]) => {
    this.setState({ selectedRowKeys });
  };

  render() {
    const {
      rowKey,
      dataSource,
      resourceCollection,
      columns,
      actionButtons,
      detailButtonText,
      pagination,
      ...restProps
    } = this.props;

    // const { selectedRowKeys } = this.state;
    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: this.onSelectChange
    // };

    let data = dataSource;
    if (resourceCollection) {
      data = resourceCollection.data || undefined;
    }

    return resourceCollection.error ? (
      this.errorReportContent(resourceCollection.error)
    ) : (
      <AntdTable
        rowKey={rowKey || 'id'}
        // rowSelection={rowSelection}
        loading={
          this.props.resourceCollection
            ? this.props.resourceCollection.loading
            : false
        }
        columns={this.getColumns()}
        dataSource={data}
        onChange={this.handleChange}
        size={this.props.condensed ? 'small' : undefined}
        pagination={{ total: resourceCollection.count, ...pagination }}
        {...restProps}
      />
    );
  }
}
