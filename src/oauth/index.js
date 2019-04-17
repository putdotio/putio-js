import URI from 'urijs';

export default class OAuth {
  constructor(client) {
    this.client = client;
  }

  GetAuthorizeURL(query) {
    const { options: { baseURL, token } } = this.client;
    const uri = new URI(`${baseURL}/oauth2/authorize`).query({ ...query, oauth_token: token });
    return uri.toString();
  }

  Query() {
    return this.client.get('/oauth/apps');
  }

  Get(id) {
    return this.client.get(`/oauth/apps/${id}`);
  }

  GetIconURL(id) {
    const { options: { baseURL, token } } = this.client;
    return `${baseURL}/oauth/apps/${id}/icon?oauth_token=${token}`;
  }

  SetIcon(id, body) {
    return this.client.post(`/oauth/apps/${id}/icon`, {
      body,
    });
  }

  Create(body) {
    return this.client.post('/oauth/apps/register', {
      body,
    });
  }

  Update(id, body) {
    return this.client.post(`/oauth/apps/${id}`, {
      body,
    });
  }

  Delete(id) {
    return this.client.post(`/oauth/apps/${id}/delete`);
  }

  RegenerateToken(id) {
    return this.client.post(`/oauth/apps/${id}/regenerate_token`);
  }

  GetPopularApps() {
    return this.client.get('/oauth/apps/popular');
  }
}
