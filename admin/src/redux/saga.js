import { all } from 'redux-saga/effects'
import { saga as peopleSaga } from '../ducks/people'
import { saga as eventsSaga } from '../ducks/events'
import { saga as authSaga } from '../ducks/auth'

export default function*() {
  yield all([authSaga(), peopleSaga(), eventsSaga()])
}
