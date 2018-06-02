import React from 'react';
import { shallow } from 'enzyme';

import { CommentList } from './CommentList';
import Comment from './Comment';


describe('CommentList component', () => {
  let wrapper;
  let comments;
  let props;

  beforeEach(() => {
    comments = [{ id: 1}, { id: 2}];

    props = {
      comments: comments,
    }

  });

  afterEach(() => {
    comments = [];
  })

  it('renders no comments when there are no comments', () => {
    props.comments = [];
    wrapper = shallow(<CommentList {...props} />)
    expect(wrapper.find(Comment)).toHaveLength(0);
  });

  it('renders a comment component per each comment in the comments prop', () => {
    wrapper = shallow(<CommentList {...props} />)
    expect(wrapper.find(".list-group")).toHaveLength(1);
    expect(wrapper.find(Comment)).toHaveLength(2);
  });
});

