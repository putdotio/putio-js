export default class Trash {
  constructor(client) {
    this.client = client;
  }

  List({ limit = 50 } = {}) {
    return this.client.get('/trash/list', {
      query: {
        per_page: limit,
      },
    });
  }

  Continue(cursor, { limit = 50 } = {}) {
    return this.client.post('/trash/list/continue', {
      body: {
        cursor,
        per_page: limit,
      },
    });
  }

  Restore({ useCursor, ids, cursor }) {
    return this.client.post('/trash/restore', {
      body: {
        file_ids: !useCursor ? ids.join(',') : undefined,
        cursor: useCursor ? cursor : undefined,
      },
    });
  }

  Delete({ useCursor, ids, cursor }) {
    return this.client.post('/trash/delete', {
      body: {
        file_ids: !useCursor ? ids.join(',') : undefined,
        cursor: useCursor ? cursor : undefined,
      },
    });
  }

  Empty() {
    return this.client.post('/trash/empty');
  }
}
