import * as React from 'react';
import { get } from 'lodash';
import { InputProps } from 'antd/lib/input/Input';
import { Subscriber } from 'react-broadcast';

import { FormContext } from './Form';

export interface FormElementProps extends InputProps {
  name: string;
  initialValue?: string;
}

class FormElementComponent extends React.Component<
  FormElementProps & {
    formContext?: FormContext;
    renderElement: React.ReactNode;
  }
> {
  wrapInFieldDecorator = (elm: React.ReactNode): React.ReactNode => {
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
    // const { formContext, ...props } = this.props;
    return this.wrapInFieldDecorator(this.props.renderElement);
  }
}

export class FormElement<P> extends React.Component<P & FormElementProps> {
  render() {
    return (
      <Subscriber channel="form-context">
        {(context: FormContext) => (
          <FormElementComponent
            {...this.props}
            formContext={context}
            renderElement={this.getElement()}
          />
        )}
      </Subscriber>
    );
  }

  getElement(): React.ReactNode {
    return <div />;
  }
}
