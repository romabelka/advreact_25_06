import React, { Component } from 'react'
import {View, TextInput, Text, Button, Platform} from 'react-native'
import {observer, inject} from 'mobx-react'
import stores from '../stores'

@inject('navigation')
@observer
class SignIn extends Component {
    static propTypes = {

    };

    render() {
        console.log('---', stores.auth)
        return (
            <View>
                <Text>
                    Email:
                </Text>
                <TextInput
                    value = {stores.auth.email}
                    onChangeText = {this.handleEmailChange}
                    keyboardType = 'email-address'
                    style = {styles.input}
                />
                <Text>
                    Password:
                </Text>
                <TextInput
                    value = {stores.auth.password}
                    onChangeText = {this.handlePasswordChange}
                    style = {styles.input}
                    secureTextEntry
                />
                <Button
                    title = 'submit'
                    onPress = {this.handleSubmit}
                />
            </View>
        )
    }

    handleSubmit = () => {
        this.props.navigation.goTo('eventList')
    }

    handleEmailChange = stores.auth.setEmail
    handlePasswordChange = stores.auth.setPassword
}

const styles = {
    input: {
        ...Platform.select({
            ios: {
                borderBottomWidth: 1,
                borderBottomColor: 'black'
            },
            android: {

            }
        })
    }
}

export default SignIn