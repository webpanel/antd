import * as React from 'react';
import { Checkbox as AntdCheckbox } from 'antd';
import { get } from 'lodash';
import {
  // renderTemplate,
  RendererComponentProps,
  ContextObserver,
  evaluate,
  Renderer
} from '../../../../webana';
import { observer } from 'mobx-react';
import { Subscriber } from 'react-broadcast';

interface CheckboxConfig {
  name: string;
  value?: string;
  initialValue?: string;
  content: string;

  disabled?: string;
  checked?: string | boolean;
  onChange?: string;
  style?: React.CSSProperties;
}

@observer
export class CheckboxComponent extends React.Component<
  RendererComponentProps<CheckboxConfig> & ContextObserver<any>
> {
  wrapInFieldDecorator = (elm: JSX.Element): JSX.Element => {
    const { context, config } = this.props;
    if (!context.form || !context.form.getFieldDecorator) {
      return elm;
    }
    const { getFieldDecorator } = context.form;

    const initialValue = config.initialValue
      ? evaluate(config.initialValue, context)
      : get(context.formInitialValues, config.name);

    return getFieldDecorator(config.name, {
      valuePropName: 'checked',
      initialValue
    })(elm);
  };

  isChecked = (): boolean => {
    const { context, config } = this.props;
    const checked = config.checked;
    if (typeof checked === 'string') {
      const res = evaluate(checked, context);
      return res || res === 'true' || res === '1';
    } else {
      return checked || false;
    }
  };

  render() {
    const { config, context } = this.props;
    let checkedProps: { [key: string]: any } = {};
    if (!context.form) {
      checkedProps.checked = this.isChecked();
    }

    const onChange = config.onChange;
    const chechboxValue = config.value;

    return this.wrapInFieldDecorator(
      <AntdCheckbox
        disabled={
          config.disabled ? evaluate(config.disabled, context) : undefined
        }
        onChange={
          onChange
            ? (value: any) => evaluate(onChange, { value, ...context })
            : undefined
        }
        value={chechboxValue ? evaluate(chechboxValue, context) : undefined}
        {...checkedProps}
        style={config.style}
      >
        <Renderer content={config.content} />
      </AntdCheckbox>
    );
  }
}

export class Checkbox extends React.Component<
  RendererComponentProps<CheckboxConfig>
> {
  render() {
    return (
      <Subscriber channel="context">
        {ctx => <CheckboxComponent {...this.props} context={ctx} />}
      </Subscriber>
    );
  }
}
