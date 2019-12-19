# Putio.js

[![Build Status](https://travis-ci.org/putdotio/putio.js.svg?branch=master)](https://travis-ci.org/putdotio/putio.js)

JavaScript library for [Put.io API v2](https://api.put.io/v2).

## Usage
```bash
$ npm install @putdotio/api-client -S
```

### Module
```js
import PutioAPI from '@putdotio/api-client'
```

### CommonJS
```js
const PutioAPI = require('@putdotio/api-client').default
```

### Browser
```
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://unpkg.com/@putdotio/api-client/dist/index.umd.js"></script>
```
```js
const PutioAPI = window.PutioAPI
```

### Example
```js
const Api = new PutioAPI({ clientID: 'OAUTH_CLIENT_ID' }).setToken('XYZ')

Api.User.Info()
  .then(response => console.log('Fetched user info: ', response))
  .catch(error => console.log('An error occured while fetching user info: ', error))
```

## API

### Options
| Prop | Type | Default Value | Description |
| :---- |:-------------|:----:| :------- |
| **clientID** | number | 1 | OAuth app client ID, defaults to [put.io web app](app.put.io) |
| **baseURL** | string | [api.put.io/v2](https://api.put.io/v2) | Base URL of the API |
| **webAppURL** | string | [app.put.io](https://put.io) | Base URL of the Put.io web app, used in the OAuth Flow|

### Methods
| Name | Parameters | Return Value |
| :---- |:-------------|:-----|
| **setToken** | (token: string) | PutioAPIClient Instance |

### Properties
TypeDoc is coming soon! You can refer to [resources folder for now 😇](./src/resources)

### Events
| Value | Payload |  Description |
| :---- |:-------------:| :------- |
| **ERROR** | IPutioAPIClientErrorData | Fired when an HTTP request fails |
| **CLIENT_IP_CHANGED** | { IP: string, newIP: string }| Fired when the IP of the client changes |
