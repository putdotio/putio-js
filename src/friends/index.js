export default class Friends {
  constructor(client) {
    this.client = client
  }

  Query() {
    return this.client.get('/friends/list', {
      query: {
        shared_info: 1,
      },
    })
  }

  Search(phrase) {
    return this.client.post('/friends/user-search', {
      body: {
        name: phrase,
      },
    })
  }

  WaitingRequests() {
    return this.client.get('/friends/waiting-requests')
  }

  WaitingRequestsCount() {
    return this.client.get('/friends/waiting-requests-count')
  }

  SendFrienshipRequest(username) {
    return this.client.post(`/friends/${username}/request`)
  }

  Remove(username) {
    return this.client.post(`/friends/${username}/unfriend`)
  }

  Approve(username) {
    return this.client.post(`/friends/${username}/approve`)
  }

  Deny(username) {
    return this.client.post(`/friends/${username}/deny`)
  }

  SharedFolder(username) {
    return this.client.get(`/friends/${username}/files`)
  }
}

