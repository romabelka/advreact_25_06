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
      <div style={dndStyle}>
        {connectDragSource(<h3>{person.email}</h3>)}
        [{person.firstName} {person.lastName}]
      </div>
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
