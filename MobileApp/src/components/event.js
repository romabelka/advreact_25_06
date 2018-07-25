import React, { Component } from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'

class Event extends Component {
    static propTypes = {

    };

    render() {
        const { event } = this.props
        return (
            <View style = {styles.container}>
                <Image source = {{uri: 'http://lorempixel.com/400/200'}} style = {styles.image}/>
                <View style={styles.content}>
                  <Text style = {styles.title}>{event.title}</Text>
                  <Text>{event.url}</Text>
                  <Text>{event.where}</Text>
                  <Text>{event.when}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 200
    },
    title: {
        fontSize: 30,
        lineHeight: 16,
        paddingTop: 20,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    content: {
      flex: 1,
      justifyContent: 'space-around',
    }
})

export default Event
