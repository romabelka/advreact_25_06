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
                <Text style = {styles.title}>{event.title}</Text>
                <Text>{event.url}</Text>
                <Text>{event.where}</Text>
                <Text>{event.when}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: 400,
        height: 200
    },
    title: {
        fontSize: 30
    },
    container: {
        flex: 1,
        justifyContent: 'space-around',
    }
})

export default Event