import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Camera, Permissions } from 'expo'
import {inject} from 'mobx-react'

@inject('people')
export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  flipCamera = () => {
    this.setState({
        type: this.state.type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    })
  }

  takePicture = async () => {
      if (this.camera) {
        let photo = await this.camera.takePictureAsync({base64: true})
        await this.props.people.updateAvatar(photo.base64, this.props.uid)

        this.props.goBack()
      }
  }

  render() {
    const { hasCameraPermission } = this.state

    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={styles.camera} type={this.state.type} ref={ref => { this.camera = ref }}>
            <View style={styles.textContainer}>
                <TouchableOpacity style={styles.flip} onPress={this.flipCamera}>
                    <Text style={styles.flipText}>
                        {' '}Flip{' '}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={this.takePicture} />
            </View>
          </Camera>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        flexDirection: 'row',
        height: 100,
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    flip: {
        flex: 0.1,
        alignItems: 'center'
    },
    flipText: {
        fontSize: 18,
        marginBottom: 10,
        color: 'white'
    },
    button: {
        height: 60,
        width: 60,
        borderRadius: 100,
        backgroundColor: 'red'
    },
    camera: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    }
})