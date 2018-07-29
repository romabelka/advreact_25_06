import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import EventList from '../events/event-list'

class EventListScreen extends Component {
    static propTypes = {

    };

    render() {
        return <EventList onEventPress = {this.handleEventPress}/>
    }

    handleEventPress = ({ uid, title }) => {
        this.props.navigation.navigate('event', { uid, title })
    }
}

const styles = StyleSheet.create({
})

export default EventListScreen