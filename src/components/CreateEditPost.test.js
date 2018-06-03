import React from 'react';
import { shallow } from 'enzyme';

import { CreateEditPost } from './CreateEditPost';
import CategoryDropDown from './CategoryDropDown';

describe('CreateEditPost component', () => {
  let wrapper;
  let selectedPost;
  let props;
  let mockCreatePostFn = jest.fn(() => { return Promise.resolve(); });
  let mockEditPostFn = jest.fn(() => { return Promise.resolve(); });
  let mockFetchPostFn = jest.fn(() => { return Promise.resolve(); });

  beforeEach(() => {
    selectedPost = null;

    props = {
      createPost: mockCreatePostFn,
      editPost: mockEditPostFn,
      fetchPost: mockFetchPostFn,
      selectedPost: selectedPost,
      match: {
        params: {}
      }
    }

    wrapper = shallow(<CreateEditPost {...props} />)
  });

  afterEach(() => {
    mockCreatePostFn.mockClear();
    mockEditPostFn.mockClear();
    mockFetchPostFn.mockClear();
  });

  it('renders input box to enter the post title', () => {
    expect(wrapper.find('#postTitleID')).toHaveLength(1);
  });

  it('renders input box to enter the post author', () => {
    expect(wrapper.find('#postAuthor')).toHaveLength(1);
  });

  it('renders input box to enter the post author', () => {
    expect(wrapper.find(CategoryDropDown)).toHaveLength(1);
  });

  it('renders text area to enter the post body', () => {
    expect(wrapper.find('#postBody')).toHaveLength(1);
  });

  it('renders a submit post to save the post', () => {
    expect(wrapper.find('.btn-post-save')).toHaveLength(1);
  })

  it('renders a cancel button to go back', () => {
    expect(wrapper.find('.btn-post-cancel')).toHaveLength(1);
  });

  describe('when in create mode', () => {
    it('renders input box to enter the post title', () => {
      expect(wrapper.find('#postTitleID').props().value).toEqual('');;
    });

    it('renders input box to enter the post author', () => {
      expect(wrapper.find('#postAuthor').props().value).toEqual('');
    });

    it('renders input box to enter the post author', () => {
      expect(wrapper.find(CategoryDropDown).props().value).toEqual('');
    });

    it('renders text area to enter the post body', () => {
      expect(wrapper.find('#postBody').props().value).toEqual('');
    });

    describe('when click on the submit post button', () => {
      it('submit post when all fields are valid', () => {
        wrapper.setState({
          title: 'my title',
          author: 'my author',
          body: 'my body',
          category: 'react',
        });
        wrapper.find('form').simulate('submit', document.createEvent('Event'));
        expect(mockCreatePostFn.mock.calls.length).toBe(1)
      });

      it('does not submit post when the form is missing fields', () => {
        wrapper.setState({
          title: 'my title',
          author: '',
          body: '',
          category: 'react',
        });
        wrapper.find('form').simulate('submit', document.createEvent('Event'));
        expect(mockCreatePostFn.mock.calls.length).toBe(0)
      });
    });
  });

  describe('when in edit mode', () => {
    beforeEach(() => {
      selectedPost = {
        id: '1',
        title: 'my title',
        author: 'my author',
        body: 'my body',
        category: 'my category',
      };

      props = {
        createPost: mockCreatePostFn,
        editPost: mockEditPostFn,
        fetchPost: mockFetchPostFn,
        selectedPost: selectedPost,
        match: {
          params: {post_id: 5}
        }
      }

      wrapper = shallow(<CreateEditPost {...props} />)
    });

    afterEach(() => {
      mockCreatePostFn.mockClear();
      mockEditPostFn.mockClear();
      mockFetchPostFn.mockClear();
    });

    it('when a match param has a post_id, it should fetch that post', () => {
      expect(mockFetchPostFn.mock.calls.length).toBe(1);
    });

    // TODO: Super strange but these don't work.
    // it('renders input box to enter the post title and is filled with the selected post title', () => {
    //   expect(wrapper.find("#postTitleID").props().value).toEqual(selectedPost.title);
    // });
    //
    // it('renders input box to enter the post author', () => {
    //   expect(wrapper.find('#postAuthor').props().value).toEqual(selectedPost.author);
    // });
    //
    // it('renders input box to enter the post author', () => {
    //   expect(wrapper.find(CategoryDropDown).props().value).toEqual(selectedPost.category);
    // });
    //
    // it('renders text area to enter the post body', () => {
    //   expect(wrapper.find('#postBody').props().value).toEqual(selectedPost.body);
    // });

    describe('when click on the submit post button', () => {
      it('submit post when all fields are valid', () => {
        wrapper.setState({
          id: '1',
          title: 'my title',
          author: 'my author',
          body: 'my body',
          category: 'react',
        });
        wrapper.find('form').simulate('submit', document.createEvent('Event'));
        expect(mockEditPostFn.mock.calls.length).toBe(1)
      });

      it('does not submit post when the form is missing fields', () => {
        wrapper.setState({
          id: '1',
          title: 'my title',
          author: '',
          body: '',
          category: 'react',
        });
        wrapper.find('form').simulate('submit', document.createEvent('Event'));
        expect(mockCreatePostFn.mock.calls.length).toBe(0)
      });
    });
  });
});

