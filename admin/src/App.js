import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Auth from './routes/auth'

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/auth" component={Auth} />
      </div>
    )
  }
}

export default App
