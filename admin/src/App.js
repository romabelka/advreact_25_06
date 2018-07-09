import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ProtectedRoute from './components/common/protected-route'
import Auth from './routes/auth'
import Admin from './routes/admin'
import Events from './routes/events'

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/auth" component={Auth} />
        <ProtectedRoute path="/admin" component={Admin} />
        <Route path="/events" component={Events} />
      </div>
    )
  }
}

export default App
