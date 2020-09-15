import URI from 'urijs'
import PutioAPIClient from '../../client'
import { IGetStartFromResponse } from './types'
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

  public Download(fileId: number) {
    return this.client.get(`/files/${fileId}/download`)
  }

  public GetStorageURL(fileId: number) {
    return this.client.get(`/files/${fileId}/url`)
  }

  public GetContent(fileId: number) {
    return this.client.get(`/files/${fileId}/stream`)
  }

  public Subtitles(fileId: number, oauthToken: string, languages: string[]) {
    return this.client.get(`/files/${fileId}/subtitles`, {
      params: {
        languages,
        oauth_token: oauthToken,
      },
    })
  }

  public GetHLSStreamURL(
    fileId: number,
    {
      token = '',
      subtitleLanguages = [],
      maxSubtitleCount = -1,
      playOriginal = false,
    }: {
      token?: string
      subtitleLanguages?: string[]
      maxSubtitleCount?: number
      playOriginal?: boolean
    } = {},
  ) {
    return new URI(
      `${this.client.options.baseURL}/files/${fileId}/hls/media.m3u8`,
    )
      .addQuery({
        oauth_token: token || this.client.token,
        subtitle_languages: subtitleLanguages,
        max_subtitle_count: maxSubtitleCount,
        original: playOriginal ? 1 : 0,
      })
      .toString()
  }

  public ConvertToMp4(fileId: number) {
    return this.client.post(`/files/${fileId}/mp4`)
  }

  public ConvertStatus(fileId: number) {
    return this.client.get(`/files/${fileId}/mp4`)
  }

  public DeleteMp4(fileId: number) {
    return this.client.delete(`/files/${fileId}/mp4`)
  }

  public SharedWith(fileId: number) {
    return this.client.get(`/files/${fileId}/shared-with`)
  }

  public Unshare(fileId: number, shareId: any) {
    let shares = shareId

    if (shares) {
      shares = Array.isArray(shares)
        ? shares.map(i => i.toString())
        : [shares.toString()]
      shares = shares.join(',')
    }

    return this.client.post(`/files/${fileId}/unshare`, {
      data: {
        shares: shares || 'everyone',
      },
    })
  }

  public SaveAsMp4(fileId: number) {
    return this.client.get(`/files/${fileId}/put-mp4-to-my-folders`)
  }

  public Rename(fileId: number, name: string) {
    return this.client.post('/files/rename', {
      data: {
        file_id: fileId,
        name,
      },
    })
  }

  public GetStartFrom(fileId: number) {
    return this.client.get<IGetStartFromResponse>(`/files/${fileId}/start-from`)
  }

  public SetStartFrom(fileId: number, time: string) {
    return this.client.post(`/files/${fileId}/start-from/set`, {
      data: {
        time: parseInt(time, 10),
      },
    })
  }

  public ResetStartFrom(fileId: number) {
    return this.client.get(`/files/${fileId}/start-from/delete`)
  }

  public Extract(fileId: number, password?: string) {
    return this.client.post('/files/extract', {
      data: {
        password,
        user_file_ids: [fileId.toString()],
      },
    })
  }

  public CreatePublicLink(fileId: string) {
    return this.client.post(`/files/${fileId}/share_public`)
  }

  public RevokePublicLink(id: number) {
    return this.client.delete(`/files/public/list/${id}`)
  }

  public FindNextFile(fileId: number, fileType: string) {
    return this.client.get(`/files/${fileId}/next-file`, {
      params: { file_type: fileType },
    })
  }

  public FindNextVideo(fileId: number) {
    return this.client.get(`/files/${fileId}/next-video`)
  }
}
