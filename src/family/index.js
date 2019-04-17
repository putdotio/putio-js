export default class Family {
  constructor(client) {
    this.client = client;
  }

  GetInvites() {
    return this.client.get('/account/family_invites');
  }

  CreateInvite() {
    return this.client.post('/account/sub_account');
  }

  DeleteMember(username) {
    return this.client.delete(`/account/sub_account/${username}`);
  }

  Join(inviteCode) {
    return this.client.post(`/account/join_family/${inviteCode}`);
  }
}
