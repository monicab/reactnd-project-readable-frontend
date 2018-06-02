import { FETCH_ALL_POSTS_FAILURE, FETCH_ALL_POSTS_PENDING, FETCH_ALL_POSTS_SUCCESS } from './constants/post';
import { VOTE_POST_SUCCESS, VOTE_POST_FAILURE } from './constants/post';
import { UP_VOTE, DOWN_VOTE } from './constants/vote';
import { FETCH_POST_FAILURE, FETCH_POST_PENDING, FETCH_POST_SUCCESS } from './constants/post';
import { CREATE_POST_FAILURE, CREATE_POST_PENDING, CREATE_POST_SUCCESS } from './constants/post';
import { EDIT_POST_FAILURE, EDIT_POST_PENDING, EDIT_POST_SUCCESS } from './constants/post';
import { DELETE_POST_FAILURE, DELETE_POST_PENDING, DELETE_POST_SUCCESS } from './constants/post';
import { SORT_POSTS } from './constants/post';
import post from '../reducers/post'

const defaultHeaders = {
  'Authorization': 'whatever-you-want',
  'Content-Type': 'application/json',
}

const baseURL = "http://localhost:3001";

/* -----------------------------*/
/* fetch all posts              */
/* -----------------------------*/
export function fetchPosts (category = undefined) {
  return (dispatch) => {
    dispatch(fetchPostsPending());
    return fetchPostsSubmit(category)
      .then((posts) => {
        dispatch(fetchPostsSuccess(posts))
      }).catch((error) => {
        dispatch(fetchPostsFailure(error))
      });
  }
}

function fetchPostsPending() {
  return {
    type: FETCH_ALL_POSTS_PENDING
  }
}

function fetchPostsSubmit (category) {
  return fetch(fetchPostsAPIUrl(category), {
    headers: {
      ...defaultHeaders,
    },
  }).then((response) => {
    return response.json()
  })
}

function fetchPostsAPIUrl(category) {
  if (category) {
    return `${baseURL}/${category}/posts`
  }
  else {
    return `${baseURL}/posts`
  }
}

function fetchPostsSuccess(posts) {
  return {
    type: FETCH_ALL_POSTS_SUCCESS,
    posts: posts,
  }
}

function fetchPostsFailure(error) {
  return {
    type: FETCH_ALL_POSTS_FAILURE,
    error: error,
  }
}
/* -----------------------------*/
/* fetch a particular post      */
/* -----------------------------*/
function fetchPostSubmit(post_id) {
  return fetch(`http://localhost:3001/posts/${post_id}`, {
    headers: {
      ...defaultHeaders,
    },
  }).then((response) => {
    return response.json()
  })
}

function fetchPostSuccess(post) {
  return {
    type: FETCH_POST_SUCCESS,
    post: post,
  }
};

function fetchPostFailure(error) {
  return {
    type: FETCH_POST_FAILURE,
    error: error,
  }
};

function fetchPostPending() {
  return {
    type: FETCH_POST_PENDING
  }
}

export function fetchPost (post_id) {
  return (dispatch) => {
    dispatch(fetchPostPending())
    return fetchPostSubmit(post_id)
      .then((post) => {
        dispatch(fetchPostSuccess(post))
      }).catch((error) => {
        dispatch(fetchPostFailure(error))
      })
  }
}

/* -----------------------------*/
/* create a new post            */
/* -----------------------------*/
// id - UUID should be fine, but any unique id will work
// timestamp - timestamp in whatever format you like, you can use Date.now() if you like
// title - String
// body - String
// author - String
// category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.

function createPostSubmit(newPostData) {
  return fetch(`http://localhost:3001/posts`, {
    headers: {
      ...defaultHeaders,
    },
    method: 'post',
    body: JSON.stringify(newPostData),
  }).then((response) => {
    return response.json()
  })
}

function createPostSuccess(post) {
  return {
    type: CREATE_POST_SUCCESS,
    post: post,
  }
};

