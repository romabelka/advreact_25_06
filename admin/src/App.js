import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import ProtectedRoute from './components/common/protected-route'
import Auth from './routes/auth'
import Admin from './routes/admin'
import CustomDragLayer from './components/common/custom-drag-layer'

class App extends Component {
  render() {
    return (
      <div>
        <CustomDragLayer />
        <NavLink to="/admin/events" activeStyle={{ color: 'red' }}>
          events
        </NavLink>
        <NavLink to="/admin/people" activeStyle={{ color: 'red' }}>
          people
        </NavLink>
        <Route path="/auth" component={Auth} />
        <ProtectedRoute path="/admin" component={Admin} />
      </div>
    )
  }
}

export default App
