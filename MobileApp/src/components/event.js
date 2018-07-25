import React, { Component } from 'react'
import {View, Text, Image, StyleSheet, TouchableHighlight, Alert} from 'react-native'

class Event extends Component {
    static propTypes = {

    };
    
    onPress = () => {
        Alert.alert(
            'Warning!',
            'Are you sure you want to delete an event?',
            [
                {text: 'Yes'},
                {text: 'No'}
            ],
            { cancelable: false }
        )
    }

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
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.onPress}
                >
                    <Text>Delete an event</Text>
                </TouchableHighlight>
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
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    }
})

export default Event