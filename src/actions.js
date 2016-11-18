
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT'
export function userLoggedOut() {
  return { type: USER_LOGGED_OUT }
}

export const USER_RECEIVED = 'USER_RECEIVED'
export function userReceived(user) {
  return { type: USER_RECEIVED, payload: user }
}
