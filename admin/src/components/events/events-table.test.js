import React from 'react'
import { shallow } from 'enzyme'
import { EventsTable } from './events-table'
import mockedEvents from '../../mocks/conferences'
import Loader from '../common/loader'

const events = mockedEvents.map((event, index) => ({
  ...event,
  uid: index.toString()
}))

describe('EventsTable', () => {
  it('should render a loader', () => {
    const container = shallow(<EventsTable loading fetchAllEvents={() => {}} />)

    expect(container.contains(<Loader />)).toBe(true)
  })

  it('should render a list of events', () => {
    const container = shallow(<EventsTable events={events} />, {
      disableLifecycleMethods: true
    })

    expect(container.find('.test--events__item').length).toEqual(events.length)
  })

  it('should fetch all events', (done) => {
    shallow(<EventsTable fetchAllEvents={done} events={[]} />)
  })

  it('should select an event', () => {
    let selectedId
    const container = shallow(
      <EventsTable
        selectEvent={(id) => (selectedId = id)}
        fetchAllEvents={() => {}}
        events={events}
      />
    )

    container
      .find('.test--events__item')
      .first()
      .simulate('click')

    expect(selectedId).toEqual(events[0].uid)
  })
})
