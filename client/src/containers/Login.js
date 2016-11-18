import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'


import LoginForm from '../components/LoginForm'
import { signinUser } from '../actions'

import './Index.scss'

class Login extends Component {
  onLoginSubmit = (data) => {
    return this.props.onSignIn(data.username, data.password)
    .then((user) => {
      return this.props.onAuthenticated()
    })
    .catch((error) => {
      throw new SubmissionError(error)
    })
  }
  render() {
    return (
      <div>
        <div className="header">
          <h1>Sign in</h1>
        </div>

        <div className="container">
          <div className="row flex-items-xs-center">
            <div className="col-md-5">
              <LoginForm onSubmit={this.onLoginSubmit} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: (username, password) => {
      return dispatch(signinUser(username, password))
    },
    onAuthenticated: () => {
      dispatch(push('/home'))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
