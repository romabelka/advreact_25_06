import React, { Component } from 'react'
import {Button, Alert} from 'react-native'

class DeleteButton extends Component {
  static propTypes = {

  };

  handleClickButton() {
    Alert.alert(
      'Warning',
      'Are you sure?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  }

  render() {
    return (
      <Button
        onPress={() => {
          this.handleClickButton()
        }}
        title="Delete Event"
      />
    )
  }
}

export default DeleteButton