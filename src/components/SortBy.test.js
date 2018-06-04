import React from 'react';
import { shallow } from 'enzyme';

import { SortBy } from './SortBy';


describe('SortBy component', () => {
  let wrapper;
  let props;

  let mockSortPostsFn = jest.fn(() => { return Promise.resolve(); });

  beforeEach(() => {
    props = {
      sortPosts: mockSortPostsFn,
    }

  });

  afterEach(() => {
    mockSortPostsFn.mockClear();
  })

  it('renders 8 options for sorting', () => {
    wrapper = shallow(<SortBy {...props} />)
    expect(wrapper.find('option')).toHaveLength(8);
    expect(wrapper.find('option').get(0).props.value).toEqual('byDateDown');
    expect(wrapper.find('option').get(1).props.value).toEqual('byDateUp');
    // keep going...
  });

  it('when option changed, it calls sortPosts method', () => {
    wrapper = shallow(<SortBy {...props} />);
    wrapper.simulate('change', {target: {value: 'byDate'}});
    expect(mockSortPostsFn.mock.calls.length).toEqual(1);
  });
});

