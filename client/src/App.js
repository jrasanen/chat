import React, { Component } from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import { reducer as formReducer } from 'redux-form'
import { syncHistoryWithStore, routerReducer, routerActions, routerMiddleware } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'

import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client'

import reducers from './reducers'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import AppView from './containers/App'
import Index from './containers/Index'
import Home from './containers/Home'
import Login from './containers/Login'

import { fetchUser } from './actions'

import './App.scss'

import Cookie from './cookie'

let token = Cookie.get('keksi')
if (!token) {
  token = 'unauthorized'
}
const socket = io('localhost:3001', {
  query: {
    token: token
  },
  transports: ['websocket'],
  upgrade: false
})
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/')

const logger = createLogger()
const routingMiddleware = routerMiddleware(browserHistory)
const enhancers = compose(
  applyMiddleware(thunk, logger),
  applyMiddleware(routingMiddleware),
  applyMiddleware(socketIoMiddleware),
)
const allReducers = {
  ...reducers,
  routing: routerReducer,
  form: formReducer
}
const store = createStore(combineReducers(allReducers), enhancers)
const history = syncHistoryWithStore(browserHistory, store)

// Redirects to /login by default
store.dispatch(fetchUser())

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user.data, // how to get the user state
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
})
const Authenticated = UserIsAuthenticated((props) => props.children);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={AppView}>
            <IndexRoute component={Index} />
            <Route path="login" component={Login} />
            <Route component={Authenticated}>
              <Route path="home" component={Home} />
            </Route>
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default App;
