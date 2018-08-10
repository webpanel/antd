import * as React from 'react';
import { message, Button, Form as AForm } from 'antd';

import { Form } from '../form/form';
import { Input } from '../form/input/Input';

export type ForgotPasswordHandler = ((email: string) => Promise<void>);

export interface ForgotPasswordProps {
  defaultEmail?: string;
  onSend: ForgotPasswordHandler;
  onSuccess?: () => void;
  onError?: (err: Error) => void;
}

export interface ForgotPasswordState {
  loading: boolean;
}

export class ForgotPassword extends React.Component<ForgotPasswordProps> {
  state = {
    loading: false
  };
  onSubmit = async (values: any) => {
    try {
      this.setState({ loading: false });
      await this.props.onSend(values.email);
      if (this.props.onSuccess) {
        this.props.onSuccess();
      } else {
        message.success('Sent');
      }
    } catch (err) {
      if (this.props.onError) {
        this.props.onError(err);
      } else {
        message.error(err.message);
      }
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <Form
        onSave={this.onSubmit}
        render={() => (
          <>
            <AForm.Item label="Email">
              <Input name="email" />
            </AForm.Item>
            <AForm.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={this.state.loading}
              >
                Send
              </Button>
            </AForm.Item>
          </>
        )}
      />
    );
  }
}
