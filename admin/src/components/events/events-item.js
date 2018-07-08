import React, { Component } from 'react'

export default class EventsItem extends Component {
  render() {
    const { title, url, where, month } = this.props

    return (
      <li>
        <h3>
          <a href={url}>{title}</a>
        </h3>
        <small>
          {where} in {month}
        </small>
      </li>
    )
  }
}
