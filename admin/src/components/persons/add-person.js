import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import ErrorField from '../common/error-field'
import { validate as validateEmail } from 'email-validator/index'

class AddPersonForm extends Component {
  render() {
    return (
      <div>
        <h3>Add Person Form</h3>

        <form onSubmit={this.props.handleSubmit}>
          <Field label="Firstname" name="firstName" component={ErrorField} />
          <Field label="Lastname" name="lastName" component={ErrorField} />
          <Field label="Email" name="email" component={ErrorField} />

          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}

const validate = ({ email, lastName, firstName }) => {
  const errors = {}

  if (!email) errors.email = 'email is a required field'
  else if (!validateEmail(email)) errors.email = 'email is invalid'

  if (!lastName) errors.lastName = 'lastName is a required field'

  if (!firstName) errors.firstName = 'lastName is a required field'

  return errors
}

export default reduxForm({
  form: 'add-person',
  validate
})(AddPersonForm)
