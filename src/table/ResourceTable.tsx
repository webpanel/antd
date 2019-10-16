import '../../styles/Table.css';

import * as React from 'react';

import {
  TableProps as ATableProps,
  ColumnProps,
  SorterResult
} from 'antd/lib/table';
import { Alert, Table as AntdTable, Button } from 'antd';
import { ResourceCollection, SortInfoOrder } from 'webpanel-data';
import {
  ResourceTableActionButtons,
  ResourceTablePropsActionButton
} from './ResourceTableActionButtons';

import { DataSourceArgumentMap } from 'webpanel-data/lib/DataSource';
import { PaginationConfig } from 'antd/lib/pagination';
import { observer } from 'mobx-react';

export interface ResourceTableColumn extends ColumnProps<any> {
  sortColumns?: string[];
  filterNormalize?: (values: any[]) => { [key: string]: any };
  filterDenormalize?: (values: { [key: string]: any }) => any[];
}

export interface ResourceTableProps extends ATableProps<any> {
  resourceCollection: ResourceCollection;
  actionButtons?: ResourceTablePropsActionButton[] | null;
  actionButtonsTitle?: React.ReactNode;
  actionButtonsFixed?: boolean;
  detailButtonText?: React.ReactNode;
  customDetailURL?: (referenceID: string) => string;
  columns?: ResourceTableColumn[];
}

@observer
export class ResourceTable extends React.Component<ResourceTableProps> {
  handleChange = (
    pagination: PaginationConfig,
    filters: Record<any, string[]>,
    sorter: SorterResult<any>
  ) => {
    const resource = this.props.resourceCollection;
    if (resource) {
      if (sorter.columnKey && sorter.column.dataIndex) {
        const c = sorter.column as ResourceTableColumn;
        const sortColumnKey =
          (c.sortColumns && c.sortColumns.join(',')) || c.dataIndex;
        if (sortColumnKey) {
          resource.updateSorting(
            [
              {
                columnKey: sortColumnKey,
                order: SortInfoOrder[sorter.order]
              }
            ],
            false
          );
        }
      } else {
        resource.updateSorting([], false);
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

      let _filters: DataSourceArgumentMap | undefined = {};
      for (let column of this.props.columns || []) {
        const columnKey = column.dataIndex || column.key;
        if (!columnKey) {
          continue;
        }
        const value = filters[columnKey];
        if (typeof value !== 'undefined') {
          if (column.filterNormalize) {
            const normalizedValue = column.filterNormalize(value);
            for (let key of Object.keys(normalizedValue)) {
              _filters[key] = normalizedValue[key];
            }
          } else if (value.length === 1) {
            _filters[columnKey] = value[0];
          } else if (value.length === 2) {
            _filters[columnKey + '_gte'] = value[0];
            _filters[columnKey + '_lte'] = value[1];
          }
        }
      }

      if (Object.keys(_filters).length === 0) {
        _filters = undefined;
      }

      resource.updateNamedFilters('table', _filters, false);
      resource.reload();
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
      actionButtonsFixed,
      detailButtonText,
      customDetailURL
    } = this.props;

    const sortedInfo =
      resourceCollection.sorting &&
      resourceCollection.sorting.length > 0 &&
      resourceCollection.sorting[0];
    const filters = resourceCollection.namedFilter('table') || {};

    let _columns: ResourceTableColumn[] = [...(columns || [])];

    if (actionButtons !== null) {
      const actionsColumn: ResourceTableColumn = {
        className: 'schrink',
        title: actionButtonsTitle || null,
        fixed: actionButtonsFixed ? 'right' : undefined,
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
              size={this.props.size === 'small' ? 'small' : undefined}
            />
          );
        }
      };
      _columns.push(actionsColumn);
    }

    return _columns.map((c: ResourceTableColumn) => {
      c.dataIndex = (c.dataIndex || c.key || '').toString();

      if (filters) {
        if (c.filterDenormalize) {
          c.filteredValue = c.filterDenormalize(filters);
        } else if (
          filters[c.dataIndex + '_gte'] &&
          filters[c.dataIndex + '_lte']
        ) {
          c.filteredValue = [
            filters[c.dataIndex + '_gte'],
            filters[c.dataIndex + '_lte']
          ];
        } else if (filters[c.dataIndex]) {
          c.filteredValue = [filters[c.dataIndex]];
        }
      }

      if (sortedInfo) {
        const sortColumnKey =
          (c.sortColumns && c.sortColumns.join(',')) || c.dataIndex;
        c.sortOrder =
          sortedInfo && sortColumnKey === sortedInfo.columnKey
            ? sortedInfo.order
            : undefined;
      } else {
        c.sortOrder = undefined;
      }

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
    const rowSelection = undefined;

    let data = dataSource;
    if (resourceCollection) {
      data = resourceCollection.data || undefined;
    }

    if (pagination) {
      pagination.pageSize = resourceCollection.limit || 30;
      pagination.current = resourceCollection.page + 1;
    }

    return resourceCollection.error ? (
      this.errorReportContent(resourceCollection.error)
    ) : (
      <AntdTable
        rowKey={rowKey || 'id'}
        rowSelection={rowSelection}
        loading={
          this.props.resourceCollection
            ? this.props.resourceCollection.loading &&
              !this.props.resourceCollection.polling
            : false
        }
        columns={this.getColumns()}
        dataSource={data}
        onChange={this.handleChange}
        size={this.props.size === 'small' ? 'small' : undefined}
        pagination={{ total: resourceCollection.count, ...pagination }}
        {...restProps}
      />
    );
  }
}
