import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { deletePerson } from '../../ducks/people'
import { deleteEvent } from '../../ducks/events'

class Basket extends Component {
  static propTypes = {}

  render() {
    const { event, connectDropTarget, canDrop, hovered } = this.props

    const borderColor = canDrop ? (hovered ? 'red' : 'green') : 'black'

    return connectDropTarget(
      <div style={{ border: `1px solid ${borderColor}`, height: 200 }}>
        <h2>Корзина</h2>
        <h3>Перетащите в корзину чтобы удалить пользователя или событие</h3>
      </div>
    )
  }
}

const spec = {
  drop(props, monitor) {
    const { deletePerson, deleteEvent } = props
    let item = monitor.getItem()
    if (item.uid) deletePerson(monitor.getItem().uid)

    if (item.eventId) {
      console.log('---', 'eventId to basket', monitor.getItem().eventId)
      deleteEvent(monitor.getItem().eventId)
    }
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  hovered: monitor.isOver()
})

export default connect(
  null,
  { deletePerson, deleteEvent }
)(DropTarget(['person', 'event'], spec, collect)(Basket))
