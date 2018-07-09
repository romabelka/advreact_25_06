import React, { Component } from 'react'

class SelectedEventCard extends Component {
  render() {
    const { event } = this.props
    return (
      <div style={{ border: '1px solid black', height: 200 }}>
        <h3>{event.title}</h3>
        <h3>{event.where}</h3>
      </div>
    )
  }
}

export default SelectedEventCard
