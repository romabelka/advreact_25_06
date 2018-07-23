import React from 'react'
import ReactDOM from 'react-dom'
import { ConnectedRouter } from 'connected-react-router'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { Provider } from 'react-redux'
import App from './App'
import history from './history'
import store from './redux'
import './mocks'

ReactDOM.render(
  <DragDropContextProvider backend={HTML5Backend}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </DragDropContextProvider>,
  document.getElementById('root')
)
