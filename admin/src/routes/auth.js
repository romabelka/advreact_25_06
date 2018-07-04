import React, { Component, Fragment } from 'react'
import { Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import SignInForm from '../components/auth/sign-in'
import SignUpForm from '../components/auth/sign-up'
import AddUserForm from '../components/form/add-user'
import { signIn, signUp } from '../ducks/auth'
import { addUser } from '../ducks/persons'

class AuthRoute extends Component {
  render() {
    return (
      <div>
        <h1>Auth page</h1>
        {this.navigationItems}

        <Route path="/auth/sign-in" render={this.signInForm} />
        <Route path="/auth/sign-up" render={this.signUpForm} />
        <Route path="/auth/add-user" render={this.addUserForm} />
      </div>
    )
  }

  get navigationItems() {
    return (
      <Fragment>
        <div>
          <NavLink to="/auth/sign-in" activeStyle={{ color: 'red' }}>
            Sign In
          </NavLink>
        </div>
        <div>
          <NavLink to="/auth/sign-up" activeStyle={{ color: 'red' }}>
            Sign Up
          </NavLink>
        </div>
        <div>
          <NavLink to="/auth/add-user" activeStyle={{ color: 'red' }}>
            Add user
          </NavLink>
        </div>
      </Fragment>
    )
  }

  signInForm = () => <SignInForm onSubmit={this.handleSignIn} />

  signUpForm = () => <SignUpForm onSubmit={this.handleSignUp} />

  addUserForm = () => <AddUserForm onSubmit={this.handleAddUser} />

  handleSignIn = ({ email, password }) => this.props.signIn(email, password)
  handleSignUp = ({ email, password }) => this.props.signUp(email, password)
  handleAddUser = ({ firstName, lastName, email }) =>
    this.props.addUser(firstName, lastName, email)
}

export default connect(
  null,
  { signIn, signUp, addUser }
)(AuthRoute)
