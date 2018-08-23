import * as React from 'react';
import { Form as AForm, message } from 'antd';
import { FormProps } from 'antd/lib/form/Form';

import { observer } from 'mobx-react';
import { Resource } from 'webpanel-data';

import { Form, FormContext } from './Form';

export interface ResourceFormProps extends FormProps {
  formResource: Resource;
  render: (context: FormContext) => React.ReactNode;
  onSuccess?: () => void;
  onFailure?: (err: Error) => void;
}

@observer
export class ResourceForm extends React.Component<ResourceFormProps> {
  onSave = async (values: any) => {
    try {
      await this.props.formResource.save(values);
      this.displaySuccess();
    } catch (error) {
      this.displayError(error);
    }
  };

  displaySuccess = () => {
    if (this.props.onSuccess) {
      this.props.onSuccess();
    } else {
      message.success('Form saved!');
    }
  };

  displayError = (err: Error) => {
    if (this.props.onFailure) {
      this.props.onFailure(err);
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

    return (
      <Form
        onSave={this.onSave}
        initialValues={formResource.data}
        {...formProps}
        render={(context: FormContext) => {
          // const hasChanges = context.form.isFieldsTouched();
          return (
            <div>
              {render(context)}
              {this.props.children}
              <AForm.Item
                wrapperCol={{
                  xs: { span: 24, offset: 0 },
                  sm: { span: 16, offset: 8 }
                }}
              >
                {/* <Button disabled={!hasChanges} type="primary" htmlType="submit">
                  Send
                </Button>
                <Popconfirm
                  title="Reset?"
                  cancelText="No"
                  okText="Yes"
                  onConfirm={() => context.form.resetFields()}
                >
                  <Button disabled={!hasChanges} style={{ marginLeft: 8 }}>
                    Reset
                  </Button>
                </Popconfirm> */}
              </AForm.Item>
            </div>
          );
        }}
      />
    );
  }
}
