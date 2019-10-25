import * as React from 'react';

import { Icon, Input } from 'antd';

import { ResourceCollection } from 'webpanel-data';
import { SearchProps } from 'antd/lib/input/Search';
import { observer } from 'mobx-react';

export interface ResourceSearchInputProps<T> extends SearchProps {
  resourceCollection: ResourceCollection<T>;
}

export interface ResourceSearchInputState extends SearchProps {
  value?: string;
}

@observer
export class ResourceSearchInput<T = any> extends React.Component<
  ResourceSearchInputProps<T>,
  ResourceSearchInputState
> {
  private cancelHandler: any | null = null;

  static getDerivedStateFromProps(
    nextProps: ResourceSearchInputProps<any>,
    prevState: ResourceSearchInputState
  ) {
    return {
      value: prevState ? prevState.value : nextProps.resourceCollection.search
    };
  }

  updateSearch = () => {
    const { resourceCollection } = this.props;
    let _value: string | undefined = this.state.value;
    if (_value === '') {
      _value = undefined;
    }
    resourceCollection.updateSearch(_value);
  };

  handleChange = (value: string) => {
    this.setState({ value });
    if (this.cancelHandler) {
      clearInterval(this.cancelHandler);
    }
    this.cancelHandler = setTimeout(() => {
      this.updateSearch();
    }, 300);
  };

  render() {
    const { resourceCollection, ...props } = this.props;

    const value = this.state.value;

    return (
      <Input.Search
        value={value}
        {...props}
        // onSearch={this.handleSearch}
        onChange={({ target }) => {
          this.handleChange(target.value);
        }}
        enterButton={
          <a
            onClick={() => {
              this.handleChange('');
            }}
          >
            <Icon type="close" />
          </a>
        }
      />
    );
  }
}
