import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  loadAllEvents,
  eventSelector,
  loadingEventsSelector
} from '../../ducks/event'
import Event from './event'
import Loader from '../common/loader'

class EventList extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)
    props.fetchData && props.fetchData()
  }

  render() {
    const { events, loading } = this.props
    if (loading) return <Loader />
    return (
      <ul>
        {events.map((event, key) => (
          <li key={key}>
            <Event event={event} />
          </li>
        ))}
      </ul>
    )
  }
}

export default connect(
  (state) => ({
    events: eventSelector(state),
    loading: loadingEventsSelector(state)
  }),
  { fetchData: loadAllEvents }
)(EventList)
