import { IPutioAPIClientOptions } from './client/types'

export const CORRELATION_ID_HEADER_NAME = 'X-Putio-Correlation-Id'
export const NIL_CORRELATION_ID = '00000000-0000-0000-0000-000000000000'
export const DEFAULT_CLIENT_OPTIONS: IPutioAPIClientOptions = {
  baseURL: 'https://api.put.io/v2',
  clientID: 1,
  webAppURL: 'https://app.put.io',
}
