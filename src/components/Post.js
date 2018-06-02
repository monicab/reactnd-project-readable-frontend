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
    const postedOn = new Date(this.props.post.timestamp) + "";
    return (
      <div className="list-group-item list-group-item-action flex-column align-items-start bd-post">
        <div className="row">
          <div className="col-11">
            <Link to={`/${this.props.post.category}/${this.props.post.id}`}><h4>{this.props.post.title} <span
              className="badge badge-info">{this.props.post.voteScore}</span></h4></Link>
            <h5>By <span className="font-italic">{this.props.post.author}</span> | {this.props.post.category}</h5>
            <h6>Posted on <span className="font-italic">{postedOn}</span></h6>
            <h6>Total Comments: <span className="font-weight-bold">{this.props.post.commentCount}</span></h6>
            <p className="bd-post-actions">
              <Link to={`/posts/edit/${this.props.post.id}`}><button type="button" className="btn btn-outline-info btn-sm">Edit Post</button></Link>
              <button  type="button" className="btn btn-outline-danger btn-sm" onClick={ this.handleClickDeletePost }>Delete Post</button>
            </p>
          </div>
          <ul className="col-1 bd-post-vote">
            <li>
                <span onClick={ this.handleClickUpVoteForPost } className="badge badge-info">Up Vote</span>
            </li>
            <li>
              <span onClick={ this.handleClickDownVoteForPost } className="badge badge-info">Down Vote</span>
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
