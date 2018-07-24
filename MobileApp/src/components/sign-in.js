import React, { Component } from 'react'
import {View, TextInput, Text, Button, Platform} from 'react-native'


class SignIn extends Component {
    static propTypes = {

    };

    state = {
        email: '',
        password: ''
    }

    render() {
        return (
            <View>
                <Text>
                    Email:
                </Text>
                <TextInput
                    value = {this.state.email}
                    onChangeText = {this.handleEmailChange}
                    keyboardType = 'email-address'
                    style = {styles.input}
                />
                <Text>
                    Password:
                </Text>
                <TextInput
                    value = {this.state.password}
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

    handleSubmit = () => console.log(this.state)

    handleEmailChange = (email) => this.setState({ email })
    handlePasswordChange = (password) => this.setState({ password })
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