import React, { Component } from 'react'
import './LoginForm.css'

import {
  Field,
  reduxForm
} from 'redux-form'

class LoginForm extends Component {
  render() {
    var {handleSubmit, submitting, submitFailed} = this.props
    return (
      <form onSubmit={handleSubmit} className='LoginForm'>
        <Field name='username' component='input' type='text' />
        <button type='submit' disabled={submitting} className='LoginForm-submit-button'>Kirjaudu</button>

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
