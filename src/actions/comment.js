import { FETCH_ALL_COMMENTS_FAILURE, FETCH_ALL_COMMENTS_PENDING, FETCH_ALL_COMMENTS_SUCCESS } from './constants/comment';
import { VOTE_COMMENT_SUCCESS, VOTE_COMMENT_FAILURE } from './constants/comment';
import { UP_VOTE, DOWN_VOTE } from './constants/vote';
import { FETCH_COMMENT_FAILURE, FETCH_COMMENT_PENDING, FETCH_COMMENT_SUCCESS } from './constants/comment';
import { CREATE_COMMENT_FAILURE, CREATE_COMMENT_PENDING, CREATE_COMMENT_SUCCESS } from './constants/comment';
import { EDIT_COMMENT_FAILURE, EDIT_COMMENT_PENDING, EDIT_COMMENT_SUCCESS } from './constants/comment';
import { DELETE_COMMENT_FAILURE, DELETE_COMMENT_PENDING, DELETE_COMMENT_SUCCESS } from './constants/comment';

const defaultHeaders = {
  'Authorization': 'whatever-you-want',
  'Content-Type': 'application/json',
}

const baseURL = "http://localhost:3001";

/* ------------------------------*/
/* fetch all comments for a post */
/* ------------------------------*/
export function fetchCommentsForPost (post) {
  return (dispatch) => {
    dispatch(fetchCommentsForPostPending());
    return fetchCommentsForPostSubmit(post.id)
      .then((comments) => {
        dispatch(fetchCommentsForPostSuccess(post, comments))
      }).catch((error) => {
        dispatch(fetchCommentsForPostFailure(post, error))
      });
  }
}

function fetchCommentsForPostPending() {
  return {
    type: FETCH_ALL_COMMENTS_PENDING
  }
}

function fetchCommentsForPostSubmit (postID) {
  return fetch(fetchCommentsForPostAPIUrl(postID), {
    headers: {
      ...defaultHeaders,
    },
  }).then((response) => {
    return response.json()
  })
}

function fetchCommentsForPostAPIUrl(postID) {
  return `${baseURL}/posts/${postID}/comments`
}

function fetchCommentsForPostSuccess(post, comments) {
  return {
    type: FETCH_ALL_COMMENTS_SUCCESS,
    comments: comments,
    post: post,
  }
}

function fetchCommentsForPostFailure(post, error) {
  return {
    type: FETCH_ALL_COMMENTS_FAILURE,
    post: post,
    error: error,
  }
}

/* -----------------------------*/
/* fetch a particular comment   */
/* -----------------------------*/
export function fetchComment (comment_id) {
  return (dispatch) => {
    dispatch(fetchCommentPending())
    return fetchCommentSubmit(comment_id)
      .then((post) => {
        dispatch(fetchCommentSuccess(post))
      }).catch((error) => {
        dispatch(fetchCommentFailure(error))
      })
  }
}

function fetchCommentSubmit(comment_id) {
  return fetch(`http://localhost:3001/comments/${comment_id}`, {
    headers: {
      ...defaultHeaders,
    },
  }).then((response) => {
    return response.json()
  })
}

function fetchCommentSuccess(comment) {
  return {
    type: FETCH_COMMENT_SUCCESS,
    comment: comment,
  }
};

function fetchCommentFailure(error) {
  return {
    type: FETCH_COMMENT_FAILURE,
    error: error,
  }
};

function fetchCommentPending() {
  return {
    type: FETCH_COMMENT_PENDING
  }
}

/* -----------------------------*/
/* create a new comment         */
/* -----------------------------*/
// timestamp: timestamp. Get this however you want.
// body: String
// author: String
// parentId: Should match a post id in the database.

export function createComment (newCommentData) {
  return (dispatch) => {
    dispatch(createCommentPending())
    return createCommentSubmit(newCommentData)
      .then((comment) => {
        dispatch(createCommentSuccess(comment))
      }).catch((error) => {
        dispatch(createCommentFailure(error))
      })
  }
}

