import React, { Component, Fragment } from 'react'
import { Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import SignInForm from '../components/auth/sign-in'
import SignUpForm from '../components/auth/sign-up'
import { signIn, signUp } from '../ducks/auth'

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

  handleSignIn = ({ email, password }) => this.props.signIn(email, password)
  handleSignUp = ({ email, password }) => this.props.signUp(email, password)
}

export default connect(
  null,
  { signIn, signUp }
)(AuthRoute)
