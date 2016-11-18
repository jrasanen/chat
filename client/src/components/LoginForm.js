import React, { Component } from 'react'
import './LoginForm.scss'

import {
  Field,
  reduxForm
} from 'redux-form'

class LoginForm extends Component {
  render() {
    var {handleSubmit, submitting, submitFailed} = this.props
    return (
      <form method="post" onSubmit={handleSubmit} className='LoginForm'>
        <label>
          Username
        </label>
        <Field name='username' component='input' type='text' />

        <label>
          Password
        </label>
        <Field name='password' component='input' type='password' />

        <button type='submit' disabled={submitting} className='success button'>Kirjaudu</button>

        {!submitting && submitFailed &&
          <div className='LoginForm-error'>Kirjautuminen ei onnistunut, tarkista käyttäjänimi!</div>
        }
      </form>
    )
  }
}

LoginForm = reduxForm({
  form: 'login'
})(LoginForm)

export default LoginForm
