import React, { Component } from 'react'
import { DragLayer } from 'react-dnd'

const layerStyle = {
  position: 'fixed',
  zIndex: 9999,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  pointerEvents: 'none'
}

class CustomDragLayer extends Component {
  get previewItem() {
    const { offset, item } = this.props
    if (!offset || !item || !item.DragPreview) return null

    const style = {
      transform: `translate(${offset.x}px, ${offset.y}px)`
    }

    return (
      <div style={style}>
        <item.DragPreview {...item} />
      </div>
    )
  }

  render() {
    const { isDragging } = this.props
    if (!isDragging || !this.previewItem) return null

    return <div style={layerStyle}>{this.previewItem}</div>
  }
}

const collect = (monitor) => ({
  isDragging: monitor.isDragging(),
  item: monitor.getItem(),
  offset: monitor.getSourceClientOffset()
})

export default DragLayer(collect)(CustomDragLayer)
