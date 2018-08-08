import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { Layout } from 'antd';
import { BreadcrumbItem } from './page';
import { Breadcrumbs } from './page/Breadcrumbs';
import { searchChildrenWithType, appendStringPath } from '../utils';
// import { resolve } from 'url';

export type StructureItemContent =
  | string
  | React.ReactNode
  | ((props: RouteComponentProps<any>) => React.ReactNode);

export interface StructureItemProps extends React.Props<any> {
  name: string;
  breadcrumbs?: BreadcrumbItem[];
  content?: StructureItemContent;
}

export interface ContentProps {
  items?: React.ReactElement<StructureItemProps>[];
}

export interface ContentState {
  error: Error | null;
}

export class StructureItem extends React.Component<StructureItemProps> {
  renderContent(content: StructureItemContent, props: any): React.ReactNode {
    if (typeof content === 'function') {
      return content(props);
    }
    return content;
  }

  render(): any {
    const { ...item } = this.props;
    return (
      <div>
        {item.breadcrumbs && <Breadcrumbs items={item.breadcrumbs} />}
        {this.renderContent(item.content, this.props)}
      </div>
    );
  }
}

export class Structure extends React.Component<ContentProps, ContentState> {
  state = { error: null };

  componentDidCatch(error: Error | null, info: object) {
    this.setState({ error: error || new Error(`empty error`) });
  }

  getRoutes(
    items: React.ReactElement<StructureItemProps>[],
    routes: JSX.Element[] | null = null,
    parentPath: string = '',
    breadcrumbs: BreadcrumbItem[] = []
  ): JSX.Element[] {
    routes = routes || [];

    for (let item of items) {
      const path = item.key;
      if (!path) {
        continue;
      }

      const itemBreadcrumbs = Array.prototype.concat(breadcrumbs, [
        Object.assign({}, item.props, { path })
      ]);

      const resolvedPath = appendStringPath(parentPath, path.toString());

      const route = (
        <Route
          key={resolvedPath}
          exact={true}
          path={resolvedPath}
          render={renderProps => (
            <StructureItem
              breadcrumbs={itemBreadcrumbs}
              {...item.props}
              {...renderProps}
            />
          )}
        />
      );

      routes.push(route);

      const subitems = searchChildrenWithType(
        item.props.children,
        StructureItem
      );

      if (subitems && subitems.length > 0) {
        this.getRoutes(subitems, routes, resolvedPath, itemBreadcrumbs);
      }
    }
    return routes;
  }

  render() {
    const { error } = this.state;

    if (error !== null) {
      const _error = error as Error;
      return (
        <Layout.Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
            error {_error.message}
          </div>
        </Layout.Content>
      );
    }

    const pageNotFound = (
      <Route path="*">
        <div>
          <h1>Page not found</h1>
          <i>Check page address or contact tech assistance</i>
        </div>
      </Route>
    );

    const items = searchChildrenWithType(this.props.children, StructureItem);

    return (
      <Layout.Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <Switch>
          {this.getRoutes(items)}
          {pageNotFound}
        </Switch>
      </Layout.Content>
    );
  }
}
