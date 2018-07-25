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
                <View style = {styles.desc}>
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
        width: '100%',
        height: 200
    },
    title: {
        fontSize: 30
    },
    container: {
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    desc: {
        padding: 15
    }
})

export default Event