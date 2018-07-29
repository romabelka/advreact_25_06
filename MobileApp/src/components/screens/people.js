import React, { Component } from 'react'
import {StyleSheet, Text} from 'react-native'
import {observer, inject} from 'mobx-react'
import PeopleList from '../people/people-list'
import data from '../../fixtures'
import loadPeople from '../../actions/people'

@inject('people')
@observer
class EventListScreen extends Component {
  static propTypes = {

  };

  componentDidMount() {
    loadPeople()
  }

  render() {
    const {data, loading} = this.props.people
    if(loading) {
      return <Text>Loading...</Text>
    }
    return <PeopleList people = {data} />
  }
}

const styles = StyleSheet.create({
})

export default EventListScreen