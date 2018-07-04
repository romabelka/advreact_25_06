import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ProtectedRoute from './components/common/protected-route'
import Auth from './routes/auth'
import Admin from './routes/admin'
import NewUser from './routes/user'

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/auth" component={Auth} />
        <Route path="/user" component={NewUser} />
        <ProtectedRoute path="/admin" component={Admin} />
      </div>
    )
  }
}

export default App
