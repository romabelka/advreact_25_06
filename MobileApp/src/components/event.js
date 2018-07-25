import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, Button, Alert} from 'react-native'

class Event extends Component {
    static propTypes = {};

    deleteHandler = () => {
        console.log('deleting event')
    }

    showAlertDeleting = () => Alert.alert(
        'Deleting event',
        'Are you sure?',
        [
            {text: 'Cancel', onPress: () => console.log('cancel deleting event')},
            {text: 'OK', onPress: this.deleteHandler},
        ],
        {cancelable: false}
    )

    render() {
        const {event} = this.props
        return (
            <View style={styles.container}>
                <Image source={{uri: 'http://lorempixel.com/400/200'}} style={styles.image}/>
                <Button
                    color="red"
                    title="Delete"
                    onPress={this.showAlertDeleting}
                />
                <Text style={styles.title}>{event.title}</Text>
                <Text>{event.url}</Text>
                <Text>{event.where}</Text>
                <Text>{event.when}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    title: {
        fontSize: 30
    },
    container: {
        flex: 1,
        justifyContent: 'space-around',
    }
})

export default Event
