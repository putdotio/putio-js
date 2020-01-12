import Axios, { AxiosError } from 'axios'
import PutioAPIClient from '../index'
import { IPutioAPIClientError, IPutioAPIClientResponse } from '../types'

export class MockPutioAPIClient extends PutioAPIClient {
  constructor() {
    super({})
    this.emit = jest.fn()
  }
}

export const mockPutioAPIClientResponse: IPutioAPIClientResponse<{
  foo: string
}> = {
  config: {},
  data: { foo: 'bar' },
  headers: {},
  status: 200,
  statusText: 'ok',
}

export const mockAxiosError: AxiosError = {
  config: {},
  isAxiosError: true,
  name: 'MOCK_ERROR',
  message: 'MOCK_MESSAGE',
  toJSON() {
    return {
      name: this.name,
      message: this.message,
    }
  },
}

export const mockPutioAPIClientError: IPutioAPIClientError = {
  ...mockAxiosError,
  data: {
    error_type: 'MOCK_ERROR',
    error_message: 'MOCK_MESSAGE',
    status_code: 0,
  },
  toJSON() {
    return this.data
  },
}
