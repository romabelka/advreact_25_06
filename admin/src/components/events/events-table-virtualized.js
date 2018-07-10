import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Column } from 'react-virtualized'
import {
  fetchLazyEvents,
  selectEvent,
  eventListSelector,
  loadedSelector,
  loadingSelector
} from '../../ducks/events'
import Loader from '../common/loader'
import 'react-virtualized/styles.css'

export class EventsTableVirtualized extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.fetchLazyEvents()
  }

  render() {
    const { events, loading } = this.props
    if (loading && !events.length) return <Loader />

    return (
      <Table
        rowCount={events.length}
        width={500}
        height={300}
        rowHeight={40}
        rowGetter={this.rowGetter}
        headerHeight={50}
        onRowClick={this.handleSelect}
        overscanRowCount={1}
        onRowsRendered={this.handleScroll}
      >
        <Column dataKey="title" width={200} label="name" />
        <Column dataKey="where" width={300} label="place" />
        <Column dataKey="url" width={300} label="url" />
      </Table>
    )
  }

  rowGetter = ({ index }) => this.props.events[index]

  handleSelect = ({ rowData }) => this.props.selectEvent(rowData.uid)

  handleScroll = ({ stopIndex }) => {
    if (stopIndex > this.props.events.length - 3) {
      this.props.fetchLazyEvents()
    }
  }
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  { fetchLazyEvents, selectEvent }
)(EventsTableVirtualized)
