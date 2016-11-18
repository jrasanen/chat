import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import './LoginForm.scss'

import {
  Field,
  reduxForm
} from 'redux-form'

class SignupForm extends Component {
  isValid = () => {
    return this.state.username.length > 0 && this.state.password.length > 0
  }
  componentDidMount(){
    ReactDOM.findDOMNode(this.refs.username).focus();
  }
  render() {
    const {handleSubmit, submitting, submitFailed} = this.props
    return (
      <form onSubmit={handleSubmit} className='LoginForm'>
        <div className="form-group">
          <label>
            Username
            <Field name='username' component='input' type='text' className="form-control" required="true" placeholder="austin.powers" autoFocus ref="username" />
          </label>
        </div>
        <div className="form-group">
          <label>
            Password
            <Field name='password' component='input' type='password' className="form-control" required="true" placeholder="Easy to remember, hard to guess" />
          </label>
        </div>
        <div className="form-group">
          <label>
            Email (optional, used for password recovery.)
            <Field name='email' component='input' type='email' className="form-control" placeholder="Email address" />
          </label>
        </div>

        <button type='submit' disabled={submitting} className='success button'>Sign up</button>
        Already have an account? <Link to={`/login`}>Sign in</Link>
        {!submitting && submitFailed && <div className='LoginForm-error'>Tunnuksen luominen ei onnistunut.</div> }
      </form>
    )
  }
}

SignupForm = reduxForm({
  form: 'signup'
})(SignupForm)

export default SignupForm
