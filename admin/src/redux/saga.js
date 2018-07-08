import { all } from 'redux-saga/effects'
import { saga as peopleSaga } from '../ducks/people'
import { saga as eventSaga } from '../ducks/event'
import { saga as authSaga } from '../ducks/auth'

export default function*() {
  yield all([authSaga(), peopleSaga(), eventSaga()])
}
