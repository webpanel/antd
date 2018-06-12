import * as React from 'react';
import { Card as AntdCard } from 'antd';
import { CardProps } from 'antd/lib/card';
import { observer } from 'mobx-react';

export interface CardConfig extends CardProps {
  children?: any;
}

@observer
export class Card extends React.Component<CardConfig> {
  render() {
    const { children, ...props } = this.props;
    return <AntdCard {...props}>{children}</AntdCard>;
  }
}
