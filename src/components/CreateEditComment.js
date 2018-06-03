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
      errors: [],
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
    if (!this.validateForm()) { return };

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

  validateForm = () => {
    this.setState({ errors: [] })
    // confirm all mandatory fields are present
    let errors = [];
    if (!this.state.body) {
      errors.push("body")
    }
    if (!this.state.author) {
      errors.push("author")
    }
    this.setState({
      errors: errors
    })
    return errors.length === 0;
  }

  getFormControlClassName = (elem, specificClass) => {
    let classNames = ["form-control"].concat([specificClass]);
    if (this.state.errors.includes(elem)) { classNames.push("is-invalid")}
    return classNames.join(" ");
  }

  render() {
    return (
      <form className="bd-commment-create-edit list-group-item">
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Comment: </label>
          <div className="col-sm-10">
            <textarea className={this.getFormControlClassName("body", "comment-body")} value={this.state.body} onChange={this.handleChangeForBody}></textarea>
            <div className="invalid-feedback">Please add comment text.</div>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Author: </label>
          <div className="col-sm-10">
            <input type="text" className={this.getFormControlClassName("author", "comment-author")} value = { this.state.author } onChange={ this.handleChangeForAuthor } />
            <div className="invalid-feedback">Please add the author.</div>
          </div>
        </div>
        <div>
          <button type="button" className="btn btn-outline-info btn-sm btn-comment-add" onClick={this.handleClickForAdd}>Add</button>
          <button type="button" className="btn btn-outline-danger btn-sm btn-comment-cancel"  onClick={this.handleClickCancel}>Cancel</button>
        </div>
      </form>)
  }
}
