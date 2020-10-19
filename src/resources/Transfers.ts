import { PutioAPIClient } from '../client'

export default class Tranfers {
  private client: PutioAPIClient

  constructor(client: PutioAPIClient) {
    this.client = client
  }

  public Add({
    url,
    saveTo,
    callbackUrl,
  }: {
    url: string
    saveTo?: number
    callbackUrl?: string
  }) {
    return this.client.post('/transfers/add', {
      data: {
        callback_url: callbackUrl,
        save_parent_id: saveTo,
        url,
      },
    })
  }

  public Get(id: number) {
    return this.client.get(`/transfers/${id}`)
  }

  public Query() {
    return this.client.get('/transfers/list')
  }

  public ClearAll() {
    return this.client.post('/transfers/clean')
  }

  public Cancel(ids: number[] = []) {
    return this.client.post('/transfers/cancel', {
      data: {
        transfer_ids: ids.join(','),
      },
    })
  }

  public Analysis(links: string[] = []) {
    return this.client.post('/transfers/info', {
      data: {
        urls: links.join('\n'),
      },
    })
  }

  public StartFetching(magnets: any) {
    return this.client.post('/transfers/add-multi', {
      data: {
        urls: JSON.stringify(magnets),
      },
    })
  }

  public Retry(id: number) {
    return this.client.post('/transfers/retry', {
      data: { id },
    })
  }

  public Reannounce(id: number) {
    return this.client.post('/transfers/reannounce', {
      data: { id },
    })
  }

  public Count() {
    return this.client.get('/transfers/count')
  }

  public CreateTorrent({
    cursor,
    excludeIds = [],
    name = '',
    trackers = '',
    isPrivate = false,
    ids = [],
  }: {
    name: string
    trackers: string
    isPrivate: boolean
    cursor?: string
    ids: number[]
    excludeIds: number[]
  }) {
    return this.client.post('/transfers/create-torrent', {
      data: {
        cursor,
        excludeIds: excludeIds.join(','),
        file_ids: ids.join(','),
        is_private: isPrivate,
        name,
        trackers,
      },
    })
  }
}
