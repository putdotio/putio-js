import { PutioAPIClient } from '../client'

export default class RSS {
  private client: PutioAPIClient

  constructor(client: PutioAPIClient) {
    this.client = client
  }

  public Query() {
    return this.client.get('/rss/list')
  }

  public Get(id: number) {
    return this.client.get(`/rss/${id}`)
  }

  public Create(rss: object) {
    return this.client.post('/rss/create', {
      data: rss,
    })
  }

  public Update(id: number, rss: object) {
    return this.client.post(`/rss/${id}`, {
      data: rss,
    })
  }

  public Pause(id: number) {
    return this.client.post(`/rss/${id}/pause`)
  }

  public Resume(id: number) {
    return this.client.post(`/rss/${id}/resume`)
  }

  public Delete(id: number) {
    return this.client.post(`/rss/${id}/delete`)
  }

  public Logs(id: number) {
    return this.client.get(`/rss/${id}/items`)
  }

  public ClearLogs(id: number) {
    return this.client.post(`/rss/${id}/clear-log`)
  }

  public RetryItem(id: number, itemId: number) {
    return this.client.post(`/rss/${id}/items/${itemId}/retry`)
  }
}
