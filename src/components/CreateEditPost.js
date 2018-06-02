import React, { Component } from 'react';
import PropTypes  from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { createPost, fetchPost, editPost } from '../actions/post';
import CategoryDropDown from './CategoryDropDown'

export class CreateEditPost extends Component {
  static propTypes = {
    createPost: PropTypes.func.isRequired,
    editPost:   PropTypes.func.isRequired,
    fetchPost:  PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      author: '',
      body: '',
      category: '',
      redirectToReferrer: false,
      errors: [],
    }
  }

  componentDidMount() {
    if (this.props.match.params.post_id) {
      this.props.fetchPost(this.props.match.params.post_id).then(() => {
        this.setState({
          id: this.props.selectedPost.id,
          title: this.props.selectedPost.title,
          author: this.props.selectedPost.author,
          body: this.props.selectedPost.body,
          category: this.props.selectedPost.category,
          redirectToReferrer: false,
          errors: [],
        });
      });
    }
  }

  handleTitleChange = createHandleChange('title').bind(this);
  handleAuthorChange = createHandleChange('author').bind(this);
  handleBodyChange = createHandleChange('body').bind(this);
  handleCategoryChange = createHandleChange('category').bind(this);

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.validateForm()) return;

    if (this.state.id) {
      this.props.editPost({
        id: this.state.id,
        title: this.state.title,
        author: this.state.author,
        body: this.state.body,
        category: this.state.category,
      }).then(() => {
        //redirect to the main page
        this.setState({status: 'Post has successfully been created'})
        this.setState({ redirectToReferrer: true })
      });
    }
    else {
      this.props.createPost({
        title: this.state.title,
        author: this.state.author,
        body: this.state.body,
        category: this.state.category,
      }).then(() => {
        //redirect to the main page
        this.setState({status: 'Post has successfully been created'})
        this.setState({ redirectToReferrer: true })
      });
    }
  }

  validateForm = () => {
    this.setState({ errors: [] })
    // confirm all mandatory fields are present
    let errors = [];
    if (!this.state.title) {
      errors.push("title")
    }
    if (!this.state.author) {
      errors.push("author")
    }
    if (!this.state.body) {
      errors.push("body")
    }
    if (!this.state.category) {
      errors.push("category")
    }
    this.setState({
      errors: errors
    })
    return errors.length === 0;
  }

  getFormControlClassName = (elem) => {
    let classNames = ["form-control"];
    if (this.state.errors.includes(elem)) { classNames.push("is-invalid")}
    return classNames.join(" ");
  }

  render() {
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to="/"/>;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="postTitleID">Title</label>
              <input type="text" className={this.getFormControlClassName("title")} id="postTitleID" name="post-title" value={this.state.title}
                     onChange={this.handleTitleChange}/>
              <div className="invalid-feedback">Please add a title.</div>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="postAuthor">Author</label>
                  <input type="text" className={this.getFormControlClassName("author")}  id="postAuthor" name="post-author" value={this.state.author}
                                           onChange={this.handleAuthorChange}/>
                  <div className="invalid-feedback">Please add an author.</div>
                </div>
              </div>
              <div className="col">
                <CategoryDropDown value={this.state.category} onChange={this.handleCategoryChange} className={this.getFormControlClassName("category")}/>
              </div>
          </div>
        </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="postBody">Body</label>
              <textarea type="text" className={this.getFormControlClassName("body")}  id="postBody" name="post-body" value={this.state.body}
                                     onChange={this.handleBodyChange} rows="10"/>
              <div className="invalid-feedback">Please add some text to your blog post.</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group float-right">
              <button type="submit" className="btn btn-outline-info btn-sm">Submit Post</button>
              <Link to="/"><button type="button" className="btn btn-outline-info btn-sm">Cancel</button></Link>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

function createHandleChange(stateName) {
  return function(e) {
    let newState = {};
    newState[stateName] = e.target.value;
    this.setState(newState);
  }
}

function mapStateToProps ({post}) {
  return {
    selectedPost: post.selectedPost
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ createPost, fetchPost, editPost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditPost);

// 1) Title
// 2) Body
// 3) Author
// 4) Number of comments
// 5) Current score
// 6) Voting mechanism to upvote or downvote the post
// 7) Buttons or links for editing or deleting that post
