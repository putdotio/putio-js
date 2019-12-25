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

export const mockPutioAPIClientError: IPutioAPIClientError = {
  config: {},
  isAxiosError: true,
  message: 'Mock Error!',
  name: 'MockError',
}
