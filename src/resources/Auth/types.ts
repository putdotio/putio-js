export interface IGenerateTOTPResponse {
  secret: string
  uri: string
}

export interface IVerifyTOTPResponse {
  token: string
  user_id: number
}
