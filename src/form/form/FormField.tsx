import * as React from 'react';
import { get } from 'lodash';

import { FormContext } from './Form';

import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { ColProps } from 'antd/lib/col';

export interface FormFieldProps extends GetFieldDecoratorOptions {
  className?: string;
  label?: React.ReactNode;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  extra?: React.ReactNode;
  style?: React.CSSProperties;
  colon?: boolean;

  name: string;
  formContext: FormContext;
}

export class FormField extends React.Component<FormFieldProps> {
  decoratedChildren = (context: FormContext): React.ReactNode => {
    if (!this.props.children) {
      return undefined;
    }
    const { form, initialValues } = context;

    const namePath = this.props.name
      .replace(/\]\[/g, '.')
      .replace(']', '.')
      .replace('[', '.');

    let props = Object.assign({}, { ...this.props });

    props.initialValue = props.initialValue || get(initialValues, namePath);

    return form.getFieldDecorator(this.props.name, props)(this.props.children);
  };

  render() {
    const {
      className,
      label,
      labelCol,
      wrapperCol,
      extra,
      style,
      colon
    } = this.props;

    return (
      <div>
        <FormItem
          className={className}
          label={label}
          labelCol={labelCol}
          wrapperCol={wrapperCol}
          extra={extra}
          style={style}
          colon={colon}
        >
          {this.decoratedChildren(this.props.formContext)}
        </FormItem>
      </div>
    );
  }
}
