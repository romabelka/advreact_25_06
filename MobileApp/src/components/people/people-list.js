import React, { Component } from 'react'
import {View, Text, StyleSheet, SectionList, TouchableOpacity} from 'react-native'
import groupBy from 'lodash/groupBy'
import PersonCard from './person-card'
import {observer, inject} from 'mobx-react'

@inject('people')
@observer
class PeopleList extends Component {
    componentDidMount = () => {
        this.props.people.getPeople()
    }

    renderLoading = () => (
        <View>
            <Text>
                Loading...
            </Text>
        </View>
    )
    
    renderEmpty = () => (
        <View>
            <Text>
                There are no people
            </Text>
        </View>
    )
    
    render() {
        const { loading, list: people, error } = this.props.people
        console.log('----- rendering peopleList', people)

        if (loading) return this.renderLoading()
        if (!people) return this.renderEmpty()
        
        const grouped = groupBy(people, person => person.firstName.charAt(0))
        const sections = Object.entries(grouped).map(([letter, list]) => ({
                title: `${letter}, ${list.length} people`,
                data: list.map(person => ({key: person.uid, person}))
            })
        )

        return <SectionList
            sections = {sections}
            renderSectionHeader = {this.getSectionRenderer}
            renderItem = {({item}) => (
                <View>
                    <PersonCard person = {item.person} />
                </View>
            )}
        />
    }

    getSectionRenderer = ({section}) => <Text style={styles.header}>{section.title}</Text>
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#F0F0F0',
        height: 40,
        lineHeight: 40,
        marginBottom: 5,
        shadowOffset: {
            height: 2, width: 0
        },
        shadowOpacity: 0.3,
        elevation: 3
    }
})

export default PeopleList