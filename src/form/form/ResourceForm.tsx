import * as React from 'react';
import { Form as AForm, message, Button, /*Spin,*/ Popconfirm } from 'antd';

import { observer } from 'mobx-react';
import { Resource } from 'webpanel-data';

import { Form, FormContext } from './Form';

export interface ResourceFormProps {
  resource: Resource;
}

@observer
export class ResourceForm extends React.Component<ResourceFormProps> {
  onSave = async (values: any) => {
    await this.props.resource.save(values);
    message.success('Form saved');
  };

  render() {
    const { resource, ...formProps } = this.props;

    return (
      <Form
        onSave={this.onSave}
        initialValues={resource.data}
        {...formProps}
        render={(context: FormContext) => {
          const hasChanges = context.form.isFieldsTouched();
          return (
            <div>
              {this.props.children}
              <AForm.Item
                wrapperCol={{
                  xs: { span: 24, offset: 0 },
                  sm: { span: 16, offset: 8 }
                }}
              >
                <Button disabled={!hasChanges} type="primary" htmlType="submit">
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
                </Popconfirm>
              </AForm.Item>
            </div>
          );
        }}
      />
    );
  }
}
