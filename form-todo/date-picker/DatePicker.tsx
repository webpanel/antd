import * as React from 'react';
import * as moment from 'moment';
import { DatePicker as AntdDatePicker } from 'antd';
import { TimePickerProps } from 'antd/lib/time-picker';
import { observer } from 'mobx-react';

// interface DatePickerConfig {
//   name: string;
//   initialValue?: string;
//   showTime?: TimePickerProps | boolean;
//   showToday?: boolean;
//   format?: string;
//   disabled?: string;
// }

@observer
export class DatePickerComponent extends React.Component<
  RendererComponentProps<DatePickerConfig> & ContextObserver<any>
> {
  getFormat() {
    const { config } = this.props;
    if (config.format) {
      return config.format;
    }
    return config.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
  }

  render() {
    const { context, config } = this.props;

    const elm = (
      <AntdDatePicker
        showTime={config.showTime}
        showToday={config.showToday}
        format={this.getFormat()}
        defaultPickerValue={moment()
          .minute(0)
          .seconds(0)}
        disabled={
          config.disabled ? evaluate(config.disabled, context) : undefined
        }
      />
    );

    if (!context.form || !context.form.getFieldDecorator) {
      return elm;
    }
    const { getFieldDecorator } = context.form;

    const nameKey = renderTemplate(config.name, context) || '';
    const initialValueString = config.initialValue
      ? renderTemplate(config.initialValue, context)
      : evaluate(nameKey, context.formValues);
    let initialValue = initialValueString
      ? moment(initialValueString).seconds(0)
      : undefined;

    return getFieldDecorator(nameKey, {
      initialValue:
        initialValue && initialValue.isValid() ? initialValue : undefined
    })(elm);
  }
}

export class DatePicker extends React.Component<
  RendererComponentProps<DatePickerConfig>
> {
  render() {
    return (
      <Subscriber channel="context">
        {ctx => <DatePickerComponent {...this.props} context={ctx} />}
      </Subscriber>
    );
  }
}
