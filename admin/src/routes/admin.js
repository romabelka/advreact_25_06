import React from 'react'
import { connect } from 'react-redux'
import AddUserForm from '../components/admin/add-user-form'
import UserList from '../components/admin/user-list'
import { addUser } from '../ducks/users'

class Admin extends React.Component {
  render() {
    return (
      <div>
        <h1>Admin Page</h1>
        {this.addUserForm}
        <UserList />
      </div>
    )
  }

  get addUserForm() {
    return <AddUserForm onSubmit={this.handleAddUser} />
  }

  handleAddUser = ({ firstName, lastName, email }) => {
    this.props.addUser(firstName, lastName, email)
  }
}

export default connect(
  null,
  { addUser }
)(Admin)
