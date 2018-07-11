import React, { Component } from 'react'
import { connect } from 'react-redux'
import { InfiniteLoader, Table, Column } from 'react-virtualized'
import {
  fetchLazyEvents,
  selectEvent,
  loadMoreEvents,
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

  get isFirstLoading() {
    const { events, loading } = this.props
    return loading && events.length === 0
  }

  render() {
    const { events } = this.props
    if (this.isFirstLoading) return <Loader />
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={Number.MAX_SAFE_INTEGER}
      >
        {({ onRowsRendered, registerChild }) => (
          <Table
            rowCount={events.length}
            width={500}
            height={300}
            rowHeight={40}
            rowGetter={this.rowGetter}
            headerHeight={50}
            onRowClick={this.handleSelect}
            overscanRowCount={1}
            onRowsRendered={onRowsRendered}
            ref={registerChild}
          >
            <Column dataKey="title" width={200} label="name" />
            <Column dataKey="where" width={300} label="place" />
            <Column dataKey="url" width={300} label="url" />
          </Table>
        )}
      </InfiniteLoader>
    )
  }

  rowGetter = ({ index }) => this.props.events[index]

  handleSelect = ({ rowData }) => this.props.selectEvent(rowData.uid)

  isRowLoaded = ({ index }) => !!this.props.events[index]

  loadMoreRows = () => {
    this.props.fetchLazyEvents()
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
