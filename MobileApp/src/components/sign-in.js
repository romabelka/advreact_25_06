import React, { Component } from 'react'
import {View, TextInput, Text, Button, Platform} from 'react-native'
import {observer, inject} from 'mobx-react'

@inject('navigation', 'auth')
@observer
class SignIn extends Component {
    static propTypes = {

    };

    render() {
        const { email, password, isValidEmail } = this.props.auth
        return (
            <View>
                <Text>
                    Email:
                </Text>
                <TextInput
                    value = {email}
                    onChangeText = {this.handleEmailChange}
                    keyboardType = 'email-address'
                    style = {styles.input}
                />
                <Text>
                    {isValidEmail ? '' : 'Not a valid email'}
                </Text>
                <Text>
                    Password:
                </Text>
                <TextInput
                    value = {password}
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

    handleSubmit = this.props.auth.signIn

    handleEmailChange = (email) => this.props.auth.setEmail(email)
    handlePasswordChange = (password) => this.props.auth.setPassword(password)
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