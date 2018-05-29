import React, { Component } from 'react';
import PropTypes  from 'prop-types';

import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { upVotePost, downVotePost, fetchPosts, fetchPost, deletePost } from '../actions/post'

export class Post extends Component {
  static propTypes = {
    post:                 PropTypes.object.isRequired,
    deletePost:           PropTypes.func.isRequired,
    fetchPost:            PropTypes.func.isRequired,
    fetchPosts:           PropTypes.func.isRequired,
    upVotePost:           PropTypes.func.isRequired,
    downVotePost:         PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      body: '',
      category: '',
      redirectToReferrer: false,
      errors: [],
    }
  }

  handleClickUpVoteForPost = (e) => {
    this.props.upVotePost(this.props.post).then(() => {
      this.props.fetchPost(this.props.post.id)
    });
  }

  handleClickDownVoteForPost = (e) => {
    this.props.downVotePost(this.props.post).then(() => {
      this.props.fetchPost(this.props.post.id)
    });
  }

  handleClickDeletePost = (e) => {
    this.props.deletePost(this.props.post.id).then(() => {
      this.props.fetchPosts();
    });
  }

  render() {
    return (
      <div className="post-container">
        <Link to={`/${this.props.post.category}/${this.props.post.id}`}>{this.props.post.title} [category - {this.props.post.category}]</Link>
        <h5 className='post-author'>By {this.props.post.author} (Total Comments [{this.props.post.commentCount}]) (Current Score [{this.props.post.voteScore}])</h5>
        <ul className="Post-actions-vote">
          <li><button className='post-upVote' onClick={ this.handleClickUpVoteForPost }>{this.props.post.voteScore} Up Vote</button></li>
          <li><button className='post-downVote' onClick={ this.handleClickDownVoteForPost }>{this.props.post.voteScore} Down Vote</button></li>
        </ul>
        <ul className="post-actions-modify">
          <li>
            <Link to={`/posts/edit/${this.props.post.id}`}><button className='post-edit'>Edit Post</button></Link>
            <button className='post-delete' onClick={ this.handleClickDeletePost }>Delete Post</button>
          </li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = null ;

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ deletePost, fetchPosts, fetchPost, upVotePost, downVotePost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);

// 1) Title
// 2) Body
// 3) Author
// 4) Number of comments
// 5) Current score
// 6) Voting mechanism to upvote or downvote the post
// 7) Buttons or links for editing or deleting that post