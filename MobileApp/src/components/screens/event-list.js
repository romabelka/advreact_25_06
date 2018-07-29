import React, { Component } from 'react'
import {StyleSheet, Text} from 'react-native'
import {observer, inject} from 'mobx-react'
import EventList from '../events/event-list'
import data from '../../fixtures'
import loadEvents from '../../actions/events'

@inject('events')
@observer
class EventListScreen extends Component {
    static propTypes = {

    };

    componentDidMount() {
      loadEvents()
    }

    render() {
        const {data, loading} = this.props.events
        if(loading) {
          return <Text>Loading...</Text>
        }
        return <EventList events = {data} onEventPress = {this.handleEventPress}/>
    }

    handleEventPress = ({ uid, title }) => {
        this.props.navigation.navigate('event', { uid, title })
    }
}

const styles = StyleSheet.create({
})

export default EventListScreen