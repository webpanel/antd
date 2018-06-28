import * as React from 'react';
import { Input as AntdInput } from 'antd';
import { TextAreaProps, HTMLTextareaProps } from 'antd/lib/input/TextArea';
import { Subscriber } from 'react-broadcast';
import { observer } from 'mobx-react';

import { FormContext } from '../form/Form';

export interface InputTextAreaProps extends TextAreaProps, HTMLTextareaProps {
  name: string;
  initialValue?: string;
}

@observer
export class InputTextAreaComponent extends React.Component<
  InputTextAreaProps & { formContext?: FormContext }
> {
  wrapInFieldDecorator = (elm: JSX.Element): React.ReactNode => {
    if (!this.props.formContext) {
      return elm;
    }

    const { form, initialValues } = this.props.formContext;

    const initialValue =
      this.props.initialValue || initialValues[this.props.name];

    return form.getFieldDecorator(this.props.name, {
      initialValue
    })(elm);
  };

  render() {
    const { formContext, ...props } = this.props;
    return this.wrapInFieldDecorator(<AntdInput.TextArea {...props} />);
  }
}

export class InputTextArea extends React.Component<InputTextAreaProps> {
  render() {
    return (
      <Subscriber channel="form-context">
        {(context: FormContext) => (
          <InputTextAreaComponent {...this.props} formContext={context} />
        )}
      </Subscriber>
    );
  }
}
