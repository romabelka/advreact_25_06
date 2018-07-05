import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserForm from '../components/admin/user'
import { addUser } from '../ducks/admin'

class AdminRoute extends Component {
  render() {
    return (
      <div>
        <h1>Admin Page</h1>
        <UserForm onSubmit={this.handleAddUser} />
      </div>
    )
  }

  handleAddUser = ({ firstName, lastName, email }) =>
    this.props.addUser(firstName, lastName, email)
}

export default connect(
  null,
  { addUser }
)(AdminRoute)
