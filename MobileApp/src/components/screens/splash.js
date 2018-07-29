import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {observer, inject} from 'mobx-react'
import {action} from 'mobx'
import firebase from 'firebase'

@inject('auth', 'customNavigation')
@observer
class SplashScreen extends Component {
    state = {}

    componentDidMount() {
        firebase.auth().onAuthStateChanged(action(user => {
            const { goTo } = this.props.customNavigation
            
            this.props.auth.setUser = user
            user ? goTo('peopleList') : goTo('auth')
        }))
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Hello
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SplashScreen