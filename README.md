# `@putdotio/api-client`

[![Build Status](https://travis-ci.org/putdotio/putio.js.svg?branch=master)](https://travis-ci.org/putdotio/putio.js)
[![Coverage Status](https://coveralls.io/repos/github/putdotio/putio.js/badge.svg?branch=master)](https://coveralls.io/github/putdotio/putio.js?branch=master)
![npm (scoped)](https://img.shields.io/npm/v/@putdotio/api-client)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@putdotio/api-client)
![GitHub](https://img.shields.io/github/license/putdotio/putio.js)

JavaScript library for [Put.io API v2](https://api.put.io/v2/docs).

## Installation

```bash
yarn add @putdotio/api-client

npm install @putdotio/api-client
```

### ES Modules / TypeScript

```js
import PutioAPI from '@putdotio/api-client'
```

### CommonJS

```js
const PutioAPI = require('@putdotio/api-client').default
```

## Usage

```js
// you can pass the options in constructor
const putioAPI = new PutioAPI({ clientID: 'OAUTH_CLIENT_ID' })

// or use `configure` method
MyApp.bootstrap(config => {
  putioAPI.configure({ clientID: config.OAUTH_CLIENT_ID })
})

// setToken will send the given auth token with every request, in Authorization header
MyApp.onLogin(token => {
  putioAPI.setToken(token)

  putioAPI.User.Info()
    .then(r => console.log('Fetched user info: ', r))
    .catch(e => console.log('An error occurred while fetching user info: ', e))
})

// clearToken will perform a clean-up and stop sending the token in Authorization header
MyApp.onLogout(() => {
  putioAPI.clearToken()
})
```

## API

### Options

| Prop          | Type   | Default Value                          | Description                                                           |
| :------------ | :----- | :------------------------------------- | :-------------------------------------------------------------------- |
| **clientID**  | number | 1                                      | OAuth app client ID, defaults to [put.io web app](https://app.put.io) |
| **baseURL**   | string | [api.put.io/v2](https://api.put.io/v2) | Base URL of the API                                                   |
| **webAppURL** | string | [app.put.io](https://app.put.io)       | Base URL of the Put.io web app, used in the authentication flow       |

### Methods

| Name          | Parameters                          | Return Value            |
| :------------ | :---------------------------------- | :---------------------- |
| **configure** | `(options: IPutioAPIClientOptions)` | PutioAPIClient Instance |
| **setToken**  | `(token: string)`                   | PutioAPIClient Instance |

### Events

| Value                 | Payload                                                                                              | Description                             |
| :-------------------- | :--------------------------------------------------------------------------------------------------- | :-------------------------------------- |
| **ERROR**             | [IPutioAPIClientError](https://github.com/putdotio/putio.js/blob/master/src/client/types.ts#L22-L26) | Fired when an HTTP request fails        |
| **CLIENT_IP_CHANGED** | `{ IP: string, newIP: string }`                                                                      | Fired when the IP of the client changes |
