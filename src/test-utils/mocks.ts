import { AxiosError } from 'axios'
import PutioAPIClient from '../client'
import {
  IPutioAPIClientError,
  IPutioAPIClientErrorData,
  IPutioAPIClientResponse,
} from '../types'

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
  data: { foo: 'bar', status: 'OK' },
  headers: {},
  status: 200,
  statusText: 'ok',
}

export const mockAxiosError: AxiosError = {
  config: {},
  isAxiosError: true,
  name: 'AXIOS_ERROR',
  message: 'AXIOS_ERROR_MESSAGE',
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

export const createMockResponse = <T>(
  data: T,
  status: number = 200,
): IPutioAPIClientResponse<T> => ({
  config: {},
  data: { ...data, status: 'OK' },
  status,
  headers: {},
  statusText: 'ok',
})

export const createMockErrorResponse = (
  data: IPutioAPIClientErrorData,
  status: number = 0,
): IPutioAPIClientError => ({
  ...mockAxiosError,
  data: {
    ...data,
    status_code: status,
  },
  toJSON() {
    return this.data
  },
})
