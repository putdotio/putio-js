import { AxiosError, AxiosResponse } from 'axios'
import PutioAPIClient from '.'

export interface IPutioAPIClientOptions {
  clientID?: number
  baseURL?: string
  webAppURL?: string
}

export interface IPutioAPIClientResponse<T> extends AxiosResponse {
  data: T
  body?: T // @TODO: Remove when it's irrelevant.
}

export interface IPutioAPIClientErrorData {
  error_id?: string
  error_uri?: string
  error_type: string
  error_message: string
  status_code: number
}
export interface IPutioAPIClientError extends AxiosError {
  data: IPutioAPIClientErrorData
  toJSON: () => IPutioAPIClientErrorData
}

export interface IPutioAPIClientMiddleware {
  onFulfilled: (
    response: IPutioAPIClientResponse<any>,
  ) => IPutioAPIClientResponse<any>
  onRejected: (error: IPutioAPIClientError) => Promise<IPutioAPIClientError>
}

export type IPutioAPIClientMiddlewareFactory = (
  client: PutioAPIClient,
) => IPutioAPIClientMiddleware

export enum PutioAPIClientEventTypes {
  ERROR = 'ERROR',
  CLIENT_IP_CHANGED = 'CLIENT_IP_CHANGED',
}
