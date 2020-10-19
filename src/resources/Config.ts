import { PutioAPIClient } from '../client'

export default class Config {
  private client: PutioAPIClient

  constructor(client: PutioAPIClient) {
    this.client = client
  }

  public Read() {
    return this.client.get('/config')
  }

  public Write(config: object) {
    return this.client.put('/config', {
      data: { config },
    })
  }

  public GetKey(key: string) {
    return this.client.get(`/config/${key}`)
  }

  public SetKey(key: string, value: any) {
    return this.client.put(`/config/${key}`, {
      data: { value },
    })
  }

  public DeleteKey(key: string) {
    return this.client.delete(`/config/${key}`)
  }
}
