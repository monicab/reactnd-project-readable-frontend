import {
  CREATE_COMMENT_FAILURE, CREATE_COMMENT_PENDING, CREATE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE, DELETE_COMMENT_PENDING, DELETE_COMMENT_SUCCESS,
  FETCH_ALL_COMMENTS_FAILURE, FETCH_ALL_COMMENTS_PENDING, FETCH_ALL_COMMENTS_SUCCESS,
  FETCH_COMMENT_FAILURE, FETCH_COMMENT_PENDING, FETCH_COMMENT_SUCCESS,
  EDIT_COMMENT_FAILURE, EDIT_COMMENT_PENDING, EDIT_COMMENT_SUCCESS,
  VOTE_COMMENT_SUCCESS, VOTE_COMMENT_FAILURE
} from '../actions/constants/comment'

const commentsInitialState = {
  allCommentsForPost: [],
  commentCreationErrors: [],
  isCreatingComment: false,
  isDeletingComment: false,
  isFetchingAllCommentsForPost: false,
  isFetchingComment: false,
  selectedPost: null,
}

const comment = (state = commentsInitialState, action) => {
  switch (action.type) {
    // FETCH_ALL_COMMENTS
    case FETCH_ALL_COMMENTS_SUCCESS:
      return {
        ...state,
        allCommentsForPost: action.comments,
        selectedPost: action.post,
        isFetchingAllCommentsForPost: false,
      }

    case FETCH_ALL_COMMENTS_FAILURE:
      return {
        ...state,
        selectedPost: action.post,
        isFetchingAllCommentsForPost: false,
      }

    case FETCH_ALL_COMMENTS_PENDING:
      return {
        ...state,
        isFetchingAllCommentsForPost: true,
      }

    // FETCH_COMMENT
    case FETCH_COMMENT_SUCCESS:
      return {
        ...state,
        allCommentsForPost: upateCommentInAllCommentsForPost(state.allCommentsForPost, action.comment),
        selectedPost: action.post,
        isFetchingComment: false,
      }

    case FETCH_COMMENT_FAILURE:
      return {
        ...state,
        isFetchingComment: false,
      }

    case FETCH_COMMENT_PENDING:
      return {
        ...state,
        isFetchingComment: true,
      }

    // CREATE_COMMENT
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        isCreatingComment: false,
        commentCreationErrors: [],
        allCommentsForPost: addCommentToAllCommentsForPost(state.allCommentsForPost, action.comment),
      }

    case CREATE_COMMENT_FAILURE:
      return {
        ...state,
        isCreatingComment: false,
        commentCreationErrors: state.commentCreationErrors.concat([action.error])
      }

    case CREATE_COMMENT_PENDING:
      return {
        ...state,
        isCreatingComment: true,
        commentCreationErrors: [],
      }


    // VOTE_COMMENT
    case VOTE_COMMENT_SUCCESS:
      return {
        ...state,
      }

    case VOTE_COMMENT_FAILURE:
      return {
        ...state,
      }

    case DELETE_COMMENT_PENDING:
      return {
        ...state,
        isDeletingComment: true,
      }

    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        isDeletingComment: false,
      }

    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        isDeletingComment: false,
      }

    // EDIT_COMMENT
    case EDIT_COMMENT_PENDING:
      return {
        ...state,
        isEditingComment: true,
      }

    case EDIT_COMMENT_SUCCESS:
      return {
        ...state,
        isEditingComment: false,
        allCommentsForPost: upateCommentInAllCommentsForPost(state.allCommentsForPost, action.comment),
      }

    case EDIT_COMMENT_FAILURE:
      return {
        ...state,
        isEditingComment: false,
      }

    default:
      return state
  }
}

function upateCommentInAllCommentsForPost(allComments, updatedComment) {
  const newAllComments = allComments.map((comment) => {
    if (comment.id === updatedComment.id) {
      return updatedComment;
    }
    return comment;
  });

  return newAllComments;
}

function addCommentToAllCommentsForPost(allComments, newComment) {
  const newAllComments = allComments.slice(0);
  newAllComments.push(newComment);

  return newAllComments;
}
export default comment;
