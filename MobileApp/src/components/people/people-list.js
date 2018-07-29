import React, { Component } from 'react'
import {Text, StyleSheet, SectionList, TouchableOpacity} from 'react-native'
import PeopleCard from './people-card'
import groupBy from 'lodash/groupBy'

class PeopleList extends Component {
  static propTypes = {

  };

  render() {
    const grouped = groupBy(this.props.people, people => people.lastName.charAt(0))
    const sections = Object.entries(grouped).map(([letter, list]) => ({
      title: `${letter}, ${list.length} people`,
      data: list.map(people => ({key: people.uid, people}))
    }))
    return <SectionList
      sections = {sections}
      renderSectionHeader = {this.getSectionRenderer}
      renderItem = {({item}) => <PeopleCard people = {item.people} />}
    />
  }

  getSectionRenderer = ({section}) => <Text style={styles.header}>{section.title}</Text>
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#F0F0F0',
    height: 40,
    lineHeight: 40,
    marginBottom: 5,
    shadowOffset: {
      height: 2, width: 0
    },
    shadowOpacity: 0.3,
    elevation: 3
  }
})

export default PeopleList