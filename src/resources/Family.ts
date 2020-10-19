import { PutioAPIClient } from '../client'

export default class Family {
  private client: PutioAPIClient

  constructor(client: PutioAPIClient) {
    this.client = client
  }

  public GetInvites() {
    return this.client.get('/account/family_invites')
  }

  public CreateInvite() {
    return this.client.post('/account/sub_account')
  }

  public DeleteMember(username: string) {
    return this.client.delete(`/account/sub_account/${username}`)
  }

  public Join(invitationCode: string) {
    return this.client.post(`/account/join_family/${invitationCode}`)
  }
}
