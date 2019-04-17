import URI from 'urijs';

export default class Auth {
  constructor(client) {
    this.client = client;
  }

  GetLoginURL({
    redirectURI,
    responseType = 'token',
    state = undefined,
    clientID = undefined,
    clientName = undefined,
  } = {}) {
    if (!redirectURI) {
      throw new Error('Redirect URI is required.');
    }

    const url = new URI('https://app.put.io/authenticate')
      .query({
        client_id: clientID || this.client.options.clientID,
        client_name: clientName,
        response_type: responseType,
        redirect_uri: redirectURI,
        state,
      });

    return url.toString();
  }

  Login({ username, password, app }) {
    return this.client
      .put(`/oauth2/authorizations/clients/${app.client_id}?client_secret=${app.client_secret}`, {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });
  }

  Logout() {
    return this.client.post('/oauth/grants/logout');
  }

  Register(data) {
    return this.client.post('/registration/register', {
      body: {
        client_id: this.client.options.clientID,
        ...data,
      },
    });
  }

  Exists(key, value) {
    return this.client.get(`/registration/exists/${key}`, {
      query: { value },
    });
  }

  GetVoucher(code) {
    return this.client.get(`/registration/voucher/${code}`);
  }

  GetGiftCard(code) {
    return this.client.get(`/registration/gift_card/${code}`);
  }

  GetFamilyInvite(code) {
    return this.client.get(`/registration/family/${code}`);
  }

  ForgotPassword(mail) {
    return this.client.post('/registration/password/forgot', {
      body: { mail },
    });
  }

  ResetPassword(key, newPassword) {
    return this.client.post('/registration/password/reset', {
      body: {
        key,
        password: newPassword,
      },
    });
  }

  GetCode(clientID, clientName = null) {
    let url = `/oauth2/oob/code?app_id=${clientID}`;

    if (clientName) {
      url = `${url}&client_name=${clientName}`;
    }

    return this.client.get(url);
  }

  CheckCodeMatch(code) {
    return this.client.get(`/oauth2/oob/code/${code}`);
  }

  LinkDevice(code) {
    return this.client.post('/oauth2/oob/code', {
      body: { code },
    });
  }

  Grants() {
    return this.client.get('/oauth/grants/');
  }

  RevokeApp(id) {
    return this.client.post(`/oauth/grants/${id}/delete`);
  }

  Clients() {
    return this.client.get('/oauth/clients/');
  }

  RevokeClient(id) {
    return this.client.post(`/oauth/clients/${id}/delete`);
  }

  RevokeAllClients() {
    return this.client.post('/oauth/clients/delete-all');
  }

  ValidateToken() {
    return this.client.get('/oauth2/validate');
  }
}
