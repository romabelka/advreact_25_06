import React, { Component } from 'react'
import {Text, StyleSheet} from 'react-native'
import Card from '../common/card'

class PeopleCard extends Component {
    static propTypes = {

    };

    render() {
        const { people } = this.props
        return (
            <Card>
                <Text>{people.lastName} {people.firstName} {people.email}</Text>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
})

export default PeopleCard