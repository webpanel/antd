import * as React from 'react';
import { Button, Modal } from 'antd';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import { ResourceCollection } from 'webpanel-data';

interface TableActionButtonsProps {
  resourceCollection?: ResourceCollection;
  id: string | number;
  onDelete: ((id: string | number) => void);
}

@observer
export class TableActionButtons extends React.Component<
  TableActionButtonsProps
> {
  state = {
    sortedInfo: { columnKey: undefined, order: undefined },
    selectedRowKeys: []
  };

  deleteResource = (id: string | number) => {
    Modal.confirm({
      title: 'Are you sure?',
      content: 'Do you want to delete this item?',
      okText: 'Yes',
      onOk: async () => {
        const resource = this.props.resourceCollection;
        if (resource) {
          try {
            await resource.delete(id);
            this.props.onDelete(id);
          } catch (err) {
            console.log(err);
          }
        }
      }
    });
  };

  render() {
    const { id } = this.props;

    return (
      <div>
        <Link to={id.toString()}>
          <Button>Edit</Button>
        </Link>
        <Button onClick={() => this.deleteResource(id)}>Delete</Button>
      </div>
    );
  }
}
