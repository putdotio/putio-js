export interface IDisk {
  avail: number
  used: number
  size: number
}

export interface IAccountSettings {
  beta_user: boolean
  callback_url: string
  dark_theme: boolean
  default_download_folder: number
  disable_subtitles: boolean
  fluid_layout: boolean
  hide_subtitles: boolean
  history_enabled: boolean
  is_invisible: boolean
  locale: string
  login_mails_enabled: boolean
  next_episode: boolean
  pushover_token: string | null
  show_optimistic_usage: boolean
  sort_by: string
  start_from: boolean
  subtitle_languages: [string, string] | [string, null] | [null, null]
  theater_mode: boolean
  theme: 'dark' | 'light' | 'auto'
  transfer_sort_by: string
  trash_enabled: boolean
  tunnel_route_name: null | string
  two_factor_enabled: boolean
  use_private_download_ip: boolean
  use_start_from: boolean
  video_player: 'html5' | 'flash' | null
}

export interface IAccountInfoParams {
  download_token?: 0 | 1
  sharing?: 0 | 1
  features?: 0 | 1
  intercom?: 0 | 1
  pas?: 0 | 1
  platform?: string
}
export interface IAccountInfo {
  account_active: boolean
  avatar_url: string
  can_create_sub_account: boolean
  created_at: string
  days_until_files_deletion: number
  disk: IDisk
  download_token?: string
  family_owner?: string
  features: Record<string, boolean>
  files_will_be_deleted_at: string | null
  has_voucher: boolean
  is_admin: boolean
  is_eligible_for_friend_invitation: boolean
  is_invited_friend: boolean
  is_sharing_enabled: boolean
  is_sub_account: boolean
  mail: string
  monthly_bandwidth_usage: number
  oauth_token_id: number
  pas?: { user_hash: string }
  password_last_changed_at: string | null
  plan_expiration_date: string
  private_download_host_ip: string | null
  settings: IAccountSettings
  simultaneous_download_limit: number
  subtitle_languages: IAccountSettings['subtitle_languages']
  trash_size: number
  user_hash: string
  user_id: number
  username: string
}

export interface IAccountConfirmation {
  subject: 'mail_change' | 'password_change' | 'subscription_upgrade'
  created_at: string
}

export interface IAccountClearOptions {
  files: boolean
  finished_transfers: boolean
  active_transfers: boolean
  rss_feeds: boolean
  rss_logs: boolean
  history: boolean
  trash: boolean
  friends: boolean
}
