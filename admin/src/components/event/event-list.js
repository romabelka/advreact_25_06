import React, { Component } from 'react'
import { connect } from 'react-redux'
import { eventsSelector } from '../../ducks/events'
import { loadEvents } from '../../ducks/events'

class EventList extends Component {
  static propTypes = {}

  componentDidMount() {
    const { loading, loaded, loadEvents } = this.props
    if (!loaded && !loading) loadEvents()
  }

  render() {
    if (this.props.loading) return <div>Loading...</div>

    return (
      <div>
        {this.props.events.map((event) => (
          <li key={event.id}>
            {event.title}
            <p>{event.url}</p>
            <p>{event.where}</p>
            <p>{event.when}</p>
            <p>{event.month}</p>
            <p>{event.submissionDeadline}</p>
          </li>
        ))}
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      events: eventsSelector(state),
      loading: state.events.loading,
      loaded: state.events.loaded
    }
  },
  { loadEvents }
)(EventList)
