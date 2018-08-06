import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
import {View, StyleSheet, ActivityIndicator} from 'react-native'
import PeopleList from '../people/people-list'

@inject('people') @observer
class PeopleListScreen extends Component {
    static propTypes = {

    };

    static navigationOptions = {
        title: 'People List'
    }

    componentDidMount() {
        const {people} = this.props
        if (!people.loaded && !people.loading) people.loadAll()
    }

    render() {
        const {people} = this.props
        if (people.loading) return this.loader
        return <PeopleList onPersonPress = {this.handlePersonPress}/>
    }

    get loader() {
        return <View><ActivityIndicator size='large'/></View>
    }

    handlePersonPress = uid => {
        this.props.navigation.navigate('personPhoto', { uid })
    }
}

const styles = StyleSheet.create({
})

export default PeopleListScreen