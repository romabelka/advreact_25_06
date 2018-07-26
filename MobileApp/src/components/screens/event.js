import React, { Component } from 'react'
import {View, StyleSheet, Text} from 'react-native'

class EventScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        console.log('---', navigation.state)
        return {
            title: navigation.state.params.title || navigation.state.params.uid
        }
    }

    render() {
        return (
            <View>
                <Text>Event</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
})

export default EventScreen