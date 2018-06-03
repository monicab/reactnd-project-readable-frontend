import React from 'react';
import { shallow } from 'enzyme';

import { Post } from './Post';


describe('Post component', () => {
  let wrapper;
  let post;
  let props;
  let mockDeletePostFn = jest.fn();
  let mockfetchPostsFn = jest.fn();
  let mockFetchFn = jest.fn();
  let mockUpvoteFn = jest.fn(() => { return Promise.resolve(); });
  let mockDownvoteFn = jest.fn(() => { return Promise.resolve(); });

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
      deletePost: mockDeletePostFn,
      fetchPosts: mockfetchPostsFn,
      fetchPost: mockFetchFn,
      upVotePost: mockUpvoteFn,
      downVotePost: mockDownvoteFn
    }

    wrapper = shallow(<Post {...props} />)
  });

  afterEach(() => {
    mockFetchFn.mockClear();
    mockUpvoteFn.mockClear();
    mockDownvoteFn.mockClear();
  })

  it('renders a title', () => {
    expect(wrapper.find('.post-title')).toHaveLength(1);
    expect(wrapper.find('.post-title').text()).toEqual(`${post.title}`);
  });

  it('renders a post vote score', () => {
    expect(wrapper.find('.post-vote-score')).toHaveLength(1);
    expect(wrapper.find('.post-vote-score').text()).toEqual(`${post.voteScore} votes`);
  });

  it('renders a post comments count', () => {
    expect(wrapper.find('.post-comment-count')).toHaveLength(1);
    expect(wrapper.find('.post-comment-count').text()).toEqual(`${post.commentCount} comments`);
  });

  describe('up-vote button', () => {
    it('render a button for up voting the post', () => {
      expect(wrapper.find('.button-post-upvote')).toHaveLength(1);
    });

    describe('when click on upvote', () => {
      it('should call upVotePost to submit the vote', () => {
        wrapper.find('.button-post-upvote').simulate(
          'click',
        );

        expect(mockUpvoteFn.mock.calls.length).toBe(1)
      });

      it('should call fetch post to refresh post', async () => {
        await wrapper.find('.button-post-upvote').simulate(
          'click',
        );
       expect(mockFetchFn.mock.calls.length).toBe(1)
      });
    });
  });

  describe('down-vote button', () => {
    it('render a button for down voting the post', () => {
      expect(wrapper.find('.button-post-downvote')).toHaveLength(1);
    });

    describe('when click on downvote, post', () => {
      it('should call downVotePost to submit the vote', () => {
        wrapper.find('.button-post-downvote').simulate(
          'click',
        );

        expect(mockDownvoteFn.mock.calls.length).toBe(1)
      });

      it('should call fetch post to refresh post', async () => {
        await wrapper.find('.button-post-downvote').simulate(
          'click',
        );

        expect(mockFetchFn.mock.calls.length).toBe(1)
      });
    });
  });
});

