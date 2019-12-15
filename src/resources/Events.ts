import PutioAPIClient from '../index'

export default class PutioEvents {
  private client: PutioAPIClient

  constructor(client: PutioAPIClient) {
    this.client = client;
  }

  public Query() {
    return this.client.get('/events/list');
  }

  public Clear() {
    return this.client.post('/events/delete');
  }

  public Delete(id: number) {
    return this.client.post(`/events/delete/${id}`);
  }
}
