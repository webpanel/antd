import * as React from 'react';
import { WrappedFormUtils } from 'antd/lib/form/Form';
// import { toJS } from 'mobx';
import { Button, Input, Icon } from 'antd';
import {
  // renderTemplate,
  Renderer,
  RendererComponentProps,
  ContextObserver,
  EventObserver,
  EventEmitter,
  Event,
  evaluate
} from '../../../../webana';
import { observer } from 'mobx-react';
import { Subscriber } from 'react-broadcast';

interface InputGroupListDecoratorConfig {
  name: string;
  initialValue: string;
}
interface InputGroupListConfig extends InputGroupListDecoratorConfig {
  content: any;
  disabled?: string;
  branchContent: any;
  roleContent: any;
  min?: number;
}

interface InputGroupListComponentState {
  fieldCount?: number;
}

@observer
export class InputGroupListComponent
  extends React.Component<
    RendererComponentProps<InputGroupListConfig> & ContextObserver<any>,
    InputGroupListComponentState
  >
  implements EventObserver {
  state = { fieldCount: undefined };

  handleEvent(event: Event) {
    // console.log('event', event);
    switch (event.name) {
      case 'reset':
        this.reset();
        break;
      case 'transformValues':
        event.payload.values[this.props.config.name] =
          event.payload.values[this.props.config.name] || [];
        break;
      default:
    }
  }

  reset = () => {
    if (this.props.context.formInitialValues) {
      let values =
        this.props.context.formInitialValues[this.props.config.name] || [];
      // console.log(values);
      if (typeof values !== 'undefined') {
        this.setState({ fieldCount: values.length });
      }
    }
  };

  removeRow = (index: number) => {
    const form = this.props.context.form as WrappedFormUtils;
    const formComponent = this.props.context.formComponent as WrappedFormUtils;
    let count = this.state.fieldCount;
    if (count && count > 0) {
      const values = form.getFieldsValue() as any;
      values[this.props.config.name].splice(index, 1);
      formComponent.setFieldsValue(values);
      this.setState({ fieldCount: count - 1 });
    }
  };

  addRow = () => {
    let count = this.state.fieldCount;
    if (typeof count !== 'undefined') {
      this.setState({ fieldCount: count + 1 });
    }
  };

  componentDidMount() {
    const eventEmitter = this.props.context.formEventEmitter as EventEmitter;

    eventEmitter.registerObserver(this);

    this.fetchFieldCount();
  }

  fetchFieldCount = (force: boolean = false) => {
    if (
      (typeof this.state.fieldCount === 'undefined' &&
        this.props.context.formValues) ||
      force
    ) {
      let values = this.props.context.formValues[this.props.config.name] || [];
      if (typeof values !== 'undefined') {
        this.setState({ fieldCount: values.length });
      }
    }
  };

  render() {
    const { context, config } = this.props;

    if (!context.form || !context.form.getFieldDecorator) {
      return null;
    }

    if (typeof this.state.fieldCount === 'undefined') {
      return null;
    }

    const fieldCount = this.state.fieldCount || 0;
    const min = config.min || 0;
    return (
      <div>
        {Array.from(Array(fieldCount).keys()).map((value: any, i: number) => {
          let content = Array.isArray(config.content)
            ? config.content
            : [config.content];

          content = content.map(x => {
            return Object.assign({}, x, {
              name: `${config.name}[${i}].${x.name}`
            });
          });
          return (
            <Input.Group
              compact={true}
              key={i}
              style={{ whiteSpace: 'nowrap' }}
            >
              <Renderer content={content} />
              <Button
                disabled={
                  fieldCount <= min ||
                  (config.disabled
                    ? evaluate(config.disabled, context)
                    : undefined)
                }
                onClick={() => this.removeRow(i)}
              >
                <Icon type="delete" />
              </Button>
            </Input.Group>
          );
        })}
        <Button
          onClick={this.addRow}
          disabled={
            config.disabled ? evaluate(config.disabled, context) : undefined
          }
        >
          +
        </Button>
      </div>
    );
  }
}

export class InputGroupList extends React.Component<
  RendererComponentProps<InputGroupListConfig>
> {
  render() {
    return (
      <Subscriber channel="context">
        {ctx => <InputGroupListComponent {...this.props} context={ctx} />}
      </Subscriber>
    );
  }
}
