import React, { Component } from 'react';
import PropTypes  from 'prop-types';
import { Link } from 'react-router-dom';

export default class Category extends Component {
  static propTypes = {
    category:         PropTypes.object.isRequired,
  }

  render() {
    return (
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <Link to={"/" + this.props.category.path} onClick={this.handleClickLink}>{this.props.category.name}</Link>
      </li>
    )
  }
}
