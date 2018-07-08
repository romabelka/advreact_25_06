import React, { Component, Fragment } from 'react'
import { getEvents, eventsSelector, moduleName } from '../../ducks/events'
import { connect } from 'react-redux'

class EventsList extends Component {
  componentDidMount() {
    this.props.getEvents()
  }

  render() {
    return <Fragment>hey)</Fragment>
  }
}

export default connect(
  (state) => ({
    events: eventsSelector(state),
    fetching: state[moduleName].fetching
  }),
  { getEvents }
)(EventsList)
