import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Comment from './Comment'

export class CommentList extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired
  }

  render () {
    return (
      <div className="list-group">
        {this.props.comments &&
        this.props.comments.map((comment, index) => (<Comment key={`${index}-${comment.id}`} comment={comment}/>))}
      </div>
    )
  }
}

function mapStateToProps ({ comment }) {
  return {
    comments: comment.allCommentsForPost
  }
}

export default connect(
  mapStateToProps,
)(CommentList)
