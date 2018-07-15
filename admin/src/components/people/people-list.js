import React, { Component } from 'react'
import { connect } from 'react-redux'
import { peopleSelector, fetchPersons } from '../../ducks/people'
import PersonCard from './person-card'

class PeopleList extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.fetchPersons()
  }

  render() {
    return (
      <div>
        {this.props.people.map((person) => (
          <PersonCard key={person.uid} person={person} />
        ))}
      </div>
    )
  }
}

export default connect(
  (state) => ({
    people: peopleSelector(state)
  }),
  { fetchPersons }
)(PeopleList)
