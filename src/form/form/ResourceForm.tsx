import * as React from 'react';

import { Alert, message } from 'antd';
import { Form, FormContext } from './Form';

import { FormProps } from 'antd/lib/form/Form';
import { Resource } from 'webpanel-data';
import { observer } from 'mobx-react';

export interface ResourceFormProps extends FormProps {
  formResource: Resource;
  render: (context: FormContext) => React.ReactNode;
  onSuccess?: (context: FormContext) => void;
  onFailure?: (err: Error, context: FormContext) => void;
}

@observer
export class ResourceForm extends React.Component<ResourceFormProps> {
  onSave = async (values: any, context: FormContext) => {
    try {
      await this.props.formResource.save(values);
      this.displaySuccess(context);
    } catch (error) {
      this.displayError(error, context);
    }
  };

  onValidationError = async (err: Error, context: FormContext) => {
    this.displayError(err, context);
  };

  displaySuccess = (context: FormContext) => {
    if (this.props.onSuccess) {
      this.props.onSuccess(context);
    } else {
      message.success('Form saved!');
    }
  };

  displayError = (err: Error, context: FormContext) => {
    if (this.props.onFailure) {
      this.props.onFailure(err, context);
    } else {
      message.error(err.message || err || 'Unknown error occurred!');
    }
  };

  render() {
    const {
      onSuccess,
      onFailure,
      formResource,
      render,
      ...formProps
    } = this.props;

    if (formResource.error) {
      return (
        <Alert
          message={
            <div>Failed to load resource {formResource.error.message}</div>
          }
          type="error"
        />
      );
    }

    return (
      <Form
        onSave={this.onSave}
        onValidationError={this.onValidationError}
        initialValues={formResource.data}
        {...formProps}
        render={(context: FormContext) => {
          return (
            <>
              {render(context)}
              {this.props.children}
            </>
          );
        }}
      />
    );
  }
}
