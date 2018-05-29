import reducer from './comment'
import {
  CREATE_COMMENT_PENDING, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_FAILURE,
  DELETE_COMMENT_PENDING, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE,
  FETCH_ALL_COMMENTS_FAILURE, FETCH_ALL_COMMENTS_PENDING, FETCH_ALL_COMMENTS_SUCCESS, FETCH_COMMENT_FAILURE, FETCH_COMMENT_PENDING,
  FETCH_COMMENT_SUCCESS,
  VOTE_COMMENT_FAILURE,
  VOTE_COMMENT_SUCCESS
} from '../actions/constants/comment'

let initialState = {}

describe('comment reducer', () => {
  beforeEach(() => {
    initialState = {
      allCommentsForPost: [],
      commentCreationErrors: [],
      isCreatingComment: false,
      isDeletingComment: false,
      isFetchingComment: false,
      isFetchingAllCommentsForPost: false,
      selectedPost: null,
    }
  })

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  describe('FETCH_ALL_COMMENTS related actions', () => {
    it('should handle FETCH_ALL_COMMENTS_SUCCESS', () => {
      expect(
        reducer({}, {
          type: FETCH_ALL_COMMENTS_SUCCESS,
          comments: [{id: 1}, {id: 2}],
        })
      ).toEqual({
          allCommentsForPost: [{id: 1}, {id: 2}],
          isFetchingAllCommentsForPost: false,
        })
    });

    it('should handle FETCH_ALL_COMMENTS_FAILURE', () => {
      expect(reducer({}, {
        type: FETCH_ALL_COMMENTS_FAILURE,
        error: 'this might be an error',
      })).toEqual({
        isFetchingAllCommentsForPost: false,
      })
    });

    it('should handle FETCH_ALL_COMMENTS_PENDING', () => {
      expect(reducer({}, {
        type: FETCH_ALL_COMMENTS_PENDING,
      })).toEqual({
        isFetchingAllCommentsForPost: true,
      })
    });
  });

  describe('FETCH_COMMENT related actions', () => {
    it('should handle FETCH_COMMENT_SUCCESS', () => {
      const allCommentsForPost = [{id: 1, body: 'initial body'}]
      const updatedComment = {id: 1, body: "I'm a new comment"}
      const selectedPost = { id: 3, title: "I'm a post" }

      expect(reducer({allCommentsForPost: allCommentsForPost, isFetchingComment: true }, {
        type: FETCH_COMMENT_SUCCESS,
        comment: updatedComment,
        post: selectedPost,
      })).toEqual({
        allCommentsForPost: [updatedComment],
        isFetchingComment: false,
        selectedPost: selectedPost,
      })
    });

    it('should handle FETCH_COMMENT_FAILURE', () => {
      const allCommentsForPost = [{id: 1, body: 'initial body'}]

      expect(reducer({allCommentsForPost: allCommentsForPost, isFetchingComment: true }, {
        type: FETCH_COMMENT_FAILURE,
      })).toEqual({
        isFetchingComment: false,
        allCommentsForPost: allCommentsForPost,
      })
    });

    it('should handle FETCH_COMMENT_PENDING', () => {
      expect(reducer({ isFetchingComment: false }, {
        type: FETCH_COMMENT_PENDING,
      })).toEqual({
        isFetchingComment: true,
      })
    });
  })

  describe('CREATE_COMMENT related actions', () => {
    it('should handle CREATE_COMMENT_SUCCESS', () => {
      const commentCreated = {id: 2, body: "I'm a new comment"}

      expect(reducer({isCreatingComment: true, allCommentsForPost:[] }, {
        type: CREATE_COMMENT_SUCCESS,
        comment: commentCreated,
      })).toEqual({
        isCreatingComment: false,
        commentCreationErrors: [],
        allCommentsForPost: [commentCreated]
      })
    });

    it('should handle CREATE_COMMENT_FAILURE', () => {

      expect(reducer({isCreatingComment: true, commentCreationErrors: [] }, {
        type: CREATE_COMMENT_FAILURE,
        error: "Problem creating comment",
      })).toEqual({
        isCreatingComment: false,
        commentCreationErrors: ["Problem creating comment"]
      })
    });

    it('should handle CREATE_COMMENT_PENDING', () => {
      expect(reducer({ isCreatingComment: false, commentCreationErrors: ['errors'] }, {
        type: CREATE_COMMENT_PENDING,
      })).toEqual({
        isCreatingComment: true,
        commentCreationErrors: [],
      })
    });
  })

  describe('VOTE_COMMENT related actions', () => {
    it('should handle VOTE_COMMENT_SUCCESS', () => {
      const comment = {
        "id": "super-fake-uuid",
        "body": "comment's body",
        "author": "monica",
        "parentId": "8xf0y6ziyjabvozdd253nd",
        "voteScore": 0,
        "deleted": false,
        "parentDeleted": false
      }
      expect(
        reducer({}, {
          type: VOTE_COMMENT_SUCCESS,
          comment: comment,
        })
      ).toEqual({})
    });

    it('should handle FETCH_ALL_COMMENTS_FAILURE', () => {
      expect(reducer({}, {
        type: VOTE_COMMENT_FAILURE,
        error: 'this might be an error',
      })).toEqual({})
    });

  });


  // describe('CREATE_POST related actions', () => {
  //   it('should handle CREATE_POST_PENDING', () => {
  //     const expectedState = {
  //       ...initialState,
  //       isCreatingPost: true,
  //       postCreationErrors: [],
  //     }
  //
  //     expect(reducer(initialState, {
  //       type: CREATE_POST_PENDING
  //     })).toEqual(expectedState)
  //   });
  //
  //   it('should handle CREATE_POST_SUCCESS', () => {
  //     const expectedState = {
  //       ...initialState,
  //       isCreatingPost: false,
  //       postCreationErrors: [],
  //     }
  //
  //     expect(reducer(initialState, {
  //       type: CREATE_POST_SUCCESS
  //     })).toEqual(expectedState)
  //   });
  // });
  //
  // describe('delete post related actions', () => {
  //   it('should handle DELETE_POST_PENDING', () => {
  //     const expectedState = {
  //       ...initialState,
  //       isDeletingPost: true,
  //     }
  //
  //     expect(reducer(initialState, {
  //       type: DELETE_POST_PENDING
  //     })).toEqual(expectedState)
  //   });
  //
  //   it('should handle DELETE_POST_SUCCESS', () => {
  //     initialState = {
  //       ...initialState,
  //       isDeletingPost: true,
  //     }
  //
  //     const expectedState = {
  //       ...initialState,
  //       isDeletingPost: false,
  //     }
  //
  //     expect(reducer(initialState, {
  //       type: DELETE_POST_SUCCESS
  //     })).toEqual(expectedState)
  //   });
  //
  //   it('should handle DELETE_POST_FAILURE', () => {
  //     initialState = {
  //       ...initialState,
  //       isDeletingPost: true,
  //     }
  //
  //     const expectedState = {
  //       ...initialState,
  //       isDeletingPost: false,
  //     }
  //
  //     expect(reducer(initialState, {
  //       type: DELETE_POST_FAILURE
  //     })).toEqual(expectedState)
  //   });
  // });
});