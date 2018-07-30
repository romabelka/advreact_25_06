import React, { Component } from 'react'
import {inject, observer} from 'mobx-react'
import Event from '../events/event'

@inject('events') @observer
class EventScreen extends Component {
    static propTypes = {

    };

    static navigationOptions = {
        title: 'event'
    }

    render() {
        return <Event event = {this.props.events.entities[this.props.navigation.state.params.uid]}/>
    }
}

export default EventScreen