import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchEvents,
  eventsSelector,
  loadingSelector,
  errorSelector
} from '../../ducks/events'

class EventsList extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.fetchEvents()
  }

  render() {
    const { isLoading, isError } = this.props

    if (isError) {
      return <div>Loading failure...</div>
    }

    if (isLoading) {
      return <div>Loading...</div>
    }

    return (
      <div>
        {this.props.events.map((item) => (
          <li key={item.id}>
            {item.title}, [{item.where}, {item.when}]
          </li>
        ))}
      </div>
    )
  }
}

export default connect(
  (state) => ({
    events: eventsSelector(state),
    isLoading: loadingSelector(state),
    isError: errorSelector(state)
  }),
  {
    fetchEvents
  }
)(EventsList)
