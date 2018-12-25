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
  hasFeedback?: boolean;

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
    props.normalize = (value: any, prevValue: any, allValues: any) => {
      if (typeof value === 'undefined') {
        return null;
      }
      return value;
    };

    let children = this.props.children;
    if (Array.isArray(children)) {
      return children
        .filter(x => x)
        .map(elm => form.getFieldDecorator(this.props.name, props)(elm));
    }
    return form.getFieldDecorator(this.props.name, props)(children);
  };

  render() {
    const {
      className,
      label,
      labelCol,
      wrapperCol,
      extra,
      style,
      colon,
      hasFeedback
    } = this.props;

    return (
      <FormItem
        className={className}
        label={label}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        extra={extra}
        style={style}
        colon={colon}
        hasFeedback={hasFeedback}
      >
        {this.decoratedChildren(this.props.formContext)}
      </FormItem>
    );
  }
}
