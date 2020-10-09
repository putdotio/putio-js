import PutioAPIClient from '../../client'
import {
  IUserInfoResponse,
  IUserSettingsResponse,
  IUserConfirmationsResponse,
  ConfirmationSubject,
} from './types'

export default class User {
  private client: PutioAPIClient

  constructor(client: PutioAPIClient) {
    this.client = client
  }

  public Info(params: Record<string, string | number>) {
    return this.client.get<IUserInfoResponse>('/account/info', {
      params,
    })
  }

  public Settings() {
    return this.client.get<IUserSettingsResponse>('/account/settings')
  }

  public SaveSettings(settings: Record<string, any>) {
    return this.client.post('/account/settings', {
      data: settings,
    })
  }

  public Config() {
    return this.client.get('/config')
  }

  public SaveConfig(config: Record<string, any>) {
    return this.client.put('/config', {
      data: { config },
    })
  }

  public ClearData(data = {}) {
    return this.client.post('/account/clear', {
      data,
    })
  }

  public Destroy(currentPassword: string) {
    return this.client.post('/account/destroy', {
      data: {
        current_password: currentPassword,
      },
    })
  }

  public Confirmations(type?: ConfirmationSubject) {
    return this.client.get<IUserConfirmationsResponse>(
      '/account/confirmation/list',
      {
        data: {
          type,
        },
      },
    )
  }
}
