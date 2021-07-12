import {
  mockPutioAPIClientError,
  mockPutioAPIClientResponse,
} from '../test-utils/mocks'
import { IPutioAPIClientError } from '../client/types'
import { createResponseFormatterMiddleware } from './responseFormatter'

describe('middlewares/responseFormatter', () => {
  const responseFormatter = createResponseFormatterMiddleware()

  describe('successful responses', () => {
    it('transforms as expected', () => {
      expect(responseFormatter.onFulfilled(mockPutioAPIClientResponse))
        .toMatchInlineSnapshot(`
        Object {
          "body": Object {
            "foo": "bar",
            "status": "OK",
          },
          "config": Object {
            "headers": Object {
              "X-Putio-Correlation-Id": "443bff25-b0fa-403b-88b0-00ae5a114b2e",
            },
          },
          "data": Object {
            "foo": "bar",
            "status": "OK",
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
            status_code: 400,
          },
          headers: {},
          status: 400,
          statusText: 'Error!',
        },
      }

      responseFormatter.onRejected(error).catch(e =>
        expect(e).toMatchInlineSnapshot(`
          Object {
            "correlation_id": "443bff25-b0fa-403b-88b0-00ae5a114b2e",
            "error_message": "Putio API Error",
            "error_type": "API_ERROR",
            "status_code": 400,
          }
        `),
      )
    })

    it('sets error.data property correctly when the request failed with HTTP response but without Put.io API signature and no meaningful header config', () => {
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

      error.config.headers = undefined

      responseFormatter.onRejected(error).catch(e =>
        expect(e).toMatchInlineSnapshot(`
          Object {
            "correlation_id": undefined,
            "error_message": "AXIOS_ERROR_MESSAGE",
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
            "correlation_id": undefined,
            "error_message": "AXIOS_ERROR_MESSAGE",
            "error_type": "ERROR",
            "status_code": 0,
          }
        `),
      )
    })
  })

  describe('royally fucked up cases', () => {
    const royallyFuckedUpError = new Error('undefined is not a function')

    responseFormatter
      .onRejected(royallyFuckedUpError as any)
      .catch(e => expect(e).toBe(royallyFuckedUpError))
  })
})
