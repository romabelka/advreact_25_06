import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

class UserForm extends Component {
  render() {
    return (
      <div>
        <h3>New User</h3>
        <form onSubmit={this.props.handleSubmit}>
          <div>
            First name: <Field name="firstName" component="input" />
          </div>
          <div>
            Last name: <Field name="lastName" component="input" />
          </div>
          <div>
            email: <Field name="email" component="input" />
          </div>
          <button type="submit">add user</button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'user'
})(UserForm)
