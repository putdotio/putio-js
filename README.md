# Putio.js

[![Build Status](https://travis-ci.org/aydieneue/putio.js.svg?branch=master)](https://travis-ci.org/aydieneue/putio.js)

JavaScript wrapper for [Put.io API v2](https://api.put.io/v2).

## Installation
```bash
$ npm install @putdotio/api-client
```

## Usage
```js
// Modern Bundlers
import PutioAPI from '@putdotio/api-client'

// Node
const PutioAPI = require('@putdotio/api-client')

// Browser
const PutioAPI = window.PutioAPI

const Api = new PutioAPI({
  clientID: 'OAUTH_CLIENT_ID',
  token: localStorage.getItem('oauth_token'),
})

Api
  .User
  .Info()
    .then(res => console.log('User info received: ', res))
    .catch(err => console.log('Error occured while fetching user info: ', err))
```

## Properties
| Prop | Type | Default Value | Description |
| :---- |:-------------|:----:| :------- |
| **debug** | bool | false | Debug mode |
| **options.clientID** | number | 1 (put.io webapp) | OAuth app client id |
| **options.token** | string | - | OAuth token to use for API requests |
| **options.isomorphic** | bool | true | Uses [axios](https://github.com/axios/axios) for sending requests from node environment |
| **options.baseURL** | string | [api.put.io/v2](https://api.put.io/v2) | Base URL of the API |

## Methods
| Name | Parameters | Return Value |
| :---- |:-------------|:-----|
| **setDebug** | (debug: bool) | PutioApiClient Instance |
| **setToken** | (token: string) | PutioApiClient Instance |
| **setAdminToken** | (token: string) | PutioApiClient Instance |
| **setBaseURL** | (url: string) | PutioApiClient Instance |

### Events
| Value | Payload |  Description |
| :---- |:-------------:| :------- |
| **error** | object | Fired when an http request fails |
