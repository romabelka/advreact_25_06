import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import NewUserForm from '../components/user/new-user'

class UserRoute extends Component {
  render() {
    return (
      <div>
        <h1>User page</h1>
        <NavLink to="/user/new-user" activeStyle={{ color: 'red' }}>
          Create a new user
        </NavLink>

        <Route path="/user/new-user" render={this.newUserForm} />
      </div>
    )
  }

  newUserForm = () => <NewUserForm />
}

export default UserRoute
