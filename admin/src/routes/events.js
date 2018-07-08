import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import EventsList from '../components/events/events-list'

class Events extends Component {
  render() {
    return (
      <div>
        <h1>Events</h1>
        <Route path="/events/list" component={EventsList} />
      </div>
    )
  }
}

export default Events
