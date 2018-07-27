import * as React from 'react';
import { Input } from 'antd';
import { SearchProps } from 'antd/lib/input/Search';
import { observer } from 'mobx-react';

import { ResourceCollection } from 'webpanel-data';

export interface ResourceSearchInputProps extends SearchProps {
  resourceCollection: ResourceCollection;
}

@observer
export class ResourceSearchInput extends React.Component<
  ResourceSearchInputProps
> {
  handleSearch = (value: string) => {
    const { resourceCollection } = this.props;
    let _value: string | undefined = value;
    if (_value === '') {
      _value = undefined;
    }
    resourceCollection.updateSearch(_value);
  };

  render() {
    const { resourceCollection, ...props } = this.props;
    return <Input.Search {...props} onSearch={this.handleSearch} />;
  }
}