function createCommentSubmit(newCommentData) {
  newCommentData["id"] = `c-${Date.now()}`;
  return fetch(`http://localhost:3001/comments`, {
    headers: {
      ...defaultHeaders,
    },
    method: 'post',
    body: JSON.stringify(newCommentData),
  }).then((response) => {
    return response.json()
  })
}

function createCommentSuccess(comment) {
  return {
    type: CREATE_COMMENT_SUCCESS,
    comment: comment,
  }
};

function createCommentFailure(error) {
  return {
    type: CREATE_COMMENT_FAILURE,
    error: error,
  }
};

function createCommentPending() {
  return {
    type: CREATE_COMMENT_PENDING
  }
}


/* -----------------------------*/
/* delete a particular comment   */
/* -----------------------------*/

export function deleteComment (commentID) {
  return (dispatch) => {
    dispatch(deleteCommentPending())
    return deleteCommentSubmit(commentID)
      .then((comment) => {
        dispatch(deleteCommentSuccess(comment))
      }).catch((error) => {
        dispatch(deleteCommentFailure(error))
      })
  }
}

function deleteCommentSubmit(commentID) {
  return fetch(`http://localhost:3001/comments/${commentID}`, {
    headers: {
      ...defaultHeaders,
    },
    method: 'DELETE',
  }).then((response) => {
    return response.json()
  })
}

function deleteCommentSuccess(comment) {
  return {
    type: DELETE_COMMENT_SUCCESS,
    comment: comment,
  }
};

function deleteCommentFailure(error) {
  return {
    type: DELETE_COMMENT_FAILURE,
    error: error,
  }
};


function deleteCommentPending() {
  return {
    type: DELETE_COMMENT_PENDING
  }
}

/* -----------------------------*/
/* edit an existing comment     */
/* -----------------------------*/
// timestamp: timestamp. Get this however you want.
// body: String
// author: String
// parentId: Should match a post id in the database.


export function editComment (commentData) {
  return (dispatch) => {
    dispatch(editCommentPending())
    return editCommentSubmit(commentData)
      .then((comment) => {
        dispatch(editCommentSuccess(comment))
      }).catch((error) => {
        dispatch(editCommentFailure(error))
      })
  }
}

function editCommentSubmit(commentData) {
  return fetch(`http://localhost:3001/comments/${commentData.id}`, {
    headers: {
      ...defaultHeaders,
    },
    method: 'put',
    body: JSON.stringify(commentData),
  }).then((response) => {
    return response.json()
  })
}

function editCommentSuccess(comment) {
  return {
    type: EDIT_COMMENT_SUCCESS,
    comment: comment,
  }
};

function editCommentFailure(error) {
  return {
    type: EDIT_COMMENT_FAILURE,
    error: error,
  }
};

function editCommentPending() {
  return {
    type: EDIT_COMMENT_PENDING
  }
}

/* --------------------------------*/
/* vote for a particular comment   */
/* --------------------------------*/

export function upVoteComment (comment) {
  return voteForComment(comment, UP_VOTE);
}

export function downVoteComment (comment) {
  return voteForComment(comment, DOWN_VOTE);
}

function voteCommentSubmit (comment, voteDirection) {
  return fetch(`http://localhost:3001/comments/${comment.id}`, {
    headers: {
      ...defaultHeaders,
    },
    method: 'post',
    body: JSON.stringify({option: voteDirection}),
  }).then((response) => {
    return response.json()
  })
}

const voteCommentSuccess = (comment) => {
  return {
    type: VOTE_COMMENT_SUCCESS,
    comment: comment
  }
}

const voteCommentFailure = (error) => {
  return {
    type: VOTE_COMMENT_FAILURE,
    error: error,
  }
}

function voteForComment (comment, voteDirection) {
  return (dispatch) => {
    return voteCommentSubmit(comment, voteDirection).then((comment) => {
      dispatch(voteCommentSuccess(comment))
    }).catch((error) => {
      dispatch(voteCommentFailure(error))
    })
  }
}

