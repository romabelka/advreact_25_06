import AuthStore from './auth'
import NavigationStore from './navigation'

export default {
    auth: new AuthStore(),
    navigation: new NavigationStore()
}