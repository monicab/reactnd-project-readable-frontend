import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Category from './Category'

export class CategoryList extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
  }

  render () {
    return (
      <ul className='categories-list'>
        {this.props.categories &&
        this.props.categories.map((category, index) => (<Category key={`${index}-${category.id}`} category={category}/>))}
      </ul>
    )
  }
}

function mapStateToProps ({category}) {
  return {
    categories: category.allCategories
  }
}

export default connect(
  mapStateToProps,
)(CategoryList)