import * as React from 'react';
import { get } from 'lodash';
import { Input as AntdInput } from 'antd';
import { InputProps as AInputProps } from 'antd/lib/input/Input';
import { Subscriber } from 'react-broadcast';
import { observer } from 'mobx-react';

import { FormContext } from '../form/Form';

export interface InputProps extends AInputProps {
  name: string;
  initialValue?: string;
}

@observer
export class InputComponent extends React.Component<
  InputProps & { formContext?: FormContext }
> {
  wrapInFieldDecorator = (elm: JSX.Element): React.ReactNode => {
    if (!this.props.formContext) {
      return elm;
    }

    const { form, initialValues } = this.props.formContext;

    const namePath = this.props.name
      .replace(/\]\[/g, '.')
      .replace(']', '.')
      .replace('[', '.');

    const initialValue =
      this.props.initialValue || get(initialValues, namePath);

    return form.getFieldDecorator(this.props.name, {
      initialValue
    })(elm);
  };

  render() {
    const { formContext, ...props } = this.props;
    return this.wrapInFieldDecorator(<AntdInput {...props} />);
  }
}

export class Input extends React.Component<InputProps> {
  render() {
    return (
      <Subscriber channel="form-context">
        {(context: FormContext) => (
          <InputComponent {...this.props} formContext={context} />
        )}
      </Subscriber>
    );
  }
}
