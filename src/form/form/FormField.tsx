import * as React from 'react';
import { get } from 'lodash';

import { FormContext } from './Form';

import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { ColProps } from 'antd/lib/col';
import { ResourceSelect } from '../../resource-select/ResourceSelect';

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

    let children = Array.isArray(this.props.children)
      ? this.props.children
      : [this.props.children];

    return children
      .filter(x => x)
      .map(elm => {
        // nasty hack to handle crashes when select mode is for multiple values
        // but the form value is undefined (we provide empty array)
        if (elm) {
          const element = elm as React.ReactElement<any>;
          if (
            element.type === ResourceSelect &&
            element.props.mode !== 'default'
          ) {
            props.initialValue = props.initialValue || [];
          }
        }

        return form.getFieldDecorator(this.props.name, props)(elm);
      });
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
