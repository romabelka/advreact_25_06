import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { validate as validateEmail } from 'email-validator'
import ErrorField from '../common/error-field'

class AddUserForm extends React.Component {
  render() {
    const { handleSubmit } = this.props

    return (
      <div>
        <h3>Create user</h3>

        <form onSubmit={handleSubmit}>
          <Field
            label="First Name"
            name="firstName"
            component={ErrorField}
            type="input"
          />

          <Field
            label="Last Name"
            name="lastName"
            component={ErrorField}
            type="input"
          />

          <Field
            label="E-mail"
            name="email"
            component={ErrorField}
            type="input"
          />

          <button type="submit">Add User</button>
        </form>
      </div>
    )
  }
}

const validate = ({ firstName, lastName, email }) => {
  const errors = {}

  if (!firstName || firstName.length < 2) {
    errors.firstName = 'First name is invalid'
  }

  if (!lastName || lastName.length < 2) {
    errors.lastName = 'Last name is invalid'
  }

  if (!email) {
    errors.email = 'E-mail is empty'
  } else if (!validateEmail(email)) {
    errors.email = 'E-mail is invalid'
  }

  return errors
}

export default reduxForm({
  form: 'add-user',
  validate
})(AddUserForm)
