import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'
import SignIn from '../sign-in'

class AuthScreen extends Component {
    static navigationOptions = {
        title: 'auth screen'
    }

    static propTypes = {

    };

    render() {
        return (
            <SignIn onSubmit = {this.handleSubmit}/>
        )
    }

    handleSubmit = () => {
        this.props.navigation.navigate('eventList')
    }
}

const styles = StyleSheet.create({
})

export default AuthScreen