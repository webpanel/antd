import * as React from "react";

import { Button, Layout, PageHeader, Result } from "antd";
import { Link, Route, Switch } from "react-router-dom";
import { appendStringPath, searchChildrenWithType } from "../utils";

import { BreadcrumbItem } from "./page";
// import PageHeader, { IPageHeaderProps } from 'ant-design-pro/lib/PageHeader';
import { Breadcrumbs } from "./page/Breadcrumbs";
import { PageHeaderProps } from "antd/lib/page-header";
import { RouteComponentProps } from "react-router";

export type StructureItemContent =
  | React.ReactNode
  | ((props: RouteComponentProps<any>) => React.ReactNode);
export type StructureHeaderProps =
  | PageHeaderProps
  | ((props: RouteComponentProps<any>) => PageHeaderProps);

export interface StructureItemProps extends React.Props<any> {
  name: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  content?: StructureItemContent;
  header?: StructureHeaderProps;
}

export interface ContentProps {
  items?: React.ReactElement<StructureItemProps>[];
}

export interface ContentState {
  error: Error | null;
}

export class StructureItem extends React.Component<StructureItemProps> {
  renderContent(content: StructureItemContent, props: any): React.ReactNode {
    return typeof content === "function" ? content(props) : content;
  }

  render(): any {
    const { header, ...item } = this.props;

    let _header =
      typeof header === "function" ? header(this.props as any) : header;
    const breadcrumps = [...(item.breadcrumbs || [])];
    breadcrumps[breadcrumps.length - 1].href = undefined;

    return (
      <div>
        <div style={{ margin: "-30px 0px 0px" }}>
          <Breadcrumbs items={breadcrumps} />
          {_header?.title && <PageHeader {..._header} />}
        </div>
        {/* {item.breadcrumbs && <Breadcrumbs items={item.breadcrumbs} />} */}
        {this.renderContent(item.content, this.props)}
      </div>
    );
  }
}

export class Structure extends React.Component<ContentProps, ContentState> {
  state: ContentState = { error: null };

  componentDidCatch(error: Error | null, info: object) {
    this.setState({ error: error || new Error(`empty error`) });
  }

  getRoutes(
    items: React.ReactElement<StructureItemProps>[],
    routes: JSX.Element[] | null = null,
    parentPath: string = "",
    breadcrumbs: BreadcrumbItem[] = []
  ): JSX.Element[] {
    routes = routes || [];

    for (let item of items) {
      const path = item.key;
      if (!path) {
        continue;
      }

      const itemBreadcrumbs: BreadcrumbItem[] = [
        ...breadcrumbs,
        ...[{ title: item.props.name, href: path.toString() }],
      ];

      const resolvedPath = appendStringPath(parentPath, path.toString());

      const route = (
        <Route
          key={resolvedPath}
          exact={true}
          path={resolvedPath}
          render={(renderProps) => (
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
      const _error = error;
      return (
        <Layout.Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div style={{ padding: 24, background: "#fff", textAlign: "center" }}>
            error {_error.message}
          </div>
        </Layout.Content>
      );
    }

    const pageNotFound = (
      <Route path="*">
        <Result
          status="404"
          title="Page not found"
          subTitle="Check page address or contact tech assistance"
          extra={
            <Link to="/">
              <Button type="primary">Home</Button>
            </Link>
          }
        />
      </Route>
    );

    const items = searchChildrenWithType(this.props.children, StructureItem);

    return (
      <Layout.Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
        <Switch>
          {this.getRoutes(items)}
          {pageNotFound}
        </Switch>
      </Layout.Content>
    );
  }
}
