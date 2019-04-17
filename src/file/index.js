export default class File {
  constructor(client) {
    this.client = client;
  }

  Public(oauthToken, {
    mp4StatusParent = 1,
    videoMetadataParent = 1,
    codecsParent = 1,
    mediaInfoParent = 1,
  } = {}) {
    return this.client.get('/files/public', {
      query: {
        oauth_token: oauthToken,
        mp4_status_parent: mp4StatusParent,
        video_metadata_parent: videoMetadataParent,
        codecs_parent: codecsParent,
        media_info_parent: mediaInfoParent,
        stream_url_parent: 1,
        mp4_stream_url_parent: 1,
      },
    });
  }

  Download(fileId) {
    return this.client.get(`/files/${fileId}/download`);
  }

  GetStorageURL(id) {
    return this.client.get(`/files/${id}/url`);
  }

  GetContent(id) {
    return this.client.get(`/files/${id}/stream`);
  }

  Get(fileId, query = {
    mp4_size: 1,
    start_from: 1,
    stream_url: 1,
    breadcrumbs: 1,
    codecs: 1,
    media_info: 1,
  }) {
    return this.client.get(`/files/${fileId}`, {
      query,
    });
  }

  Subtitles(fileId, oauthToken, languages) {
    return this.client.get(`/files/${fileId}/subtitles`, {
      query: {
        oauth_token: oauthToken,
        languages,
      },
    });
  }

  Delete(fileId) {
    return this.client.post(`/files/${fileId}/delete`);
  }

  ConvertToMp4(id) {
    return this.client.post(`/files/${id}/mp4`);
  }

  ConvertStatus(id) {
    return this.client.get(`/files/${id}/mp4`);
  }

  DeleteMp4(id) {
    return this.client.delete(`/files/${id}/mp4`);
  }

  SharedWith(id) {
    return this.client.get(`/files/${id}/shared-with`);
  }

  Unshare(id, shareId) {
    let shares = shareId;

    if (shares) {
      if (!Array.isArray(shares)) {
        shares = [shares.toString()];
      } else {
        shares = shares.map(i => i.toString());
      }

      shares = shares.join(',');
    }

    return this.client.post(`/files/${id}/unshare`, {
      body: {
        shares: shares || 'everyone',
      },
    });
  }

  SaveAsMp4(id) {
    return this.client.get(`/files/${id}/put-mp4-to-my-folders`);
  }

  Rename(id, name) {
    return this.client.post('/files/rename', {
      body: {
        file_id: id,
        name,
      },
    });
  }

  SetStartFrom(id, time) {
    return this.client.post(`/files/${id}/start-from/set`, {
      body: {
        time: parseInt(time, 10),
      },
    });
  }

  ResetStartFrom(id) {
    return this.client.get(`/files/${id}/start-from/delete`);
  }

  Extract(id, password) {
    return this.client.post('/files/extract', {
      body: {
        user_file_ids: [id.toString()],
        password,
      },
    });
  }

  CreatePublicLink({
    id,
    senderName = '',
    senderMessage = '',
    receiverEmail = '',
  } = {}) {
    return this.client.post(`/files/${id}/share_public`, {
      body: {
        sender_name: senderName,
        sender_message: senderMessage,
        receiver_mail: receiverEmail,
      },
    });
  }

  RevokePublicLink(id) {
    return this.client.delete(`/files/public/list/${id}`);
  }

  FindNextFile(id, fileType) {
    return this.client.get(`/files/${id}/next-file`, {
      query: { file_type: fileType },
    });
  }

  FindNextVideo(id) {
    return this.client.get(`/files/${id}/next-video`);
  }
}
