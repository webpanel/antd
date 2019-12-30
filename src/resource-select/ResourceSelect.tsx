import * as React from "react";
import * as uuid from "uuid";

import { Resource, ResourceCollection } from "webpanel-data";
import { Select, Spin } from "antd";

import { SelectProps } from "antd/lib/select";
import { observer } from "mobx-react";

// import { FormElementBase } from '../form/form/FormElementBase';

type ResourceSelectKey = string | ((value: any) => string);
type ResourceLabelKey = React.ReactNode | ((value: any) => React.ReactNode);

export interface ResourceSelectProps<T> {
  resourceCollection: ResourceCollection<T>;
  valueKey?: ResourceSelectKey;
  labelKey: ResourceLabelKey;
  groupKey?: string;
}

interface ResourceSelectState {
  search?: string;
  currentItem?: Resource;
}

@observer
export class ResourceSelect<T = any> extends React.Component<
  SelectProps & ResourceSelectProps<T>,
  ResourceSelectState
> {
  state: ResourceSelectState = { search: undefined, currentItem: undefined };

  private latestResourceData?: any = undefined;
  private optionsCache?: JSX.Element[] = undefined;
  private optionsIds?: string[] = undefined;

  getValueForKey = (item: any, key: ResourceLabelKey): string | null => {
    if (typeof key === "string") {
      return item[key];
    } else if (typeof key === "function") {
      return key(item);
    }
    return null;
  };

  async componentDidUpdate() {
    const { resourceCollection } = this.props;
    if (resourceCollection.search !== this.state.search) {
      resourceCollection.updateSearch(this.state.search);
    }
    const value = (this.props.value && this.props.value.toString()) || null;
    if (value) {
      if (!this.state.currentItem || this.state.currentItem.id !== value) {
        const item = await resourceCollection.getItem({ id: value });
        await item.get();
        this.setState({ currentItem: item });
      }
    } else {
      if (this.state.currentItem) {
        this.setState({ currentItem: undefined });
      }
    }
  }

  render() {
    const { labelKey, valueKey, resourceCollection, ...props } = this.props;
    const { currentItem } = this.state;

    if (this.latestResourceData !== resourceCollection.data) {
      this.optionsCache = undefined;
      this.optionsIds = undefined;
    }

    if (!this.optionsCache && resourceCollection.data) {
      const optionsIds: string[] = [];
      this.optionsIds = optionsIds;
      const groupKey: string | undefined = this.props.groupKey;
      if (groupKey) {
        const groups = {};
        resourceCollection.data.forEach((item: any, index: number) => {
          const label = item[groupKey];
          if (!groups[label]) {
            groups[label] = [];
          }

          const id = this.getValueForKey(item, valueKey || "id") || index;
          optionsIds.push(id.toString());
          groups[label].push(
            <Select.Option key={id.toString()} value={id}>
              {this.getValueForKey(item, labelKey)}
            </Select.Option>
          );
        });

        this.optionsCache = Object.keys(groups).map((key: string) => (
          <Select.OptGroup key={key} label={key}>
            {groups[key]}
          </Select.OptGroup>
        ));
      } else {
        this.optionsCache = resourceCollection.data.map(
          (item: any, index: number) => {
            const id = this.getValueForKey(item, valueKey || "id") || index;
            optionsIds.push(id.toString());
            return (
              <Select.Option key={id.toString()} value={id}>
                {this.getValueForKey(item, labelKey)}
              </Select.Option>
            );
          }
        );
      }
      this.latestResourceData = resourceCollection.data;
    }

    const className = `resource-select__${uuid.v4()}`;

    const options = this.optionsCache || [];
    return (
      <Select
        // onSearch={this.onSearch}
        className={className}
        loading={resourceCollection.loading}
        notFoundContent={
          resourceCollection.loading ? <Spin size="small" /> : null
        }
        showSearch={true}
        allowClear={true}
        optionFilterProp="children"
        dropdownStyle={{ position: "relative" }}
        getPopupContainer={() =>
          document.querySelector(`.${className}`) || document.body
        }
        onSearch={(value: any) => {
          this.setState({ search: value });
        }}
        onFocus={() => {
          resourceCollection.get();
        }}
        onBlur={() => {
          this.setState({ search: undefined });
        }}
        {...props}
      >
        {this.optionsIds &&
          currentItem &&
          currentItem.id &&
          this.optionsIds.indexOf(currentItem.id.toString()) === -1 &&
          currentItem.data && (
            <Select.Option
              key={currentItem.id.toString()}
              value={currentItem.id}
            >
              {this.getValueForKey(currentItem.data, labelKey)}
            </Select.Option>
          )}
        {options}
      </Select>
    );
  }
}
