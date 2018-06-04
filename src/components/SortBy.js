import React, { Component } from 'react';
import PropTypes  from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { sortPosts } from '../actions/post';
import { SORT_OPTIONS } from '../actions/constants/sortBy'

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
      <select value={this.state.value} onChange={this.handleChange} className="form-control">
        { SORT_OPTIONS &&
          SORT_OPTIONS.map((option) => (<option key={option.code} value={option.code}>{option.label}</option>)) }
        {/*<option value="byTitleUp">Title &uarr;</option>*/}
        {/*<option value="byTitleDown">Title &darr;</option>*/}
        {/*<option value="byDateUp">Date &uarr;</option>*/}
        {/*<option value="byDateDown">Date &darr;</option>*/}
        {/*<option value="byScoreUp">Score &uarr;</option>*/}
        {/*<option value="byScoreDown">Score &darr;</option>*/}
        {/*<option value="byCommentsUp"># Comments &uarr;</option>*/}
        {/*<option value="byCommentsDown"># Comments &darr;</option>*/}
      </select>
    )
  }
}

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ sortPosts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SortBy);
