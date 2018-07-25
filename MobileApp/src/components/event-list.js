import React, { Component } from 'react'
import { View, Text, SectionList, StyleSheet} from 'react-native'
import Card from './common/card'

class EventList extends Component {
    static propTypes = {

    };

    render() {
        return <SectionList
            renderItem={({ item, index }) => (
                <Card event={item} key={index}>
                    <Text>{item.title}</Text>
                    <Text>{item.when}</Text>
                    <Text>{item.where}</Text>
                </Card>
            )}
            keyExtractor={(item, index) => item + index}
            sections={this.props.events}
            renderSectionHeader={({ section }) => {
                // debugger
                return (
                    <View style={styles.header}>
                        <Text style={styles.title}>{section.title}</Text>
                        <Text style={styles.count}>{`Number of Events: ${section.data.length}`}</Text>
                    </View>
                )
            }}
        />
    }
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 2
    },
    title: {
        fontWeight: 'bold',
        backgroundColor: 'white'
    },
    count: {
        fontWeight: 'bold',
        backgroundColor: 'white'
    }
})

export default EventList