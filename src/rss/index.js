export default class RSS {
  constructor(client) {
    this.client = client
  }

  Query() {
    return this.client.get('/rss/list')
  }

  Get(id) {
    return this.client.get(`/rss/${id}`)
  }

  Create(rss) {
    return this.client.post('/rss/create', {
      body: rss,
    })
  }

  Update(id, rss) {
    return this.client.post(`/rss/${id}`, {
      body: rss
    })
  }

  Pause(id) {
    return this.client.post(`/rss/${id}/pause`)
  }

  Resume(id) {
    return this.client.post(`/rss/${id}/resume`)
  }

  Delete(id) {
    return this.client.post(`/rss/${id}/delete`)
  }

  Logs(id) {
    return this.client.get(`/rss/${id}/items`)
  }

  ClearLogs(id) {
    return this.client.post(`/rss/${id}/clear-log`)
  }

  RetryItem(id, itemId) {
    return this.client.post(`/rss/${id}/items/${itemId}/retry`)
  }
}
