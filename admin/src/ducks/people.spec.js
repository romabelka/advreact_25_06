import { call, put } from 'redux-saga/effects'
import { reset } from 'redux-form'
import { ADD_PERSON_REQUEST, ADD_PERSON_SUCCESS, addPersonSaga } from './people'
import { generateId } from './utils'

describe('Saga', () => {
  it('should add a person', () => {
    const person = {
      firstName: 'Roman',
      lastName: 'Yakobchuk',
      email: 'test@javascript.ru'
    }
    const action = {
      type: ADD_PERSON_REQUEST,
      payload: { person }
    }

    const saga = addPersonSaga(action)

    expect(saga.next().value).toEqual(call(generateId))

    const uid = generateId()

    expect(saga.next(uid).value).toEqual(
      put({
        type: ADD_PERSON_SUCCESS,
        payload: { uid, ...person }
      })
    )

    expect(saga.next().value).toEqual(put(reset('person')))

    expect(saga.next().done).toBe(true)
  })
})
