import * as React from 'react';
import { InputNumber as AntdInputNumber } from 'antd';
import { get } from 'lodash';
import {
  renderTemplate,
  RendererComponentProps,
  ContextObserver,
  evaluate
} from '../../../../webana';
import { observer } from 'mobx-react';
import { Subscriber } from 'react-broadcast';

interface InputNumberDecoratorConfig {
  name: string;
  initialValue: string;
}
interface InputNumberConfig extends InputNumberDecoratorConfig {
  precision?: number;
  disabled?: string;
  onChange?: string;
  min?: string | number;
  max?: string | number;
  style?: React.CSSProperties;
}

@observer
export class InputNumberComponent extends React.Component<
  RendererComponentProps<InputNumberConfig> & ContextObserver<any>
> {
  wrapInFieldDecorator = (elm: JSX.Element): JSX.Element => {
    const { context, config } = this.props;
    if (!context.form || !context.form.getFieldDecorator) {
      return elm;
    }

    const initialValue = config.initialValue
      ? renderTemplate(config.initialValue, context)
      : get(context.formInitialValues, config.name);

    const { getFieldDecorator } = context.form;
    return getFieldDecorator(config.name, {
      // rules: [{ type: config.type, required: true, message: 'Invalid???' }],
      initialValue
    })(elm);
  };

  render() {
    const { config, context } = this.props;

    const min =
      typeof config.min === 'string'
        ? evaluate(config.min, context)
        : config.min;
    const max =
      typeof config.max === 'string'
        ? evaluate(config.max, context)
        : config.max;

    const onChange = config.onChange;
    return this.wrapInFieldDecorator(
      <AntdInputNumber
        disabled={
          config.disabled ? evaluate(config.disabled, context) : undefined
        }
        onChange={
          onChange
            ? value => evaluate(onChange, { ...context, value })
            : undefined
        }
        min={min}
        max={max}
        precision={config.precision || 0}
        style={config.style}
      />
    );
  }
}

export class InputNumber extends React.Component<
  RendererComponentProps<InputNumberConfig>
> {
  render() {
    return (
      <Subscriber channel="context">
        {ctx => <InputNumberComponent {...this.props} context={ctx} />}
      </Subscriber>
    );
  }
}
