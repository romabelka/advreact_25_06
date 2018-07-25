import React, {PureComponent} from 'react'
import {Text, StyleSheet, SectionList, Platform, View} from 'react-native'
import Card from './common/card'

function reduceEvents(events) {
    return events.reduce(function (sections, event) {
        const symbol = event.title.charAt(0).toUpperCase()
        const section = sections.find(function (item) {
            return item.title === symbol
        })
        if (section) {
            section.data.push(event)
            return sections;
        }

        sections.push({
            title: symbol,
            data: [event]
        })

        return sections
    }, []).sort((a, b) => {
        if (a.title === b.title) {
            return 0;
        }

        return a.title > b.title ? 1 : -1
    })
}

class EventList extends PureComponent {
    static propTypes = {};

    render() {
        const eventSections = reduceEvents(this.props.events)
        return (
            <SectionList
                renderItem={this.renderItem}
                renderSectionHeader={this.renderSectionHeader}
                sections={eventSections}
                keyExtractor={(item, index) => item + index}
            />
        )
    }

    renderItem = ({item, index, section}) => {
        return (
            <Card key={item.uid}>
                <View style={styles.eventTitle}><Text>{item.title}</Text></View>
                <View style={styles.eventBody}>
                    <Text>{item.when} </Text>
                    <Text>{item.where}</Text>
                </View>
            </Card>
        )
    }

    renderSectionHeader = ({section: {title}}) => (
        <Text style={styles.section}>{title}</Text>
    )
}

const styles = StyleSheet.create({
    section: {
        fontWeight: 'bold',
        padding: 5,
        margin: 10,
        backgroundColor: '#1F0772',
        color: '#fff',
        textAlign: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: {
                    width: 3, height: 3
                },
                shadowOpacity: 0.7
            },
            android: {
                elevation: 5,
            }
        }),
    },
    eventTitle: {
        backgroundColor: '#ddd',
        padding: 5,
    },
    eventBody: {
        padding: 5,
        // borderColor: '#ddd',
        // borderBottomWidth: 1,
        // borderLeftWidth: 1,
        // borderRightWidth: 1,
    }
})

export default EventList
