import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addUser } from '../ducks/users'
import UserForm from '../components/user/form'
import UserList from '../components/user/list'

class Users extends Component {
  render() {
    const { users, addUser } = this.props
    return (
      <div>
        <h1>User List Page</h1>
        <UserForm onSubmit={addUser} />
        {users.size > 0 && <UserList users={users} />}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(
  mapStateToProps,
  { addUser }
)(Users)
