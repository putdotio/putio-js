import {
  mockPutioAPIClientError,
  mockPutioAPIClientResponse,
} from '../../test-utils/mocks'
import { IPutioAPIClientError } from '../../client/types'
import { DEFAULT_CLIENT_OPTIONS } from '../../constants'
import { createResponseFormatter } from './responseFormatter'

describe('interceptors/response/responseFormatter', () => {
  const responseFormatter = createResponseFormatter(DEFAULT_CLIENT_OPTIONS)

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
              "X-Putio-Correlation-Id": "00000000-0000-0000-0000-000000000000",
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
            "correlation_id": "00000000-0000-0000-0000-000000000000",
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

    it('sets error.data property corrrectly when the request doesnt have response object, but has a request object that is a valid XMLHttpRequest', () => {
      function createMockXMLHttpRequest(
        readyState: number,
        status: number,
        responseText: string,
      ) {
        const xhr = new XMLHttpRequest()
        return new Proxy(xhr, {
          get(target, prop) {
            if (prop === 'readyState') return readyState
            if (prop === 'status') return status
            if (prop === 'responseText') return responseText
            // @ts-ignore
            return target[prop]
          },
        })
      }

      const error: IPutioAPIClientError = {
        ...mockPutioAPIClientError,
        response: undefined,
        request: createMockXMLHttpRequest(
          4,
          400,
          JSON.stringify({ foo: 'bar' }),
        ),
      }

      responseFormatter.onRejected(error).catch(e =>
        expect(e).toMatchInlineSnapshot(`
          Object {
            "correlation_id": undefined,
            "error_message": "AXIOS_ERROR_MESSAGE",
            "error_type": "ERROR",
            "foo": "bar",
            "status_code": 400,
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
