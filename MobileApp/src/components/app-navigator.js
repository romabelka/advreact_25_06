import {createStackNavigator, createSwitchNavigator, createBottomTabNavigator} from 'react-navigation'
import AuthScreen from './screens/auth'
import SplashScreen from './screens/splash'
import EventListScreen from './screens/event-list'
import EventScreen from './screens/event'
import PeopleScreen from './screens/people-list'

const EventStack = createStackNavigator({
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

const PeopleStack = createStackNavigator({
    peopleList: {
        screen: PeopleScreen,
        createStackNavigator: {
            title: 'people'
        }
    }
})

const AppStack = createBottomTabNavigator({
    Events: EventStack,
    People: PeopleStack
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