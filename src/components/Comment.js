import React, { Component } from 'react';
import PropTypes  from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { upVoteComment, downVoteComment, fetchCommentsForPost, fetchComment, editComment, deleteComment } from '../actions/comment'
import CreateEditComment from './CreateEditComment'

export class Comment extends Component {
  static propTypes = {
    comment:          PropTypes.object.isRequired,
    deleteComment:    PropTypes.func.isRequired,
    downVoteComment:  PropTypes.func.isRequired,
    editComment:      PropTypes.func.isRequired,
    fetchComment:     PropTypes.func.isRequired,
    upVoteComment:    PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      showCreateComment: false,
    }
  }

  handleClickUpVoteForComment = (e) => {
    this.props.upVoteComment(this.props.comment).then(() => {
      this.props.fetchComment(this.props.comment.id)
    });
  }

  handleClickDownVoteForComment = (e) => {
    this.props.downVoteComment(this.props.comment).then(() => {
      this.props.fetchComment(this.props.comment.id)
    });
  }

  handleClickDeleteComment = (e) => {
    this.props.deleteComment(this.props.comment.id).then(() => {
      this.props.fetchCommentsForPost(this.props.selectedPost);
    });
  }

  handleClickForEditComment = (e) => {
    this.setState({showCreateComment: true})
  }

  onCancelCreateComment = (e) => {
    this.setState({showCreateComment: false})
  }

  onCreateComment = (editedComment) => {
    this.props.editComment(editedComment).then(() => {
      this.setState({showCreateComment: false});
    })
  }

  render() {
    return (
      <div className="list-group-item list-group-item-action flex-column align-items-start">
        <div className="row">
          <div className="col-11">
            <blockquote className="blockquote">
              <p>{this.props.comment.body}</p>
              <footer className="blockquote-footer">By {this.props.comment.author}</footer>
            </blockquote>
            <p>
              <span className="badge badge-info total-votes">{this.props.comment.voteScore} votes</span>
            </p>
            <p>
              <button type="button" className="btn btn-outline-info btn-sm btn-edit-comment" onClick={ this.handleClickForEditComment }>Edit Comment</button>
              <button type="button" className="btn btn-outline-danger btn-sm btn-delete-comment" onClick={ this.handleClickDeleteComment }>Delete Comment</button>
            </p>
            {this.state.showCreateComment &&
            <CreateEditComment comment={ this.props.comment } onCancel={ this.onCancelCreateComment } onCreate={ this.onCreateComment } ></CreateEditComment>}
          </div>
          <ul className="col-1 bd-comment-vote">
            <li><button className="badge badge-info btn-up-vote" onClick={ this.handleClickUpVoteForComment }>Up</button></li>
            <li><button className="badge badge-info btn-down-vote" onClick={ this.handleClickDownVoteForComment }>Down</button></li>
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ comment }) {
  return {
    selectedPost: comment.selectedPost
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ deleteComment, editComment, fetchCommentsForPost, fetchComment, upVoteComment, downVoteComment }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);

// 1) Author
// 2) Current score
// 3) Voting mechanism to upvote or downvote the comment
// 4) Buttons or links for editing or deleting that comment
