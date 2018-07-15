import * as React from 'react';
import { Link, Route, match as Match } from 'react-router-dom';
import { Menu as AntdMenu, Icon } from 'antd';

export interface MenuItem {
  icon: string;
  title: string;
  path: string;
  subitems?: MenuItem[];
}

export interface MenuProps {
  items: MenuItem[];
}

export class Menu extends React.Component<MenuProps> {
  renderItem(item: MenuItem): JSX.Element {
    if (item.subitems) {
      return (
        <AntdMenu.SubMenu
          key={'sub_' + item.path}
          title={
            <span>
              <Icon type={item.icon || 'folder'} />
              <span>{item.title}</span>
            </span>
          }
        >
          {item.subitems.map(x => this.renderItem(x))}
        </AntdMenu.SubMenu>
      );
    } else {
      return (
        <AntdMenu.Item key={item.path}>
          <Link to={item.path}>
            <Icon type={item.icon || 'folder'} />
            <span className="nav-text">
              {item.title} ({item.path})
            </span>
          </Link>
        </AntdMenu.Item>
      );
    }
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
      for (let subitem of item.subitems || []) {
        if (subitem.path === match.url) {
          return ['sub_' + item.path];
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
              {items.map(x => this.renderItem(x))}
            </AntdMenu>
          );
        }}
      />
    );
  }
}
