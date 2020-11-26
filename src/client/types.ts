import { AxiosError, AxiosResponse } from 'axios'

export interface IPutioAPIClientOptions {
  clientID?: number
  baseURL?: string
  webAppURL?: string
}

export interface IPutioAPIClientResponse<T> extends AxiosResponse {
  data: T & { status: 'OK' }
  body?: T & { status: 'OK' } // @TODO: Remove when it's irrelevant.
}

export interface IPutioAPIClientErrorData {
  error_id?: string
  error_uri?: string
  error_type: string
  error_message: string
  status_code: number
}

export interface IPutioAPIClientError
  extends AxiosError<IPutioAPIClientErrorData | string> {
  data: IPutioAPIClientErrorData
  toJSON: () => IPutioAPIClientErrorData
}

export type PutioAPIClientMiddleware = {
  onFulfilled: (
    response: IPutioAPIClientResponse<any>,
  ) => IPutioAPIClientResponse<any>
  onRejected: (error: IPutioAPIClientError) => Promise<IPutioAPIClientError>
}

export type PutioAPIClientMiddlewareFactory = () => PutioAPIClientMiddleware
