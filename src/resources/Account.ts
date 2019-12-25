import PutioAPIClient from '../index'

export default class Account {
  private client: PutioAPIClient

  constructor(client: PutioAPIClient) {
    this.client = client
  }

  public Info(params = {}) {
    return this.client.get('/account/info', {
      params,
    })
  }

  public Settings() {
    return this.client.get('/account/settings')
  }

  public UpdateSettings(settings: object) {
    return this.client.post('/account/settings', {
      data: settings,
    })
  }

  public ClearData(data = {}) {
    return this.client.post('/account/clear', {
      data,
    })
  }

  public Destroy(password: string) {
    return this.client.post('/account/destroy', {
      data: {
        current_password: password,
      },
    })
  }
}
