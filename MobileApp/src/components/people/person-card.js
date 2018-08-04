import React, { Component } from 'react'
import {View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native'
import Card from '../common/card'
import {inject} from 'mobx-react'

@inject('navigation')
class PersonCard extends Component {
    static propTypes = {

    };

    render() {
        const { email, firstName, lastName, uid, avatar } = this.props.person
        return (
            <TouchableHighlight onLongPress={this.openCamera.bind(null, uid)}>
                <Card style = {styles.container}>
                    <Image source={{uri: avatar || 'http://lorempixel.com/200/100/people/'}} style = {styles.avatar}/>
                    <View style = {styles.content}>
                        <Text style = {styles.email}>{email}</Text>
                        <Text>{firstName} {lastName}</Text>
                    </View>
                </Card>
            </TouchableHighlight>
        )
    }

    openCamera = (uid) => {
        this.props.navigation.goTo('camera', { uid })
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    avatar: {
        width: 200,
        height: 100,
        margin: 5
    },
    content: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    email: {
        fontWeight: 'bold'
    }
})

export default PersonCard