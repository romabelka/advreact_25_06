import {NavigationActions} from 'react-navigation'
import {autorun} from 'mobx'

class CustomNavigationStore {
    ref = null

    setNavRef = ref => {
        this.ref = ref
    }

    goTo = routeName => this.ref.dispatch(NavigationActions.navigate({
        routeName
    }))
}

export default CustomNavigationStore