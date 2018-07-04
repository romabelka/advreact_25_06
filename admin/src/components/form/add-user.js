import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

class AddUserForm extends Component {
  render() {
    return (
      <div>
        <h3>Add user:</h3>
        <form onSubmit={this.props.handleSubmit}>
          <div>
            Name: <Field name="firstName" component="input" />
          </div>
          <div>
            Last name: <Field name="lastName" component="input" />
          </div>
          <div>
            Email: <Field name="email" component="input" />
          </div>
          <button type="submit">Add user</button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'addUser'
})(AddUserForm)
