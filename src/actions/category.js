import {
  FETCH_ALL_CATEGORIES_FAILURE,
  FETCH_ALL_CATEGORIES_PENDING,
  FETCH_ALL_CATEGORIES_SUCCESS } from './constants/category'

const defaultHeaders = {
  'Authorization': 'whatever-you-want',
  'Content-Type': 'application/json',
}

/* -----------------------------*/
/* fetch all categories              */
/* -----------------------------*/
function fetchAllCategoriesSubmit () {
  return fetch(`http://localhost:3001/Categories`, {
    headers: {
      ...defaultHeaders,
    },
  }).then((response) => {
    return response.json()
  })
}

function fetchAllCategoriesSuccess(categories) {
  return {
    type: FETCH_ALL_CATEGORIES_SUCCESS,
    categories: categories.categories,
  }
}

function fetchAllCategoriesFailure(error) {
  return {
    type: FETCH_ALL_CATEGORIES_FAILURE,
    error: error,
  }
}

function fetchAllCategoriesPending() {
  return {
    type: FETCH_ALL_CATEGORIES_PENDING
  }
}

export function fetchAllCategories () {
  return (dispatch) => {
    dispatch(fetchAllCategoriesPending());
    return fetchAllCategoriesSubmit()
      .then((categories) => {
        dispatch(fetchAllCategoriesSuccess(categories))
      }).catch((error) => {
        dispatch(fetchAllCategoriesFailure(error))
      });
  }
}
