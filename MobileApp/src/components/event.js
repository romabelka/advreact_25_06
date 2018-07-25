import React, { Component } from 'react'
import {View, Text, Image, StyleSheet, Button, Modal} from 'react-native'

class Event extends Component {
    static propTypes = {

    };

    state = {
      modalVisible: false,
    };

    showConfirm = () => {
      this.setState({
        modalVisible: true
      })
    }

    hideConfirm = () => {
      this.setState({
        modalVisible: false
      })
    }

    render() {
        const { event } = this.props
        return (
            <View style = {styles.container}>
                <Image source = {{uri: 'http://lorempixel.com/400/200'}} style = {styles.image}/>
                <View style={styles.content}>
                  <Text style = {styles.title}>{event.title}</Text>
                  <Text>{event.url}</Text>
                  <Text>{event.where}</Text>
                  <Text>{event.when}</Text>
                </View>
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {
                    alert('Modal has been closed.');
                  }}>
                  <View style={{marginTop: 200}}>
                    <View>
                      <Text>Удалить?</Text>
                      <Button
                        onPress={this.hideConfirm}
                        title="Ok"
                        color="red"
                      />
                      <Button
                        onPress={this.hideConfirm}
                        title="Cancel"
                        color="grey"
                      />
                    </View>
                  </View>
                </Modal>
                <Button
                  onPress={this.showConfirm}
                  title="Удалить"
                  color="#fbc"
                  accessibilityLabel="Удалить событие"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 200
    },
    title: {
        fontSize: 30,
        lineHeight: 16,
        paddingTop: 20,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    content: {
      flex: 1,
      justifyContent: 'space-around',
    }
})

export default Event
