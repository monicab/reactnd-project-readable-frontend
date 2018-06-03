import React, { Component } from 'react';
import PropTypes  from 'prop-types';

import { Link, Redirect } from 'react-router-dom';
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
    detailMode:           PropTypes.bool
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
    }).then(() => {
      if (this.props.detailMode) {
       this.setState({ redirectToReferrer: true });
      }
    });
  }

  render() {
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to="/"/>;
    }

    const postedOn = new Date(this.props.post.timestamp) + "";
    return (
      <div className="list-group-item list-group-item-action flex-column align-items-start bd-post">
        <div className="row">
          <div className="col-11">
            <Link to={`/${this.props.post.category}/${this.props.post.id}`}><h4 className="post-title">{this.props.post.title}</h4></Link>
            <h6>By <span className="font-italic">{this.props.post.author}</span> | Posted on <span className="font-italic">{postedOn}</span> | {this.props.post.category}</h6>
            {this.props.detailMode &&
              (<blockquote className="blockquote">
                <p>{this.props.post.body}</p>
                <footer className="blockquote-footer">{this.props.post.author}</footer>
              </blockquote>)
            }
            <p>
              <span className="badge badge-info post-vote-score">{this.props.post.voteScore} votes</span>
              <span className="badge badge-info post-comment-count">{this.props.post.commentCount} comments</span>
            </p>
            <p>
              <Link to={`/posts/edit/${this.props.post.id}`}><button type="button" className="btn btn-outline-info btn-sm">Edit Post</button></Link>
              <button type="button" className="btn btn-outline-danger btn-sm" onClick={ this.handleClickDeletePost }>Delete Post</button>
            </p>
          </div>
          <ul className="col-1 bd-post-vote">
            <li>
                <span onClick={ this.handleClickUpVoteForPost } className="badge badge-info button-post-upvote">Up</span>
            </li>
            <li>
              <span onClick={ this.handleClickDownVoteForPost } className="badge badge-info button-post-downvote">Down</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = null ;

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ deletePost, fetchPosts, fetchPost, upVotePost, downVotePost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
