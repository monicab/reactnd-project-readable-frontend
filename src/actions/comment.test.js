import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import * as actions from './comment';
import {
  CREATE_COMMENT_SUCCESS, CREATE_COMMENT_PENDING, CREATE_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS, DELETE_COMMENT_PENDING, DELETE_COMMENT_FAILURE,
  EDIT_COMMENT_SUCCESS, EDIT_COMMENT_PENDING, EDIT_COMMENT_FAILURE,
  FETCH_ALL_COMMENTS_SUCCESS, FETCH_ALL_COMMENTS_PENDING, FETCH_ALL_COMMENTS_FAILURE,
  FETCH_COMMENT_SUCCESS, FETCH_COMMENT_PENDING, FETCH_COMMENT_FAILURE,
  VOTE_COMMENT_SUCCESS, VOTE_COMMENT_FAILURE
} from './constants/comment'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('fetch all comments async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  describe('all comments', () => {
    it('creates FETCH_ALL_COMMENTS_SUCCESS when fetching all comments for a post has been done', () => {
      const post = {
        id: '8xf0y6ziyjabvozdd253nd',
      }

      const returnedComments = [
        {
          "id": "894tuq4ut84ut8v4t8wun89g",
          "parentId": "8xf0y6ziyjabvozdd253nd",
          "timestamp": 1468166872634,
          "body": "Hi there! I am a COMMENT.",
          "author": "thingtwo",
          "voteScore": 6,
          "deleted": false,
          "parentDeleted": false
        },
        {
          "id": "8tu4bsun805n8un48ve89",
          "parentId": "8xf0y6ziyjabvozdd253nd",
          "timestamp": 1469479767190,
          "body": "Comments. Are. Cool.",
          "author": "thingone",
          "voteScore": -5,
          "deleted": false,
          "parentDeleted": false
        }
      ];

      fetchMock
        .getOnce('http://localhost:3001/posts/8xf0y6ziyjabvozdd253nd/comments', returnedComments);

      const expectedActions = [
        { type: FETCH_ALL_COMMENTS_PENDING },
        {
          type: FETCH_ALL_COMMENTS_SUCCESS,
          comments: returnedComments,
          post: post,
        }
      ];

      const store = mockStore();

      return store.dispatch(actions.fetchCommentsForPost(post)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    });

    it('creates FETCH_ALL_COMMENTS_FAILURE when fetching all comments for a post generates an error', () => {
      const post = {
        id: 'bad-bad-post-id',
      };

      const expectedActions = [
        {type: FETCH_ALL_COMMENTS_PENDING},
        {
          type: FETCH_ALL_COMMENTS_FAILURE,
          error: new TypeError('Network request failed'),
          post: post,
        },
      ];

      const store = mockStore()

      return store.dispatch(actions.fetchCommentsForPost(post))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        });
    });
  });

  // describe('all posts for category', () => {
  //   it('creates FETCH_ALL_POSTS_SUCCESS when fetching all posts for a category has been done', () => {
  //     const returnedPosts = [ { id: 1 } ];
  //     const category = 'my-category';
  //
  //     fetchMock
  //       .getOnce('http://localhost:3001/my-category/posts', returnedPosts);
  //
  //     const expectedActions = [
  //       { type: FETCH_ALL_POSTS_PENDING },
  //       {
  //         type: FETCH_ALL_POSTS_SUCCESS,
  //         posts: returnedPosts
  //       }
  //     ];
  //
  //     const store = mockStore();
  //
  //     return store.dispatch(actions.fetchPosts(category)).then(() => {
  //       expect(store.getActions()).toEqual(expectedActions)
  //     })
  //   });
  //
  //   it('creates FETCH_ALL_POSTS_FAILURE when fetching all posts generates an error', () => {
  //     const category = 'my-category';
  //
  //     const expectedActions = [
  //       {type: FETCH_ALL_POSTS_PENDING},
  //       {
  //         type: FETCH_ALL_POSTS_FAILURE,
  //         error: new TypeError('Network request failed')
  //       },
  //     ];
  //
  //     const store = mockStore()
  //
  //     return store.dispatch(actions.fetchPosts(category))
  //       .then(() => {
  //         expect(store.getActions()).toEqual(expectedActions)
  //       });
  //   });
  // });
});

