import { AxiosResponse } from 'axios'

export interface IPutioAPIClientOptions {
  clientID?: number
  baseURL?: string
}

export interface IPutioAPIClientResponse extends AxiosResponse {
  // @TODO: this is for back compatibility, remove when it's irrelevant.
  body?: any
}

export interface IPutioAPIClientError {
  error_id?: string,
  error_uri?: string,
  error_type: string,
  error_message: string,
  status_code: number,
}

export interface IPutioOAuthApp {
  client_id: string,
  client_secret: string,
}

export enum PutioAPIClientEventTypes {
  ERROR = 'ERROR'
}
