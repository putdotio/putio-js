export default class Transfers {
  constructor(client) {
    this.client = client;
  }

  Add({ url, saveTo, callbackUrl }) {
    return this.client.post('/transfers/add', {
      body: {
        url,
        save_parent_id: saveTo,
        callback_url: callbackUrl,
      },
    });
  }

  Get(id) {
    return this.client.get(`/transfers/${id}`);
  }

  Query() {
    return this.client.get('/transfers/list');
  }

  ClearAll() {
    return this.client.post('/transfers/clean');
  }

  Cancel(ids = []) {
    return this.client.post('/transfers/cancel', {
      body: {
        transfer_ids: ids.join(','),
      },
    });
  }

  Analysis(links = []) {
    return this.client.post('/transfers/info', {
      body: {
        urls: links.join('\n'),
      },
    });
  }

  StartFetching(magnets) {
    return this.client.post('/transfers/add-multi', {
      body: {
        urls: JSON.stringify(magnets),
      },
    });
  }

  Retry(id) {
    return this.client.post('/transfers/retry', {
      body: { id },
    });
  }

  Reannounce(id) {
    return this.client.post('/transfers/reannounce', {
      body: { id },
    });
  }

  Count() {
    return this.client.get('/transfers/count');
  }

  CreateTorrent({
    name = '',
    trackers = '',
    isPrivate = false,
    cursor,
    ids = [],
    excludeIds = [],
  } = {}) {
    return this.client.post('/transfers/create-torrent', {
      body: {
        name,
        trackers,
        is_private: isPrivate,
        cursor,
        file_ids: ids.join(','),
        excludeIds: excludeIds.join(','),
      },
    });
  }
}
