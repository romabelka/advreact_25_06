import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchEvents,
  eventsSelector,
  isLoadingSelector
} from '../../ducks/events'
import EventsItem from './events-item'

class EventsList extends Component {
  componentDidMount() {
    this.props.fetchEvents()
  }

  renderItems = () => {
    return this.props.events.map((conference) => {
      const {
        id,
        title,
        url,
        where,
        when,
        month,
        submissionDeadline
      } = conference

      return (
        <EventsItem
          key={id}
          title={title}
          url={url}
          where={where}
          when={when}
          month={month}
          submissionDeadline={submissionDeadline}
        />
      )
    })
  }

  render() {
    const { events, isLoading } = this.props

    return events && !isLoading ? (
      <ul>{this.renderItems()}</ul>
    ) : (
      <div>Loading conferences list</div>
    )
  }
}

export default connect(
  (state) => ({
    events: eventsSelector(state),
    isLoading: isLoadingSelector(state)
  }),
  { fetchEvents }
)(EventsList)
