import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { EventsTableVirtualized } from './events-table-virtualized'
import Loader from '../common/loader'

Enzyme.configure({ adapter: new Adapter() })

describe('EventsTableVirtualized', () => {
  it('should render a loader', () => {
    const container = shallow(
      <EventsTableVirtualized loading events={[]} fetchLazyEvents={() => {}} />
    )

    expect(container.contains(<Loader />)).toBe(true)
  })

  it('should fetch lazy events', (done) => {
    shallow(<EventsTableVirtualized fetchLazyEvents={done} events={[]} />)
  })
})
