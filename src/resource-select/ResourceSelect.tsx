import * as React from "react";

import { ResourceID, useResourceCollection } from "webpanel-data";
import { Select, Spin } from "antd";

import { ResourceCollectionConfig } from "webpanel-data/lib/ResourceCollection";
import { SelectProps } from "antd/lib/select";
import debounce from "lodash/debounce";
import { observer } from "mobx-react";

// import { observer } from "mobx-react";

// import { FormElementBase } from '../form/form/FormElementBase';

type ResourceSelectKey = string | ((value: any) => string);
type ResourceLabelKey = React.ReactNode | ((value: any) => React.ReactNode);

export interface ResourceSelectProps<T extends { id: ResourceID }> {
  resource: ResourceCollectionConfig<T>;
  valueKey?: ResourceSelectKey;
  labelKey: ResourceLabelKey;
  groupKey?: string;
}

// interface ResourceSelectState {
//   search?: string;
//   currentItem?: Resource;
// }

export const ResourceSelectComponent = <T extends { id: ResourceID } = any>(
  props: SelectProps<any> & ResourceSelectProps<T>
) => {
  const { onChange, value, resource, valueKey, labelKey, ...rest } = props;
  const [search, setSearch] = React.useState<string | undefined>();
  const [hasFocus, setHasFocus] = React.useState(false);
  const [limit, setLimit] = React.useState(30);

  const drobdownResourceCollection = useResourceCollection({
    ...resource,
    initialSearch: search,
    disabled: !hasFocus,
    initialLimit: limit,
  });
  const ids = value ? (Array.isArray(value) ? value : [value]) : [];
  const valuesResourceCollection = useResourceCollection({
    ...resource,
    initialFilters: { id_in: ids },
    disabled: ids.length === 0,
    initialLimit: ids.length,
  });

  const getValueForKey = (item: any, key: ResourceLabelKey): string | null => {
    if (typeof key === "string") {
      return item[key];
    } else if (typeof key === "function") {
      return key(item);
    }
    return null;
  };

  const onSearch = debounce((s: string) => {
    // resourceCollection.updateSearch(search);
    setSearch(s);
  }, 500);

  const data: { [key: string]: React.ReactNode } = {};
  const allValues = [
    ...(drobdownResourceCollection?.data || []),
    ...((!search && valuesResourceCollection.data) || []),
  ];
  for (const item of allValues) {
    const val = getValueForKey(item, valueKey);
    if (val) {
      data[val] = getValueForKey(item, labelKey);
    }
  }

  return (
    <Select
      value={value}
      loading={
        drobdownResourceCollection.loading || valuesResourceCollection.loading
      }
      onSearch={(s) => onSearch(s)}
      onChange={(val: any, option) => {
        if (typeof val === "undefined") {
          val = null;
        }
        if (onChange) {
          onChange(val, option);
        }
      }}
      onBlur={() => {
        setHasFocus(false);
        setSearch(undefined);
      }}
      filterOption={false}
      autoClearSearchValue={false}
      allowClear={true}
      optionFilterProp="children"
      dropdownStyle={{ position: "relative" }}
      onFocus={() => setHasFocus(true)}
      notFoundContent={
        drobdownResourceCollection.loading ? <Spin size="small" /> : null
      }
      onPopupScroll={(e) => {
        const target = e.target as HTMLDivElement;
        if (
          !drobdownResourceCollection.loading &&
          target.scrollTop + target.offsetHeight > target.scrollHeight - 50
        ) {
          if (limit < (drobdownResourceCollection.count || 0)) {
            setLimit(limit + 30);
          }
        }
      }}
      {...rest}
    >
      {Object.keys(data).map((key) => (
        <Select.Option key={key} value={key}>
          {data[key]}
        </Select.Option>
      ))}
    </Select>
  );
};

// <T extends { id: ResourceID } = any>
export const ResourceSelect = observer(
  (props: SelectProps<any> & ResourceSelectProps<any>) => (
    <ResourceSelectComponent {...props} />
  )
);
