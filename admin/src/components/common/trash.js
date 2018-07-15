import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { deletePerson } from '../../ducks/people'

class Trash extends Component {
  render() {
    const { connectDropTarget, canDrop, hovered } = this.props

    const bg = canDrop ? (hovered ? 'red' : '#ffcccc') : '#fff0f0'

    return connectDropTarget(
      <div
        style={{
          width: 200,
          height: 200,
          backgroundColor: bg,
          position: 'absolute',
          right: 10,
          padding: 20
        }}
      >
        Перетащите для удаления
      </div>
    )
  }
}

const spec = {
  drop(props, monitor) {
    props.deletePerson(monitor.getItem().uid)
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  hovered: monitor.isOver()
})

export default connect(
  null,
  { deletePerson }
)(DropTarget(['person'], spec, collect)(Trash))
