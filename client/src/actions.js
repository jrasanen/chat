import jwtDecode from 'jwt-decode';
import Api from './api'
import Cookie from './cookie'

export const TOKEN_EXPIRED = 'TOKEN_EXPIRED'
export function tokenExpired() {
  return { type: TOKEN_EXPIRED }
}

export const USER_LOGGED_OUT = 'USER_LOGGED_OUT'
export function userLoggedOut() {
  return { type: USER_LOGGED_OUT }
}

export const USER_RECEIVED = 'USER_RECEIVED'
export function userReceived(user) {
  let token = jwtDecode(user)
  return { type: USER_RECEIVED, payload: token }
}

export const TOKEN_RECEIVED = 'TOKEN_RECEIVED'
export function tokenReceived (token) {
  return { type: TOKEN_RECEIVED, payload: token }
}

export const ENTRY_RECEIVED = 'ENTRY_RECEIVED'
export function entryReceived (entry) {
  return { type: ENTRY_RECEIVED, payload: entry }
}

export function signupUser(username, password) {
  return function (dispatch) {
    return Api.post('users', { body: { username: username, password: password } })
    .then(function (user) {
      return dispatch(userReceived(user.data))
    })
  }
}

export function signinUser(username, password) {
  return function (dispatch) {
    return Api.post('sessions', { body: { username: username, password: password } })
    .then(function (user) {
      Cookie.set('keksi', user.data)
      dispatch(tokenReceived(user.data))
      return dispatch(userReceived(user.data))
    })
  }
}

export function fetchUser() {
  return function (dispatch) {
    let data = Cookie.get('keksi')
    if (data) {
      dispatch(tokenReceived(data))
      return dispatch(userReceived(data))
    }
  }
}

export function entryNew(entry) {
  return { type: 'server/entry', data: entry }
}
