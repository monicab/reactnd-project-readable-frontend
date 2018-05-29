import {
  FETCH_ALL_CATEGORIES_SUCCESS,
  FETCH_ALL_CATEGORIES_FAILURE,
  FETCH_ALL_CATEGORIES_PENDING,
} from '../actions/constants/category'

const categoryInitialState = {
  allCategories: [],
  isFetchingCategories: false,
}

const category = (state = categoryInitialState, action) => {
  switch (action.type) {
    case FETCH_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        allCategories: action.categories,
        isFetchingAllCategories: false,
      }

    case FETCH_ALL_CATEGORIES_FAILURE:
      return {
        ...state,
        isFetchingAllCategories: false,
      }

    case FETCH_ALL_CATEGORIES_PENDING:
      return {
        ...state,
        isFetchingAllCategories: true,
      }

    default:
      return state
  }
}

export default category;