import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
import {View, StyleSheet, ActivityIndicator} from 'react-native'
import PeopleList from '../people/people-list'

@inject('people', 'navigation') @observer
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
        if (people.loading) return this.getLoader()
        return <PeopleList onPersonPress={this.handlePersonPress}/>
    }

    getLoader() {
        return <View><ActivityIndicator size='large'/></View>
    }

    handlePersonPress = ({uid}) => {
      this.props.navigation.navigate('photo', { uid, type: 'people' })
    }
}

const styles = StyleSheet.create({
})

export default PeopleListScreen