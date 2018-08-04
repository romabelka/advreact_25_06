import React, { Component } from 'react'
import Camera from '../common/camera'

class AuthScreen extends Component {
    static navigationOptions = {
        title: 'camera'
    }

    render() {
        return (
            <Camera uid={this.props.navigation.state.params.uid} />
        )
    }
}

export default AuthScreen