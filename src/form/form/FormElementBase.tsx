import * as React from 'react';
import { get } from 'lodash';
import { Subscriber } from 'react-broadcast';
import { Observer } from 'mobx-react';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';

import { FormContext } from './Form';

export interface FormElementProps extends GetFieldDecoratorOptions {
  name: string;
}

export class FormElementBase<P> extends React.Component<P & FormElementProps> {
  render() {
    return (
      <Subscriber channel="form-context">
        {(context: FormContext) => {
          return (
            <Observer>
              {() => (
                <FormElementComponent
                  {...this.props}
                  formContext={context}
                  renderElement={this.getElement()}
                />
              )}
            </Observer>
          );
        }}
      </Subscriber>
    );
  }

  getElement(): React.ReactNode {
    return this.props.children;
  }
}

export class FormElementComponent extends React.Component<
  FormElementProps & {
    formContext?: FormContext;
    renderElement: React.ReactNode;
  }
> {
  wrapInFieldDecorator = (elm: React.ReactNode): React.ReactNode => {
    if (!this.props.formContext) {
      return elm;
    }

    const { form, initialValues } = this.props.formContext;

    const namePath = this.props.name
      .replace(/\]\[/g, '.')
      .replace(']', '.')
      .replace('[', '.');

    let props = Object.assign({}, { ...this.props });

    props.initialValue = props.initialValue || get(initialValues, namePath);

    return form.getFieldDecorator(this.props.name, props)(elm);
  };

  render() {
    return this.wrapInFieldDecorator(this.props.renderElement);
  }
}
