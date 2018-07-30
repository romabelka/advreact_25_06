import React, { Component } from 'react'
import {Text, StyleSheet} from 'react-native'
import {MapView, Permissions, Location} from 'expo'
import {observer} from 'mobx-react'
import {observable, action} from 'mobx'

@observer
class EventMapScreen extends Component {
    static propTypes = {

    };

    @observable isGranted = false
    @observable coords = null

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.LOCATION)
        this.setStatus(status)
        const { coords } = await Location.getCurrentPositionAsync()
        this.setCoords(coords)
    }

    @action setStatus = status => this.isGranted = status === 'granted'
    @action setCoords = coords => this.coords = coords

    render() {
        if (!this.isGranted) return <Text>Not granted permissions</Text>
        if (!this.coords) return <Text>No coords yet</Text>
        return (
            <MapView
                style = {styles.container}
                initialRegion = {{
                    ...this.coords,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <MapView.Marker coordinate = {{...this.coords}}/>
            </MapView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default EventMapScreen