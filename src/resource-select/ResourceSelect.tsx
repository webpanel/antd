import * as React from "react";

import { ResourceID, useResourceCollection } from "webpanel-data";
import { Select, Spin } from "antd";

import { ResourceCollectionConfig } from "webpanel-data/lib/ResourceCollection";
import { SelectProps } from "antd/lib/select";
import debounce from "lodash/debounce";

type ResourceSelectKey = string | ((value: any) => string);
type ResourceLabelKey = React.ReactNode | ((value: any) => React.ReactNode);

export interface ResourceSelectProps<T extends { id: ResourceID }> {
  resource: ResourceCollectionConfig<T>;
  valueKey?: ResourceSelectKey;
  labelKey: ResourceLabelKey;
  groupKey?: string;
}

export const ResourceSelect = <T extends { id: ResourceID } = any>(
  props: SelectProps<any> & ResourceSelectProps<T>
) => {
  const { onChange, value, resource, valueKey, labelKey, ...rest } = props;
  const [search, setSearch] = React.useState<string | undefined>();
  const [hasFocus, setHasFocus] = React.useState(false);
  const [limit, setLimit] = React.useState(30);

  const dropdownResourceCollection = useResourceCollection({
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
    ...(dropdownResourceCollection?.data || []),
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
        dropdownResourceCollection.loading || valuesResourceCollection.loading
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
      autoClearSearchValue={true}
      allowClear={true}
      optionFilterProp="children"
      dropdownStyle={{ position: "relative" }}
      onFocus={() => setHasFocus(true)}
      notFoundContent={
        dropdownResourceCollection.loading ? <Spin size="small" /> : null
      }
      onPopupScroll={(e) => {
        const target = e.target as HTMLDivElement;
        if (
          !dropdownResourceCollection.loading &&
          target.scrollTop + target.offsetHeight > target.scrollHeight - 50
        ) {
          if (limit < (dropdownResourceCollection.count || 0)) {
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
