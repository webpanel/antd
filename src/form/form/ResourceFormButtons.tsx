import * as React from 'react';

import { FormContext } from './Form';

import { Button, Popconfirm, Form, Menu, Dropdown } from 'antd';
import { ClickParam } from 'antd/lib/menu';

export interface ResourceFormButtonsProps {
  formContext: FormContext;
}

export class ResourceFormButtons extends React.Component<
  ResourceFormButtonsProps
> {
  render() {
    const { formContext } = this.props;
    const hasChanges = formContext.form.isFieldsTouched();

    const saveMenu = (
      <Menu
        onClick={(param: ClickParam) => {
          global.console.log(param.item);
        }}
      >
        <Menu.Item key="1">Save and add new</Menu.Item>
        <Menu.Item key="2">Save and continue editing</Menu.Item>
      </Menu>
    );

    return (
      <Form.Item
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: { span: 16, offset: 8 }
        }}
      >
        <Dropdown.Button
          disabled={!hasChanges}
          type="primary"
          overlay={saveMenu}
          onClick={() => {
            formContext.formComponent.submit();
          }}
        >
          Save
        </Dropdown.Button>
        {/* <Button disabled={!hasChanges} type="primary" htmlType="submit">
          Save
        </Button> */}
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
