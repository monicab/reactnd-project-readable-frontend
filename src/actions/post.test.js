import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import * as actions from './post';
import {
  CREATE_POST_SUCCESS, CREATE_POST_PENDING, CREATE_POST_FAILURE,
  DELETE_POST_SUCCESS, DELETE_POST_PENDING, DELETE_POST_FAILURE,
  FETCH_ALL_POSTS_SUCCESS, FETCH_ALL_POSTS_PENDING, FETCH_ALL_POSTS_FAILURE,
  FETCH_POST_SUCCESS, FETCH_POST_PENDING, FETCH_POST_FAILURE,
  VOTE_POST_SUCCESS, VOTE_POST_FAILURE
} from './constants/post'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('fetch all posts async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  describe('all posts', () => {
    it('creates FETCH_ALL_POSTS_SUCCESS when fetching all posts has been done', () => {
      const returnedPosts = [ { id: 1 } ];

      fetchMock
        .getOnce('http://localhost:3001/posts', returnedPosts);

      const expectedActions = [
        { type: FETCH_ALL_POSTS_PENDING },
        {
          type: FETCH_ALL_POSTS_SUCCESS,
          posts: returnedPosts
        }
      ];

      const store = mockStore();

      return store.dispatch(actions.fetchPosts()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    });

    it('creates FETCH_ALL_POSTS_FAILURE when fetching all posts generates an error', () => {
      const expectedActions = [
        {type: FETCH_ALL_POSTS_PENDING},
        {
          type: FETCH_ALL_POSTS_FAILURE,
          error: new TypeError('Network request failed')
        },
      ];

      const store = mockStore()

      return store.dispatch(actions.fetchPosts())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        });
    });
  });

  describe('all posts for category', () => {
    it('creates FETCH_ALL_POSTS_SUCCESS when fetching all posts for a category has been done', () => {
      const returnedPosts = [ { id: 1 } ];
      const category = 'my-category';

      fetchMock
        .getOnce('http://localhost:3001/my-category/posts', returnedPosts);

      const expectedActions = [
        { type: FETCH_ALL_POSTS_PENDING },
        {
          type: FETCH_ALL_POSTS_SUCCESS,
          posts: returnedPosts,
          category: category,
        }
      ];

      const store = mockStore();

      return store.dispatch(actions.fetchPosts(category)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    });

    it('creates FETCH_ALL_POSTS_FAILURE when fetching all posts generates an error', () => {
      const category = 'my-category';

      const expectedActions = [
        {type: FETCH_ALL_POSTS_PENDING},
        {
          type: FETCH_ALL_POSTS_FAILURE,
          error: new TypeError('Network request failed')
        },
      ];

      const store = mockStore()

      return store.dispatch(actions.fetchPosts(category))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        });
    });
  });
});

describe('fetch a particular post async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates FETCH_POST_SUCCESS when fetching a post has been done', () => {
    let post_id = 1;

    fetchMock
      .getOnce(`http://localhost:3001/posts/${post_id}`, { id: 1 })

    const expectedActions = [
      {type: FETCH_POST_PENDING},
      {
        type: FETCH_POST_SUCCESS,
        post: {id: 1}
      }
    ]

    const store = mockStore();
    return store.dispatch(actions.fetchPost(post_id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it('creates FETCH_POST_FAILURE when fetching a post generates an error', () => {
    let post_id = 1;

    const expectedActions = [
      { type: FETCH_POST_PENDING },
      { type: FETCH_POST_FAILURE,
        error: new TypeError("Network request failed") },
    ]

    const store = mockStore();
    return store.dispatch(actions.fetchPost(post_id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
  });
});

describe('up vote post async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates VOTE_POST_SUCCESS when voting on a post has been done', () => {
    let post_id = 1

    fetchMock
      .postOnce(`http://localhost:3001/posts/${post_id}`, {id: 1})

    const expectedActions = [
      {
        type: VOTE_POST_SUCCESS,
        post: {id: 1},
      }
    ]

    const store = mockStore();
    return store.dispatch(actions.upVotePost({id: 1})).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('creates VOTE_POST_FAILURE when voting for a post generates an error', () => {
    const expectedActions = [
      {
        type: VOTE_POST_FAILURE,
        error: new TypeError('Network request failed')
      },
    ]

    const store = mockStore()
    return store.dispatch(actions.upVotePost({ id: 1 }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
});

describe('down vote post async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates VOTE_POST_SUCCESS when voting on a post has been done', () => {
    let post_id = 1;

    fetchMock
      .postOnce(`http://localhost:3001/posts/${post_id}`, { id: 1 })

    const expectedActions = [
      {
        type: VOTE_POST_SUCCESS,
        post: {id: 1},
      }
    ]

    const store = mockStore();
    return store.dispatch(actions.downVotePost({ id: 1 })).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it('creates VOTE_POST_FAILURE when voting for a post generates an error', () => {
    const expectedActions = [
      { type: VOTE_POST_FAILURE,
        error: new TypeError("Network request failed") },
    ]

    const store = mockStore()
    return store.dispatch(actions.downVotePost({ id: 1 }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
  });
});

describe('create post async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  });

  it('creates a CREATE_POST_SUCCESS event type when a post is successfully created', () => {
    const postToCreate = {
      id: 'fake-uuid',
      timestamp: Date.now(),
      title: 'new post',
      body: 'my body',
      author: 'author',
      category: 'post category',
    }

    fetchMock
      .postOnce(`http://localhost:3001/posts`, postToCreate)

    const expectedActions = [
      { type: CREATE_POST_PENDING },
      { type: CREATE_POST_SUCCESS, post: postToCreate }
    ]

    const store = mockStore();
    return store.dispatch(actions.createPost(postToCreate))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });

  it('creates VOTE_POST_FAILURE when voting for a post generates an error', () => {
    const postToCreate = {
      id: 'fake-uuid',
      timestamp: Date.now(),
      title: 'new post',
      body: 'my body',
      author: 'author',
      category: 'post category',
    }

    const expectedActions = [
      { type: CREATE_POST_PENDING },
      { type: CREATE_POST_FAILURE,
        error: new TypeError("Network request failed") },
    ]

    const store = mockStore()
    return store.dispatch(actions.createPost(postToCreate))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
  });
});

describe('delete post async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  });

  it('creates a DELETE_POST_SUCCESS event type when a post is successfully created', () => {
    const postID = 1;

    fetchMock
      .deleteOnce(`http://localhost:3001/posts/${postID}`, {})

    const expectedActions = [
      {type: DELETE_POST_PENDING },
      {type: DELETE_POST_SUCCESS, postID: postID }
    ]

    const store = mockStore();
    return store.dispatch(actions.deletePost(postID))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });
});
