import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { ResourceSelect } from './ResourceSelect';

import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { Select } from 'antd';

configure({ adapter: new Adapter() });

describe('ResourceSelect', () => {
  it('contains correct options', () => {
    const collection = {
      data: [{ id: 'hello', name: 'world' }, { id: 'johny', name: 'John Doe' }]
    };

    const wrapper = mount(
      <ResourceSelect labelKey="name" resourceCollection={collection} />
    );

    wrapper.simulate('click');
    expect(wrapper.find('MenuItem').length).toBe(2);
  });

  it('contains correct options with filter', () => {
    const collection = {
      data: [{ id: 'hello', name: 'world' }, { id: 'johny', name: 'John Doe' }]
    };

    const wrapper = mount(
      <ResourceSelect labelKey="name" resourceCollection={collection} />
    );

    let input = wrapper.find('input');
    input.simulate('change', {
      target: {
        value: 'Jo'
      }
    });
    let menuItems = wrapper.find('MenuItem');
    expect(menuItems.length).toBe(1);
    expect(menuItems.first().text()).toBe('John Doe');

    input = wrapper.find('input');
    input.simulate('change', {
      target: {
        value: 'blah'
      }
    });
    menuItems = wrapper.find('MenuItem');
    expect(menuItems.length).toBe(1);
    expect(menuItems.first().text()).toBe('Not Found');
  });
});
