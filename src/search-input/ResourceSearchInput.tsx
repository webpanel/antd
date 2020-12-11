import * as React from "react";

import { ResourceCollection, ResourceID } from "webpanel-data";

import { CloseOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { SearchProps } from "antd/lib/input/Search";
import { debounce } from "lodash";
import { observer } from "mobx-react";

export interface ResourceSearchInputProps<T extends { id: ResourceID }>
  extends SearchProps {
  resourceCollection: ResourceCollection<T>;
}

export interface ResourceSearchInputState extends SearchProps {
  value?: string;
}

export const ResourceSearchInputComponent = (
  props: ResourceSearchInputProps<any>
) => {
  const [value, setValue] = React.useState("");
  const { resourceCollection, ...rest } = props;
  // private cancelHandler: any | null = null;

  // static getDerivedStateFromProps(
  //   nextProps: ResourceSearchInputProps<any>,
  //   prevState: ResourceSearchInputState
  // ) {
  //   return {
  //     value: prevState ? prevState.value : nextProps.resourceCollection.search,
  //   };
  // }

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

  // handleChange = (value: string) => {
  //   this.setState({ value });
  //   if (this.cancelHandler) {
  //     clearInterval(this.cancelHandler);
  //   }
  //   this.cancelHandler = setTimeout(() => {
  //     this.updateSearch();
  //   }, 300);
  // };

  // const value = this.state.value;

  return (
    <Input.Search
      value={value}
      {...rest}
      // onSearch={this.handleSearch}
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

export const ResourceSearchInput = observer(
  (props: ResourceSearchInputProps<any>) => (
    <ResourceSearchInputComponent {...props} />
  )
);
