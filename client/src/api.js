import _ from 'lodash'

const defaultParams = {
  method: 'GET',
  mode: 'cors',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

function apiFetch (url, params = {}) {
  return window.fetch('http://localhost:3000/api/' + url, _.merge({}, defaultParams, params))
  .then((response) => {
    if(!response.ok) {
      throw Error(response.statusText)
    }
    return response.json()
  })
}

export default {
  get: function (url, params = {}) {
    return apiFetch(url, _.merge({method: 'GET'}, params))
  },
  post: function (url, params = {}) {
    if (params.body) {
      params.body = JSON.stringify(params.body)
    }
    return apiFetch(url, _.merge({method: 'POST'}, params))
  },
  put: function (url, params = {}) {
    return apiFetch(url, _.merge({method: 'PUT'}, params))
  },
  delete: function (url, params = {}) {
    return apiFetch(url, _.merge({method: 'DELETE'}, params))
  }
}
