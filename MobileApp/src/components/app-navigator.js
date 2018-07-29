import {createStackNavigator, createSwitchNavigator} from 'react-navigation'
import AuthScreen from './screens/auth'
import SplashScreen from './screens/splash'
import EventListScreen from './screens/event-list'
import EventScreen from './screens/event'
import PeopleScreen from './screens/people-list'

const AppStack = createStackNavigator({
    eventList: {
        screen: EventListScreen,
        navigationOptions: {
            title: 'events'
        }
    },
    event: {
        screen: EventScreen
    },
    peopleList: {
        screen: PeopleScreen,
        createStackNavigator: {
            title: 'people'
        }
    }
})

const AuthStack = createStackNavigator({
    auth: {
        screen: AuthScreen
    }
})

export default createSwitchNavigator(
  {
    Splash: SplashScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: 'Splash',
  }
)