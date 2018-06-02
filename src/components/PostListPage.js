import React, { Component } from 'react'
import PropTypes from 'prop-types';

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
      <div className="row">
        <div className="col-2 bd-sidebar">
          <form className="bd-search d-flex align-items-center">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
          </form>
          <form className="bd-sort d-flex align-items-center">
            <label>Sort By &nbsp;</label>
            <SortBy/>
          </form>
          <label className="font-weight-bold">Categories</label>
          <CategoryList />
        </div>
        <div className="col-10">
          <PostList />
        </div>
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

