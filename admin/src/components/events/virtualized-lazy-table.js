import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  loadingSelector,
  loadedSelector,
  selectEvent,
  fetchLazy,
  eventListSelector
} from '../../ducks/events'
import { Table, Column, InfiniteLoader } from 'react-virtualized'
import 'react-virtualized/styles.css'

import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
// import DragPreview from './person-drag-preview'

export class EventLazyTable extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.fetchLazy()
    this.props.connectPreview(getEmptyImage())
  }

  render() {
    const { loaded, events } = this.props

    const { connectDragSource, isDragging } = this.props
    const dndStyle = {
      opacity: isDragging ? 0.3 : 1
    }

    return (
      <div>
        {connectDragSource(
          <a eventid={events[0]}>Перетащи меня чтобы удалить верхнюю строку</a>
        )}
        <InfiniteLoader
          isRowLoaded={this.isRowLoaded}
          rowCount={loaded ? events.length : events.length + 1}
          loadMoreRows={this.loadMoreRows}
        >
          {({ onRowsRendered, registerChild }) => (
            <Table
              ref={registerChild}
              rowCount={events.length}
              rowGetter={this.rowGetter}
              rowHeight={40}
              headerHeight={50}
              overscanRowCount={1}
              width={700}
              height={300}
              onRowClick={this.handleSelect}
              onRowsRendered={onRowsRendered}
              rowClassName="test__event_table_row"
            >
              <Column dataKey="title" width={200} label="name" />
              <Column dataKey="where" width={300} label="place" />
              <Column dataKey="url" width={300} label="url" />
            </Table>
          )}
        </InfiniteLoader>
      </div>
    )
  }

  isRowLoaded = ({ index }) => index < this.props.events.length

  loadMoreRows = () => {
    this.props.fetchLazy()
  }

  rowGetter = ({ index }) => this.props.events[index]

  handleSelect = ({ rowData }) => this.props.selectEvent(rowData.uid)
}

const spec = {
  beginDrag(props, ff) {
    const eventId = props.events[0].uid
    return {
      eventId
    }
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
})

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  { fetchLazy, selectEvent }
)(DragSource('event', spec, collect)(EventLazyTable))
