import React, { Component } from 'react'
import EventsTable from '../components/events/virtualized-lazy-table'
import SelectedEvents from '../components/events/selected-events'
import PeopleList from '../components/people/people-list'
import Basket from '../components/basket'

class AllPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <PeopleList />
        <Basket />
        <SelectedEvents />
        <EventsTable />
      </div>
    )
  }
}

export default AllPage
