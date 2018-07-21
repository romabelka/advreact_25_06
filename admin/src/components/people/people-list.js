import React, { Component } from 'react'
import { connect } from 'react-redux'
import { peopleSelector, fetchAllPeople } from '../../ducks/people'
import { List } from 'react-virtualized'
import PersonCard from './person-card'
import { TransitionMotion, spring } from 'react-motion'

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
        {(interpolated) => {
          const { length } = interpolated
          return (
            <List
              scrollToIndex={interpolated.length - 1}
              rowRenderer={this.rowRenderer(interpolated)}
              rowCount={length}
              rowHeight={150}
              height={400}
              width={400}
            />
          )
        }}
      </TransitionMotion>
    )
  }

  willEnter = () => ({
    opacity: 0
  })

  willLeave = () => ({
    opacity: spring(0, { stiffness: 150, damping: 20 })
  })

  get styles() {
    return this.props.people.map((person) => ({
      key: person.uid,
      style: {
        opacity: spring(1, { stiffness: 50, damping: 20 })
      },
      data: person
    }))
  }

  rowRenderer = (interpolated) => ({ style, index, key }) => {
    const rowCtx = interpolated[index]
    return (
      <div style={{ ...style, ...rowCtx.style }} key={rowCtx.key}>
        <PersonCard person={rowCtx.data} />
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
