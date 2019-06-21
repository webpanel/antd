import * as React from 'react';

import { FormContext } from './Form';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { get } from 'lodash';

export interface FormFieldDecoratorProps extends GetFieldDecoratorOptions {
  formContext: FormContext;
  name: string;
}

export class FormFieldDecorator extends React.Component<
  FormFieldDecoratorProps
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

    let props = Object.assign({}, { ...this.props });

    props.initialValue = props.initialValue || get(initialValues, namePath);

    return form.getFieldDecorator(this.props.name, props)(elm);
  };

  render() {
    return this.wrapInFieldDecorator(this.props.children);
  }
}