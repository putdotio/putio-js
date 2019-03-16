export default class Tunnel {
  constructor(client) {
    this.client = client
  }

  Routes() {
    return this.client.get('/tunnel/routes')
  }
}

