import React from 'react';
import { shallow } from 'enzyme';

import CreateEditComment from './CreateEditComment'

describe('CreateEditComment component', () => {
  let wrapper;
  let comment;
  let props;
  let mockOnCancelFn = jest.fn();
  let mockOnCreateFn = jest.fn();

  beforeEach(() => {
    comment = null;

    props = {
      comment: comment,
      onCancel: mockOnCancelFn,
      onCreate: mockOnCreateFn,
    }

    wrapper = shallow(<CreateEditComment {...props} />)
  });

  afterEach(() => {
    mockOnCancelFn.mockClear();
    mockOnCreateFn.mockClear();
  });

  describe('when in create mode', () => {
    it('renders an empty text area for the body', () => {
      expect(wrapper.find('.comment-body')).toHaveLength(1);
      expect(wrapper.find('.comment-body').props().value).toEqual('');
    });

    it('renders an empty input box for the author', () => {
      expect(wrapper.find('.comment-author')).toHaveLength(1);
      expect(wrapper.find('.comment-author').props().value).toEqual('');
    });
  });

  describe('when in edit mode', () => {
    beforeEach(() => {
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
        onCancel: mockOnCancelFn,
        onCreate: mockOnCreateFn,
      }

      wrapper = shallow(<CreateEditComment {...props} />)
    });

    it('renders the existing comment body in the text area for the body', () => {
      expect(wrapper.find('.comment-body')).toHaveLength(1);
      expect(wrapper.find('.comment-body').props().value).toEqual('comment body');
    });

    it('renders the existing comment in the input box for the author', () => {
      expect(wrapper.find('.comment-author')).toHaveLength(1);
      expect(wrapper.find('.comment-author').props().value).toEqual('comment author');
    });
  });

  it('renders the add button', () => {
    expect(wrapper.find('.btn-comment-add')).toHaveLength(1);
  });

  describe('when click on add button', () => {
    it('calls onCreate fn when the mandatory fields are filled out', () => {
      wrapper.setState({body: 'my body', author: 'my author'})
      wrapper.find('.btn-comment-add').simulate('click');
      expect(mockOnCreateFn.mock.calls.length).toBe(1)
    });

    it('does not call onCreate fn when the mandatory fields are filled out', () => {
      wrapper.setState({body: '', author: ''})
      wrapper.find('.btn-comment-add').simulate('click');
      expect(mockOnCreateFn.mock.calls.length).toBe(0)
    });
  })

  it('renders the cancel button', () => {
    expect(wrapper.find('.btn-comment-cancel')).toHaveLength(1);
  });
});

