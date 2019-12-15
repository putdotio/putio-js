# Putio.js

[![Build Status](https://travis-ci.org/putdotio/putio.js.svg?branch=master)](https://travis-ci.org/putdotio/putio.js)

JavaScript library for [Put.io API v2](https://api.put.io/v2).

## Usage
```bash
$ npm install axios@^0.19 @putdotio/api-client -S
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

## Options
| Prop | Type | Default Value | Description |
| :---- |:-------------|:----:| :------- |
| **clientID** | number | 1 (put.io webapp) | OAuth app client ID |
| **baseURL** | string | [api.put.io/v2](https://api.put.io/v2) | Base URL of the API |

## Methods
| Name | Parameters | Return Value |
| :---- |:-------------|:-----|
| **setToken** | (token: string) | PutioAPIClient Instance |
| **setAdminToken** | (token: string) | PutioAPIClient Instance |

### Events
| Value | Payload |  Description |
| :---- |:-------------:| :------- |
| **error** | IPutioAPIClientErrorData | Fired when an HTTP request fails |
