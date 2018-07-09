import React, { Component } from 'react'
import EventsTable from '../components/events/events-table-virtualized'
import SelectedEvents from '../components/events/selected-events'

class EventsPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <SelectedEvents />
        <EventsTable />
      </div>
    )
  }
}

export default EventsPage
