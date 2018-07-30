import React, { Component } from 'react'
import {observer} from 'mobx-react'
import {View, Text, Image, StyleSheet, Button, TouchableOpacity} from 'react-native'
import {web} from 'react-native-communications'
import ConfirmModal from '../common/confirm-modal'

@observer
class Event extends Component {
    static propTypes = {

    };

    state = {
        confirmModal: false
    }

    render() {
        const {event} = this.props
        return (
            <View style = {styles.container}>
                <Text style = {[styles.text, styles.header]}>{event.title}</Text>
                <View>
                    <Image
                        source={{uri: 'http://lorempixel.com/200/100/technics'}}
                        style={styles.image}
                    />
                    <Text>{event.when}</Text>
                    <Text>{event.where}</Text>
                </View>
                <TouchableOpacity onPress = {this.handleUrlPress}>
                    <Text style = {styles.text}>
                            {event.url}
                    </Text>
                </TouchableOpacity>
                <View style = {styles.button}>
                    <Button
                        onPress={this.handleDelete}
                        title="Delete Event"
                        color="#F55"
                    />
                </View>
                <ConfirmModal visible = {this.state.confirmModal}
                              onConfirm = {this.confirmDelete}
                              onCancel = {this.cancelDelete}
                >
                    Are you sure you want to delete "{event.title}"
                </ConfirmModal>
            </View>
        )
    }

    handleUrlPress = () => web(this.props.event.url)

    handleDelete = () => {
        this.setState({
            confirmModal: true
        })
    }

    confirmDelete = () => this.setState({ confirmModal: false })
    cancelDelete = () => this.setState({ confirmModal: false })
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#F2F2F2',
        shadowColor: '#000',
        shadowOpacity: 0.8,
        shadowOffset: {
            height: 2,
            width: 0
        },
        elevation: 5
    },
    text: {
        width: '100%',
        height: 100,
        marginBottom: 20,
        textAlign: 'center'
    },
    image: {
        width: 200,
        height: 100
    },
    button: {
        width: '100%',
        height: 100,
        marginBottom: 30
    }
})

export default Event