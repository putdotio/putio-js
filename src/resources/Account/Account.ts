import { PutioAPIClient } from '../../client'
import {
  IAccountInfo,
  IAccountInfoParams,
  IAccountSettings,
  IAccountConfirmation,
  IAccountClearOptions,
} from './types'

export default class Account {
  private client: PutioAPIClient

  constructor(client: PutioAPIClient) {
    this.client = client
  }

  public Info(params: IAccountInfoParams) {
    return this.client.get<{ info: IAccountInfo }>('/account/info', {
      params,
    })
  }

  public Settings() {
    return this.client.get<{ settings: IAccountSettings }>('/account/settings')
  }

  public SaveSettings(settings: Partial<IAccountSettings>) {
    return this.client.post('/account/settings', {
      data: settings,
    })
  }

  public Clear(options: IAccountClearOptions) {
    return this.client.post<{}>('/account/clear', {
      data: options,
    })
  }

  public Destroy(currentPassword: string) {
    return this.client.post<{}>('/account/destroy', {
      data: {
        current_password: currentPassword,
      },
    })
  }

  public Confirmations(type?: IAccountConfirmation['subject']) {
    return this.client.get<{ confirmations: IAccountConfirmation[] }>(
      '/account/confirmation/list',
      {
        data: {
          type,
        },
      },
    )
  }
}