describe('fetch a particular comment async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates FETCH_COMMENT_SUCCESS when fetching a comment has been done', () => {
    let commentID = "8tu4bsun805n8un48ve89";
    const comment = {
      "id": "8tu4bsun805n8un48ve89",
      "parentId": "8xf0y6ziyjabvozdd253nd",
      "timestamp": 1469479767190,
      "body": "Comments. Are. Cool.",
      "author": "thingone",
      "voteScore": -5,
      "deleted": false,
      "parentDeleted": false
    }

    fetchMock
      .getOnce(`http://localhost:3001/comments/${commentID}`, comment)

    const expectedActions = [
      {type: FETCH_COMMENT_PENDING},
      {
        type: FETCH_COMMENT_SUCCESS,
        comment: comment
      }
    ]

    const store = mockStore();
    return store.dispatch(actions.fetchComment(commentID)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it('creates FETCH_COMMENT_FAILURE when fetching a comment generates an error', () => {
    let commentID = "bad-bad-comment";

    const expectedActions = [
      { type: FETCH_COMMENT_PENDING },
      { type: FETCH_COMMENT_FAILURE,
        error: new TypeError("Network request failed") },
    ]

    const store = mockStore();
    return store.dispatch(actions.fetchComment(commentID))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
  });
});

describe('create a new comment async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates CREATE_COMMENT_SUCCESS when creating a comment has been done', () => {
    const comment = {
      "id": "im-a-comment-id",
      "body": "I'm a comment body",
      "author": "thingone",
      "parentId": "parent-post-id",
    }

    const commentCreated = {
      "id": "im-a-comment-id",
      "body": "I'm a comment body",
      "author": "thingone",
      "parentId": "parent-post-id",
      "voteScore": 1,
      "deleted": false,
      "parentDeleted": false,
    }

    fetchMock
      .postOnce(`http://localhost:3001/comments`, commentCreated)

    const expectedActions = [
      {type: CREATE_COMMENT_PENDING},
      {
        type: CREATE_COMMENT_SUCCESS,
        comment: commentCreated
      }
    ]

    const store = mockStore();
    return store.dispatch(actions.createComment(comment)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it('creates CREATE_COMMENT_FAILURE when creating a comment generates an error', () => {
    const commentCreated = {}
    const expectedActions = [
      { type: CREATE_COMMENT_PENDING },
      { type: CREATE_COMMENT_FAILURE,
        error: new TypeError("Network request failed") },
    ]

    const store = mockStore();
    return store.dispatch(actions.createComment(commentCreated))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
  });
});

describe('delete a comment async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates DELETE_COMMENT_SUCCESS when creating a comment has been done', () => {
    const commentID = "super-fake-uuid";
    const commentDeleted = {
      "id": "super-fake-uuid",
      "body": "comment's body",
      "author": "monica",
      "parentId": "8xf0y6ziyjabvozdd253nd",
      "voteScore": 1,
      "deleted": true,
      "parentDeleted": false
    }

    fetchMock
      .deleteOnce(`http://localhost:3001/comments/${commentID}`, commentDeleted)

    const expectedActions = [
      {type: DELETE_COMMENT_PENDING},
      {
        type: DELETE_COMMENT_SUCCESS,
        comment: commentDeleted
      }
    ]

    const store = mockStore();
    return store.dispatch(actions.deleteComment(commentID)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it('creates DELETE_COMMENT_FAILURE when creating a comment generates an error', () => {
    const commentID = "bad-bac-comment"
    const expectedActions = [
      { type: DELETE_COMMENT_PENDING },
      { type: DELETE_COMMENT_FAILURE,
        error: new TypeError("Network request failed") },
    ]

    const store = mockStore();
    return store.dispatch(actions.deleteComment(commentID))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
  });
});

describe('edit a particular comment async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates EDIT_COMMENT_SUCCESS when editing a comment has been done', () => {
    let commentData = {
      "id": "8tu4bsun805n8un48ve89",
      "body": "Comments. Are. Cool. And can be edited",
      "author": "thingone",
      "parentId": "8xf0y6ziyjabvozdd253nd"
    };

    const commentEdited = {
      "id": "8tu4bsun805n8un48ve89",
      "parentId": "8xf0y6ziyjabvozdd253nd",
      "timestamp": 1469479767190,
      "body": "Comments. Are. Cool. And can be edited",
      "author": "thingone",
      "voteScore": -5,
      "deleted": false,
      "parentDeleted": false
    }

    fetchMock
      .putOnce(`http://localhost:3001/comments/${commentData.id}`, commentEdited)

    const expectedActions = [
      {type: EDIT_COMMENT_PENDING},
      {
        type: EDIT_COMMENT_SUCCESS,
        comment: commentEdited
      }
    ]

    const store = mockStore();
    return store.dispatch(actions.editComment(commentData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it('creates EDIT_COMMENT_FAILURE when editing a comment generates an error', () => {
    let commentID = "bad-bad-comment";

    const expectedActions = [
      { type: EDIT_COMMENT_PENDING },
      { type: EDIT_COMMENT_FAILURE,
        error: new TypeError("Network request failed") },
    ]

    const store = mockStore();
    return store.dispatch(actions.editComment(commentID))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
  });
});

describe('up vote comment async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates VOTE_COMMMENT_SUCCESS when voting on a comment has been done', () => {
    const comment = { id: "super-fake-uuid" }

    const commentResponse = {
      "id": "super-fake-uuid",
      "body": "comment's body",
      "author": "monica",
      "parentId": "8xf0y6ziyjabvozdd253nd",
      "voteScore": 2,
      "deleted": false,
      "parentDeleted": false
    }
    fetchMock
      .postOnce(`http://localhost:3001/comments/${comment.id}`, commentResponse)

    const expectedActions = [
      {
        type: VOTE_COMMENT_SUCCESS,
        comment: commentResponse,
      }
    ]

    const store = mockStore();
    return store.dispatch(actions.upVoteComment(comment)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('creates VOTE_COMMENT_FAILURE when voting for a comment generates an error', () => {
    const comment = { id: "super-fake-uuid" }

    const expectedActions = [
      {
        type: VOTE_COMMENT_FAILURE,
        error: new TypeError('Network request failed')
      },
    ]

    const store = mockStore()
    return store.dispatch(actions.upVoteComment(comment))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
});

describe('down vote comment async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('creates VOTE_COMMENT_SUCCESS when voting on a post has been done', () => {
    const comment = { id: "super-fake-uuid" }

    const commentResponse = {
      "id": "super-fake-uuid",
      "body": "comment's body",
      "author": "monica",
      "parentId": "8xf0y6ziyjabvozdd253nd",
      "voteScore": 0,
      "deleted": false,
      "parentDeleted": false
    }


    fetchMock
      .postOnce(`http://localhost:3001/comments/${comment.id}`, commentResponse)

    const expectedActions = [{
        type: VOTE_COMMENT_SUCCESS,
        comment: commentResponse,
      }
    ]

    const store = mockStore();
    return store.dispatch(actions.downVoteComment(comment)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it('creates VOTE_COMMENT_FAILURE when voting for a comment generates an error', () => {
    const comment = { id: "super-fake-uuid" }

    const expectedActions = [
      { type: VOTE_COMMENT_FAILURE,
        error: new TypeError("Network request failed") },
    ]

    const store = mockStore()
    return store.dispatch(actions.downVoteComment(comment))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
  });
});
