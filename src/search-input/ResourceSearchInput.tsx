import * as React from "react";

import { ResourceCollection, ResourceID } from "webpanel-data";

import { CloseOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { SearchProps } from "antd/lib/input/Search";
import { debounce } from "lodash";

export interface ResourceSearchInputProps<T extends { id: ResourceID }>
  extends SearchProps {
  resourceCollection: ResourceCollection<T>;
}

export interface ResourceSearchInputState extends SearchProps {
  value?: string;
}

export const ResourceSearchInput = (props: ResourceSearchInputProps<any>) => {
  const { resourceCollection, ...rest } = props;
  const [value, setValue] = React.useState(resourceCollection.search || "");

  const updateSearch = debounce((s: string) => {
    if (s === "") {
      resourceCollection.updateSearch(undefined);
    } else {
      resourceCollection.updateSearch(s);
    }
  }, 500);
  const onChange = (s: string) => {
    setValue(s);
    updateSearch(s);
  };

  return (
    <Input.Search
      value={value}
      {...rest}
      onChange={({ target }) => {
        onChange(target.value);
      }}
      enterButton={
        <a
          onClick={() => {
            onChange("");
          }}
        >
          <CloseOutlined />
        </a>
      }
    />
  );
};
