import React, { Component } from 'react';
import PropTypes  from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { sortPosts } from '../actions/post';

export class SortBy extends Component {
  static propTypes = {
    sortPosts: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      value: 'byDate',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.props.sortPosts(event.target.value)
  }

  render() {
    return (
      <select value={this.state.value} onChange={this.handleChange} >
        <option value="byDate">By Date</option>
        <option value="byScore">By Score</option>
      </select>
    )
  }
}

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ sortPosts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SortBy);
