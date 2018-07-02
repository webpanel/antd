import * as React from 'react';
import { Select as AntdSelect } from 'antd';
import { SelectValue } from 'antd/lib/select';
import { get } from 'lodash';
import {
  renderTemplate,
  RendererComponentProps,
  ContextObserver,
  evaluate
} from '../../../../webana';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { Subscriber } from 'react-broadcast';
import { OptionProps } from 'antd/lib/select';

interface SelectDecoratorConfig {
  name: string;
  initialValue?: string;
}
interface SelectConfig extends SelectDecoratorConfig {
  placeholder?: string;
  mode?: 'default' | 'multiple' | 'tags' | 'combobox';
  options?: string;
  valueKey?: string;
  labelKey?: string;
  valueTemplate?: string;
  labelTemplate?: string;
  disabledKey?: string;
  enabledKey?: string;
  disabled?: string;
  enabled?: string;
  style?: React.CSSProperties;
  onChange?: string;
  onSelect?: string;
  nullOption?: string;
}

interface OptionConfig {
  value: string | null;
  label: string;
  disabled?: boolean;
}

@observer
export class SelectComponent extends React.Component<
  RendererComponentProps<SelectConfig> & ContextObserver<any>
> {
  wrapInFieldDecorator = (elm: JSX.Element): JSX.Element => {
    const { context, config } = this.props;
    if (!context.form || !context.form.getFieldDecorator) {
      return elm;
    }
    const { getFieldDecorator } = context.form;

    const initialValue = config.initialValue
      ? renderTemplate(config.initialValue, context)
      : get(context.formInitialValues, config.name);
    return getFieldDecorator(config.name, {
      // rules: [{ required: true, message: 'Please input your username!' }],
      // valuePropName: 'checked',
      initialValue,
      allowClear: true
    })(elm);
  };

  filterOption = (input: string, option: React.ReactElement<OptionProps>) => {
    let child = option.props.children;
    if (typeof child === 'string') {
      return (
        child
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .indexOf(input) !== -1
      );
    }
    return false;
  };

  getOptions = (): OptionConfig[] => {
    const { config, context } = this.props;

    let options: OptionConfig[] = [];

    if (Array.isArray(config.options)) {
      return config.options;
    }

    if (config.options) {
      const res = toJS(evaluate(config.options, context) || []);
      if (Array.isArray(res)) {
        options = res.map((item: any) => {
          const ctx = { ...context, item };
          let _item: OptionConfig = Object.assign({}, item);
          if (config.valueKey) {
            _item.value = evaluate(config.valueKey, ctx);
          }
          if (config.labelKey) {
            _item.label = evaluate(config.labelKey, ctx);
          }
          if (config.valueTemplate) {
            _item.value = renderTemplate(config.valueTemplate, ctx) || '';
          }
          if (config.labelTemplate) {
            _item.label = renderTemplate(config.labelTemplate, ctx) || '';
          }
          if (config.disabledKey) {
            _item.disabled = evaluate(config.disabledKey, ctx);
          }
          if (config.enabledKey) {
            _item.disabled = !evaluate(config.enabledKey, ctx);
          }
          return _item;
        });
      }
    }

    return options;
  };

  getOption = (value: SelectValue): OptionConfig | OptionConfig[] | null => {
    const options = this.getOptions();
    for (let option of options) {
      if (typeof value === 'string') {
        if (option.value === value) {
          return option;
        }
      }
    }
    return null;
  };

  render() {
    const { config, context } = this.props;

    const options = this.getOptions();

    if (config.nullOption) {
      options.unshift({
        value: null,
        label: config.nullOption,
        disabled: false
      });
    }

    return this.wrapInFieldDecorator(
      <AntdSelect
        showSearch={true}
        mode={config.mode}
        disabled={
          config.disabled ? evaluate(config.disabled, context) : undefined
        }
        placeholder={config.placeholder}
        style={config.style}
        filterOption={this.filterOption}
        onChange={value => {
          if (config.onChange) {
            evaluate(config.onChange, {
              ...context,
              item: this.getOption(value)
            });
          }
        }}
        onSelect={value => {
          if (config.onSelect) {
            evaluate(config.onSelect, {
              ...context,
              item: this.getOption(value)
            });
          }
        }}
      >
        {options.map(option => (
          <AntdSelect.Option
            key={option.value || 'null'}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </AntdSelect.Option>
        ))}
      </AntdSelect>
    );
  }
}

export class Select extends React.Component<
  RendererComponentProps<SelectConfig>
> {
  render() {
    return (
      <Subscriber channel="context">
        {ctx => <SelectComponent {...this.props} context={ctx} />}
      </Subscriber>
    );
  }
}
