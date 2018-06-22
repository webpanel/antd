/// <reference types="react" />
import * as React from 'react';
import { CardProps } from 'antd/lib/card';
export interface CardConfig extends CardProps {
    children?: any;
}
export declare class Card extends React.Component<CardConfig> {
    render(): JSX.Element;
}