function createPostFailure(error) {
  return {
    type: CREATE_POST_FAILURE,
    error: error,
  }
};

function createPostPending() {
  return {
    type: CREATE_POST_PENDING
  }
}

export function createPost (newPostData) {
  newPostData.id = newPostData.id || `id-${Date.now()}`
  newPostData.timestamp = Date.now();
  return (dispatch) => {
    dispatch(createPostPending())
    return createPostSubmit(newPostData)
      .then((post) => {
        dispatch(createPostSuccess(post))
      }).catch((error) => {
        dispatch(createPostFailure(error))
      })
  }
}

/* -----------------------------*/
/* edit an existing post        */
/* -----------------------------*/
// id - UUID should be fine, but any unique id will work
// timestamp - timestamp in whatever format you like, you can use Date.now() if you like
// title - String
// body - String
// author - String
// category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.

function editPostSubmit(editPostData) {
  console.log("Edit post data =", editPostData);
  return fetch(`http://localhost:3001/posts/${editPostData.id}`, {
    headers: {
      ...defaultHeaders,
    },
    method: 'put',
    body: JSON.stringify(editPostData),
  }).then((response) => {
    return response.json()
  })
}

function editPostSuccess(post) {
  return {
    type: EDIT_POST_SUCCESS,
    post: post,
  }
};

function editPostFailure(error) {
  return {
    type: EDIT_POST_FAILURE,
    error: error,
  }
};

function editPostPending() {
  return {
    type: EDIT_POST_PENDING
  }
}

export function editPost(editPostData) {
  return (dispatch) => {
    dispatch(editPostPending())
    return editPostSubmit(editPostData)
      .then((post) => {
        dispatch(editPostSuccess(post))
      }).catch((error) => {
        dispatch(editPostFailure(error))
      })
  }
}

/* -----------------------------*/
/* vote for a particular post   */
/* -----------------------------*/
function votePostSubmit (post, voteDirection) {
  return fetch(`http://localhost:3001/posts/${post.id}`, {
    headers: {
      ...defaultHeaders,
    },
    method: 'post',
    body: JSON.stringify({option: voteDirection}),
  }).then((response) => {
    return response.json()
  })
}

const votePostSuccess = (post) => {
  return {
    type: VOTE_POST_SUCCESS,
    post: post
  }
}

const votePostFailure = (error) => {
  return {
    type: VOTE_POST_FAILURE,
    error: error,
  }
}

function voteForPost (post, voteDirection) {
  return (dispatch) => {
    return votePostSubmit(post, voteDirection).then((post) => {
      dispatch(votePostSuccess(post))
    }).catch((error) => {
      dispatch(votePostFailure(error))
    })
  }
}

export function upVotePost (post) {
  return voteForPost(post, UP_VOTE);
}

export function downVotePost (post) {
  return voteForPost(post, DOWN_VOTE);
}

/* -----------------------------*/
/* delete a particular post   */
/* -----------------------------*/
function deletePostSubmit(postID) {
  return fetch(`http://localhost:3001/posts/${postID}`, {
    headers: {
      ...defaultHeaders,
    },
    method: 'DELETE',
  }).then((response) => {
    return response.json()
  })
}

function deletePostSuccess(postID) {
  return {
    type: DELETE_POST_SUCCESS,
    postID: postID,
  }
};

function deletePostFailure(error) {
  return {
    type: DELETE_POST_FAILURE,
    error: error,
  }
};


function deletePostPending() {
  return {
    type: DELETE_POST_PENDING
  }
}

export function deletePost (postID) {
  return (dispatch) => {
    dispatch(deletePostPending())
    return deletePostSubmit(postID)
      .then(() => {
        dispatch(deletePostSuccess(postID))
      }).catch((error) => {
        dispatch(deletePostFailure(error))
      })
  }
}

/* -----------------------------*/
/* sort posts list   */
/* -----------------------------*/
export function sortPosts(sortDirection) {
  return {
    type: SORT_POSTS,
    sortDirection: sortDirection,
  }
}

export default post;
