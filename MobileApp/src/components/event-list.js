import React, { Component } from 'react'
import {Text, StyleSheet, SectionList} from 'react-native'
import Card from './common/card'

class EventList extends Component {
    static propTypes = {

    };

    render() {
      const sections = getSections(this.props.events)
      return (
        <SectionList
          renderItem={({item}) => (
            <Card key={item.uid}>
              <Text>{item.title}</Text>
            </Card>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={{fontWeight: 'bold'}}>{title}</Text>
          )}
          sections={sections}
          keyExtractor={(item, index) => item.uid + index}
        />
      )
    }
}

function getSections(events) {
  const titles = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let sections = []
  titles.split("").forEach(char => {
    sections.push({title: char, data: []})
  })
  events.forEach(event => {
    sections.forEach(obj => {
      if (obj.title === event.title.toUpperCase()[0]) {
        obj.data.push(event)
      }
    })
  })
  return sections
}

const styles = StyleSheet.create({
})

export default EventList
