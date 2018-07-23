import * as React from 'react';
import { Input as AntdInput } from 'antd';
import { TextAreaProps } from 'antd/lib/input/TextArea';

import { FormElement } from '../form/FormElement';

export class InputTextArea extends FormElement<TextAreaProps> {
  getElement() {
    return <AntdInput.TextArea {...this.props} />;
  }
}
