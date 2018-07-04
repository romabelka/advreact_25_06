import { createStore, applyMiddleware } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducer'
import history from '../history'

const logger = createLogger({
  collapsed: true
})

const enhancer = applyMiddleware(thunk, routerMiddleware(history), logger)

const store = createStore(connectRouter(history)(reducer), enhancer)

//dev only, no need in production
window.store = store

export default store
