import * as React from 'react';
import { Link, Route, match as Match } from 'react-router-dom';
import { Menu as AntdMenu, Icon } from 'antd';

import { searchChildrenWithType, appendStringPath } from '../utils';
import { MenuTheme } from 'antd/lib/menu';

export interface MenuItemProps extends React.Props<any> {
  icon?: string;
  title: string;
  subitems?: React.ReactElement<MenuItemProps>[];
}
interface MenuItemComponentProps extends MenuItemProps {
  path: string;
}

export interface MenuProps {
  items?: React.ReactElement<MenuItemProps>[];
  theme?: MenuTheme;
}

export class MenuItem extends React.Component<MenuItemProps> {}

export class MenuItemComponent extends React.Component<MenuItemComponentProps> {
  render(): any {
    const { ...item } = this.props;
    return (
      <Link to={item.path} key={item.path}>
        {item.icon ? <Icon type={item.icon} /> : null}
        <span className="nav-text">{item.title}</span>
      </Link>
    );
  }
}

export class Menu extends React.Component<MenuProps> {
  renderItems(
    items: React.ReactElement<MenuItemProps>[],
    parentPath: string
  ): JSX.Element[] {
    return items.map((item: React.ReactElement<MenuItemProps>) => {
      const subitems =
        item.props.subitems ||
        searchChildrenWithType(item.props.children, MenuItem);

      const key = item.key;
      if (!key) {
        return <MenuItemComponent {...item.props} path="#" />;
      }
      const resolvedPath = appendStringPath(parentPath, key.toString());

      if (subitems && subitems.length > 0) {
        return (
          <AntdMenu.SubMenu
            key={'sub_' + resolvedPath}
            title={
              <span>
                <Icon type={item.props.icon || 'folder'} />
                <span>{item.props.title}</span>
              </span>
            }
          >
            {this.renderItems(subitems, resolvedPath)}
          </AntdMenu.SubMenu>
        );
      }

      return (
        <AntdMenu.Item key={resolvedPath}>
          <MenuItemComponent {...item.props} path={resolvedPath} />
        </AntdMenu.Item>
      );
    });
  }

  defaultSelectedKeys(match: Match<any>): string[] {
    let res: string[] = [];
    let buff = '/';

    if (match.url === '/') {
      res.push('/');
    } else {
      match.url
        .split('/')
        .filter(x => x)
        .forEach((name: string) => {
          buff += name;
          res.push(buff + '/');
          buff += '/';
        });
    }
    return res;
  }

  defaultOpenKeys(match: Match<any>): string[] {
    const items = searchChildrenWithType(this.props.children, MenuItem);

    for (let item of items) {
      const subitems = searchChildrenWithType(item.props.children, MenuItem);
      for (let subitem of subitems) {
        if (item.key && subitem.key) {
          const resolvedPath = appendStringPath(
            item.key.toString(),
            subitem.key.toString()
          );
          if (resolvedPath === match.url) {
            const parentPath = appendStringPath(item.key.toString(), '');
            return ['sub_' + parentPath];
          }
        }
      }
    }
    return [];
  }

  render() {
    const items = searchChildrenWithType(this.props.children, MenuItem);
    return (
      <Route
        path="*"
        exact={true}
        children={({ match }) => {
          return (
            <AntdMenu
              theme={this.props.theme}
              mode="inline"
              selectedKeys={this.defaultSelectedKeys(match)}
              defaultOpenKeys={this.defaultOpenKeys(match)}
            >
              {this.renderItems(items, '/')}
            </AntdMenu>
          );
        }}
      />
    );
  }
}
