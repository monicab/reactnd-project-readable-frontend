import React from 'react';
import { shallow } from 'enzyme';

import CommentList from './CommentList';
import CreateEditComment from './CreateEditComment';
import { PostDetail } from './PostDetail';
import Post from './Post';


describe('PostDetail component', () => {
  let wrapper;
  let post;
  let props;
  let mockFetchPostFn = jest.fn(() => { return Promise.resolve(); });
  let mockCreateCommentFn = jest.fn(() => { return Promise.resolve(); });
  let mockEditCommentFn = jest.fn(() => { return Promise.resolve(); });
  let mockFetchCommentsForPostFn = jest.fn(() => { return Promise.resolve(); });

  beforeEach(() => {
    post = {
      author: "post author",
      body: "post body",
      commentCount: 3,
      voteScore: 10,
      id: 1,
      title: "post title",
      category: "category"
    }

    props = {
      post: post,
      fetchPost: mockFetchPostFn,
      createComment: mockCreateCommentFn,
      editComment: mockEditCommentFn,
      fetchCommentsForPost: mockFetchCommentsForPostFn,

      match: {
        params: {post_id: 5 }
      },
    }

    wrapper = shallow(<PostDetail {...props} />)
  });

  afterEach(() => {
    mockFetchPostFn.mockClear();
    mockCreateCommentFn.mockClear();
    mockEditCommentFn.mockClear();
    mockFetchCommentsForPostFn.mockClear();
  })

  describe('when component did mount', () => {
    it('calls fetchPost when the component did mount', () => {
      expect(mockFetchPostFn.mock.calls.length).toEqual(1);
    });

    it('calls fetchCommentsForPost', () => {
      expect(mockFetchCommentsForPostFn.mock.calls.length).toEqual(1);
    });
  });

  it('renders a post with detail mode set to true', () => {
    expect(wrapper.find(Post)).toHaveLength(1);
    expect(wrapper.find(Post).props().detailMode).toEqual(true);
  });

  it('does not render CreateEditComment component by default', () => {
    expect(wrapper.find(CreateEditComment)).toHaveLength(0);
  });

  it('renders list of comments', () => {
    expect(wrapper.find(CommentList)).toHaveLength(1);
  })

  describe("+ comment", () => {
    it('renders a button to add a new comment', () => {
      expect(wrapper.find('.btn-add-comment')).toHaveLength(1);
    });

    it('when you click the button, it renders CreateEditComment', () => {
      wrapper.find('.btn-add-comment').simulate('click');
      expect(wrapper.find(CreateEditComment)).toHaveLength(1);
    });
  })

  describe('create/edit comment interactions', () => {
    it('creates a new comment when the onCreate event is called', () => {
      wrapper.setState({
        showCreateComment: true
      })
      const newComment = {body: 'my body', author: 'my author'}
      wrapper.find(CreateEditComment).simulate('create', newComment);
      expect(mockCreateCommentFn.mock.calls.length).toEqual(1);
    });

    it('when the onCreate event is called, it showCreateComment = false', async () => {
      wrapper.setState({
        showCreateComment: true
      })
      const newComment = {body: 'my body', author: 'my author'}
      await wrapper.find(CreateEditComment).simulate('create', newComment);
      expect(wrapper.state().showCreateComment).toEqual(false);
    });

    it('hides the CreateEditComment component when the event onCancel is called', () => {
      wrapper.setState({
        showCreateComment: true
      })
      wrapper.find(CreateEditComment).simulate('cancel');
      expect(wrapper.state().showCreateComment).toEqual(false);
      expect(wrapper.find(CreateEditComment)).toHaveLength(0);
    });
  })
});

