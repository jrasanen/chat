import {
  USER_RECEIVED,
  USER_LOGGED_OUT
} from './actions'

import _ from 'lodash'

function user(state = {
  data: null,
  registerRequested: false,
  registerFailed: false
}, action) {
  switch(action.type) {
    case USER_RECEIVED:
      return {...state, data: action.payload}
    case USER_LOGGED_OUT:
      return {...state, data: null}
    default:
      return state
  }
}

export default {
  user,
}
