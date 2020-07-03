import {
  MockPutioAPIClient,
  mockPutioAPIClientError,
  mockPutioAPIClientResponse,
} from '../test-utils/mocks'
import { IPutioAPIClientError, PutioAPIClientEventTypes } from '../types'
import create from './errorEmitter'

describe('middlewares/errorEmitter', () => {
  const API = new MockPutioAPIClient()
  const errorEmitter = create(API)

  beforeEach(jest.resetAllMocks)

  describe('successful responses', () => {
    it('does not call client.emit method', () => {
      errorEmitter.onFulfilled(mockPutioAPIClientResponse)
      expect(API.emit).not.toHaveBeenCalled()
    })
  })

  describe('failed responses', () => {
    it('calls client.emit method with correct signature', () => {
      const error: IPutioAPIClientError = {
        ...mockPutioAPIClientError,
        response: {
          config: {},
          data: {
            status_code: 400,
            error_type: 'API_ERROR',
            error_message: 'Putio API Error',
          },
          headers: {},
          status: 400,
          statusText: 'Error!',
        },
      }

      errorEmitter.onRejected(error).catch(e => expect(e).toEqual(error))

      expect(API.emit).toHaveBeenCalledWith(
        PutioAPIClientEventTypes.ERROR,
        error,
      )
    })
  })
})
