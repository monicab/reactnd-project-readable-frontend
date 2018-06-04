import React from 'react';
import { shallow } from 'enzyme';

import { PostListPage } from './PostListPage';
import PostList from './PostList';


describe('PostListPage component', () => {
  let wrapper;
  let props;

  let mockFetchPostsFn = jest.fn(() => { return Promise.resolve(); });

  beforeEach(() => {
    props = {
      fetchPosts: mockFetchPostsFn,
      match: {
        params: { category: 'category'},
      }
    }

    wrapper = shallow(<PostListPage {...props} />)
  });


  afterEach(() => {
    mockFetchPostsFn.mockClear();
  })

  it('fetches the posts given the category', () => {
    expect(mockFetchPostsFn.mock.calls.length).toEqual(1);
  });

  it('renders PostList', () => {
    expect(wrapper.find(PostList)).toHaveLength(1);
  });

  it('fetches posts if the category changes', () => {
    expect(wrapper.find(PostList)).toHaveLength(1);

    //this will trigger componentDidUpdate
    wrapper.setProps(
      {
        match: {
          params: { category: 'category'},
        }
      })
    expect(mockFetchPostsFn.mock.calls.length).toEqual(1);
  })

  it('does not fetches posts if the category changes', () => {
    expect(wrapper.find(PostList)).toHaveLength(1);

    //this will trigger componentDidUpdate
    wrapper.setProps(
      {
        match: {
          params: { category: 'another-category'},
        }
      });
    expect(mockFetchPostsFn.mock.calls.length).toEqual(2);
    expect(wrapper.state().category).toEqual('another-category');
  })
});

