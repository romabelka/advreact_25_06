import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

class SignInForm extends Component {
  render() {
    return (
      <div>
        <h3>SignIn Form</h3>
        <form onSubmit={this.props.handleSubmit}>
          <div>
            email: <Field name="email" component="input" />
          </div>
          <div>
            password:{' '}
            <Field name="password" component="input" type="password" />
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'auth'
})(SignInForm)
