import React, { Component } from 'react'
import {action} from 'mobx'
import {observer, Observer} from 'mobx-react'
import {Text, StyleSheet, SectionList, TouchableOpacity} from 'react-native'
import EventCard from './event-card'
import groupBy from 'lodash/groupBy'

@observer
class EventList extends Component {
    static propTypes = {

    };

    render() {
        const grouped = groupBy(this.props.events, event => event.title.charAt(0))
        const sections = Object.entries(grouped).map(([letter, list]) => ({
            title: `${letter}, ${list.length} events`,
            data: list.map(event => ({key: event.uid, event}))
        }))
        return <SectionList
            sections = {sections}
            renderSectionHeader = {this.getSectionRenderer}
            renderItem = {({item}) => <TouchableOpacity
                onPress = {this.handleEventPress(item.event)}
                onLongPress = {this.handleLongPress(item.event)}
            >
                <EventCard event = {item.event} />
            </TouchableOpacity>
            }
        />
    }

    handleLongPress = (event) => action(() => {
        event.title = 'zzzzzz'
    })

    getSectionRenderer = ({section}) => <Text style={styles.header}>{section.title}</Text>

    handleEventPress = (event) => () => this.props.onEventPress(event)
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#F0F0F0',
        height: 40,
        lineHeight: 40,
        marginBottom: 5,
        shadowOffset: {
            height: 2, width: 0
        },
        shadowOpacity: 0.3,
        elevation: 3
    }
})

export default EventList