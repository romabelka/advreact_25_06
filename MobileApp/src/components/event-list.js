import React, { Component } from 'react'
import {Text, ScrollView, StyleSheet, SectionList} from 'react-native'
import Card from './common/card'

class EventList extends Component {
    static propTypes = {

    };

  render() {
    return (
      <SectionList
        renderItem={({ item, index, section }) => (
          <Card key={item.uid}>
            <Text>{item.title}</Text>
          </Card>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
        sections={this.props.events}
        keyExtractor={(item, index) => item + index}
      />
    )
  }
}

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold'
  }
})

export default EventList