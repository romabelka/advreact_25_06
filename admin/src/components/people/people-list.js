import React, { Component } from 'react'
import { connect } from 'react-redux'
import { peopleSelector, fetchAllPeople } from '../../ducks/people'
import { List } from 'react-virtualized'
import PersonCard from './person-card'

import 'react-virtualized/styles.css'
import { TransitionMotion, spring } from 'react-motion'

class PeopleList extends Component {
  componentDidMount() {
    this.props.fetchAllPeople()
  }

  render() {
    return (
      <TransitionMotion styles={this.styles} willEnter={this.willEnter}>
        {(interpolated) => (
          <List
            rowCount={interpolated.length}
            width={400}
            height={400}
            rowHeight={150}
            rowRenderer={this.rowRenderer(interpolated)}
          />
        )}
      </TransitionMotion>
    )
  }

  rowRenderer = (interpolated) => ({ style, index, key }) => {
    const rowCtx = interpolated[index]
    return (
      <div style={{ ...style, ...rowCtx.style }} key={key}>
        <PersonCard person={rowCtx.data} />
      </div>
    )
  }

  willEnter = () => ({
    opacity: 0
  })

  get styles() {
    return this.props.people.map((person) => ({
      key: person.uid,
      style: {
        opacity: spring(1, { stiffness: 150, damping: 30 })
      },
      data: person
    }))
  }
}

export default connect(
  (state) => ({
    people: peopleSelector(state)
  }),
  { fetchAllPeople }
)(PeopleList)
