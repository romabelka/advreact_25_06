import React, { Component, Fragment } from 'react'
import { Route, NavLink } from 'react-router-dom'
import SignInForm from '../components/auth/sign-in'
import SignUpForm from '../components/auth/sign-up'

class AuthRoute extends Component {
  render() {
    return (
      <div>
        <h1>Auth page</h1>
        {this.navigationItems}

        <Route path="/auth/sign-in" render={this.signInForm} />
        <Route path="/auth/sign-up" render={this.signUpForm} />
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
      </Fragment>
    )
  }

  signInForm = () => <SignInForm onSubmit={this.handleSignIn} />

  signUpForm = () => <SignUpForm onSubmit={this.handleSignUp} />

  handleSignIn = ({ email, password }) => console.log('---', email, password)
  handleSignUp = ({ email, password }) =>
    console.log('sign-up', email, password)
}

export default AuthRoute
