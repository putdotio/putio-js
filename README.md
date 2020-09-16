# `@putdotio/api-client`

[![Build Status](https://travis-ci.org/putdotio/putio.js.svg?branch=master)](https://travis-ci.org/putdotio/putio.js)
[![Coverage Status](https://coveralls.io/repos/github/putdotio/putio.js/badge.svg?branch=master)](https://coveralls.io/github/putdotio/putio.js?branch=master)
![npm (scoped)](https://img.shields.io/npm/v/@putdotio/api-client)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@putdotio/api-client)
![GitHub](https://img.shields.io/github/license/putdotio/putio.js)

JavaScript library for [Put.io API v2](https://api.put.io/v2).

## Installation

```bash
yarn add @putdotio/api-client
```

```bash
npm install @putdotio/api-client -S
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
const API = new PutioAPI({ clientID: 'OAUTH_CLIENT_ID' })

API.setToken('XYZ')

API.User.Info()
  .then(r => console.log('Fetched user info: ', r))
  .catch(e => console.log('An error occurred while fetching user info: ', e))
```

## API

### Options

| Prop          | Type   |             Default Value              | Description                                                     |
| :------------ | :----- | :------------------------------------: | :-------------------------------------------------------------- |
| **clientID**  | number |                   1                    | OAuth app client ID, defaults to [put.io web app](app.put.io)   |
| **baseURL**   | string | [api.put.io/v2](https://api.put.io/v2) | Base URL of the API                                             |
| **webAppURL** | string |      [app.put.io](https://put.io)      | Base URL of the Put.io web app, used in the authentication flow |

### Methods

| Name         | Parameters        | Return Value            |
| :----------- | :---------------- | :---------------------- |
| **setToken** | `(token: string)` | PutioAPIClient Instance |

### Events

| Value                 | Payload                                                                                       | Description                             |
| :-------------------- | :-------------------------------------------------------------------------------------------- | :-------------------------------------- |
| **ERROR**             | [IPutioAPIClientError](https://github.com/putdotio/putio.js/blob/master/src/types.ts#L23-L27) | Fired when an HTTP request fails        |
| **CLIENT_IP_CHANGED** | `{ IP: string, newIP: string }`                                                               | Fired when the IP of the client changes |
