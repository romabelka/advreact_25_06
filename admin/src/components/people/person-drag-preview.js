import React, { Component } from 'react'
import { connect } from 'react-redux'
import { personSelector } from '../../ducks/people'

class PersonDragPreview extends Component {
  render() {
    return <div>{this.props.person.firstName}</div>
  }
}

export default connect((state, props) => ({
  person: personSelector(state, props)
}))(PersonDragPreview)
