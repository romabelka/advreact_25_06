import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List } from 'react-virtualized'
import SelectedEventCard from './selected-event-card'
import { selectedEventsSelector } from '../../ducks/events'

class SelectedEvents extends Component {
  render() {
    const { events } = this.props
    return (
      <List
        rowCount={events.length}
        width={500}
        height={400}
        rowHeight={200}
        rowRenderer={this.rowRenderer}
      />
    )
  }

  rowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <SelectedEventCard event={this.props.events[index]} />
      </div>
    )
  }
}

export default connect((state) => ({
  events: selectedEventsSelector(state)
}))(SelectedEvents)
