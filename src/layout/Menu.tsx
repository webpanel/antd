import * as React from 'react';
import { Link, Route, match as Match } from 'react-router-dom';
import { Menu as AntdMenu, Icon } from 'antd';

export interface MenuItemProps {
  icon?: string;
  title: string;
  path: string;
  subitems?: React.ReactElement<MenuItemProps>[];
}

export interface MenuProps {
  items: React.ReactElement<MenuItemProps>[];
}

export class MenuItem extends React.Component<MenuItemProps> {
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
  renderItems(items: React.ReactElement<MenuItemProps>[]): JSX.Element[] {
    return items.map((item: React.ReactElement<MenuItemProps>) => {
      if (item.props.subitems) {
        return (
          <AntdMenu.SubMenu
            key={'sub_' + item.props.path}
            title={
              <span>
                <Icon type={item.props.icon || 'folder'} />
                <span>{item.props.title}</span>
              </span>
            }
          >
            {this.renderItems(item.props.subitems)}
          </AntdMenu.SubMenu>
        );
      }
      return (
        <AntdMenu.Item key={item.props.path}>
          <MenuItem {...item.props} />
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
    for (let item of this.props.items) {
      for (let subitem of item.props.subitems || []) {
        if (subitem.props.path === match.url) {
          return ['sub_' + item.props.path];
        }
      }
    }
    return [];
  }

  render() {
    const items = this.props.items;
    return (
      <Route
        path="*"
        exact={true}
        children={({ match }) => {
          return (
            <AntdMenu
              theme="dark"
              mode="inline"
              selectedKeys={this.defaultSelectedKeys(match)}
              defaultOpenKeys={this.defaultOpenKeys(match)}
            >
              {this.renderItems(items)}
            </AntdMenu>
          );
        }}
      />
    );
  }
}
