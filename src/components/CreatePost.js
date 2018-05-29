import React, { Component } from 'react';
import PropTypes  from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { createPost, fetchPost } from '../actions/post';
import CategoryDropDown from './CategoryDropDown'

export class CreatePost extends Component {
  static propTypes = {
    createPost: PropTypes.func.isRequired,
    fetchPost: PropTypes.func.isRequired,
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

  handleTitleChange = createHandleChange('title').bind(this);
  handleAuthorChange = createHandleChange('author').bind(this);
  handleBodyChange = createHandleChange('body').bind(this);
  handleCategoryChange = createHandleChange('category').bind(this);

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.validateForm()) return;
    this.props.createPost(this.state).then(() => {
      //redirect to the main page
      this.setState({status: 'Post has successfully been created'})
      this.setState({ redirectToReferrer: true })
    });
  }

  validateForm = () => {
    this.setState({ errors: [] })
    // confirm all mandatory fields are present
    let errors = [];
    if (!this.state.title) {
      errors.push("Please add a title")
    }
    if (!this.state.author) {
      errors.push("Please add an author")
    }
    if (!this.state.body) {
      errors.push("Please add a body")
    }
    if (!this.state.category) {
      errors.push("Please select a category")
    }
    this.setState({
      errors: errors
    })
    return errors.length === 0;
  }

  render() {
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to="/"/>;
    }

    return (
      <form className="post-new" onSubmit={this.handleSubmit}>
        <ul>
          {this.state.errors && this.state.errors.map((error, index) => (<li key={index}>{error}</li>))}
        </ul>
        <div><label>Title: <input type="text" name="post-title" value={this.state.title} onChange={this.handleTitleChange}/></label></div>
        <div><label>Author: <input type="text" name="post-author" value={this.state.author} onChange={this.handleAuthorChange}/></label></div>
        <div><label>Body: <input type="text" name="post-body" value={this.state.body} onChange={this.handleBodyChange}/></label></div>
        <div><CategoryDropDown onChange={this.handleCategoryChange}/></div>

        <div>
          <button type="submit">Submit Post</button>
          <Link to="/">Go Back</Link>
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

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ createPost, fetchPost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);

// 1) Title
// 2) Body
// 3) Author
// 4) Number of comments
// 5) Current score
// 6) Voting mechanism to upvote or downvote the post
// 7) Buttons or links for editing or deleting that post