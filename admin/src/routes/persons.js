import React, { Component } from 'react'
import AddPersonForm from '../components/persons/add-person'
import { connect } from 'react-redux'
import { addPerson } from '../ducks/persons'
import { NavLink, Route } from 'react-router-dom'

class PersonsRoute extends Component {
  render() {
    return (
      <div>
        <h1>Persons page</h1>

        <div>
          <NavLink to="/persons/add" activeStyle={{ color: 'red' }}>
            AddPerson
          </NavLink>
        </div>

        <Route path="/persons/add" render={this.addPersonForm} />
      </div>
    )
  }

  addPersonForm = () => <AddPersonForm onSubmit={this.handleAddPerson} />

  handleAddPerson = ({ firstName, lastName, email }) =>
    this.props.addPerson({ firstName, lastName, email })
}

export default connect(
  null,
  { addPerson }
)(PersonsRoute)
