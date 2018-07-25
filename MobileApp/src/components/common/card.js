import React, {Component} from 'react'
import {View, StyleSheet, Platform} from 'react-native'

class Card extends Component {
  static propTypes = {};

  render() {
    return (
      <View style={styles.container}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // ...Platform.select({
    //   ios: {
    //     shadowColor: '#000',
    //     shadowOffset: {
    //       width: 3, height: 3
    //     },
    //     shadowOpacity: 0.7
    //   },
    //   android: {
    //    // elevation: 5,
    //   }
    // }),
    margin: 10,
    borderColor: '#ddd',
    borderWidth:1,
  }
})

export default Card
