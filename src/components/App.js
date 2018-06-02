import React, { Component } from 'react';
import { Link, Switch, Route, withRouter } from 'react-router-dom';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

import CategoryList from './CategoryList';
import SortBy from './SortBy';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
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
              <Switch>
                <Route exact path="/" component={PostListPage}/>
                <Route exact path="/:category" component={PostListPage}/>
                <Route exact path="/posts/new" component={CreatePost}/>
                <Route exact path="/posts/edit/:post_id" component={EditPost}/>
                <Route exact path="/:category/:post_id" component={PostDetail}/>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchAllCategories }, dispatch);
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
