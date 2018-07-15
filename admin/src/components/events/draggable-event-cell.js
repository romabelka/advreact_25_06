import React, { Component } from 'react'
import { DragSource } from 'react-dnd'

class DraggableEventCell extends Component {
  render() {
    const { cellData, connectDragSource } = this.props
    return connectDragSource(<div>{cellData}</div>)
  }
}

const spec = {
  beginDrag(props) {
    return {
      uid: props.rowData.uid
    }
  }
}

const collect = (connect) => ({
  connectDragSource: connect.dragSource()
})

export default DragSource('event', spec, collect)(DraggableEventCell)
