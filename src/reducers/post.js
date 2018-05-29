import {
  FETCH_ALL_POSTS_SUCCESS,
  FETCH_ALL_POSTS_FAILURE,
  FETCH_ALL_POSTS_PENDING,
} from '../actions/constants/post'
import { FETCH_POST_SUCCESS, FETCH_POST_FAILURE, FETCH_POST_PENDING } from '../actions/constants/post'
import { VOTE_POST_SUCCESS, VOTE_POST_FAILURE } from '../actions/constants/post'
import { CREATE_POST_SUCCESS, CREATE_POST_FAILURE, CREATE_POST_PENDING } from '../actions/constants/post'
import { EDIT_POST_SUCCESS, EDIT_POST_FAILURE, EDIT_POST_PENDING } from '../actions/constants/post'
import { DELETE_POST_SUCCESS, DELETE_POST_FAILURE, DELETE_POST_PENDING } from '../actions/constants/post'
import { SORT_POSTS } from '../actions/constants/post'

const postsInitialState = {
  allPosts: [],
  isFetchingAllPosts: false,
  isFetchingPost: false,
  isCreatingPost: false,
  isEditingPost: false,
  isDeletingPost: false,
  postCreationErrors: [],
  postEditingErrors: [],
  selectedPost: {},
}

const post = (state = postsInitialState, action) => {
  switch (action.type) {
    case FETCH_ALL_POSTS_SUCCESS:
      return {
        ...state,
        allPosts: action.posts,
        isFetchingAllPosts: false,
      }

    case FETCH_ALL_POSTS_FAILURE:
      return {
        ...state,
        isFetchingAllPosts: false,
      }

    case FETCH_ALL_POSTS_PENDING:
      return {
        ...state,
        isFetchingAllPosts: true,
      }

    case VOTE_POST_SUCCESS:
      return {
        ...state,
      }

    case VOTE_POST_FAILURE:
      return {
        ...state,
      }

    case FETCH_POST_SUCCESS:
      return {
        ...state,
        allPosts: upatePostInAllPosts(state.allPosts, action.post),
        selectedPost: action.post,
        isFetchingPost: false,
      }

    case FETCH_POST_FAILURE:
      return {
        ...state,
        isFetchingPost: false,
      }

    case FETCH_POST_PENDING:
      return {
        ...state,
        isFetchingPost: true,
      }

    case CREATE_POST_SUCCESS:
      return {
        ...state,
        isCreatingPost: false,
        postCreationErrors: [],
        selectedPost: {},
      }

    case CREATE_POST_FAILURE:
      return {
        ...state,
        isCreatingPost: false,
        postCreationErrors: state.postCreationErrors.concat([action.error])
      }

    case EDIT_POST_PENDING:
      return {
        ...state,
        isEditingPost: true,
        postEditingErrors: [],
      }

    case EDIT_POST_SUCCESS:
      return {
        ...state,
        isEditingPost: false,
        postEditingErrors: [],
        selectedPost: {},
      }

    case EDIT_POST_FAILURE:
      return {
        ...state,
        isEditingPost: false,
        postEditingErrors: state.postEditingErrors.concat([action.error])
      }

    case CREATE_POST_PENDING:
      return {
        ...state,
        isCreatingPost: true,
        postEditingErrors: [],
      }

    case DELETE_POST_PENDING:
      return {
        ...state,
        isDeletingPost: true,
      }

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        isDeletingPost: false,
      }

    case DELETE_POST_FAILURE:
      return {
        ...state,
        isDeletingPost: false,
      }

    case SORT_POSTS:
      return {
        ...state,
        allPosts: sortPosts(state.allPosts, action.sortDirection)
      }

    default:
      return state
  }
}


function upatePostInAllPosts(allPosts, updatedPost) {
  const newAllPosts = allPosts.map((post) => {
    if (post.id === updatedPost.id) {
      return updatedPost;
    }
    return post;
  });

  return newAllPosts;
}

function sortPosts(allPosts, sortDirection) {
  let newAllPosts = allPosts.slice(0);
  newAllPosts.sort(function(a, b) {
    switch(sortDirection) {
      case "byScore":
        return a.voteScore < b.voteScore;
      case "byDate":
        return a.timestamp < b.timestamp;
      default:
        return a;
    }
  });
  return newAllPosts;
}

export default post;