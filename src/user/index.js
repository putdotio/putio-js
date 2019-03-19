export default class User {
  constructor(client) {
    this.client = client
  }

  Info(query = {}) {
    return this.client.get('/account/info', {
      query,
    })
  }

  Settings() {
    return this.client.get('/account/settings')
  }

  SaveSettings(settings) {
    return this.client.post('/account/settings', {
      body: settings,
    })
  }

  Config() {
    return this.client.get('/config')
  }

  SaveConfig(config) {
    return this.client.put('/config', {
      body: { config },
    })
  }

  ClearData(data = {}) {
    return this.client.post('/account/clear', {
      body: data,
    })
  }

  Destroy(password) {
    return this.client.post('/account/destroy', {
      body: {
        current_password: password,
      },
    })
  }
}
