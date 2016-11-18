import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
import { SubmissionError } from 'redux-form'

import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'
import { signupUser, signinUser } from '../actions'

import './Index.scss'

class Index extends Component {
  onSignupSubmit = (data) => {
    return this.props.onSignUp(data.username, data.password)
    .catch((error) => {
      throw new SubmissionError(error)
    })
  }
  onLoginSubmit = (data) => {
    return this.props.onSignIn(data.username, data.password)
    .catch((error) => {
      throw new SubmissionError(error)
    })
  }
  render() {
    return (
      <div>
        <div className="header">
          <h1>Create an account</h1>
        </div>
        <div className="container">
          <div className="row flex-items-xs-center">
            <div className="col-md-5">
              <SignupForm onSubmit={this.onSignupSubmit} />
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
    onSignUp: (username, password) => {
      return dispatch(signupUser(username, password))
    },
    onSignIn: (username, password) => {
      return dispatch(signinUser(username, password))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
