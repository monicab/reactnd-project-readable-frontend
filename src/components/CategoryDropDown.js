import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class CategoryDropDown extends Component {
  static propTypes = {
    categories:   PropTypes.array.isRequired,
    onChange:     PropTypes.func.isRequired,
    value:        PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    this.props.onChange(e);
  }

  render () {
    return (
      <label>
        Categories: &nbsp;
        <select value={this.state.value || this.props.value} onChange={this.handleChange}>
          <option key="empty" value=""> -- Please select -- </option>
          {this.props.categories &&
            this.props.categories.map((category) => (<option key={category.name} value={category.name}>{category.name}</option>))}
        </select>
      </label>
    )
  }
}

function mapStateToProps ({category}) {
  return {
    categories: category.allCategories
  }
}

export default connect(mapStateToProps)(CategoryDropDown);
