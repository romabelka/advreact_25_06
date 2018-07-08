import React, { Component } from 'react'
import EventsList from '../components/events/events-list'

class EventsPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h2>Events</h2>
        <EventsList />
      </div>
    )
  }
}

export default EventsPage
