import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
import {View, StyleSheet, ActivityIndicator} from 'react-native'
import EventList from '../events/event-list'

@inject('events') @observer
class EventListScreen extends Component {
    static propTypes = {

    };

    static navigationOptions = {
        title: 'Event List'
    }

    componentDidMount() {
        this.props.events.loadAll()
    }

    render() {
        const {events} = this.props
        if (events.loading) return this.getLoader()
        return <EventList onEventPress = {this.handleEventPress} events = {events.list}/>
    }

    getLoader() {
        return <View><ActivityIndicator size='large'/></View>
    }

    handleEventPress = ({ uid }) => {
        this.props.navigation.navigate('event', { uid })
    }
}

const styles = StyleSheet.create({
})

export default EventListScreen