import { PutioAPIClient } from '../client'

export default class Family {
  private client: PutioAPIClient

  constructor(client: PutioAPIClient) {
    this.client = client
  }

  public GetInvites() {
    return this.client.get('/family/invites')
  }

  public CreateInvite() {
    return this.client.post('/family/sub_account')
  }

  public DeleteMember(username: string) {
    return this.client.delete(`/family/sub_account/${username}`)
  }

  public Join(invitationCode: string) {
    return this.client.post(`/family/join/${invitationCode}`)
  }
}
