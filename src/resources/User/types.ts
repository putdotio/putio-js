export interface IUserDisk {
  avail: number
  used: number
  size: number
}

export interface IUserProperties extends Record<string, any> {
  user_id: number
  username: string
  mail: string
  avatar_url: string
  account_active: boolean
  files_will_be_deleted_at: string | null
  is_admin: boolean
  disk: IUserDisk
}

export interface IUserSettings extends Record<string, any> {
  default_download_folder: number
  dark_theme: boolean
  fluid_layout: boolean
  history_enabled: boolean
  show_optimistic_usage: boolean
  disable_subtitles: boolean
  is_invisible: boolean
  start_from: boolean
  trash_enabled: boolean
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
