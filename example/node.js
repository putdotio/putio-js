const PutioAPI = require('../dist/index.js')

const Api = new PutioAPI({ clientID: 'OAUTH_CLIENT_ID' }).setToken('XYZ')

Api.User.Info()
  .then(res => console.log('User info received: ', res))
  .catch(err => console.log('An error occured while fetching user info: ', err))
