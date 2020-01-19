# `@putdotio/api-client`

[![Build Status](https://travis-ci.org/putdotio/putio.js.svg?branch=master)](https://travis-ci.org/putdotio/putio.js)
[![Coverage Status](https://coveralls.io/repos/github/putdotio/putio.js/badge.svg?branch=master)](https://coveralls.io/github/putdotio/putio.js?branch=master)
![npm (scoped)](https://img.shields.io/npm/v/@putdotio/api-client)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@putdotio/api-client)
![GitHub](https://img.shields.io/github/license/putdotio/putio.js)

JavaScript library for [Put.io API v2](https://api.put.io/v2).

## Installation

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

```html
<script src="https://unpkg.com/@putdotio/api-client/dist/index.umd.js"></script>
```

```js
const PutioAPI = window.PutioAPI
```

## Usage

```js
const API = new PutioAPI({ clientID: 'OAUTH_CLIENT_ID' })

API.setToken('XYZ')

API.User.Info()
  .then(r => console.log('Fetched user info: ', r))
  .catch(e => console.log('An error occurred while fetching user info: ', e))
```

## API

### Options

| Prop          | Type   |             Default Value              | Description                                                   |
| :------------ | :----- | :------------------------------------: | :------------------------------------------------------------ |
| **clientID**  | number |                   1                    | OAuth app client ID, defaults to [put.io web app](app.put.io) |
| **baseURL**   | string | [api.put.io/v2](https://api.put.io/v2) | Base URL of the API                                           |
| **webAppURL** | string |      [app.put.io](https://put.io)      | Base URL of the Put.io web app, used in the authentication flow |

### Methods

| Name         | Parameters      | Return Value            |
| :----------- | :-------------- | :---------------------- |
| **setToken** | `(token: string)` | PutioAPIClient Instance |

### Properties

TypeDoc is coming soon! You can refer to [resources folder for now 😇](./src/resources)

### Events

| Value                 |            Payload            | Description                             |
| :-------------------- | :---------------------------- | :-------------------------------------- |
| **ERROR**             |   [IPutioAPIClientErrorData](https://github.com/putdotio/putio.js/blob/master/src/types.ts#L15-L21)    | Fired when an HTTP request fails        |
| **CLIENT_IP_CHANGED** | `{ IP: string, newIP: string }` | Fired when the IP of the client changes |
