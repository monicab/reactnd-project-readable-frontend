import React, { Component } from 'react';
import PropTypes  from 'prop-types';

export default class CreateEditComment extends Component {
  static propTypes = {
    comment: PropTypes.object,
    onCancel: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    const body = props.comment ? props.comment.body : '';
    const author = props.comment ? props.comment.author : '';

    this.state = {
      body: body,
      author: author,
    }

    this.handleChangeForBody = this.handleChangeForBody.bind(this);
    this.handleChangeForAuthor = this.handleChangeForAuthor.bind(this);
    this.handleClickForAdd = this.handleClickForAdd.bind(this);
    this.handleClickCancel = this.handleClickCancel.bind(this);
  }

  handleChangeForBody(e) {
    this.setState({ body: e.target.value });
  }

  handleChangeForAuthor(e) {
    this.setState({ author: e.target.value });
  }

  handleClickForAdd(e) {
    e.preventDefault();
    let newComment = {
      ...this.props.comment,
      author: this.state.author,
      body: this.state.body
    }
    this.props.onCreate(newComment)
  }

  handleClickCancel() {
    this.props.onCancel();
  }

  render() {
    return (
      <form className="bd-commment-create-edit list-group-item">
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Comment: </label>
          <div className="col-sm-10">
            <textarea className="form-control" value = {this.state.body } onChange={this.handleChangeForBody}></textarea>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Author: </label>
          <div className="col-sm-10">
            <input type="text" className="form-control" value = { this.state.author } onChange={ this.handleChangeForAuthor } />
          </div>
        </div>
        <div>
          <button type="button" className="btn btn-outline-info btn-sm" onClick={this.handleClickForAdd}>Add</button>
          <button type="button" className="btn btn-outline-danger btn-sm"  onClick={this.handleClickCancel}>Cancel</button>
        </div>
      </form>)
  }
}
