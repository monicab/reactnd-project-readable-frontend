import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class CategoryDropDown extends Component {
  static propTypes = {
    categories:   PropTypes.array.isRequired,
    onChange:     PropTypes.func.isRequired,
    value:        PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = { value: this.props.value || '' };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    this.props.onChange(e);
  }

  render () {
    return (
      <div className="form-group">
        <label>Categories</label>
        <select value={this.state.value} onChange={this.handleChange} className={this.props.className}>
          <option key="empty" value=""> -- Please select -- </option>
          {this.props.categories &&
            this.props.categories.map((category) => (<option key={category.name} value={category.name}>{category.name}</option>))}
        </select>
        <div className="invalid-feedback">Please select a category.</div>
      </div>
    )
  }
}

function mapStateToProps ({category}) {
  return {
    categories: category.allCategories
  }
}

export default connect(mapStateToProps)(CategoryDropDown);
