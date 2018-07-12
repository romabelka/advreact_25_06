import React, { Component } from 'react'
import { DragSource } from 'react-dnd'

class PersonCard extends Component {
  render() {
    const { person, connectDragSource, isDragging } = this.props
    const dndStyle = {
      opacity: isDragging ? 0.3 : 1
    }
    return connectDragSource(
      <div style={dndStyle}>
        <h3>{person.email}</h3>
        <h4>{person.firstName}</h4>
        <h4>{person.lastName}</h4>
      </div>
    )
  }
}

const spec = {
  beginDrag(props) {
    return {
      uid: props.person.uid
    }
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})

export default DragSource('person', spec, collect)(PersonCard)
