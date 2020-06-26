import PutioAPIClient from '../../client'

export default class File {
  private client: PutioAPIClient

  constructor(client: PutioAPIClient) {
    this.client = client
  }

  public Public(
    oauthToken: string,
    {
      mp4StatusParent = 1,
      videoMetadataParent = 1,
      codecsParent = 1,
      mediaInfoParent = 1,
    } = {},
  ) {
    return this.client.get('/files/public', {
      params: {
        codecs_parent: codecsParent,
        media_info_parent: mediaInfoParent,
        mp4_status_parent: mp4StatusParent,
        mp4_stream_url_parent: 1,
        oauth_token: oauthToken,
        stream_url_parent: 1,
        video_metadata_parent: videoMetadataParent,
      },
    })
  }

  public Download(id: number) {
    return this.client.get(`/files/${id}/download`)
  }

  public GetStorageURL(id: number) {
    return this.client.get(`/files/${id}/url`)
  }

  public GetContent(id: number) {
    return this.client.get(`/files/${id}/stream`)
  }

  public Get(
    id: number,
    params = {
      breadcrumbs: 1,
      codecs: 1,
      media_info: 1,
      mp4_size: 1,
      start_from: 1,
      stream_url: 1,
    },
  ) {
    return this.client.get(`/files/${id}`, {
      params,
    })
  }

  public Subtitles(id: number, oauthToken: string, languages: string[]) {
    return this.client.get(`/files/${id}/subtitles`, {
      params: {
        languages,
        oauth_token: oauthToken,
      },
    })
  }

  public ConvertToMp4(id: number) {
    return this.client.post(`/files/${id}/mp4`)
  }

  public ConvertStatus(id: number) {
    return this.client.get(`/files/${id}/mp4`)
  }

  public DeleteMp4(id: number) {
    return this.client.delete(`/files/${id}/mp4`)
  }

  public SharedWith(id: number) {
    return this.client.get(`/files/${id}/shared-with`)
  }

  public Unshare(id: number, shareId: any) {
    let shares = shareId

    if (shares) {
      shares = Array.isArray(shares)
        ? shares.map(i => i.toString())
        : [shares.toString()]
      shares = shares.join(',')
    }

    return this.client.post(`/files/${id}/unshare`, {
      data: {
        shares: shares || 'everyone',
      },
    })
  }

  public SaveAsMp4(id: number) {
    return this.client.get(`/files/${id}/put-mp4-to-my-folders`)
  }

  public Rename(id: number, name: string) {
    return this.client.post('/files/rename', {
      data: {
        file_id: id,
        name,
      },
    })
  }

  public SetStartFrom(id: number, time: string) {
    return this.client.post(`/files/${id}/start-from/set`, {
      data: {
        time: parseInt(time, 10),
      },
    })
  }

  public ResetStartFrom(id: number) {
    return this.client.get(`/files/${id}/start-from/delete`)
  }

  public Extract(id: number, password?: string) {
    return this.client.post('/files/extract', {
      data: {
        password,
        user_file_ids: [id.toString()],
      },
    })
  }

  public CreatePublicLink(id: string) {
    return this.client.post(`/files/${id}/share_public`)
  }

  public RevokePublicLink(id: number) {
    return this.client.delete(`/files/public/list/${id}`)
  }

  public FindNextFile(id: number, fileType: string) {
    return this.client.get(`/files/${id}/next-file`, {
      params: { file_type: fileType },
    })
  }

  public FindNextVideo(id: number) {
    return this.client.get(`/files/${id}/next-video`)
  }
}
