import { call, put } from 'redux-saga/effects'
import { reset } from 'redux-form'
import { ADD_PERSON, ADD_PERSON_SUCCESS, addPersonSaga } from './people'
import { generateId } from './utils'

describe('Saga', () => {
  it('should add a person', () => {
    const person = {
      firstName: 'Roman',
      lastName: 'Yakobchuk',
      email: 'test@javascript.ru'
    }
    const action = {
      type: ADD_PERSON,
      payload: { person }
    }

    const saga = addPersonSaga(action)

    expect(saga.next().value).toEqual(call(generateId))

    const id = generateId()

    expect(saga.next(id).value).toEqual(
      put({
        type: ADD_PERSON_SUCCESS,
        payload: { id, ...person }
      })
    )

    expect(saga.next().value).toEqual(put(reset('person')))

    expect(saga.next().done).toBe(true)
  })
})
