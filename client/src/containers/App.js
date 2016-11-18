import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
import {
  fetchUser,
  tokenExpired,
} from '../actions'

class App extends Component {
  componentDidMount() {
    this.props.onFetchUser()
    let now = new Date().getTime()/1000
    if (now > this.props.user.data.exp) {
      this.props.onTokenExpired()
    }
  }
  render() {
    return (
      <div>
        <header className="p-navigation" role="banner">
          <div className="p-navigation__logo">
              <a className="p-navigation__link" href="#">
                  Vanilla
              </a>
          </div>
          <a href="#navigation" className="p-navigation__toggle--open" title="menu">Menu</a>
          <a href="#navigation-closed" className="p-navigation__toggle--close" title="close menu">Menu</a>
          <nav className="p-navigation__nav">
              <span className="u-off-screen">
                  <a href="#main-content">Jump to main content</a>
              </span>
              <div className="p-navigation__links">
                  <a className="p-navigation__link" href="#">Link1</a>
                  <a className="p-navigation__link" href="#">Link2</a>
                  <a className="p-navigation__link" href="#">Link3</a>
              </div>
          </nav>
        </header>
        { this.props.children }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    token: state.user.token,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTokenExpired: () => {
      return dispatch(tokenExpired())
    },
    onFetchUser: () => {
      return dispatch(fetchUser())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
