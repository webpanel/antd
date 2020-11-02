import * as React from 'react';
import { Input as AntdInput } from 'antd';
import { InputProps } from 'antd/lib/input';

// this exists only as temporary fix for this bug:
// https://github.com/ant-design/ant-design/issues/11697

export class Input extends React.Component<InputProps> {
  render() {
    return <AntdInput {...this.props} />;
  }
}
