import AuthStore from './auth'
import NavigationStore from './navigation'
import EventsStore from './events'
import PeopleStore from './people'

export default {
    auth: new AuthStore(),
    navigation: new NavigationStore(),
    events: new EventsStore(),
    people: new PeopleStore(),
}