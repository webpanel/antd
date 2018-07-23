import * as React from 'react';
import { Input as AntdInput } from 'antd';
import { InputProps } from 'antd/lib/input/Input';

import { FormElement } from '../form/FormElement';

export class Input extends FormElement<InputProps> {
  getElement() {
    return <AntdInput {...this.props} />;
  }
}
