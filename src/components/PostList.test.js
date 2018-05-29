import React from 'react';
import { shallow } from 'enzyme';

import { PostList } from './PostList';
import Post from './Post';


describe('PostList component', () => {
  let wrapper;
  let posts;
  let props;

  beforeEach(() => {
    posts = [{ id: 1}, { id: 2}];

    props = {
      posts: posts,
    }

  });

  afterEach(() => {
    posts = [];
  })

  it('renders no posts when there are no posts', () => {
    props.posts = [];
    wrapper = shallow(<PostList {...props} />)
    expect(wrapper.find(Post)).toHaveLength(0);
  });

  it('renders a post component per each post in the posts prop', () => {
    wrapper = shallow(<PostList {...props} />)
    expect(wrapper.find(".post-list")).toHaveLength(1);
    expect(wrapper.find(Post)).toHaveLength(2);
  });
});

