import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import ErrorField from '../common/error-field'
import { validate as validateEmail } from 'email-validator'

class NewUserForm extends Component {
  render() {
    return (
      <div>
        <h3>Create User Form</h3>
        <form onSubmit={this.props.handleSubmit}>
          <Field label="First Name" name="firstName" component={ErrorField} />
          <Field label="Last Name" name="lastName" component={ErrorField} />
          <Field label="Email" name="email" component={ErrorField} />

          <button type="submit">Submit</button>
          <button onClick={this.props.reset}>Reset</button>
        </form>
      </div>
    )
  }
}

const validate = ({ firstName, lastName, email }) => {
  const errors = {}

  if (!firstName) errors.firstName = 'first name is a required field'

  if (!lastName) errors.lastName = 'last name is a required field'

  if (!email) errors.email = 'email is a required field'
  else if (!validateEmail(email)) errors.email = 'email is invalid'

  return errors
}

export default reduxForm({
  form: 'user',
  validate
})(NewUserForm)
