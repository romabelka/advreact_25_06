import {NavigationActions} from 'react-navigation'

class NavigationStore {
    ref = null

    setNavRef = ref => this.ref = ref

    goTo = routeName => this.ref.dispatch(NavigationActions.navigate({
        routeName
    }))
}

export default NavigationStore