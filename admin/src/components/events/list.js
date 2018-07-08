import React from 'react'

const EventsList = ({ events }) => {
  return <ul>{events.map((event, i) => <li key={i}>{event.title}</li>)}</ul>
}

export default EventsList
