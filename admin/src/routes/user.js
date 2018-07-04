import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import NewUserForm from '../components/user/create-user'
import { createUser } from '../ducks/user'

class UserRoute extends Component {
  render() {
    return (
      <div>
        <h1>User page</h1>
        <NavLink to="/user/new-user" activeStyle={{ color: 'red' }}>
          Create a new user
        </NavLink>

        <Route path="/user/new-user" render={this.newUserForm} onSubmit />
      </div>
    )
  }

  newUserForm = () => <NewUserForm onSubmit={this.handleSubmit} />

  handleSubmit = ({ firstName, lastName, email }) => {
    this.props.createUser(firstName, lastName, email)
  }
}

export default connect(
  null,
  { createUser }
)(UserRoute)
