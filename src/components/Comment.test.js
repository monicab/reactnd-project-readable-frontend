import React from 'react';
import { shallow } from 'enzyme';

import { Comment } from './Comment';
import CreateEditComment from './CreateEditComment'



describe('Comment component', () => {
  let wrapper;
  let comment;
  let props;
  let post;
  let mockDeleteCommentFn = jest.fn(() => { return Promise.resolve(); });
  let mockEditCommentFn = jest.fn(() => { return Promise.resolve(); });
  let mockFetchCommentFn = jest.fn(() => { return Promise.resolve(); });
  let mockFetchCommentsForPostFn = jest.fn(() => { return Promise.resolve(); });
  let mockFetchPostFn = jest.fn(() => { return Promise.resolve(); });
  let mockUpvoteFn = jest.fn(() => { return Promise.resolve(); });
  let mockDownvoteFn = jest.fn(() => { return Promise.resolve(); });

  beforeEach(() => {
    post = { id: 5 },
    comment = {
      author: "comment author",
      body: "comment body",
      commentCount: 3,
      voteScore: 10,
      id: 1,
      title: "post title",
      category: "category"
    }

    props = {
      comment: comment,
      deleteComment: mockDeleteCommentFn,
      downVoteComment: mockDownvoteFn,
      editComment: mockEditCommentFn,
      fetchComment: mockFetchCommentFn,
      fetchCommentsForPost: mockFetchCommentsForPostFn,
      fetchPost: mockFetchPostFn,
      selectedPost: post,
      upVoteComment: mockUpvoteFn,
      upVoteComment: mockUpvoteFn,
    }

    wrapper = shallow(<Comment {...props} />)
  });

  afterEach(() => {
    mockDeleteCommentFn.mockClear();
    mockDownvoteFn.mockClear();
    mockEditCommentFn.mockClear();
    mockFetchCommentsForPostFn.mockClear();
    mockFetchCommentFn.mockClear();
    mockFetchPostFn.mockClear();
    mockUpvoteFn.mockClear();
  })

  it('renders a title', () => {
    expect(wrapper.find('.blockquote > p')).toHaveLength(1);
    expect(wrapper.find('.blockquote > p').text()).toEqual(`${comment.body}`);
  });

  it('renders the author\'s info', () => {
    expect(wrapper.find('.blockquote-footer')).toHaveLength(1);
    expect(wrapper.find('.blockquote-footer').text()).toEqual("By comment author");
  });

  it('renders a badge with the total number of votes', () => {
    expect(wrapper.find('.total-votes')).toHaveLength(1);
    expect(wrapper.find('.total-votes').text()).toEqual("10 votes");
  });

  it('create/edit comment comment is not visibile', () => {
    expect(wrapper.find(CreateEditComment)).toHaveLength(0);
  })

  describe('edit comment button', () => {
    it('render a button to edit the comment', () => {
      expect(wrapper.find('.btn-edit-comment')).toHaveLength(1);
      expect(wrapper.find('.btn-edit-comment').text()).toEqual('Edit Comment');
    });

    describe('when click on comment button', () => {
      it('should show the create/edit comment component', () => {
        wrapper.find('.btn-edit-comment').simulate('click', {target: {}});
        expect(wrapper.find(CreateEditComment)).toHaveLength(1);
      });
    });
  });

  describe('delete comment button', () => {
    const buttonSelector = '.btn-delete-comment';
    it('render a button to delete the comment', () => {
      expect(wrapper.find(buttonSelector)).toHaveLength(1);
    });

    describe('when click on the delete button', () => {
      it('should call deleteComment to submit the vote', () => {
        wrapper.find(buttonSelector).simulate('click');
        expect(mockDeleteCommentFn.mock.calls.length).toBe(1)
      });

      it('should call fetch post to refresh total comments', async () => {
        await wrapper.find(buttonSelector).simulate('click');
        expect(mockFetchPostFn.mock.calls.length).toBe(1)
      });
    });
  });

  describe('up-vote button', () => {
    const buttonSelector = '.btn-up-vote';

    it('render a button for up voting the comment', () => {
      expect(wrapper.find(buttonSelector)).toHaveLength(1);
    });

    describe('when click on upvote', () => {
      it('should call upVoteComment to submit the vote', () => {
        wrapper.find(buttonSelector).simulate('click');
        expect(mockUpvoteFn.mock.calls.length).toBe(1)
      });

      it('should call fetch post to refresh post', async () => {
        await wrapper.find(buttonSelector).simulate('click');
       expect(mockFetchCommentFn.mock.calls.length).toBe(1)
      });
    });
  });

  describe('down-vote button', () => {
    const buttonSelector = '.btn-down-vote';

    it('render a button for down voting the comment', () => {
      expect(wrapper.find(buttonSelector)).toHaveLength(1);
    });

    describe('when click on down vote button', () => {
      it('should call downVoteComment to submit the vote', () => {
        wrapper.find(buttonSelector).simulate('click');
        expect(mockDownvoteFn.mock.calls.length).toBe(1)
      });

      it('should call fetch post to refresh post', async () => {
        await wrapper.find(buttonSelector).simulate('click');
        expect(mockFetchCommentFn.mock.calls.length).toBe(1)
      });
    });
  });
});

