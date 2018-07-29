import React, { Component } from 'react'
import {View, Text, StyleSheet, SectionList, TouchableOpacity} from 'react-native'
import EventCard from './event-card'
import groupBy from 'lodash/groupBy'
import {observer, inject} from 'mobx-react'

@inject('events')
@observer
class EventList extends Component {
    static propTypes = {

    };

    componentDidMount = () => {
      this.props.events.getEvents()
    }

    renderLoading = () => (
        <View>
            <Text>
                Loading...
            </Text>
        </View>
    )
    
    render() {
        const { loading, list: events, error } = this.props.events

        if (loading) return this.renderLoading()
        
        const grouped = groupBy(events, event => event.title.charAt(0))
        const sections = Object.entries(grouped).map(([letter, list]) => ({
            title: `${letter}, ${list.length} events`,
            data: list.map(event => ({key: event.uid, event}))
        }))

        return <SectionList
            sections = {sections}
            renderSectionHeader = {this.getSectionRenderer}
            renderItem = {({item}) => <TouchableOpacity onPress = {this.handleEventPress(item.event)}>
                <EventCard event = {item.event} />
            </TouchableOpacity>
            }
        />
    }

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