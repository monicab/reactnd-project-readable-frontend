import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import CategoryList from './CategoryList';
import PostList from './PostList';
import SortBy from './SortBy';

import { fetchPosts } from '../actions/post';

export class PostListPage extends Component {
  static propTypes = {
    fetchPosts:      PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      category: undefined,
    }
  }

  componentDidMount() {
    this.props.fetchPosts(this.props.match.params.category);
  }

  componentDidUpdate() {
    if (this.state.category !== this.props.match.params.category) {
      this.props.fetchPosts(this.props.match.params.category);
      this.setState({ category: this.props.match.params.category });
    }
  }

  render () {
    return (
      <div>
        <div><SortBy/></div>
        <CategoryList />
        <div><Link to="posts/new">Create a New Post</Link></div>
        <PostList />
      </div>
    )
  }
}

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchPosts }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListPage)

