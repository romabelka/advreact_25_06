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
    return (
      <View style={styles.container}>
          <Image style = {styles.image}
                 source = {require('./assets/logo.png')}
                 resizeMode = {Image.resizeMode.contain}/>
          <EventList events={events}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%'
  }
});
