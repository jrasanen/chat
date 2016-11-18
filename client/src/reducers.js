import _ from 'lodash'

import {
  USER_RECEIVED,
  USER_LOGGED_OUT,
  TOKEN_EXPIRED,
  TOKEN_RECEIVED,
  ENTRY_RECEIVED
} from './actions'


function user(state = {
  data: null,
  registerRequested: false,
  registerFailed: false,
  token: null
}, action) {
  switch(action.type) {
    case TOKEN_EXPIRED:
      return {...state, data: null }
    case USER_RECEIVED:
      return {...state, data: action.payload}
    case USER_LOGGED_OUT:
      return {...state, data: null}
    case TOKEN_RECEIVED:
      return {...state, token: action.payload}
    default:
      return state
  }
}


function entries(state = {
  data: []
}, action) {
  console.log("ACT", action)
  switch (action.type) {
    case 'ENTRY_RECEIVED':
      console.log("YES", action.payload)
      return { data: [ ...state.data, action.payload ] }
    default:
      return state
  }
}

export default {
  user,
  entries,
}
