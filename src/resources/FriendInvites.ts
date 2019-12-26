import PutioAPIClient from '../index'
import { IPutioAPIClientResponse } from '../types'

interface IFriendInvite {
  code: string
  created_at: string
  user?: {
    name: string
    avatar_url: string
    created_at: string
    earned_amount: number
  }
}

export default class FriendInvites {
  private client: PutioAPIClient

  constructor(client: PutioAPIClient) {
    this.client = client
  }

  public GetAll(): Promise<
    IPutioAPIClientResponse<{
      invites: IFriendInvite[]
      remaining_limit: number
    }>
  > {
    return this.client.get('/account/friend_invites')
  }

  public Create(): Promise<IPutioAPIClientResponse<{ code: string }>> {
    return this.client.post('/account/create_friend_invitation')
  }
}
