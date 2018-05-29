import React, { Component } from 'react';
import PropTypes  from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { upVoteComment, downVoteComment, fetchCommentsForPost, fetchComment, editComment, deleteComment } from '../actions/comment'
import CreateComment from './CreateComment'

export class Comment extends Component {
  static propTypes = {
    comment:          PropTypes.object.isRequired,
    deleteComment:    PropTypes.func.isRequired,
    editComment:      PropTypes.func.isRequired,
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
    e.preventDefault();
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
      <div className="comment-container">
        <p>{this.props.comment.body}</p>
        <p>By {this.props.comment.author}</p>
        <ul className="comment-actions-vote">
          <li><button className='post-upVote' onClick={ this.handleClickUpVoteForComment }>{this.props.comment.voteScore} Up Vote</button></li>
          <li><button className='post-downVote' onClick={ this.handleClickDownVoteForComment }>{this.props.comment.voteScore} Down Vote</button></li>
        </ul>
        <ul className="comment-actions-modify">
          <li>
            <button className='comment-edit' onClick={ this.handleClickForEditComment }>Edit Comment</button>
            <button className='comment-delete' onClick={ this.handleClickDeleteComment }>Delete Comment</button>
          </li>
        </ul>
        {this.state.showCreateComment &&
          <CreateComment comment={ this.props.comment } onCancel={ this.onCancelCreateComment } onCreate={ this.onCreateComment } ></CreateComment>}
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