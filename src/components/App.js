import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

// import logo from '../logo.svg';
import '../App.css';

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
      <div className="App">
        <div className="App-intro">
          <Switch>
            <Route exact path="/" component={PostListPage}/>
            <Route exact path="/:category" component={PostListPage}/>
            <Route exact path="/posts/new" component={CreatePost}/>
            <Route exact path="/posts/edit/:post_id" component={EditPost}/>
            <Route exact path="/:category/:post_id" component={PostDetail}/>
          </Switch>
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
