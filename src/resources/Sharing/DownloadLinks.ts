import { PutioAPIClient } from '../../client'
import { ISharingCloneResponse, ISharingCloneInfoResponse } from './types'

export default class Sharing {
  private client: PutioAPIClient

  constructor(client: PutioAPIClient) {
    this.client = client
  }

  public Clone({
    ids = [],
    cursor,
    excludeIds = [],
  }: {
    ids?: number[]
    cursor?: string
    excludeIds?: number[]
  }) {
    return this.client.post<ISharingCloneResponse>('/sharing/clone', {
      data: {
        file_ids: ids.join(','),
        exclude_ids: excludeIds.join(','),
        cursor,
      },
    })
  }

  public CloneInfo(cloneInfoId: number) {
    return this.client.get<ISharingCloneInfoResponse>(
      `/download_links/${cloneInfoId}`,
    )
  }
}
