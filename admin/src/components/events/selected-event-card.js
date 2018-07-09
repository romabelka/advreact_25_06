import React, { Component } from 'react'

class SelectedEventCard extends Component {
  render() {
    const { event } = this.props
    return (
      <div>
        <h3>{event.title}</h3>
        <h3>{event.where}</h3>
      </div>
    )
  }
}

export default SelectedEventCard
