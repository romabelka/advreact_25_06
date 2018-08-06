import React, {Component} from 'react'
import {View, StyleSheet, Dimensions, Modal, ActivityIndicator, Image} from 'react-native'
import Photo from '../common/photo'
import {observer, inject} from 'mobx-react'
import {observable, action} from 'mobx'

@inject('people')
@inject('navigation')
@observer
class PersonPhoto extends Component {
    static propTypes = {};

    @observable uri = null

    render() {
        if (this.uri) return this.getPreview()
        return <Photo base64 getPhoto={this.getPhoto.bind(this)} />
    }

    getPreview() {
        return <View style={styles.container}>
            <Image style={styles.preview} source={{uri: this.uri}}/>
            <Modal transparent key='loader'>
                <View style={styles.modal}>
                    <ActivityIndicator size='large'/>
                </View>
            </Modal>
        </View>
    }

    async getPhoto({base64, uri}) {
        const {uid, people, navigation} = this.props

        this.setUri(uri)
        console.log(base64)

        await people.takePhoto(uid, base64)

        navigation.goBack()

    }

    @action setUri = uri => this.uri = uri
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    preview: {
        width: '100%',
        height: '100%'
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)'
    }
})

export default PersonPhoto