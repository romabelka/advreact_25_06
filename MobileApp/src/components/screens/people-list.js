import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import PeoplseList from '../people/people-list'

class PeopleListScreen extends Component {
    static propTypes = {

    };

    render() {
        return <PeoplseList />
    }
}

const styles = StyleSheet.create({
})

export default PeopleListScreen