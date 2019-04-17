export default class Files {
  constructor(client) {
    this.client = client;
  }

  Query(fileId, {
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
  } = {}) {
    return this.client.get(`/files/${(fileId === 'friends') ? 'items-shared-with-you' : 'list'}`, {
      query: {
        parent_id: (fileId !== 'friends') ? fileId : null,
        breadcrumbs,
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
    });
  }

  Continue(cursor, { limit = null } = {}) {
    return this.client.post('/files/list/continue', {
      body: {
        cursor,
        per_page: limit,
      },
    });
  }

  Search(phrase, page = 1) {
    return this.client.get(`/files/search/${phrase}/page/${page}`);
  }

  NewFolder(name, parentId = 0) {
    return this.CreateFolder({ name, parentId });
  }

  CreateFolder({ path, name, parentId } = {}) {
    return this.client.post('/files/create-folder', {
      body: {
        path,
        name,
        parent_id: parentId,
      },
    });
  }

  DeleteAll(cursor, excludeIds = []) {
    return this.client.post('/files/delete', {
      query: {
        skip_nonexistents: true,
      },
      body: {
        cursor,
        exclude_ids: excludeIds.join(','),
      },
    });
  }

  Delete(ids = [], options = {}) {
    return this.client.post('/files/delete', {
      query: {
        skip_nonexistents: true,
        skip_owner_check: options.ignoreFileOwner,
      },
      body: {
        file_ids: ids.join(','),
      },
    });
  }

  Extract({
    ids = [],
    cursor,
    excludeIds = [],
  } = []) {
    return this.client.post('/files/extract', {
      body: {
        user_file_ids: ids.join(','),
        exclude_ids: excludeIds.join(','),
        cursor,
      },
    });
  }

  ExtractStatus() {
    return this.client.get('/files/extract');
  }

  Share({
    ids = [],
    cursor,
    excludeIds = [],
    friends,
  } = {}) {
    return this.client.post('/files/share', {
      body: {
        cursor,
        friends,
        file_ids: ids.length ? ids.join(',') : undefined,
        exclude_ids: excludeIds.length ? excludeIds.join(',') : undefined,
      },
    });
  }

  Move(ids, to) {
    return this.client.post('/files/move', {
      body: {
        file_ids: ids.join(','),
        parent_id: to,
      },
    });
  }

  MoveAll({
    cursor,
    excludeIds = [],
    to,
  } = {}) {
    return this.client.post('/files/move', {
      body: {
        cursor,
        parent_id: to,
        exclude_ids: excludeIds.join(','),
      },
    });
  }

  Copy(ids, to = 0) {
    return this.client.post('/files/copy-to-disk', {
      body: {
        file_ids: ids.join(','),
        parent_id: to,
      },
    });
  }

  DownloadLinks({
    ids = [],
    cursor,
    excludeIds = [],
  } = {}) {
    return this.client.post('/files/get-download-links', {
      body: {
        file_ids: ids.join(','),
        exclude_ids: excludeIds.join(','),
        cursor,
      },
    });
  }

  ConvertToMp4({
    ids = [],
    cursor,
    excludeIds = [],
  }) {
    return this.client.post('/files/convert_mp4', {
      body: {
        file_ids: ids.join(','),
        exclude_ids: excludeIds.join(','),
        cursor,
      },
    });
  }

  SharedOnes() {
    return this.client.get('/files/shared');
  }

  PublicShares() {
    return this.client.get('/files/public/list');
  }

  SetWatchStatus({
    ids = [],
    cursor,
    excludeIds = [],
    watched,
  } = {}) {
    return this.client.post('/files/watch-status', {
      body: {
        file_ids: ids.join(','),
        exclude_ids: excludeIds.join(','),
        cursor,
        watched,
      },
    });
  }
}
