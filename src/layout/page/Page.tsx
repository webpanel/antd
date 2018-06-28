import * as React from 'react';
import { RouteComponentProps /*, Link*/ } from 'react-router-dom';

export interface PageProps {
  content: React.ReactNode;
  router: RouteComponentProps<any>;
}

export class Page extends React.Component<PageProps> {
  render() {
    return <div>{this.props.content}</div>;
  }
}
