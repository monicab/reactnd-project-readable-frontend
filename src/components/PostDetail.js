import React, { Component } from 'react';
import PropTypes  from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CommentList from './CommentList'
import CreateEditComment from './CreateEditComment';
import Post from './Post';
import { fetchPost } from '../actions/post';
import { fetchCommentsForPost } from '../actions/comment';
import { createComment, editComment } from '../actions/comment';

export class PostDetail extends Component {
  static propTypes = {
    post:           PropTypes.object.isRequired,
    fetchPost:      PropTypes.func.isRequired,
    createComment:  PropTypes.func.isRequired,
    editComment:    PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      showCreateComment: false,
    }
  }
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.post_id);
    this.props.fetchCommentsForPost(this.props.match.params.post_id)
  }

  handleClickCreateComment = (e) => {
    e.preventDefault();
    this.setState({ showCreateComment: true })
  }

  onCancelCreateComment = (e) => {
    this.setState({ showCreateComment: false })
  }

  onCreateComment = (commentData) => {
    this.props.createComment({
      timestamp: Date.now(),
      body: commentData.body,
      author: commentData.author,
      parentId: this.props.post.id
    }).then(() => {
      this.setState({showCreateComment: false})
    })
  }

  render() {
    return (
      this.props.post &&
      (<div className="row">
        <div class="col">
          <Post post={this.props.post} detailMode={true}/>
          <div class="list-group-item">
            <h4>Comments
              <button type="button" className="btn btn-outline-info btn-sm float-right" onClick={this.handleClickCreateComment}>
                + Comment
              </button>
            </h4>
          </div>
          {this.state.showCreateComment &&
            <CreateEditComment onCancel={this.onCancelCreateComment} onCreate={this.onCreateComment}></CreateEditComment>}
          <CommentList/>
          <div>
            <Link to="/">Go Back</Link>
          </div>
        </div>
      </div>)
    )
  }
}

function mapStateToProps ({post, comment}) {
  return {
    post: post.selectedPost,
    allCommentsForPost: comment.allCommentsForPost,
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ createComment, editComment, fetchPost, fetchCommentsForPost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
