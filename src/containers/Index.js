import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
import { SubmissionError } from 'redux-form'

// import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'

import { signupUser} from '../actions'

class Index extends Component {
  componentWillMount() {
  }
  onSignupSubmit = (data) => {
    return this.props.onSignUp(data.username, data.password)
    .catch((error) => {
      throw new SubmissionError(error)
    })
  }
  render() {
    return (
      <div>
        <h1>mlem</h1>
        <SignupForm handleSubmit={this.onSignupSubmit} />
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
