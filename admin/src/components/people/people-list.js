import React, { Component } from 'react'
import { connect } from 'react-redux'
import { peopleSelector, fetchAllPeople } from '../../ducks/people'
import { List } from 'react-virtualized'
import { TransitionMotion, spring } from 'react-motion'
import PersonCard from './person-card'

import 'react-virtualized/styles.css'

class PeopleList extends Component {
  componentDidMount() {
    this.props.fetchAllPeople()
  }

  render() {
    return (
      <TransitionMotion
        styles={this.styles}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {(interpolatedStyles) => (
          <List
            rowRenderer={this.rowRenderer(interpolatedStyles)}
            rowCount={interpolatedStyles.length}
            rowHeight={24}
            height={400}
            width={400}
          />
        )}
      </TransitionMotion>
    )
  }

  get styles() {
    return this.props.people.map((item) => ({
      key: item.uid,
      style: {
        opacity: spring(1, { stiffness: 50, damping: 50 })
      },
      data: item
    }))
  }

  willEnter = () => ({
    opacity: 0
  })

  willLeave = () => ({
    opacity: spring(0, { stiffness: 50, damping: 50 })
  })

  rowRenderer = (interpolatedStyles) => ({ style, index }) => {
    const person = interpolatedStyles[index]
    return (
      <div key={person.key} style={{ ...style, ...person.styles }}>
        <PersonCard person={person.data} />
      </div>
    )
  }
}

export default connect(
  (state) => ({
    people: peopleSelector(state)
  }),
  { fetchAllPeople }
)(PeopleList)
