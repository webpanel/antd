import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Table } from './Table';
it('renders without crashing', function () {
    var div = document.createElement('div');
    ReactDOM.render(React.createElement(Table, { dataSource: [{ aa: 'bb' }], rowKey: "aa", columns: [{ title: 'aaa', key: 'aa', dataIndex: 'aa' }] }), div);
    console.log(div.outerHTML);
    ReactDOM.unmountComponentAtNode(div);
});
//# sourceMappingURL=Table.test.js.map