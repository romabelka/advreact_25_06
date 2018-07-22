import React, { Component } from 'react'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import DragPreview from './person-drag-preview'

class PersonCard extends Component {
  componentDidMount() {
    this.props.connectPreview(getEmptyImage())
  }

  render() {
    const { person, connectDragSource, isDragging } = this.props
    const dndStyle = {
      opacity: isDragging ? 0.3 : 1
    }
    return (
      <span style={dndStyle}>
        {connectDragSource(<span>{person.email}</span>)}
        <span>
          {person.firstName} {person.lastName}
        </span>
      </span>
    )
  }
}

const spec = {
  beginDrag(props) {
    return {
      uid: props.person.uid,
      DragPreview
    }
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
})

export default DragSource('person', spec, collect)(PersonCard)
