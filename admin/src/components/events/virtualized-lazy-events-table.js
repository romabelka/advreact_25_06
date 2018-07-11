import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Column, InfiniteLoader } from 'react-virtualized'
import {
  fetchEventsLazy,
  selectEvent,
  eventListSelector,
  loadedSelector,
  loadingSelector
} from '../../ducks/events'
import 'react-virtualized/styles.css'

export class VirtualizedLazyEventsTable extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.fetchEventsLazy()
  }

  render() {
    const { events, loaded } = this.props

    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={loaded ? events.length : events.length + 1}
      >
        {({ onRowsRendered, registerChild }) => (
          <Table
            ref={registerChild}
            onRowsRendered={onRowsRendered}
            rowCount={events.length}
            width={500}
            height={300}
            rowHeight={40}
            rowGetter={this.rowGetter}
            headerHeight={50}
            onRowClick={this.handleSelect}
            overscanRowCount={1}
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

  isRowLoaded = ({ index }) => index < this.props.events.length

  loadMoreRows = () => {
    this.props.fetchEventsLazy()
  }
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  { fetchEventsLazy, selectEvent }
)(VirtualizedLazyEventsTable)
