import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Post from './Post'

export class PostList extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired
  }

  render () {
    return (
      <div className="list-group">
        <h4 className="category-title">{this.props.category}</h4>
        {this.props.posts &&
        this.props.posts.map((post, index) => (<Post key={`${index}-${post.id}`} post={post} showCreateComment={false}/>))}
      </div>
    )
  }
}

function mapStateToProps ({post}) {
  return {
    posts: post.allPosts,
    category: post.category,
  }
}

export default connect(
  mapStateToProps,
)(PostList)
