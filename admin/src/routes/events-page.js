import React, { Component } from 'react'
import EventsList from '../components/events/events-list'

class EventsPage extends Component {
  render() {
    return (
      <div>
        <h3>Events list</h3>
        <EventsList />
      </div>
    )
  }
}

export default EventsPage
