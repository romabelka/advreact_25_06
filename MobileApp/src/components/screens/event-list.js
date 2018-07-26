import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import EventList from '../events/event-list'
import data from '../../fixtures'

const events = Object.entries(data.events).map(([uid, event]) => ({...event, uid}))

class EventListScreen extends Component {
    static propTypes = {

    };

    render() {
        return <EventList events = {events} onEventPress = {this.handleEventPress}/>
    }

    handleEventPress = ({ uid, title }) => {
        this.props.navigation.navigate('event', { uid, title })
    }
}

const styles = StyleSheet.create({
})

export default EventListScreen