import * as React from 'react';
import { Link, Route, match as Match } from 'react-router-dom';
import { Menu as AntdMenu, Icon } from 'antd';

export interface MenuItemProps {
  icon?: string;
  title: string;
  subitems?: React.ReactElement<MenuItemProps>[];
}
interface MenuItemComponentProps extends MenuItemProps {
  path: string;
}

export interface MenuProps {
  items?: React.ReactElement<MenuItemProps>[];
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
  renderItems(items: React.ReactElement<MenuItemProps>[]): JSX.Element[] {
    return items.map((item: React.ReactElement<MenuItemProps>) => {
      if (item.props.subitems) {
        return (
          <AntdMenu.SubMenu
            key={'sub_' + item.key}
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
      const key = item.key;
      if (!key) {
        return <MenuItemComponent {...item.props} path="#" />;
      }
      return (
        <AntdMenu.Item key={key}>
          <MenuItemComponent {...item.props} path={key.toString()} />
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
    const children: any[] = Array.isArray(this.props.children) ?
      [...this.props.children] :
      [this.props.children];
    const items = children.filter(comp => comp.type.name === 'MenuItem');

    for (let item of items) {
      for (let subitem of item.props.subitems || []) {
        if (subitem.key === match.url) {
          return ['sub_' + subitem.key];
        }
      }
    }
    return [];
  }

  render() {
    const children: any[] = Array.isArray(this.props.children) ?
      [...this.props.children] :
      [this.props.children];
    const items = children.filter(comp => comp.type.name === 'MenuItem');

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
