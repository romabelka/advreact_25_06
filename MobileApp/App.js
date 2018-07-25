import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import HelloWorld from './src/components/hello-world'
import SignIn from './src/components/sign-in'
import Event from './src/components/event'
import EventList from './src/components/event-list'
import data from './src/fixtures'

const events = Object.entries(data.events).map(([uid, event]) => ({...event, uid}))

export default class App extends React.Component {
  render() {
    const groupedEvents = groupEventsByName(events)
    const sectionListEvents = adjustSectionListData(groupedEvents)

    return (
      <View style={styles.container}>
          <Image style = {styles.image}
                 source = {require('./assets/logo.png')}
                 resizeMode = {Image.resizeMode.contain}/>
          <Event event={events[0]}/>
      </View>
    );
  }
}

function groupEventsByName(events) {
  return events.reduce((grouped, event) => {
  	const firstLetter = event.title[0].toUpperCase()

		if (!grouped.get(firstLetter)) {
	    grouped.set(firstLetter, [])
    }

		grouped.get(firstLetter).push(event)
    
    return grouped
  }, new Map())
}

function adjustSectionListData(eventsMap) {
  return Array.from(eventsMap, ([title, data]) => ({
  	title,
    data
  })).sort((sectionA, sectionB) => sectionA.title > sectionB.title ? 1 : -1)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  image: {
    width: '100%'
  }
});
