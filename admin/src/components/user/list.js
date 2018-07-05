import React from 'react'

const UserList = ({ users }) => (
  <div>
    <h3>User List</h3>
    <ul>
      {users.map((user, index) => (
        <li key={index}>
          {user.get('firstName')} {user.get('lastName')} {user.get('email')}
        </li>
      ))}
    </ul>
  </div>
)

export default UserList
