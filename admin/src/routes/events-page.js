import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getEvents } from '../ducks/events'

class EventsPage extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.getEvents()
  }

  render() {
    return <div>hello</div>
  }
}

export default connect(
  null,
  { getEvents }
)(EventsPage)
