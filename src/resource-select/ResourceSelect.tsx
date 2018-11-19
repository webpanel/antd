import * as React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import { observer } from 'mobx-react';
import { ResourceCollection } from 'webpanel-data';
// import { FormElementBase } from '../form/form/FormElementBase';

type ResourceSelectKey = string | ((value: any) => string);

export interface ResourceSelectProps {
  resourceCollection: ResourceCollection;
  valueKey?: ResourceSelectKey;
  labelKey: ResourceSelectKey;
  groupKey?: string;
}

@observer
export class ResourceSelect extends React.Component<
  SelectProps & ResourceSelectProps
> {
  private latestResourceData?: any = undefined;
  private optionsCache?: JSX.Element[] = undefined;

  // onSearch = (value: string) => this.setState({ value });

  getValueForKey = (item: any, key: ResourceSelectKey): string | null => {
    if (typeof key === 'string') {
      return item[key];
    } else if (typeof key === 'function') {
      return key(item);
    }
    return null;
  };

  render() {
    const { labelKey, valueKey, resourceCollection, ...props } = this.props;

    if (this.latestResourceData !== resourceCollection.data) {
      this.optionsCache = undefined;
    }

    if (!this.optionsCache && resourceCollection.data) {
      const groupKey: string | undefined = this.props.groupKey;
      if (groupKey) {
        const groups = {};
        resourceCollection.data.forEach((item: any, index: number) => {
          const label = item[groupKey];
          if (!groups[label]) {
            groups[label] = [];
          }

          const id = this.getValueForKey(item, valueKey || 'id') || index;
          groups[label].push(
            <Select.Option key={id} value={id}>
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
            const id = this.getValueForKey(item, valueKey || 'id') || index;
            return (
              <Select.Option key={id} value={id}>
                {this.getValueForKey(item, labelKey)}
              </Select.Option>
            );
          }
        );
      }
      this.latestResourceData = resourceCollection.data;
    }

    const { name } = resourceCollection;
    const className = `resource-select__${name.toLowerCase()}`;

    const options = this.optionsCache || [];
    global.console.log(resourceCollection);
    return (
      <Select
        // onSearch={this.onSearch}
        className={className}
        showSearch={true}
        allowClear={true}
        optionFilterProp="children"
        dropdownStyle={{ position: 'relative' }}
        getPopupContainer={() =>
          document.querySelector(`.${className}`)
          || document.body
        }
        {...props}
      >
        {options}
      </Select>
    );
  }
}
