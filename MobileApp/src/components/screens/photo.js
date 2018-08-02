import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
import {View, ActivityIndicator} from 'react-native'

import Photo from '../photo/photo'

@inject('photo')
@observer
class PhotoScreen extends Component {
  static propTypes = {

  };

  static navigationOptions = {
    title: 'photo'
  }

  render() {
    if(this.props.photo.loading) {
      return <View><ActivityIndicator size='large'/></View>
    }
    return <Photo onSnap = {this.handleSnap}/>
  }

  handleSnap = ({uri}) => {
    const {uid, type} = this.props.navigation.state.params
    this.props.photo.loadPhoto(uri, type, uid)
  }
}

export default PhotoScreen