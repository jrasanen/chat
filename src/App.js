import React, { Component } from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import Index from './containers/Index'

const logger = createLogger()
const enhancers = applyMiddleware(thunk, logger)
const allReducers = {
  ...reducers,
  routing: routerReducer
}
const store = createStore(combineReducers(allReducers), enhancers)
const history = syncHistoryWithStore(browserHistory, store)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="*" component={Index} />
        </Router>
      </Provider>
    );
  }
}

export default App;
