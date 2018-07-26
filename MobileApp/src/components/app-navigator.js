import {createStackNavigator} from 'react-navigation'
import AuthScreen from './screens/auth'
import EventListScreen from './screens/event-list'
import EventScreen from './screens/event'

export default createStackNavigator({
    auth: {
        screen: AuthScreen
    },
    eventList: {
        screen: EventListScreen,
        navigationOptions: {
            title: 'events'
        }
    },
    event: {
        screen: EventScreen
    }
})