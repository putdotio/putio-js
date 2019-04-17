export default class Zips {
  constructor(client) {
    this.client = client;
  }

  Query() {
    return this.client.get('/zips/list');
  }

  Create({
    ids = [],
    cursor,
    excludeIds = [],
  }) {
    return this.client.post('/zips/create', {
      body: {
        file_ids: ids.join(','),
        exclude_ids: excludeIds.join(','),
        cursor,
      },
    });
  }


  Get(id) {
    return this.client.get(`/zips/${id}`);
  }

  Retry(id) {
    return this.client.get(`/zips/${id}/retry`);
  }

  Cancel(id) {
    return this.client.get(`/zips/${id}/cancel`);
  }
}
