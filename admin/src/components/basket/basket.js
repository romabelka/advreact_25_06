import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { deleteEvent } from '../../ducks/events'
import { deletePerson } from '../../ducks/people'

class Basket extends Component {
  render() {
    const { connectDropTarget, isOver } = this.props

    return connectDropTarget(
      <div
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          background: isOver ? 'red' : 'blue',
          padding: '20px'
        }}
      >
        Basket
      </div>
    )
  }
}

const spec = {
  drop(props, monitor) {
    const type = monitor.getItemType()
    const uid = monitor.getItem().uid

    if (type === 'person') {
      props.deletePerson(uid)
    } else if (type === 'event') {
      props.deleteEvent(uid)
    }
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
})

Basket = DropTarget(['person', 'event'], spec, collect)(Basket)

export default connect(
  null,
  { deletePerson, deleteEvent }
)(Basket)
