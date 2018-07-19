import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Table } from 'antd';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Table
      dataSource={[{ aa: 'bb' }]}
      rowKey="aa"
      columns={[{ title: 'aaa', key: 'aa', dataIndex: 'aa' }]}
    />,
    div
  );
  console.log(div.outerHTML);
  ReactDOM.unmountComponentAtNode(div);
});
