import axios from 'axios'
import URI from 'urijs'
import deepMerge from 'deepmerge'
import EventEmitter from 'event-emitter'
import Auth from './auth'
import Events from './events'
import File from './file'
import Files from './files'
import Friends from './friends'
import Family from './family'
import OAuth from './oauth'
import Payment from './payment'
import RSS from './rss'
import Transfers from './transfers'
import Trash from './trash'
import Tunnel from './tunnel'
import User from './user'
import Zips from './zips'
import IFTTT from './ifttt'

class PutioApiClient {
  constructor(options = {}) {
    EventEmitter(this)
    this.options = Object.assign({}, PutioApiClient.DEFAULT_OPTIONS, options)
    this.Auth = new Auth(this)
    this.Events = new Events(this)
    this.Files = new Files(this)
    this.File = new File(this)
    this.Friends = new Friends(this)
    this.Family = new Family(this)
    this.OAuth = new OAuth(this)
    this.Payment = new Payment(this)
    this.RSS = new RSS(this)
    this.Transfers = new Transfers(this)
    this.Trash = new Trash(this)
    this.Tunnel = new Tunnel(this)
    this.User = new User(this)
    this.Zips = new Zips(this)
    this.IFTTT = new IFTTT(this)
  }

  setToken(token) {
    this.options.token = token
    return this
  }

  setAdminToken(token) {
    this.options.adminToken = token
    return this
  }

  setBaseURL(url) {
    this.options.baseURL = url
    return this
  }

  setDebug(debug) {
    this.options.debug = debug
    return this
  }

  get(url, options = {}) {
    url = `${this.options.baseURL}${url}`
    return this.end(url, { method: 'get', ...options })
  }

  post(url, options = {}) {
    url = `${this.options.baseURL}${url}`
    return this.end(url, { method: 'post', ...options })
  }

  put(url, options = {}) {
    url = `${this.options.baseURL}${url}`
    return this.end(url, { method: 'put', ...options })
  }

  delete(url, options = {}) {
    url = `${this.options.baseURL}${url}`
    return this.end(url, { method: 'delete', ...options })
  }

  end(url, requestOptions) {
    const { body } = requestOptions

    requestOptions = deepMerge({
      headers: {
        Accept: 'application/json',
        Pragma: 'no-cache',
        'If-Modified-Since': 'Mon, 26 Jul 1997 05:00:00 GMT',
        'Cache-Control': 'no-cache',
      },
    }, requestOptions)

    // Keep the body clean, to prevent loose of formData
    requestOptions.body = body

    if (this.options.token) {
      requestOptions.headers.Authorization = `token ${this.options.token}`
    }

    if (this.options.adminToken) {
      requestOptions.headers['Putio-Admin-Token'] = this.options.adminToken
    }

    if (requestOptions.query) {
      url = new URI(url)
        .query(requestOptions.query)
        .toString()
    }

    if (!this.options.isomorphic) {
      if (requestOptions.body) {
        requestOptions.body = JSON.stringify(requestOptions.body)
        requestOptions.headers['content-type'] = 'application/json'
      }

      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open(
          requestOptions.method,
          url,
        )

        Object.keys(requestOptions.headers).forEach((key) => {
          xhr.setRequestHeader(key, requestOptions.headers[key])
        })

        xhr.onreadystatechange = () => {
          if (xhr.readyState !== 4) {
            return
          }

          const response = {
            status: xhr.status,
          }

          if (xhr.responseText) {
            try {
              response.body = JSON.parse(xhr.responseText)
            } catch (error) {
              response.body = xhr.responseText
            }
          } else {
            response.body = {}
          }

          if (xhr.status >= 200 && xhr.status <= 300) {
            resolve(response)
          } else {
            this.emit(PutioApiClient.EVENTS.ERROR, response.body)
            reject(response.body)
          }
        }

        xhr.send(requestOptions.body)
      })
    }

    return new Promise((resolve, reject) => {
      axios({
        url,
        method: requestOptions.method,
        headers: requestOptions.headers,
        data: requestOptions.body,
        withCredentials: true,
      }).then((res) => {
        res.body = res.data
        return resolve(res)
      }).catch((error) => {
        if (error.response) {
          const { status, data = {} } = error.response

          if (data.error_uri === 'http://api.put.io/v2/docs') {
            error = data
          } else {
            error = {
              ...data,
              error_type: 'ERROR',
              status_code: status,
            }
          }
        } else {
          error = {
            error_type: 'ERROR',
            error_message: error.message,
            status_code: 0,
          }
        }

        this.emit(PutioApiClient.EVENTS.ERROR, error)
        return reject(error)
      })
    })
  }
}

PutioApiClient.DEFAULT_OPTIONS = {
  clientID: 1,
  baseURL: 'https://api.put.io/v2',
  isomorphic: true,
  debug: false,
}

PutioApiClient.EVENTS = {
  ERROR: 'error',
}

export default PutioApiClient
