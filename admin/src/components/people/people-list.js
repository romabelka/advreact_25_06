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
        {(interpolated) => (
          <List
            scrollToIndex={interpolated.length - 1}
            rowRenderer={this.rowRenderer(interpolated)}
            rowCount={interpolated.length}
            rowHeight={150}
            height={400}
            width={400}
          />
        )}
      </TransitionMotion>
    )
  }

  willEnter = () => ({
    opacity: 0
  })

  willLeave = () => ({
    opacity: spring(0, { stiffness: 20, damping: 40 })
  })

  get styles() {
    return this.props.people.map((people) => ({
      key: people.uid,
      style: {
        opacity: spring(1, { stiffness: 50, damping: 40 })
      },
      data: people
    }))
  }

  rowRenderer = (interpolated) => ({ style, index, key }) => {
    const rowCtx = interpolated[index]
    const person = rowCtx.data
    return (
      <div style={{ ...style, ...rowCtx.style }} key={key}>
        <PersonCard person={person} />
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
