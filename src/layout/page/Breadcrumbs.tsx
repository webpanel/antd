import * as React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Icon } from 'antd';

export interface BreadcrumbItem {
  title: string;
  href?: string;
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
          <Breadcrumb.Item key={i.href}>
            <Link to={i.href + '/'}>{i.title}</Link>
          </Breadcrumb.Item>
        ))}
        {currentBreadcrumb ? (
          <Breadcrumb.Item key={currentBreadcrumb.href}>
            {currentBreadcrumb.title}
          </Breadcrumb.Item>
        ) : null}
      </Breadcrumb>
    );
  }
}
