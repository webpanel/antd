import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import { BreadcrumbItem } from './page';
import { Breadcrumbs } from './page/Breadcrumbs';

export type StructureItemContent =
  | string
  | React.ReactNode
  | ((props: any) => React.ReactNode);

export interface StructureItem {
  name: string;
  content?: StructureItemContent;
  subitems?: { [key: string]: StructureItem };
}

export interface ContentProps {
  items?: { [key: string]: StructureItem };
}

export interface ContentState {
  error: Error | null;
}

export class Structure extends React.Component<ContentProps, ContentState> {
  state = { error: null };

  componentDidCatch(error: Error | null, info: object) {
    this.setState({ error: error || new Error(`empty error`) });
  }

  renderContent(content: StructureItemContent, props: any): React.ReactNode {
    if (typeof content === 'function') {
      return content(props);
    }
    return content;
  }

  getRoutes(
    items: { [key: string]: StructureItem },
    routes: JSX.Element[] | null = null,
    parentPath: string = '',
    breadcrumbs: BreadcrumbItem[] = []
  ): JSX.Element[] {
    routes = routes || [];

    for (let path of Object.keys(items)) {
      const item = items[path];

      const itemBreadcrumbs = Array.prototype.concat(breadcrumbs, [
        Object.assign({}, item, { path })
      ]);

      let route = (
        <Route
          key={parentPath + path}
          exact={true}
          path={parentPath + path}
          render={renderProps => {
            return (
              <div>
                <Breadcrumbs items={itemBreadcrumbs} />
                {this.renderContent(item.content, renderProps)}
              </div>
            );
          }}
        />
      );
      routes.push(route);
      if (item.subitems && Object.keys(item.subitems).length > 0) {
        this.getRoutes(
          item.subitems,
          routes,
          parentPath + path,
          itemBreadcrumbs
        );
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

    return (
      <Layout.Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <Switch>
          {this.props.items ? this.getRoutes(this.props.items) : null}
        </Switch>
      </Layout.Content>
    );
  }
}
