import React, { Component } from 'react'
import { connect } from 'react-redux'
import EventList from '../components/event/event-list'

class EventPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <EventList />
      </div>
    )
  }
}

export default connect(
  null,
  {}
)(EventPage)
