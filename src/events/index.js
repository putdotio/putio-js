export default class Events {
  constructor(client) {
    this.client = client
  }

  Query() {
    return this.client.get('/events/list')
  }

  Clear() {
    return this.client.post('/events/delete')
  }

  Delete(id) {
    return this.client.post(`/events/delete/${id}`)
  }
}

