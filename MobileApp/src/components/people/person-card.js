import React, { Component } from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import Card from '../common/card'

class PersonCard extends Component {
    static propTypes = {

    };

    render() {
        const { email, firstName, lastName, image } = this.props.person
        const uri = image ? image : 'https://www.aramsco.com//ASSETS/IMAGES/ITEMS/DETAIL_PAGE/NoImage.png';
        return (
            <Card style = {styles.container}>
                <Image source={{uri}} style = {styles.avatar}/>
                <View style = {styles.content}>
                    <Text style = {styles.email}>{email}</Text>
                    <Text>{firstName} {lastName}</Text>
                </View>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    avatar: {
        width: 200,
        height: 200,
        margin: 5,
        alignSelf: 'center',
    },
    content: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    email: {
        fontWeight: 'bold'
    }
})

export default PersonCard