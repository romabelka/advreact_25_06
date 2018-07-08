import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loadEvents, loadingSelector, eventsSelector } from '../ducks/events'
import Loader from '../components/common/loader'
import EventsList from '../components/events/list'

class EventsRoute extends Component {
  componentDidMount() {
    this.props.loadEvents()
  }

  render() {
    const { loading, events } = this.props
    return (
      <div>
        <h1>Events Page</h1>
        {loading && <Loader />}
        <EventsList events={events} />
      </div>
    )
  }
}

export default connect(
  (state) => ({
    loading: loadingSelector(state),
    events: eventsSelector(state)
  }),
  { loadEvents }
)(EventsRoute)
