import { PutioAPIClient } from '../../client'
import { FileSortOption, FileType, ISearchResponse } from './types'

export default class Files {
  private client: PutioAPIClient

  constructor(client: PutioAPIClient) {
    this.client = client
  }

  public Query(
    id: number | string,
    {
      perPage,
      sortBy,
      contentType,
      fileType,
      streamUrl,
      streamUrlParent,
      mp4StreamUrl,
      mp4StreamUrlParent,
      hidden,
      mp4Status,
      mp4StatusParent,
      videoMetadata,
      videoMetadataParent,
      codecsParent,
      mediaInfoParent,
      breadcrumbs,
      total,
    }: {
      perPage?: number
      sortBy?: FileSortOption
      contentType?: string
      fileType?: FileType
      streamUrl?: boolean
      streamUrlParent?: boolean
      mp4StreamUrl?: boolean
      mp4StreamUrlParent?: boolean
      hidden?: boolean
      mp4Status?: boolean
      mp4StatusParent?: boolean
      videoMetadata?: boolean
      videoMetadataParent?: boolean
      codecsParent?: boolean
      mediaInfoParent?: boolean
      breadcrumbs?: boolean
      total?: boolean
    } = {},
  ) {
    return this.client.get(
      `/files/${id === 'friends' ? 'items-shared-with-you' : 'list'}`,
      {
        params: {
          parent_id: id !== 'friends' ? id : null,
          per_page: perPage,
          sort_by: sortBy,
          content_type: contentType,
          file_type: fileType,
          stream_url: streamUrl,
          stream_url_parent: streamUrlParent,
          mp4_stream_url: mp4StreamUrl,
          mp4_stream_url_parent: mp4StreamUrlParent,
          hidden,
          mp4_status: mp4Status,
          mp4_status_parent: mp4StatusParent,
          video_metadata: videoMetadata,
          video_metadata_parent: videoMetadataParent,
          codecs_parent: codecsParent,
          media_info_parent: mediaInfoParent,
          breadcrumbs,
          total,
        },
      },
    )
  }

  public Continue(cursor: string, { perPage }: { perPage?: number } = {}) {
    return this.client.post('/files/list/continue', {
      data: {
        cursor,
        per_page: perPage,
      },
    })
  }

  public Search(
    query: string,
    {
      perPage,
      fileType,
    }: { perPage: number; fileType?: FileType | FileType[] } = { perPage: 50 },
  ) {
    return this.client.get<ISearchResponse>('/files/search', {
      params: {
        query,
        per_page: perPage,
        type: fileType,
      },
    })
  }

  public ContinueSearch(
    cursor: string,
    { perPage }: { perPage?: number } = {},
  ) {
    return this.client.post<ISearchResponse>('/files/search/continue', {
      data: {
        cursor,
        per_page: perPage,
      },
    })
  }

  public NewFolder(name: string, parentId: number = 0) {
    return this.CreateFolder({ name, parentId })
  }

  public CreateFolder({
    name,
    parentId,
    path,
  }: {
    name: string
    parentId?: number
    path?: string
  }) {
    return this.client.post('/files/create-folder', {
      data: {
        name,
        parent_id: parentId,
        path,
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
