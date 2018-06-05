import React, { Component } from 'react';
import { Link, Switch, Route, withRouter } from 'react-router-dom';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

import CategoryList from './CategoryList';
import SortBy from './SortBy';
import CreateEditPost from './CreateEditPost';
import PostDetail from './PostDetail'
import PostListPage from './PostListPage'
import { fetchAllCategories } from '../actions/category'

export class App extends Component {
  componentDidMount() {
    this.props.fetchAllCategories();
  }

  render() {
    return (
      <div>
        <nav className="navbar fixed-top navbar-dark bg-dark">
          <a className="navbar-brand" href="">m blog</a>
          <form className="form-inline">
            <Link to="/posts/new"><button className="btn btn-outline-info my-2 my-sm-0" type="submit">+ Post</button></Link>
          </form>
        </nav>
        <div className="container-fluid main-content">
          <div className="row">
            <div className="col-2 bd-sidebar">
              <form className="bd-sort d-flex align-items-center">
                <div className="form-group">
                  <label>Sort By</label>
                  <SortBy/>
                </div>
              </form>
              <label className="font-weight-bold">Categories</label>
              <CategoryList />
            </div>
            <div className="col-10">
              <Switch>
                <Route exact path="/" component={PostListPage}/>
                <Route exact path="/404" component={NoMatch} />
                <Route exact path="/:category" component={PostListPage}/>
                <Route exact path="/posts/new" component={CreateEditPost}/>
                <Route exact path="/posts/edit/:post_id" component={CreateEditPost}/>
                <Route exact path="/:category/:post_id" component={PostDetail}/>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const NoMatch = () => (
  <div>
    <div className="row">
      <div className="col no-match">
        <h6>
         This post is not longer available. So sorry! Why don't you create a new one?
        </h6>
      </div>
    </div>
  </div>
);
const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchAllCategories }, dispatch);
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
