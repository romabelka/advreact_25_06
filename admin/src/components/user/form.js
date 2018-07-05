import React from 'react'
import { reduxForm, Field, reset } from 'redux-form'
import { validate as validateEmail } from 'email-validator'
import ErrorField from '../common/error-field'

const UserForm = ({ handleSubmit }) => (
  <div>
    <h3>Add User Form</h3>
    <form onSubmit={handleSubmit}>
      <Field label="First Name" name="firstName" component={ErrorField} />
      <Field label="Last Name" name="lastName" component={ErrorField} />
      <Field label="Email" name="email" component={ErrorField} />

      <button type="submit">Add User</button>
    </form>
  </div>
)

const validate = ({ firstName, lastName, email }) => {
  const errors = {}

  if (!email) errors.email = 'email is a required field'
  else if (!validateEmail(email)) errors.email = 'email is invalid'

  if (!firstName) errors.firstName = 'password is a required field'
  if (!lastName) errors.lastName = 'password is a required field'

  return errors
}

const formName = 'user-add'

const afterSubmit = (result, dispatch) => dispatch(reset(formName))

export default reduxForm({
  form: formName,
  validate,
  onSubmitSuccess: afterSubmit
})(UserForm)
