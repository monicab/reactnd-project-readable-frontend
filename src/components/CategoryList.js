import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Category from './Category'

export class CategoryList extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
  }

  getAllCategories = () => {
    return [ALL].concat(this.props.categories);
  }

  render () {
    let allCategories = this.getAllCategories();

    return (
      <ul className="list-group list-group-flush">
        {allCategories &&
         allCategories.map((category, index) => (<Category key={`${index}-${category.id}`} category={category}/>))}
      </ul>
    )
  }
}

const ALL = {
  path: '',
  name: 'all',
}

function mapStateToProps ({category}) {
  return {
    categories: category.allCategories
  }
}

export default connect(
  mapStateToProps,
)(CategoryList)
