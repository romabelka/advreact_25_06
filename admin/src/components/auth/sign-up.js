import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { validate as validateEmail } from 'email-validator'
import ErrorField from '../common/error-field'

class SignUpForm extends Component {
  render() {
    return (
      <div>
        <h3>SignUp Form</h3>
        <form onSubmit={this.props.handleSubmit}>
          <Field label="Email" name="email" component={ErrorField} />
          <Field
            label="Password"
            name="password"
            component={ErrorField}
            type="password"
          />

          <button type="submit">Sign Up</button>
        </form>
      </div>
    )
  }
}

const validate = ({ email, password }) => {
  const errors = {}

  if (!email) errors.email = 'email is a required field'
  else if (!validateEmail(email)) errors.email = 'email is invalid'

  if (!password) errors.password = 'password is a required field'
  else if (password.length < 8) errors.password = 'password is too short'

  return errors
}

export default reduxForm({
  form: 'auth',
  validate
})(SignUpForm)
