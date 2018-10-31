import * as React from 'react';

import { FormContext } from './Form';

import { Button, Popconfirm, Form } from 'antd';

export interface ResourceFormButtonsProps {
  formContext: FormContext;
}

export class ResourceFormButtons extends React.Component<
  ResourceFormButtonsProps
> {
  render() {
    const { formContext } = this.props;
    const hasChanges = formContext.form.isFieldsTouched();

    return (
      <Form.Item
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: { span: 16, offset: 8 }
        }}
      >
        <Button disabled={!hasChanges} type="primary" htmlType="submit">
          Save
        </Button>
        <Popconfirm
          title="Reset?"
          cancelText="No"
          okText="Yes"
          onConfirm={() => formContext.form.resetFields()}
        >
          <Button disabled={!hasChanges} style={{ marginLeft: 8 }}>
            Reset
          </Button>
        </Popconfirm>
      </Form.Item>
    );
  }
}
