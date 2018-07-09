import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadEvents } from '../ducks/events'
import EventList from '../components/event/event-list'

class EventsRoute extends Component {
  render() {
    return (
      <div>
        <h1>Events page</h1>
        <button onClick={this.props.loadEvents}>Load events</button>
        <EventList />
      </div>
    )
  }
}

export default connect(
  null,
  { loadEvents }
)(EventsRoute)
