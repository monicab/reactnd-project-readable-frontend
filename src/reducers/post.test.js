import reducer from './post'
import {
  CREATE_POST_PENDING, CREATE_POST_SUCCESS, CREATE_POST_FAILURE,
  DELETE_POST_PENDING, DELETE_POST_SUCCESS, DELETE_POST_FAILURE,
  FETCH_ALL_POSTS_FAILURE, FETCH_ALL_POSTS_PENDING, FETCH_ALL_POSTS_SUCCESS, FETCH_POST_FAILURE, FETCH_POST_PENDING,
  FETCH_POST_SUCCESS,
  VOTE_POST_FAILURE,
  VOTE_POST_SUCCESS
} from '../actions/constants/post'

let initialState = {}

describe('post reducer', () => {
  beforeEach(() => {
    initialState = {
      allPosts: [],
      isDeletingPost: false,
      isFetchingAllPosts: false,
      isFetchingPost: false,
      isCreatingPost: false,
      postCreationErrors: []
    }
  })

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle FETCH_ALL_POSTS_SUCCESS', () => {
    expect(
      reducer({}, {
        type: FETCH_ALL_POSTS_SUCCESS,
        posts: [{id: 1}, {id: 2}],
      })
    ).toEqual({
        allPosts: [{id: 1}, {id: 2}],
        isFetchingAllPosts: false,
      })
  });

  it('should handle FETCH_ALL_POSTS_FAILURE', () => {
    expect(reducer({}, {
      type: FETCH_ALL_POSTS_FAILURE,
      error: 'this might be an error',
    })).toEqual({
      isFetchingAllPosts: false,
    })
  });

  it('should handle FETCH_ALL_POSTS_PENDING', () => {
    expect(reducer({}, {
      type: FETCH_ALL_POSTS_PENDING,
    })).toEqual({
      isFetchingAllPosts: true,
    })
  });

  it('should handle VOTE_POST_SUCCESS', () => {
    expect(reducer({}, {
      type: VOTE_POST_SUCCESS,
    })).toEqual({
    })
  });

  it('should handle VOTE_POST_FAILURE', () => {
    expect(reducer({}, {
      type: VOTE_POST_FAILURE,
    })).toEqual({
    })
  });

  it('should handle FETCH_POST_SUCCESS', () => {
    expect(reducer({ allPosts: [{id: 1, title: 'hello'}] }, {
      type: FETCH_POST_SUCCESS,
      post: {id: 1, title: 'hello changed'}
    })).toEqual({
      allPosts: [ {id: 1, title: 'hello changed'} ],
      isFetchingPost: false,
    })
  });

  it('should handle FETCH_POST_FAILURE', () => {
    expect(reducer({ allPosts: [{id: 1, title: 'hello'}] }, {
      type: FETCH_POST_FAILURE,
    })).toEqual({
      allPosts: [{id: 1, title: 'hello'}],
      isFetchingPost: false,
    })
  });

  it('should handle FETCH_POST_PENDING', () => {
    expect(reducer({ allPosts: [{id: 1, title: 'hello'}] }, {
      type: FETCH_POST_PENDING,
    })).toEqual({
      allPosts: [{id: 1, title: 'hello'}],
      isFetchingPost: true,
    })
  });

  describe('CREATE_POST related actions', () => {
    it('should handle CREATE_POST_PENDING', () => {
      const expectedState = {
        ...initialState,
        isCreatingPost: true,
        postCreationErrors: [],
      }

      expect(reducer(initialState, {
        type: CREATE_POST_PENDING
      })).toEqual(expectedState)
    });

    it('should handle CREATE_POST_SUCCESS', () => {
      const expectedState = {
        ...initialState,
        isCreatingPost: false,
        postCreationErrors: [],
      }

      expect(reducer(initialState, {
        type: CREATE_POST_SUCCESS
      })).toEqual(expectedState)
    });
  });

  describe('delete post related actions', () => {
    it('should handle DELETE_POST_PENDING', () => {
      const expectedState = {
        ...initialState,
        isDeletingPost: true,
      }

      expect(reducer(initialState, {
        type: DELETE_POST_PENDING
      })).toEqual(expectedState)
    });

    it('should handle DELETE_POST_SUCCESS', () => {
      initialState = {
        ...initialState,
        isDeletingPost: true,
      }

      const expectedState = {
        ...initialState,
        isDeletingPost: false,
      }

      expect(reducer(initialState, {
        type: DELETE_POST_SUCCESS
      })).toEqual(expectedState)
    });

    it('should handle DELETE_POST_FAILURE', () => {
      initialState = {
        ...initialState,
        isDeletingPost: true,
      }

      const expectedState = {
        ...initialState,
        isDeletingPost: false,
      }

      expect(reducer(initialState, {
        type: DELETE_POST_FAILURE
      })).toEqual(expectedState)
    });
  });
});