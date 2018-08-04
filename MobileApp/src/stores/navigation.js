import {NavigationActions, StackActions} from 'react-navigation'
import {autorun} from 'mobx'
import BasicStore from './basic-store'

class NavigationStore extends BasicStore {
    ref = null

    setNavRef = ref => {
        this.ref = ref
        this.onReady()
    }

    onReady = () => {
        let firstRun = true

        autorun(() => {
            const authenticated = !!this.getStore('auth').user

            if (!firstRun) {
                authenticated
                    ? this.reset('lists')
                    : this.reset('auth')
            }

            firstRun = false
        })

    }

    goTo = (routeName, params) => {
        this.ref.dispatch(NavigationActions.navigate({
            routeName,
            params: {
                ...params
            }
        }))
    }

    reset = routeName => this.ref.dispatch(StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName })
        ]
    }))
}

export default NavigationStore