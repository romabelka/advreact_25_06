import React, { Component, Fragment } from 'react'
import { getEvents, eventsSelector, moduleName } from '../../ducks/events'
import { connect } from 'react-redux'
import './events.css'

class EventsList extends Component {
  componentDidMount() {
    this.props.getEvents()
  }

  render() {
    const { events, fetching } = this.props
    {
      if (fetching) {
        return <div>Loading...</div>
      } else {
        return (
          <div className="events-list">
            {events.map((event) => (
              <div className="events-list-item">
                <div className="events-list-item__title">{event.title}</div>
                <div className="events-list-item__date">{event.when}</div>
                <div className="events-list-item__where">{event.where}</div>
                <div className="events-list-item__url">{event.url}</div>
              </div>
            ))}
          </div>
        )
      }
    }
    return (
      <div>
        {fetching ? (
          <div>(</div>
        ) : (
          <div>{events.map((event) => event.title)}</div>
        )}
      </div>
    )
  }
}

export default connect(
  (state) => ({
    events: eventsSelector(state),
    fetching: state[moduleName].fetching
  }),
  { getEvents }
)(EventsList)
