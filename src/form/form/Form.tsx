import * as React from 'react';
import { Form as AForm /*, message, Button, Spin, Popconfirm*/ } from 'antd';
import {
  FormComponentProps,
  WrappedFormUtils,
  FormProps as AFormProps
} from 'antd/lib/form/Form';

import { observer } from 'mobx-react';
import { Broadcast } from 'react-broadcast';

interface FormProps extends AFormProps {
  render: (context: FormContext) => React.ReactNode;
  initialValues?: { [key: string]: any };
  onSave?: (values: any) => Promise<void>;
  onValidationError?: (err: Error) => Promise<void>;
}

interface FormState {}

export interface FormContext {
  form: WrappedFormUtils;
  initialValues: { [key: string]: any };
}

@observer
export class FormComponent extends React.Component<
  FormProps & FormComponentProps,
  FormState
> {
  isForceUpdated = false;

  resetFields = () => {
    const { form } = this.props;
    form.resetFields();
  };

  sanitizeValues(values: { [key: string]: any }): { [key: string]: any } {
    let _values: { [key: string]: any } = {};
    for (let key of Object.keys(values)) {
      const value = values[key];
      if (value && value.toISOString) {
        _values[key] = value.toISOString();
      } else {
        _values[key] = value;
      }
    }
    return _values;
  }

  submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { form /*, config, context*/ } = this.props;
    form.validateFields(async (err, values) => {
      if (err) {
        if (this.props.onValidationError) {
          this.props.onValidationError(err);
        }
      } else {
        form.setFieldsValue(values);
        if (this.props.onSave) {
          await this.props.onSave(values);
        }
      }
    });
  };

  updateFieldValues(values: any) {
    const { form } = this.props;
    const keys = Object.keys(form.getFieldsValue());

    let newValues: { [key: string]: any } = {};
    for (let key of keys) {
      newValues[key] = values[key];
    }
    form.setFieldsValue(newValues);
  }

  render() {
    const {
      form,
      initialValues,
      onSave,
      onValidationError,
      render,
      ...formProps
    } = this.props;

    // const formItemLayout =
    //   this.props.layout === 'horizontal'
    //     ? {
    //         labelCol: { span: 4 },
    //         wrapperCol: { span: 14 }
    //       }
    //     : null;
    // const buttonItemLayout = formLayout === 'horizontal' ? {
    //   wrapperCol: { span: 14, offset: 4 },
    // } : null;

    const formContext: FormContext = {
      form: this.props.form,
      initialValues: initialValues || {}
    };

    return (
      <Broadcast channel="form-context" value={formContext}>
        <AForm onSubmit={this.submit} {...formProps}>
          {render(formContext)}
        </AForm>
      </Broadcast>
    );
  }
}

export const Form: React.ComponentClass<FormProps> = AForm.create()(
  FormComponent
);
