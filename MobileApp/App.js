import React from 'react'
import {configure} from 'mobx'
import {Provider} from 'mobx-react'
import AppNavigator from './src/components/app-navigator'
import stores from './src/stores'

configure({
  enforceActions: true
})

export default class App extends React.Component {
  render() {
    return (
        <Provider {...stores}>
           <AppNavigator ref = {this.setNavRef}/>
        </Provider>
    )
  }

    setNavRef = stores.navigation.setNavRef
}
