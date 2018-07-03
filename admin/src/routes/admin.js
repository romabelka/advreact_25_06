import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddUserForm from '../components/users/addUser'
import { addUser } from '../ducks/users'

class Admin extends Component {
  handleAddUser = (values) => {
    this.props.addUser(values)
  }

  render() {
    return (
      <div>
        <h1>Admin Page </h1>
        <AddUserForm onSubmit={this.handleAddUser} />
      </div>
    )
  }
}

export default connect(
  null,
  { addUser }
)(Admin)
