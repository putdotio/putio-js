import PutioAPIClient from '../client'

export default class Files {
  private client: PutioAPIClient

  constructor(client: PutioAPIClient) {
    this.client = client
  }

  public Query(
    id: number | string,
    {
      breadcrumbs = null,
      sort = null,
      total = null,
      limit = null,
      mp4Status = null,
      mp4StatusParent = null,
      videoMetadata = null,
      videoMetadataParent = null,
      streamUrl = null,
      streamUrlParent = null,
      mp4StreamUrl = null,
      mp4StreamUrlParent = null,
      contentType = null,
      codecsParent = null,
      mediaInfoParent = null,
    } = {},
  ) {
    return this.client.get(
      `/files/${id === 'friends' ? 'items-shared-with-you' : 'list'}`,
      {
        params: {
          breadcrumbs,
          parent_id: id !== 'friends' ? id : null,
          sort,
          total,
          per_page: limit,
          mp4_status: mp4Status,
          mp4_status_parent: mp4StatusParent,
          video_metadata: videoMetadata,
          video_metadata_parent: videoMetadataParent,
          stream_url: streamUrl,
          stream_url_parent: streamUrlParent,
          mp4_stream_url: mp4StreamUrl,
          mp4_stream_url_parent: mp4StreamUrlParent,
          content_type: contentType,
          codecs_parent: codecsParent,
          media_info_parent: mediaInfoParent,
        },
      },
    )
  }

  public Continue(cursor: string, { limit }: { limit?: number } = {}) {
    return this.client.post('/files/list/continue', {
      data: {
        cursor,
        per_page: limit,
      },
    })
  }

  public Search(phrase: string, page: number = 1) {
    return this.client.get(`/files/search/${phrase}/page/${page}`)
  }

  public NewFolder(name: string, parentId: number = 0) {
    return this.CreateFolder({ name, parentId })
  }

  public CreateFolder({
    path,
    name,
    parentId,
  }: {
    path?: string
    name: string
    parentId: number
  }) {
    return this.client.post('/files/create-folder', {
      data: {
        path,
        name,
        parent_id: parentId,
      },
    })
  }

  public DeleteAll(cursor: string, excludeIds: number[] = []) {
    return this.client.post('/files/delete', {
      data: {
        cursor,
        exclude_ids: excludeIds.join(','),
      },
      params: {
        skip_nonexistents: true,
      },
    })
  }

  public Delete(
    ids: number[] = [],
    { ignoreFileOwner = false }: { ignoreFileOwner?: boolean } = {},
  ) {
    return this.client.post('/files/delete', {
      data: {
        file_ids: ids.join(','),
      },
      params: {
        skip_nonexistents: true,
        skip_owner_check: ignoreFileOwner,
      },
    })
  }

  public Extract({
    ids = [],
    cursor,
    excludeIds = [],
  }: {
    ids?: number[]
    cursor?: string
    excludeIds?: number[]
  }) {
    return this.client.post('/files/extract', {
      data: {
        user_file_ids: ids.join(','),
        exclude_ids: excludeIds.join(','),
        cursor,
      },
    })
  }

  public ExtractStatus() {
    return this.client.get('/files/extract')
  }

  public Share({
    ids = [],
    cursor,
    excludeIds = [],
    friends,
  }: {
    ids?: number[]
    cursor?: string
    excludeIds?: number[]
    friends: any
  }) {
    return this.client.post('/files/share', {
      data: {
        cursor,
        friends,
        file_ids: ids.join(','),
        exclude_ids: excludeIds.join(','),
      },
    })
  }

  public Move(ids: number[], to: number) {
    return this.client.post('/files/move', {
      data: {
        file_ids: ids.join(','),
        parent_id: to,
      },
    })
  }

  public MoveAll({
    cursor,
    excludeIds = [],
    to,
  }: {
    cursor?: string
    excludeIds?: number[]
    to: number
  }) {
    return this.client.post('/files/move', {
      data: {
        cursor,
        parent_id: to,
        exclude_ids: excludeIds.join(','),
      },
    })
  }

  public Copy(ids: number[], to = 0) {
    return this.client.post('/files/copy-to-disk', {
      data: {
        file_ids: ids.join(','),
        parent_id: to,
      },
    })
  }

  public DownloadLinks({
    ids = [],
    cursor,
    excludeIds = [],
  }: {
    ids?: number[]
    cursor?: string
    excludeIds?: number[]
  }) {
    return this.client.post('/files/get-download-links', {
      data: {
        file_ids: ids.join(','),
        exclude_ids: excludeIds.join(','),
        cursor,
      },
    })
  }

  public ConvertToMp4({
    ids = [],
    cursor,
    excludeIds = [],
  }: {
    ids?: number[]
    cursor?: string
    excludeIds?: number[]
  }) {
    return this.client.post('/files/convert_mp4', {
      data: {
        file_ids: ids.join(','),
        exclude_ids: excludeIds.join(','),
        cursor,
      },
    })
  }

  public SharedOnes() {
    return this.client.get('/files/shared')
  }

  public PublicShares() {
    return this.client.get('/files/public/list')
  }

  public SetWatchStatus({
    ids = [],
    cursor,
    excludeIds = [],
    watched,
  }: {
    ids?: number[]
    cursor?: string
    excludeIds?: number[]
    watched: boolean
  }) {
    return this.client.post('/files/watch-status', {
      data: {
        file_ids: ids.join(','),
        exclude_ids: excludeIds.join(','),
        cursor,
        watched,
      },
    })
  }
}
