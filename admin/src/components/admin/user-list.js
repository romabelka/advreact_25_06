import React from 'react'
import { connect } from 'react-redux'
import { getUsers } from '../../ducks/users'

class AddUserForm extends React.Component {
  render() {
    const { users } = this.props

    return (
      <ul>
        {users.map((item) => (
          <li key={item.email}>
            {item.email} - {item.firstName} {item.lastName}
          </li>
        ))}
      </ul>
    )
  }
}

export default connect((state) => ({
  users: getUsers(state)
}))(AddUserForm)
