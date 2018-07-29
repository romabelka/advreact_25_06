import {createStackNavigator, createBottomTabNavigator, createSwitchNavigator} from 'react-navigation'
import AuthScreen from './screens/auth'
import EventListScreen from './screens/event-list'
import EventScreen from './screens/event'
import PeopleScreen from './screens/people'

const EventListStack = createStackNavigator({
  eventList: {
    screen: EventListScreen,
    navigationOptions: {
      title: 'events'
    }
  },
  event: EventScreen,
});

const PeopleStack = createSwitchNavigator({
  people: PeopleScreen,
});

const BottomStack = createBottomTabNavigator(
  {
    eventList: EventListStack,
    people: PeopleStack,
  }
);

export default createStackNavigator({
    auth: AuthScreen,
    eventList: BottomStack,
    people: BottomStack
})