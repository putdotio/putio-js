export interface ILoginResponse {
  access_token: string
  user_id: number
}

export interface IValidateTokenResponse {
  result: boolean
  token_id: number
  token_scope: 'default' | 'two_factor'
  user_id: number
}

export interface IGenerateTOTPResponse {
  secret: string
  uri: string
}

export interface IVerifyTOTPResponse {
  token: string
  user_id: number
}

export type OAuthApp = {
  id: number
  name: string
  description: string
  website: string
  has_icon: boolean
}

export type MyOAuthApp = OAuthApp & {
  users: number
  callback: string
  secret: string
  hidden: boolean
}

export type OAuthAppSession = {
  id: number
  app_id: OAuthApp['id']
  app_name: OAuthApp['name']
  active: boolean
  client_name: string
  ip_address: string
  user_agent: string
  note: string | null
  created_at: string
  last_used_at: string
}

export interface IOAuthAuthorizedAppsResponse {
  apps: OAuthApp[]
}

export interface IOAuthAuthorizedAppSessionsResponse {
  clients: OAuthAppSession[]
}

export type IMyOAuthAppResponse = {
  app: MyOAuthApp
  token: string
}

export interface IMyOAuthAppsResponse {
  apps: MyOAuthApp[]
}

export interface IPopularOAuthAppsResponse {
  apps: (OAuthApp & {
    maker: string
    hidden?: boolean
    users?: number
  })[]
}
