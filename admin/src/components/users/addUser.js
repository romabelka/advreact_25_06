import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { validate as validateEmail } from 'email-validator'
import ErrorField from '../common/error-field'

class AddUserForm extends Component {
  render() {
    return (
      <div>
        <h3>Add User</h3>
        <form
          onSubmit={(e) => {
            this.props.handleSubmit(e)
            this.props.reset()
          }}
        >
          <div>
            <Field
              label="Email"
              name="email"
              type="text"
              component={ErrorField}
            />
          </div>
          <div>
            <Field
              label="First Name"
              name="firstName"
              type="text"
              component={ErrorField}
            />
          </div>
          <div>
            <Field
              label="Last Name"
              name="lastName"
              type="text"
              component={ErrorField}
            />
          </div>
          <button type="submit">Добавить</button>
        </form>
      </div>
    )
  }
}

const validate = ({ email }) => {
  const errors = {}
  if (!email) {
    errors.email = 'email is a required field'
  } else if (!validateEmail(email)) {
    errors.email = 'email is invalid'
  }
  return errors
}

const warn = ({ firstName, lastName }) => {
  const warnings = {}
  if (!firstName) {
    warnings.firstName = 'First name is empty...'
  }
  if (!lastName) {
    warnings.lastName = 'Last name is empty...'
  }
  return warnings
}

export default reduxForm({
  form: 'addUserForm',
  validate,
  warn
})(AddUserForm)
