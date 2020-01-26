import URI from 'urijs'
import PutioAPIClient from '../client'

export default class OAuth {
  private client: PutioAPIClient

  constructor(client: PutioAPIClient) {
    this.client = client
  }

  public GetAuthorizeURL(query: object = {}): string {
    const {
      token,
      options: { baseURL },
    } = this.client

    const uri = new URI(`${baseURL}/oauth2/authorize`).query({
      ...query,
      oauth_token: token,
    })

    return uri.toString()
  }

  public Query() {
    return this.client.get('/oauth/apps')
  }

  public Get(id: number) {
    return this.client.get(`/oauth/apps/${id}`)
  }

  public GetIconURL(id: number): string {
    const {
      token,
      options: { baseURL },
    } = this.client

    return `${baseURL}/oauth/apps/${id}/icon?oauth_token=${token}`
  }

  public SetIcon(id: number, data: object) {
    return this.client.post(`/oauth/apps/${id}/icon`, { data })
  }

  public Create(data: object) {
    return this.client.post('/oauth/apps/register', { data })
  }

  public Update(id: number, data: object) {
    return this.client.post(`/oauth/apps/${id}`, { data })
  }

  public Delete(id: number) {
    return this.client.post(`/oauth/apps/${id}/delete`)
  }

  public RegenerateToken(id: number) {
    return this.client.post(`/oauth/apps/${id}/regenerate_token`)
  }

  public GetPopularApps() {
    return this.client.get('/oauth/apps/popular')
  }
}
