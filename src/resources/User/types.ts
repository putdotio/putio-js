export interface IUserProperties extends Record<string, any> {
  username: string
  account_active: boolean
  files_will_be_deleted_at: string | null
  is_admin: boolean
  disk: {
    avail: number
    used: number
    size: number
  }
}

export interface IUserSettings extends Record<string, any> {
  show_optimistic_usage: boolean
  disable_subtitles: boolean
}

export interface IUser extends IUserProperties {
  settings: IUserSettings
}

export interface IUserInfoResponse {
  info: IUser
}

export interface IUserSettingsResponse {
  settings: IUserSettings
}
