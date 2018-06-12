import * as React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Icon } from 'antd';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export class Breadcrumbs extends React.Component<BreadcrumbsProps> {
  render() {
    const { items } = this.props;

    const breadcrumbsLinks = items.slice(0, items.length - 1);
    const currentBreadcrumb = items[items.length - 1];
    return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Link to="/">
            <Icon type="home" />
          </Link>
        </Breadcrumb.Item>
        {breadcrumbsLinks.map(i => (
          <Breadcrumb.Item key={i.path}>
            <Link to={i.path}>{i.name}</Link>
          </Breadcrumb.Item>
        ))}
        {currentBreadcrumb ? (
          <Breadcrumb.Item key={currentBreadcrumb.path}>
            {currentBreadcrumb.name}
          </Breadcrumb.Item>
        ) : null}
      </Breadcrumb>
    );
  }
}
