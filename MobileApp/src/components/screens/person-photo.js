import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import PersonPhoto from '../people/person-photo'

class PersonPhotoScreen extends Component {
    static propTypes = {

    };

    render() {
        return <PersonPhoto uid = {this.props.navigation.state.params.uid} />
    }

}

const styles = StyleSheet.create({
})

export default PersonPhotoScreen