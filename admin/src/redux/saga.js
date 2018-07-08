import { all } from 'redux-saga/effects'
import { saga as authSaga } from '../ducks/auth'
import { saga as eventsSaga } from '../ducks/events'
import { saga as peopleSaga } from '../ducks/people'

export default function*() {
  yield all([authSaga(), eventsSaga(), peopleSaga()])
}
