import React, { Component, Fragment } from 'react'
import { getEvents, eventsSelector, moduleName } from '../../ducks/events'
import { connect } from 'react-redux'

class EventsList extends Component {
  componentDidMount() {
    this.props.getEvents()
  }

  render() {
    console.log(this.props.events)
    const { events, fetching } = this.props
    console.log()
    return <div>{fetching ? <div>(</div> : <div>))</div>}</div>
  }
}

export default connect(
  (state) => ({
    events: eventsSelector(state),
    fetching: state[moduleName].fetching
  }),
  { getEvents }
)(EventsList)
