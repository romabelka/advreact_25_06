import React, { Component } from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import DeleteButton from './common/delete-button'

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
                <DeleteButton />
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
        color: '#ffcb38'
    },
    container: {
        flex: 1,
        justifyContent: 'space-around',
    }
})

export default Event