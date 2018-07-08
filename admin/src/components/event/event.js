import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Event extends Component {
  static propTypes = {
    event: PropTypes.shape({
      month: PropTypes.string,
      submissionDeadline: PropTypes.string,
      title: PropTypes.string,
      url: PropTypes.string,
      where: PropTypes.string,
      when: PropTypes.string
    }).isRequired
  }

  render() {
    const { title, url, where, when } = this.props.event
    return (
      <div>
        <a target="_blank" href={url}>
          {title}
        </a>
        <div>
          {where}, {when}
        </div>
      </div>
    )
  }
}

export default Event
