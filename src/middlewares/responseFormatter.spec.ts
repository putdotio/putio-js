import {
  MockPutioAPIClient,
  mockPutioAPIClientError,
  mockPutioAPIClientResponse,
} from '../test-utils/mocks'
import { IPutioAPIClientError } from '../types'
import create from './responseFormatter'

describe('middlewares/responseFormatter', () => {
  const API = new MockPutioAPIClient()
  const responseFormatter = create(API)

  describe('successful responses', () => {
    it('transforms as expected', () => {
      expect(responseFormatter.onFulfilled(mockPutioAPIClientResponse))
        .toMatchInlineSnapshot(`
        Object {
          "body": Object {
            "foo": "bar",
          },
          "config": Object {},
          "data": Object {
            "foo": "bar",
          },
          "headers": Object {},
          "status": 200,
          "statusText": "ok",
        }
      `)
    })
  })

  describe('failed responses', () => {
    it('sets error.data property correctly when the request failed with Put.io API signature', () => {
      const error = {
        ...mockPutioAPIClientError,
        response: {
          config: {},
          data: {
            error_type: 'API_ERROR',
            error_message: 'Putio API Error',
          },
          headers: {},
          status: 400,
          statusText: 'Error!',
        },
      }

      responseFormatter.onRejected(error).catch(e =>
        expect(e).toMatchInlineSnapshot(`
          Object {
            "error_message": "Putio API Error",
            "error_type": "API_ERROR",
            "status_code": 400,
          }
        `),
      )
    })

    it('sets error.data property correctly when the request failed with HTTP response but without Put.io API signature', () => {
      const error: IPutioAPIClientError = {
        ...mockPutioAPIClientError,
        response: {
          config: {},
          headers: {},
          data: 'Bad Gateway',
          status: 502,
          statusText: 'Bad Gateway',
        },
      }

      responseFormatter.onRejected(error).catch(e =>
        expect(e).toMatchInlineSnapshot(`
          Object {
            "error_message": "MOCK_MESSAGE",
            "error_type": "ERROR",
            "status_code": 502,
          }
        `),
      )
    })

    it('sets error.data property correctly when the request failed without Put.io API signature', () => {
      responseFormatter.onRejected(mockPutioAPIClientError).catch(e =>
        expect(e).toMatchInlineSnapshot(`
          Object {
            "error_message": "MOCK_MESSAGE",
            "error_type": "ERROR",
            "status_code": 0,
          }
        `),
      )
    })
  })
})
