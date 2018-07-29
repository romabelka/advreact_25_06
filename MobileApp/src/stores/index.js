import '../config'
import AuthStore from './auth'
import CustomNavigationStore from './custom-navigation'
import EventsStore from './events'
import PeopleStore from './people';

export default {
    auth: new AuthStore(),
    customNavigation: new CustomNavigationStore(),
    events: new EventsStore(),
    people: new PeopleStore()
}