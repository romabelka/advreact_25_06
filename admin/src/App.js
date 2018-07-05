import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ProtectedRoute from './components/common/protected-route'
import Auth from './routes/auth'
import Admin from './routes/admin'
import Users from './routes/usep  rs'

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/auth" component={Auth} />
        <ProtectedRoute path="/admin" component={Admin} />
        <Route path="/user" component={Users} />
      </div>
    )
  }
}

export default App
