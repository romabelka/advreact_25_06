import React, { Component } from 'react'
import {Text, ScrollView, StyleSheet} from 'react-native'
import Card from './common/card'

class EventList extends Component {
    static propTypes = {

    };

    render() {
        return (
            <ScrollView>
                {this.props.events.map(event =>
                    <Card key = {event.uid}>
                        <Text>{event.title}</Text>
                    </Card>
                )}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
})

export default EventList